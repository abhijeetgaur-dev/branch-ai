// packages/database/src/queries.ts
// All tree queries for BranchAI. Every function here maps to a product operation.

import { prisma } from './client';
import type { NodeType, Role, BlockType, CalloutType } from '../generated';

// ─────────────────────────────────────────────
// TYPES  (inputs — keep these lean)
// ─────────────────────────────────────────────

export interface CreateConversationInput {
  title: string;
  description?: string;
  ownerId: string;
  workspaceId?: string;
  tags?: string[];
}

export interface CreateNodeInput {
  conversationId: string;
  parentNodeId: string | null;
  parentBlockId: string | null;  // null = general follow-up, string = inline branch
  createdById: string;
  type: NodeType;
  role: Role;
  content?: string;              // only for question nodes
}

export interface CreateBlockInput {
  nodeId: string;
  type: BlockType;
  content?: string;
  position: number;
  language?: string;
  calloutType?: CalloutType;
  items?: string[];              // for bullet_list / numbered_list
}

// ─────────────────────────────────────────────
// CONVERSATION QUERIES
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
      id:          true,
      title:       true,
      description: true,
      tags:        true,
      isFavorite:  true,
      createdAt:   true,
      updatedAt:   true,
      // Count of root-level questions as a preview stat
      _count: { select: { nodes: true } },
    },
  });
}

export async function getConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
    include: {
      owner: { select: { id: true, name: true, avatar: true } },
    },
  });
}

export async function toggleFavorite(id: string, isFavorite: boolean) {
  return prisma.conversation.update({
    where: { id },
    data:  { isFavorite },
  });
}

export async function deleteConversation(id: string) {
  // Cascade deletes nodes → blocks → block_items via schema relations
  return prisma.conversation.delete({ where: { id } });
}

// ─────────────────────────────────────────────
// NODE QUERIES
// ─────────────────────────────────────────────

export async function createNode(input: CreateNodeInput) {
  // 1. Resolve parent to compute depth and path
  let depth = 0;
  let path  = '';  // filled after node creation with its own id

  if (input.parentNodeId) {
    const parent = await prisma.node.findUniqueOrThrow({
      where:  { id: input.parentNodeId },
      select: { depth: true, path: true },
    });
    depth = parent.depth + 1;
    path  = parent.path; // will append own id below
  }

  // 2. Create node — path is temporary, updated in step 3
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
      path:           'pending', // placeholder
    },
  });

  // 3. Update path now that we have the id
  // Root:    "nodeId"
  // Child:   "parentPath.nodeId"
  const finalPath = path ? `${path}.${node.id}` : node.id;

  return prisma.node.update({
    where: { id: node.id },
    data:  { path: finalPath },
  });
}

/**
 * getConversationTree
 * Returns all nodes for a conversation, flat list.
 * The frontend (or a helper) reconstructs the tree from parentNodeId.
 * This avoids recursive SQL and keeps the query simple and fast.
 */
export async function getConversationTree(conversationId: string) {
  const nodes = await prisma.node.findMany({
    where:   { conversationId },
    orderBy: { createdAt: 'asc' },
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: {
          items: { orderBy: { position: 'asc' } },
        },
      },
    },
  });

  return buildTree(nodes);
}

/**
 * getNodePath
 * Returns all ancestor nodes from root to the given node.
 * Used by the context engine to build AI prompts.
 *
 * The path field stores "a.b.c" — split and fetch all ancestors in one query.
 */
export async function getNodePath(nodeId: string) {
  const node = await prisma.node.findUniqueOrThrow({
    where:  { id: nodeId },
    select: { path: true, conversationId: true },
  });

  // path = "rootId.parentId.nodeId" — all ids are ancestors including self
  const ancestorIds = node.path.split('.');

  const ancestors = await prisma.node.findMany({
    where:   { id: { in: ancestorIds } },
    orderBy: { depth: 'asc' },
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: { items: { orderBy: { position: 'asc' } } },
      },
    },
  });

  return ancestors;
}

/**
 * getChildren
 * Direct children of a node. Used for lazy-loading branches.
 */
export async function getChildren(parentNodeId: string) {
  return prisma.node.findMany({
    where:   { parentNodeId },
    orderBy: { createdAt: 'asc' },
    include: {
      blocks: {
        orderBy: { position: 'asc' },
        include: { items: { orderBy: { position: 'asc' } } },
      },
    },
  });
}

export async function toggleNodeCollapsed(nodeId: string, isCollapsed: boolean) {
  return prisma.node.update({
    where: { id: nodeId },
    data:  { isCollapsed },
  });
}

// ─────────────────────────────────────────────
// BLOCK QUERIES
// ─────────────────────────────────────────────

/**
 * createBlocks
 * Always create all blocks for a node in a single transaction.
 * Avoids partial writes if one block fails.
 */
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
            ? {
                create: b.items.map((text, i) => ({
                  content:  text,
                  position: i,
                })),
              }
            : undefined,
        },
        include: { items: { orderBy: { position: 'asc' } } },
      })
    )
  );
}

// ─────────────────────────────────────────────
// AI REQUEST QUERIES
// ─────────────────────────────────────────────

export async function createAiRequest(data: {
  conversationId: string;
  userId: string;
  model: string;
}) {
  return prisma.aiRequest.create({ data });
}

export async function completeAiRequest(
  id: string,
  data: {
    nodeId: string;
    promptTokens: number;
    outputTokens: number;
    durationMs: number;
  }
) {
  return prisma.aiRequest.update({
    where: { id },
    data: {
      status:       'completed',
      nodeId:       data.nodeId,
      promptTokens: data.promptTokens,
      outputTokens: data.outputTokens,
      durationMs:   data.durationMs,
      completedAt:  new Date(),
    },
  });
}

export async function failAiRequest(id: string, error: string) {
  return prisma.aiRequest.update({
    where: { id },
    data:  { status: 'failed', error, completedAt: new Date() },
  });
}

// ─────────────────────────────────────────────
// INTERNAL HELPERS
// ─────────────────────────────────────────────

type NodeWithBlocks = Awaited<ReturnType<typeof getChildren>>[number];

interface TreeNode extends NodeWithBlocks {
  children: TreeNode[];
}

/**
 * buildTree
 * Converts a flat array of nodes (from DB) into a nested tree.
 * O(n) — single pass with a map.
 */
function buildTree(nodes: NodeWithBlocks[]): TreeNode | null {
  if (nodes.length === 0) return null;

  const map = new Map<string, TreeNode>();

  // First pass — index all nodes
  nodes.forEach((n) => {
    map.set(n.id, { ...n, children: [] });
  });

  let root: TreeNode | null = null;

  // Second pass — attach children to parents
  nodes.forEach((n) => {
    const node = map.get(n.id)!;
    if (n.parentNodeId === null) {
      root = node;
    } else {
      const parent = map.get(n.parentNodeId);
      parent?.children.push(node);
    }
  });

  return root;
}