// apps/api/src/ai/context.ts
// The context engine. Responsible for:
//   1. Loading the ancestry path (root → parent)
//   2. Serializing nodes into AI message format
//   3. Token budgeting — trim oldest nodes when over limit
//   4. Injecting targeted block context for inline branches
//
// Rule: never send the full conversation tree.
// Send only: root question + path to current node + selected block highlight.

import { getNodePath } from '@branch-ai/database';
import type { AiMessage } from './types';

// ─────────────────────────────────────────────
// Token estimation
// We don't want a heavy tiktoken dependency for now.
// ~4 chars per token is accurate enough for budgeting.
// ─────────────────────────────────────────────

export function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

// ─────────────────────────────────────────────
// Token budget config
// ─────────────────────────────────────────────

const BUDGET = {
  total:      6000,  // max tokens to send in context
  systemMsg:   500,  // reserved for the system prompt
  response:   2048,  // reserved for the AI's response
  // available for history = total - systemMsg - response = 3452
  get history() { return this.total - this.systemMsg - this.response; },
};

// ─────────────────────────────────────────────
// Block → plain text serialization
// Used to reconstruct assistant turns from stored blocks
// ─────────────────────────────────────────────

type StoredBlock = {
  type:        string;
  content:     string;
  language?:   string | null;
  calloutType?: string | null;
  items:       { content: string; position: number }[];
};

function blockToText(block: StoredBlock): string {
  switch (block.type) {
    case 'heading':
      return `## ${block.content}`;

    case 'paragraph':
    case 'quote':
      return block.content;

    case 'callout':
      return `[${(block.calloutType ?? 'note').toUpperCase()}] ${block.content}`;

    case 'code':
      return `\`\`\`${block.language ?? ''}\n${block.content}\n\`\`\``;

    case 'bullet_list':
      return block.items
        .sort((a, b) => a.position - b.position)
        .map((i) => `- ${i.content}`)
        .join('\n');

    case 'numbered_list':
      return block.items
        .sort((a, b) => a.position - b.position)
        .map((i, idx) => `${idx + 1}. ${i.content}`)
        .join('\n');

    default:
      return block.content;
  }
}

function nodeToText(node: ContextNode): string {
  if (node.role === 'user') {
    return node.content ?? '';
  }
  // Assistant node — serialize all blocks
  return (node.blocks ?? [])
    .sort((a, b) => a.position - b.position)
    .map(blockToText)
    .join('\n\n');
}

// ─────────────────────────────────────────────
// Types — minimal shape we need from DB nodes
// ─────────────────────────────────────────────

interface ContextNode {
  id:           string;
  role:         'user' | 'assistant';
  content:      string | null;
  depth:        number;
  parentBlockId?: string | null;
  blocks:       StoredBlock[];
}

// ─────────────────────────────────────────────
// Context assembly
// ─────────────────────────────────────────────

export interface BuildContextOptions {
  parentNodeId:  string | null;
  parentBlockId: string | null;
  question:      string;
}

export interface BuiltContext {
  messages:          AiMessage[];
  estimatedTokens:   number;
  ancestorCount:     number;
  wasTruncated:      boolean;
}

export async function buildContext(
  options: BuildContextOptions,
  systemPrompt: string
): Promise<BuiltContext> {
  const { parentNodeId, parentBlockId, question } = options;

  // ── Root question (no history) ──────────────
  if (!parentNodeId) {
    const userMsg: AiMessage = { role: 'user', content: question };
    return {
      messages: [
        { role: 'system', content: systemPrompt },
        userMsg,
      ],
      estimatedTokens: estimateTokens(systemPrompt) + estimateTokens(question),
      ancestorCount:   0,
      wasTruncated:    false,
    };
  }

  // ── Load ancestry ────────────────────────────
  const pathNodes = await getNodePath(parentNodeId) as ContextNode[];

  // Find the target block if this is an inline branch
  let targetBlockContent: string | null = null;
  if (parentBlockId) {
    const lastAssistant = [...pathNodes].reverse().find((n) => n.role === 'assistant');
    const targetBlock   = lastAssistant?.blocks.find((b: any) => b.id === parentBlockId);
    if (targetBlock) {
      targetBlockContent = blockToText(targetBlock as StoredBlock);
    }
  }

  // ── Serialize path nodes into messages ───────
  interface TurnWithTokens {
    message:       AiMessage;
    tokens:        number;
    depth:         number;
    isRoot:        boolean;
  }

  const turns: TurnWithTokens[] = pathNodes.map((node, idx) => {
    const content = nodeToText(node);
    return {
      message: { role: node.role as 'user' | 'assistant', content },
      tokens:  estimateTokens(content),
      depth:   node.depth,
      isRoot:  idx === 0,
    };
  });

  // ── Token budgeting ───────────────────────────
  // Strategy: always keep root + most recent N turns.
  // If over budget, drop middle turns (oldest non-root).
  const systemTokens  = estimateTokens(systemPrompt);
  const questionTokens = estimateTokens(question);
  const available     = BUDGET.history - questionTokens;

  let selectedTurns = [...turns];
  let wasTruncated  = false;

  // Check total tokens
  const totalHistoryTokens = turns.reduce((sum, t) => sum + t.tokens, 0);

  if (totalHistoryTokens > available) {
    wasTruncated = true;

    // Always keep: root (idx 0) + last 2 turns
    const root    = turns[0];
    const recent  = turns.slice(-2);
    const middle  = turns.slice(1, -2);

    // Fill middle turns from most recent until budget runs out
    let budget = available - root.tokens - recent.reduce((s, t) => s + t.tokens, 0);
    const keptMiddle: TurnWithTokens[] = [];

    for (let i = middle.length - 1; i >= 0; i--) {
      if (budget - middle[i].tokens >= 0) {
        budget -= middle[i].tokens;
        keptMiddle.unshift(middle[i]);
      } else {
        break; // stop — don't skip over turns (would break conversation flow)
      }
    }

    selectedTurns = [root, ...keptMiddle, ...recent];
  }

  // ── Build final message array ─────────────────
  const messages: AiMessage[] = [
    { role: 'system', content: systemPrompt },
    ...selectedTurns.map((t) => t.message),
  ];

  // ── Inject block context for inline branches ──
  // Replace or augment the final user message to highlight the target block
  if (targetBlockContent) {
    const finalUserMsg = `Regarding this specific section:\n\n---\n${targetBlockContent}\n---\n\n${question}`;
    messages.push({ role: 'user', content: finalUserMsg });
  } else {
    messages.push({ role: 'user', content: question });
  }

  const totalTokens =
    systemTokens +
    selectedTurns.reduce((s, t) => s + t.tokens, 0) +
    questionTokens;

  return {
    messages,
    estimatedTokens: totalTokens,
    ancestorCount:   pathNodes.length,
    wasTruncated,
  };
}