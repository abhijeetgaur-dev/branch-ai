// packages/database/src/queries.ts
import { prisma } from './client';
import type { NodeType, Role, BlockType, CalloutType } from '../generated';

export interface CreateConversationInput {
  title:        string;
  description?: string;
  ownerId:      string;
  workspaceId?: string;
  tags?:        string[];
}

export interface CreateNodeInput {
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  createdById:    string;
  type:           NodeType;
  role:           Role;
  content?:       string;
}

export interface CreateBlockInput {
  nodeId:        string;
  type:          BlockType;
  content?:      string;
  position:      number;
  language?:     string;
  calloutType?:  CalloutType;
  items?:        string[];
}

// ─────────────────────────────────────────────
// CONVERSATION
// ─────────────────────────────────────────────

export async function createConversation(input: CreateConversationInput) {
  return prisma.conversation.create({
    data: {
      title:       input.title,
      description: input.description,
      ownerId:     input.ownerId,
      workspaceId: input.workspaceId,
      tags:        input.tags ?? [],
    },
  });
}

export async function getConversationsByOwner(ownerId: string) {
  return prisma.conversation.findMany({
    where:   { ownerId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true, title: true, description: true,
      tags: true, isFavorite: true, createdAt: true, updatedAt: true,
      _count: { select: { nodes: true } },
    },
  });
}

export async function getConversationById(id: string) {
  return prisma.conversation.findUnique({
    where:   { id },
    include: { owner: { select: { id: true, name: true, avatar: true } } },
  });
}

export async function toggleFavorite(id: string, isFavorite: boolean) {
  return prisma.conversation.update({ where: { id }, data: { isFavorite } });
}

export async function deleteConversation(id: string) {
  return prisma.conversation.delete({ where: { id } });
}

// ─────────────────────────────────────────────
// NODE
// ─────────────────────────────────────────────

export async function createNode(input: CreateNodeInput) {
  let depth    = 0;
  let pathBase = '';

  if (input.parentNodeId) {
    const parent = await prisma.node.findUniqueOrThrow({
      where:  { id: input.parentNodeId },
      select: { depth: true, path: true },
    });
    depth    = parent.depth + 1;
    pathBase = parent.path;
  }

  // Position = number of existing siblings at this level
  const siblingCount = await prisma.node.count({
    where: {
      conversationId: input.conversationId,
      parentNodeId:   input.parentNodeId ?? null,
    },
  });

  const node = await prisma.node.create({
    data: {
      conversationId: input.conversationId,
      parentNodeId:   input.parentNodeId,
      parentBlockId:  input.parentBlockId,
      createdById:    input.createdById,
      type:           input.type,
      role:           input.role,
      content:        input.content,
      depth,
      path:           'pending',
      position:       siblingCount,
    },
  });

  const finalPath = pathBase ? `${pathBase}.${node.id}` : node.id;
  return prisma.node.update({ where: { id: node.id }, data: { path: finalPath } });
}

/**
 * getConversationTree
 * Returns ALL nodes as a nested array of root threads.
 * Roots are nodes with parentNodeId = null, ordered by position.
 * Children at every level are ordered by position then createdAt.
 *
 * Returns: TreeNode[] — an array of root nodes, each with nested children.
 */
export async function getConversationTree(conversationId: string) {
  const nodes = await prisma.node.findMany({
    where:   { conversationId },
    orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: { items: { orderBy: { position: 'asc' } } },
      },
    },
  });

  return buildForest(nodes);
}

export async function getNodePath(nodeId: string) {
  const node = await prisma.node.findUniqueOrThrow({
    where:  { id: nodeId },
    select: { path: true },
  });
  const ancestorIds = node.path.split('.');
  return prisma.node.findMany({
    where:   { id: { in: ancestorIds } },
    orderBy: { depth: 'asc' },
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: { items: { orderBy: { position: 'asc' } } },
      },
    },
  });
}

export async function getChildren(parentNodeId: string) {
  return prisma.node.findMany({
    where:   { parentNodeId },
    orderBy: [{ position: 'asc' }, { createdAt: 'asc' }],
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: { items: { orderBy: { position: 'asc' } } },
      },
    },
  });
}

export async function toggleNodeCollapsed(nodeId: string, isCollapsed: boolean) {
  return prisma.node.update({ where: { id: nodeId }, data: { isCollapsed } });
}

export async function updateNodeContent(nodeId: string, content: string) {
  return prisma.node.update({ where: { id: nodeId }, data: { content } });
}

export async function updateNodeEmbedding(nodeId: string, embedding: number[]) {
  return prisma.node.update({ where: { id: nodeId }, data: { embedding } });
}

