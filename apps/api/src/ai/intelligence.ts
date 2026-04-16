// apps/api/src/ai/intelligence.ts
import { generateEmbeddings }          from '../services/embeddings';
import { updateNodeEmbedding, createNode, updateNodeSummarySnapshot, prisma } from '@branch-ai/database';
import { getProvider, getModel }           from './providers/index';

// ─────────────────────────────────────────────
// Block & Node serializers
// ─────────────────────────────────────────────

type AnyBlock = {
  type:         string;
  content?:     string;
  language?:    string | null;
  calloutType?: string | null;
  items?:       { content: string; position: number }[] | string[];
};

function blocksToPlainText(blocks: AnyBlock[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case 'heading': case 'paragraph': case 'quote': case 'callout':
          return b.content ?? '';
        case 'code':
          return b.content ?? '';
        case 'bullet_list': case 'numbered_list': {
          const items = (b.items ?? []) as (string | { content: string })[];
          return items
            .map((i) => (typeof i === 'string' ? i : i.content))
            .join(' ');
        }
        default: return b.content ?? '';
      }
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * nodeToSummaryText
 * Formats a single node for the summarizer prompt.
 */
function nodeToSummaryText(node: { role: string; content?: string | null; blocks?: AnyBlock[] }): string {
  const role = node.role === 'user' ? 'User' : 'Assistant';
  const text = node.content || blocksToPlainText(node.blocks ?? []);
  return `${role}: ${text}`;
}

// ─────────────────────────────────────────────
// Knowledge Graph: Embeddings
// ─────────────────────────────────────────────

/**
 * Fire-and-forget embedding of an answer node.
 */
export async function embedAnswerNode(nodeId: string, blocks: AnyBlock[]): Promise<void> {
  try {
    const text = blocksToPlainText(blocks);
    if (!text.trim()) return;
    const embedding = await generateEmbeddings(text);
    await updateNodeEmbedding(nodeId, embedding);
  } catch (err) {
    console.error('[KG] embedAnswerNode failed:', err);
  }
}

// ─────────────────────────────────────────────
// Auto-Summarization
// ─────────────────────────────────────────────

/**
 * summarizeLineage
 * Generates an AI summary of the conversation path up to a given node.
 * Stores result as a 'summary' node type.
 */
export async function summarizeLineage(
  leafNodeId:     string,
  conversationId: string,
  userId:         string,
  pathNodes:      any[]
): Promise<void> {
  try {
    if (pathNodes.length < 3) return; // not enough to summarize

    const historyText = pathNodes.map(nodeToSummaryText).join('\n\n');
    const prompt = `
Summarize the following conversation segment concisely in 3-5 bullet points. 
Focus on the key technical concepts discussed and the user's specific goals.
Output ONLY the summary text, no extra conversational filler.

CONVERSATION:
${historyText}
`;

    const response = await getProvider().complete({
      messages: [{ role: 'system', content: 'You are a technical summarizer.' }, { role: 'user', content: prompt }],
      model:     getModel(),
      temperature: 0.3, // lower temperature for factual summary
    });

    const summaryText = response.content.trim();
    if (!summaryText) return;

    await createNode({
      conversationId,
      parentNodeId: leafNodeId,
      parentBlockId: null,
      createdById:   userId,
      type:          'summary',
      role:          'assistant',
      content:       summaryText,
    });

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Summary] generated for node ${leafNodeId} (depth ${pathNodes.length})`);
    }
  } catch (err) {
    console.error('[Summary] summarizeLineage failed:', err);
  }
}

/**
 * generateNodeSummary
 * Generates a concise 1-sentence AI summary for a specific node (and its children) 
 * for visual UI collapsing, and saves it to the node's summarySnapshot.
 */
export async function generateNodeSummary(nodeId: string): Promise<string | null> {
  try {
    const node = await prisma.node.findUnique({
      where: { id: nodeId },
      include: {
        blocks: { orderBy: { position: 'asc' }, include: { items: { orderBy: { position: 'asc' } } } },
        children: {
          orderBy: { createdAt: 'asc' },
          take: 3,
          include: { blocks: { orderBy: { position: 'asc' }, include: { items: { orderBy: { position: 'asc' } } } } }
        }
      }
    });

    if (!node) return null;

    let contextText = nodeToSummaryText(node as any);
    for (const child of node.children) {
      contextText += '\n\n' + nodeToSummaryText(child as any);
    }

    const prompt = `
Please provide a very concise, 1-sentence summary (max 15 words) of the following conversation branch. 
Do not include any conversational filler like "This branch discusses", just output the core semantic summary directly.

CONTEXT:
${contextText}
`;

    const response = await getProvider().complete({
      messages: [{ role: 'system', content: 'You are a technical summarizer.' }, { role: 'user', content: prompt }],
      model:     getModel(),
      temperature: 0.3,
    });

    const summaryText = response.content.trim();
    if (!summaryText) return null;

    await updateNodeSummarySnapshot(nodeId, summaryText);
    return summaryText;
  } catch (err) {
    console.error('[Summary] generateNodeSummary failed:', err);
    return null;
  }
}
