// apps/api/src/ai/prompt.ts
// Builds the prompt sent to the AI for each branch request.
//
// The core rule: never send the full conversation tree.
// Send only the ancestry path from root to the current node.
// This keeps tokens low and context sharp.

import { getNodePath } from '@branch-ai/database';
import type { AiMessage } from './types';

// ─────────────────────────────────────────────
// System prompt
// Tells the model exactly what to return.
// ─────────────────────────────────────────────

export const SYSTEM_PROMPT = `You are BranchAI, a structured knowledge assistant.

IMPORTANT: You must ALWAYS respond with valid JSON only. No markdown, no preamble, no explanation outside the JSON.

Response format:
{
  "blocks": [
    { "type": "heading", "content": "Section title" },
    { "type": "paragraph", "content": "Explanation text" },
    { "type": "code", "content": "code here", "language": "typescript" },
    { "type": "bullet_list", "items": ["item 1", "item 2"] },
    { "type": "numbered_list", "items": ["step 1", "step 2"] },
    { "type": "callout", "content": "Important note", "calloutType": "info" },
    { "type": "quote", "content": "A relevant quote" }
  ]
}

Rules:
- Always start with a "heading" block
- Use 3–6 blocks per response (more if the topic genuinely requires depth)
- calloutType must be one of: info, warning, success, error
- For code blocks, always specify the language field
- Be technically precise and thorough
- Structure the answer so each section could independently be explored deeper
- Do not add any text outside the JSON object`;

// ─────────────────────────────────────────────
// Context builder
// ─────────────────────────────────────────────

interface BuildPromptOptions {
  parentNodeId: string | null;   // null = root question (first ever)
  parentBlockId: string | null;  // null = general follow-up
  question: string;              // the new question being asked
}

export async function buildPromptMessages(
  options: BuildPromptOptions
): Promise<AiMessage[]> {
  const messages: AiMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
  ];

  // Root question — no history to load
  if (!options.parentNodeId) {
    messages.push({
      role:    'user',
      content: options.question,
    });
    return messages;
  }

  // Load ancestry chain: root → ... → parentNode
  const pathNodes = await getNodePath(options.parentNodeId);

  // Build a readable conversation history from the path
  // Each node becomes a turn in the message history
  for (const node of pathNodes) {
    if (node.role === 'user') {
      messages.push({
        role:    'user',
        content: node.content ?? '',
      });
    } else {
      // assistant node — reconstruct a text summary from blocks
      const summary = node.blocks
        .map((block) => {
          switch (block.type) {
            case 'heading':
              return `## ${block.content}`;
            case 'paragraph':
            case 'quote':
            case 'callout':
              return block.content;
            case 'code':
              return `\`\`\`${block.language ?? ''}\n${block.content}\n\`\`\``;
            case 'bullet_list':
            case 'numbered_list':
              return block.items.map((i) => `- ${i.content}`).join('\n');
            default:
              return block.content;
          }
        })
        .join('\n\n');

      messages.push({
        role:    'assistant',
        content: summary,
      });
    }
  }

  // If this is an inline block branch, add context about which section
  if (options.parentBlockId) {
    const lastAssistantNode = [...pathNodes]
      .reverse()
      .find((n) => n.role === 'assistant');

    const targetBlock = lastAssistantNode?.blocks.find(
      (b) => b.id === options.parentBlockId
    );

    if (targetBlock) {
      const blockLabel =
        targetBlock.type === 'heading'
          ? `"${targetBlock.content}"`
          : `the section about "${targetBlock.content?.slice(0, 60)}..."`;

      messages.push({
        role: 'user',
        content:
          `Regarding ${blockLabel} specifically:\n\n${options.question}`,
      });
      return messages;
    }
  }

  // General follow-up — just append the question
  messages.push({
    role:    'user',
    content: options.question,
  });

  return messages;
}