/**
 * findSimilarNodes
 * Finds the top-N answer nodes similar to a given embedding vector,
 * scoped to a specific user. Excludes the source node itself.
 *
 * Returns nodes (with their parent question and conversation title)
 * sorted by cosine similarity descending.
 */
export async function findSimilarNodes(
  userId:        string,
  embedding:     number[],
  excludeNodeId: string,
  limit:         number = 5,
) {
  // Load all answer nodes that have embeddings, for this user
  const candidates = await prisma.node.findMany({
    where: {
      type:            'answer',
      id:              { not: excludeNodeId },
      conversation:    { ownerId: userId },
      // Only nodes that have been embedded (non-empty array)
      NOT: { embedding: { isEmpty: true } },
    },
    select: {
      id:       true,
      embedding: true,
      depth:    true,
      parent: {
        select: {
          id:      true,
          content: true,
        },
      },
      conversation: {
        select: {
          id:    true,
          title: true,
        },
      },
    },
  });

  if (!candidates.length) return [];

  // Compute cosine similarity in JS (same pattern as RAG)
  function cosineSim(a: number[], b: number[]): number {
    let dot = 0, na = 0, nb = 0;
    for (let i = 0; i < a.length; i++) {
      dot += a[i] * b[i];
      na  += a[i] * a[i];
      nb  += b[i] * b[i];
    }
    return na === 0 || nb === 0 ? 0 : dot / (Math.sqrt(na) * Math.sqrt(nb));
  }

  return candidates
    .map((n) => ({
      nodeId:            n.id,
      similarity:        cosineSim(embedding, n.embedding),
      questionContent:   n.parent?.content ?? null,
      questionNodeId:    n.parent?.id ?? null,
      conversationId:    n.conversation.id,
      conversationTitle: n.conversation.title,
    }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .filter((n) => n.similarity > 0.3); // only return meaningfully related results
}


export async function deleteNodeWithChildren(nodeId: string) {
  return prisma.node.delete({ where: { id: nodeId } });
}

export async function reorderSiblings(orderedNodeIds: string[]) {
  return prisma.$transaction(
    orderedNodeIds.map((id, position) =>
      prisma.node.update({ where: { id }, data: { position } })
    )
  );
}

// ─────────────────────────────────────────────
// BLOCK
// ─────────────────────────────────────────────

export async function createBlocks(blocks: CreateBlockInput[]) {
  return prisma.$transaction(
    blocks.map((b) =>
      prisma.block.create({
        data: {
          nodeId:      b.nodeId,
          type:        b.type,
          content:     b.content ?? '',
          position:    b.position,
          language:    b.language,
          calloutType: b.calloutType,
          items: b.items?.length
            ? { create: b.items.map((text, i) => ({ content: text, position: i })) }
            : undefined,
        },
        include: { items: { orderBy: { position: 'asc' } } },
      })
    )
  );
}

export async function deleteAnswerBlocks(nodeId: string) {
  return prisma.block.deleteMany({ where: { nodeId } });
}

// ─────────────────────────────────────────────
// AI REQUEST
// ─────────────────────────────────────────────

export async function createAiRequest(data: {
  conversationId: string;
  userId:         string;
  model:          string;
}) {
  return prisma.aiRequest.create({ data });
}

export async function completeAiRequest(id: string, data: {
  nodeId:       string;
  promptTokens: number;
  outputTokens: number;
  durationMs:   number;
}) {
  return prisma.aiRequest.update({
    where: { id },
    data:  { status: 'completed', ...data, completedAt: new Date() },
  });
}

export async function failAiRequest(id: string, error: string) {
  return prisma.aiRequest.update({
    where: { id },
    data:  { status: 'failed', error, completedAt: new Date() },
  });
}

// ─────────────────────────────────────────────
// INTERNAL
// ─────────────────────────────────────────────

type NodeWithBlocks = Awaited<ReturnType<typeof getChildren>>[number];
interface TreeNode extends NodeWithBlocks { children: TreeNode[] }

/**
 * buildForest
 * Converts flat node array into an ordered array of root threads.
 * O(n) — single pass using a Map.
 */
function buildForest(nodes: NodeWithBlocks[]): TreeNode[] {
  if (!nodes.length) return [];

  const map = new Map<string, TreeNode>();
  nodes.forEach((n) => map.set(n.id, { ...n, children: [] }));

  const roots: TreeNode[] = [];

  nodes.forEach((n) => {
    const node = map.get(n.id)!;
    if (!n.parentNodeId) {
      roots.push(node);
    } else {
      map.get(n.parentNodeId)?.children.push(node);
    }
  });

  return roots;
}