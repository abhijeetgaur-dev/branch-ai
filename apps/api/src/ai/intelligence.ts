// apps/api/src/ai/intelligence.ts
// Exports:
//   embedAnswerNode(nodeId, blocks)
//     Fire-and-forget: serializes answer blocks → embed → store.
//     Never throws — errors are logged, never surfaced to caller.

import { generateEmbeddings } from '../services/embeddings';
import { updateNodeEmbedding } from '@branch-ai/database';

// ─────────────────────────────────────────────
// Block serializer (minimal — just needs plain text for embedding)
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
        case 'heading':
        case 'paragraph':
        case 'quote':
        case 'callout':
          return b.content ?? '';
        case 'code':
          return b.content ?? '';
        case 'bullet_list':
        case 'numbered_list': {
          const items = (b.items ?? []) as (string | { content: string })[];
          return items
            .map((i) => (typeof i === 'string' ? i : i.content))
            .join(' ');
        }
        default:
          return b.content ?? '';
      }
    })
    .filter(Boolean)
    .join(' ');
}

// ─────────────────────────────────────────────
// Public: embed an answer node in the background
// ─────────────────────────────────────────────

/**
 * Fire-and-forget embedding of an answer node.
 * Call with `void embedAnswerNode(...)` — does not block the response.
 */
export async function embedAnswerNode(
  nodeId: string,
  blocks: AnyBlock[],
): Promise<void> {
  try {
    const text = blocksToPlainText(blocks);
    if (!text.trim()) return; // nothing to embed

    const embedding = await generateEmbeddings(text);
    await updateNodeEmbedding(nodeId, embedding);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[KG] embedded node ${nodeId} (${embedding.length}-dim)`);
    }
  } catch (err) {
    // Never throw — this is best-effort
    console.error('[KG] embedAnswerNode failed:', err);
  }
}
