// packages/database/src/index.ts
export { prisma } from './client';

export {
  createConversation, getConversationsByOwner, getConversationById,
  toggleFavorite, deleteConversation,
  createNode, getConversationTree, getNodePath, getChildren,
  toggleNodeCollapsed, updateNodeContent, updateNodeEmbedding,
  deleteNodeWithChildren, reorderSiblings,
  createBlocks, deleteAnswerBlocks,
  createAiRequest, completeAiRequest, failAiRequest,
  findSimilarNodes, findPathSummary, getGlobalGraphData, updateNodeSummarySnapshot
} from './queries';

export type {
  Conversation, Node, Block, BlockItem, AiRequest,
  User, Workspace, NodeType, Role, BlockType, CalloutType, AiRequestStatus,
} from '../generated';