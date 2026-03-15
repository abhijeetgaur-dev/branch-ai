// packages/database/src/index.ts
// Public API of the database package.
// The API and any future packages import from here — never from queries.ts directly.

export { prisma } from './client';

export {
  // Conversation
  createConversation,
  getConversationsByOwner,
  getConversationById,
  toggleFavorite,
  deleteConversation,

  // Node
  createNode,
  getConversationTree,
  getNodePath,
  getChildren,
  toggleNodeCollapsed,

  // Block
  createBlocks,

  // AI Request
  createAiRequest,
  completeAiRequest,
  failAiRequest,
} from './queries';

// Re-export Prisma types the rest of the app needs
export type {
  Conversation,
  Node,
  Block,
  BlockItem,
  AiRequest,
  User,
  Workspace,
  NodeType,
  Role,
  BlockType,
  CalloutType,
  AiRequestStatus,
} from '../generated';  