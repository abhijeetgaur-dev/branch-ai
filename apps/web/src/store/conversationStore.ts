// apps/web/src/store/conversationStore.ts
import { create } from 'zustand';
import { api }    from '../lib/api';
import type { ConversationSummary, TreeNode, BranchPayload, ApiBlock } from '../lib/api';

interface ConversationStore {
  conversations:        ConversationSummary[];
  activeConversationId: string | null;
  // Array of root threads — each is a depth-0 question node
  activeTree:           TreeNode[] | null;
  activeNodeId:         string | null;
  isLoadingList:        boolean;
  isLoadingTree:        boolean;
  isBranching:          boolean;
  isRegenerating:       boolean;
  processingNodeId:     string | null;
  error:                string | null;

  /** Suggestions for each answer node: { nodeId: string[] } */
  nodeSuggestions:      Record<string, string[]>;
  /** IDs of answer nodes that are currently collapsed in the UI */
  collapsedNodeIds:     Set<string>;
  /** IDs of nodes currently generating a summary */
  summarizingNodeIds:   Set<string>;

  fetchConversations:  () => Promise<void>;
  selectConversation:  (id: string) => Promise<void>;
  setActiveNodeId:     (id: string | null) => void;
  createBranch:        (payload: BranchPayload) => Promise<void>;
  createConversation:  (title: string) => Promise<void>;
  renameConversation:  (id: string, title: string) => Promise<void>;
  toggleFavorite:      (id: string) => Promise<void>;
  deleteConversation:  (id: string) => Promise<void>;
  deleteNode:          (nodeId: string) => Promise<void>;
  editQuestion:        (questionNodeId: string, answerNodeId: string, newContent: string) => Promise<void>;
  reorderNodes:        (parentNodeId: string | null, orderedIds: string[]) => Promise<void>;
  toggleNodeCollapse:  (nodeId: string) => void;
  summarizeNode:       (nodeId: string) => Promise<void>;
  clearError:          () => void;
}

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations:        [],
  activeConversationId: null,
  activeTree:           null,
  activeNodeId:         null,
  isLoadingList:        false,
  isLoadingTree:        false,
  isBranching:          false,
  isRegenerating:       false,
  processingNodeId:     null,
  error:                null,

  nodeSuggestions:      {},
  collapsedNodeIds:     new Set(),
  summarizingNodeIds:   new Set(),

  fetchConversations: async () => {
    if (get().isLoadingList) return;
    set({ isLoadingList: true, error: null });
    try {
      const conversations = await api.conversations.list();
      set({ conversations, isLoadingList: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isLoadingList: false });
    }
  },

  selectConversation: async (id: string) => {
    set({ activeConversationId: id, isLoadingTree: true, activeTree: null, error: null });
    try {
      const tree = await api.conversations.getTree(id);
      // tree is TreeNode[] — empty array means no threads yet
      set({ activeTree: tree.length ? tree : [], isLoadingTree: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      if (message.includes('no nodes') || message.includes('not found')) {
        set({ activeTree: [], isLoadingTree: false, error: null });
      } else {
        set({ error: message, isLoadingTree: false });
      }
    }
  },

  setActiveNodeId: (id) => set({ activeNodeId: id }),

  createBranch: async (payload: BranchPayload) => {
    set({ isBranching: true, processingNodeId: payload.parentNodeId, error: null });

    try {
      const { questionNode, answerNode, suggestions } = await api.ai.branch(payload);
      
      if (suggestions?.length) {
        set((state) => ({
          nodeSuggestions: { ...state.nodeSuggestions, [answerNode.id]: suggestions }
        }));
      }
      const questionWithAnswer: TreeNode = {
        ...questionNode,
        children: [{ ...answerNode, children: [] }],
      };

      set((state) => {
        const tree = state.activeTree ?? [];

        // parentNodeId === null → new root thread, append to array
        if (!payload.parentNodeId) {
          return {
            activeTree:  [...tree, questionWithAnswer],
            isBranching: false,
            processingNodeId: null,
          };

        }

        // Otherwise insert into the existing tree
        return {
          activeTree:  insertIntoForest(tree, payload.parentNodeId, questionWithAnswer),
          isBranching: false,
          processingNodeId: null,
        };
      });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isBranching: false, processingNodeId: null });

    }
  },

  createConversation: async (title: string) => {
    try {
      const conversation = await api.conversations.create({ title });
      set((state) => ({
        conversations:        [conversation, ...state.conversations],
        activeConversationId: conversation.id,
        activeTree:           [],  // empty — ready for first question
        isLoadingTree:        false,
        error:                null,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  renameConversation: async (id: string, title: string) => {
    set((state) => ({
      conversations: state.conversations.map((c) => c.id === id ? { ...c, title } : c),
    }));
    try {
      await api.conversations.rename(id, title);
    } catch (err) {
      const conversations = await api.conversations.list().catch(() => get().conversations);
      set({ conversations, error: err instanceof Error ? err.message : String(err) });
    }
  },

  toggleFavorite: async (id: string) => {
    const current = get().conversations.find((c) => c.id === id);
    if (!current) return;
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      ),
    }));
    try {
      await api.conversations.toggleFavorite(id, !current.isFavorite);
    } catch (err) {
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, isFavorite: current.isFavorite } : c
        ),
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  },

  deleteConversation: async (id: string) => {
    try {
      await api.conversations.delete(id);
      set((state) => ({
        conversations:        state.conversations.filter((c) => c.id !== id),
        activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        activeTree:           state.activeConversationId === id ? null : state.activeTree,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  deleteNode: async (nodeId: string) => {
    set((state) => ({
      activeTree: state.activeTree
        ? removeFromForest(state.activeTree, nodeId)
        : null,
    }));
    try {
      await api.nodes.delete(nodeId);
    } catch (err) {
      const id = get().activeConversationId;
      if (id) {
        const tree = await api.conversations.getTree(id).catch(() => null);
        set({ activeTree: tree, error: err instanceof Error ? err.message : String(err) });
      }
    }
  },

  editQuestion: async (questionNodeId: string, answerNodeId: string, newContent: string) => {
    const conversationId = get().activeConversationId;
    if (!conversationId) return;

    set((state) => ({
      activeTree:     state.activeTree
        ? updateContentInForest(state.activeTree, questionNodeId, newContent)
        : null,
      isRegenerating: true,
      error:          null,
    }));

    try {
      const { blocks } = await api.nodes.updateContent(questionNodeId, {
        content: newContent,
        conversationId,
        answerNodeId,
      });
      set((state) => ({
        activeTree:     state.activeTree
          ? replaceBlocksInForest(state.activeTree, answerNodeId, blocks)
          : null,
        isRegenerating: false,
      }));
    } catch (err) {
      set({ error: err instanceof Error ? err.message : String(err), isRegenerating: false });
    }
  },

  reorderNodes: async (parentNodeId: string | null, orderedIds: string[]) => {
    set((state) => ({
      activeTree: state.activeTree
        ? reorderInForest(state.activeTree, parentNodeId, orderedIds)
        : null,
    }));
    try {
      await api.nodes.reorder(orderedIds);
    } catch (err) {
      const id = get().activeConversationId;
      if (id) {
        const tree = await api.conversations.getTree(id).catch(() => null);
        set({ activeTree: tree, error: err instanceof Error ? err.message : String(err) });
      }
    }
  },

  toggleNodeCollapse: (nodeId: string) => {
    set((state) => {
      const next = new Set(state.collapsedNodeIds);
      if (next.has(nodeId)) next.delete(nodeId);
      else next.add(nodeId);
      return { collapsedNodeIds: next };
    });
  },

  summarizeNode: async (nodeId: string) => {
    if (get().summarizingNodeIds.has(nodeId)) return; // prevent duplicate calls
    set((state) => ({
      summarizingNodeIds: new Set(state.summarizingNodeIds).add(nodeId),
    }));

    try {
      const { summary } = await api.intelligence.summarize(nodeId);
      set((state) => {
        const nextSet = new Set(state.summarizingNodeIds);
        nextSet.delete(nodeId);
        return {
          summarizingNodeIds: nextSet,
          activeTree: state.activeTree 
            ? updateSummarySnapshotInForest(state.activeTree, nodeId, summary) 
            : null,
        };
      });
    } catch (err) {
      console.error('Summarize node failed', err);
      set((state) => {
        const nextSet = new Set(state.summarizingNodeIds);
        nextSet.delete(nodeId);
        return { summarizingNodeIds: nextSet };
      });
    }
  },

  clearError: () => set({ error: null }),
}));

// ─────────────────────────────────────────────
// Forest mutation helpers
// All operate on TreeNode[] (the forest)
// ─────────────────────────────────────────────

function insertIntoForest(
  forest:      TreeNode[],
  parentNodeId: string,
  newNode:     TreeNode
): TreeNode[] {
  return forest.map((root) => insertIntoNode(root, parentNodeId, newNode));
}

function insertIntoNode(node: TreeNode, parentNodeId: string, newNode: TreeNode): TreeNode {
  if (node.id === parentNodeId) {
    return { ...node, children: [...(node.children ?? []), newNode] };
  }
  return {
    ...node,
    children: (node.children ?? []).map((c) => insertIntoNode(c, parentNodeId, newNode)),
  };
}

function removeFromForest(forest: TreeNode[], nodeId: string): TreeNode[] {
  return forest
    .filter((root) => root.id !== nodeId)
    .map((root) => removeFromNode(root, nodeId));
}

function removeFromNode(node: TreeNode, nodeId: string): TreeNode {
  return {
    ...node,
    children: (node.children ?? [])
      .filter((c) => c.id !== nodeId)
      .map((c) => removeFromNode(c, nodeId)),
  };
}

function updateContentInForest(forest: TreeNode[], nodeId: string, content: string): TreeNode[] {
  return forest.map((root) => updateContentInNode(root, nodeId, content));
}

function updateContentInNode(node: TreeNode, nodeId: string, content: string): TreeNode {
  if (node.id === nodeId) return { ...node, content };
  return {
    ...node,
    children: (node.children ?? []).map((c) => updateContentInNode(c, nodeId, content)),
  };
}

function updateSummarySnapshotInForest(forest: TreeNode[], nodeId: string, summarySnapshot: string): TreeNode[] {
  return forest.map((root) => updateSummarySnapshotInNode(root, nodeId, summarySnapshot));
}

function updateSummarySnapshotInNode(node: TreeNode, nodeId: string, summarySnapshot: string): TreeNode {
  if (node.id === nodeId) return { ...node, summarySnapshot };
  return {
    ...node,
    children: (node.children ?? []).map((c) => updateSummarySnapshotInNode(c, nodeId, summarySnapshot)),
  };
}

function replaceBlocksInForest(forest: TreeNode[], nodeId: string, blocks: ApiBlock[]): TreeNode[] {
  return forest.map((root) => replaceBlocksInNode(root, nodeId, blocks));
}

function replaceBlocksInNode(node: TreeNode, nodeId: string, blocks: ApiBlock[]): TreeNode {
  if (node.id === nodeId) return { ...node, blocks };
  return {
    ...node,
    children: (node.children ?? []).map((c) => replaceBlocksInNode(c, nodeId, blocks)),
  };
}

function reorderInForest(
  forest:       TreeNode[],
  parentNodeId: string | null,
  orderedIds:   string[]
): TreeNode[] {
  // null = reorder roots themselves
  if (!parentNodeId) {
    return orderedIds
      .map((id) => forest.find((n) => n.id === id))
      .filter((n): n is TreeNode => !!n)
      .map((n, i) => ({ ...n, position: i }));
  }
  return forest.map((root) => reorderInNode(root, parentNodeId, orderedIds));
}

function reorderInNode(
  node:         TreeNode,
  parentNodeId: string,
  orderedIds:   string[]
): TreeNode {
  if (node.id === parentNodeId) {
    const sorted = orderedIds
      .map((id) => node.children?.find((c) => c.id === id))
      .filter((c): c is TreeNode => !!c)
      .map((c, i) => ({ ...c, position: i }));
    return { ...node, children: sorted };
  }
  return {
    ...node,
    children: (node.children ?? []).map((c) => reorderInNode(c, parentNodeId, orderedIds)),
  };
}