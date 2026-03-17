// apps/web/src/store/conversationStore.ts
import { create } from 'zustand';
import { api }    from '../lib/api';
import type { ConversationSummary, TreeNode, BranchPayload } from '../lib/api';

interface ConversationStore {
  conversations:        ConversationSummary[];
  activeConversationId: string | null;
  activeTree:           TreeNode | null;
  activeNodeId:         string | null;
  isLoadingList:        boolean;
  isLoadingTree:        boolean;
  isBranching:          boolean;
  error:                string | null;

  fetchConversations:  () => Promise<void>;
  selectConversation:  (id: string) => Promise<void>;
  setActiveNodeId:     (id: string | null) => void;
  createBranch:        (payload: BranchPayload) => Promise<void>;
  createConversation:  (title: string) => Promise<void>;
  toggleFavorite:      (id: string) => Promise<void>;
  deleteConversation:  (id: string) => Promise<void>;
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
  error:                null,

  fetchConversations: async () => {
    if (get().isLoadingList) return;
    console.log('[store] fetchConversations — starting');
    set({ isLoadingList: true, error: null });
    try {
      const conversations = await api.conversations.list();
      console.log('[store] fetchConversations — got', conversations.length);
      set({ conversations, isLoadingList: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[store] fetchConversations FAILED:', message);
      set({ error: message, isLoadingList: false });
    }
  },

  selectConversation: async (id: string) => {
    console.log('[store] selectConversation', id);
    set({ activeConversationId: id, isLoadingTree: true, activeTree: null, error: null });
    try {
      const tree = await api.conversations.getTree(id);
      console.log('[store] selectConversation — got tree');
      set({ activeTree: tree, isLoadingTree: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      // A 404 "no nodes" is not a real error — it just means
      // the conversation is empty and the user needs to ask the first question.
      if (message.includes('no nodes') || message.includes('not found') || message.includes('404')) {
        console.log('[store] selectConversation — conversation is empty, ready for first question');
        set({ activeTree: null, isLoadingTree: false, error: null });
      } else {
        console.error('[store] selectConversation FAILED:', message);
        set({ error: message, isLoadingTree: false });
      }
    }
  },

  setActiveNodeId: (id) => set({ activeNodeId: id }),

  createBranch: async (payload: BranchPayload) => {
    console.log('[store] createBranch');
    set({ isBranching: true, error: null });
    try {
      const { questionNode, answerNode } = await api.ai.branch(payload);
      set((state) => {
        if (!state.activeTree) {
          // First question in this conversation — the question node IS the root
          return {
            activeTree: {
              ...questionNode,
              children: [{ ...answerNode, children: [] }],
            },
            isBranching: false,
          };
        }
        return {
          activeTree: insertNodes(
            state.activeTree,
            payload.parentNodeId,
            questionNode,
            answerNode
          ),
          isBranching: false,
        };
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[store] createBranch FAILED:', message);
      set({ error: message, isBranching: false });
    }
  },

  createConversation: async (title: string) => {
    console.log('[store] createConversation:', title);
    try {
      const conversation = await api.conversations.create({ title });
      console.log('[store] createConversation — created:', conversation.id);
      set((state) => ({
        conversations:        [conversation, ...state.conversations],
        activeConversationId: conversation.id,
        // Don't load the tree — it's empty, show the first-question UI instead
        activeTree:           null,
        isLoadingTree:        false,
        error:                null,
      }));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('[store] createConversation FAILED:', message);
      set({ error: message });
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

  clearError: () => set({ error: null }),
}));

function insertNodes(
  tree:         TreeNode,
  parentNodeId: string | null,
  questionNode: TreeNode,
  answerNode:   TreeNode
): TreeNode {
  const questionWithAnswer: TreeNode = {
    ...questionNode,
    children: [{ ...answerNode, children: [] }],
  };
  if (!parentNodeId || tree.id === parentNodeId) {
    return { ...tree, children: [...(tree.children ?? []), questionWithAnswer] };
  }
  return {
    ...tree,
    children: (tree.children ?? []).map((child) =>
      insertNodes(child, parentNodeId, questionNode, answerNode)
    ),
  };
}