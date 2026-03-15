// apps/web/src/store/conversationStore.ts
// Central state for all conversation data.
// Replaces the dummy data + useState in App.tsx.

import { create } from 'zustand';
import { api }    from '../lib/api';
import type {
  ConversationSummary,
  TreeNode,
  BranchPayload,
} from '../lib/api';

// ─────────────────────────────────────────────
// State shape
// ─────────────────────────────────────────────

interface ConversationStore {
  // Data
  conversations:         ConversationSummary[];
  activeConversationId:  string | null;
  activeTree:            TreeNode | null;   // full node tree for active conversation
  activeNodeId:          string | null;     // highlighted node in tree sidebar

  // Loading states
  isLoadingList:   boolean;
  isLoadingTree:   boolean;
  isBranching:     boolean;   // true while AI is generating

  // Error
  error: string | null;

  // Actions
  fetchConversations:    (ownerId: string) => Promise<void>;
  selectConversation:    (id: string) => Promise<void>;
  setActiveNodeId:       (id: string | null) => void;
  createBranch:          (payload: BranchPayload) => Promise<void>;
  createConversation:    (title: string, ownerId: string) => Promise<void>;
  toggleFavorite:        (id: string) => Promise<void>;
  deleteConversation:    (id: string) => Promise<void>;
  clearError:            () => void;
}

// ─────────────────────────────────────────────
// Hardcoded for dev — replace with auth later
// ─────────────────────────────────────────────
const DEV_USER_ID = 'replace-with-real-user-id-after-auth';

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useConversationStore = create<ConversationStore>((set, get) => ({
  conversations:        [],
  activeConversationId: null,
  activeTree:           null,
  activeNodeId:         null,
  isLoadingList:        false,
  isLoadingTree:        false,
  isBranching:          false,
  error:                null,

  // ── Fetch conversation list ──────────────────
  fetchConversations: async (ownerId: string) => {
    set({ isLoadingList: true, error: null });
    try {
      const conversations = await api.conversations.list(ownerId);
      set({ conversations, isLoadingList: false });
    } catch (err) {
      set({ error: String(err), isLoadingList: false });
    }
  },

  // ── Select + load tree ───────────────────────
  selectConversation: async (id: string) => {
    set({ activeConversationId: id, isLoadingTree: true, activeTree: null, error: null });
    try {
      const tree = await api.conversations.getTree(id);
      set({ activeTree: tree, isLoadingTree: false });
    } catch (err) {
      set({ error: String(err), isLoadingTree: false });
    }
  },

  setActiveNodeId: (id) => set({ activeNodeId: id }),

  // ── Core: create a branch (the main product action) ──
  createBranch: async (payload: BranchPayload) => {
    set({ isBranching: true, error: null });
    try {
      const { questionNode, answerNode } = await api.ai.branch(payload);

      // Append the new nodes into the active tree
      set((state) => {
        if (!state.activeTree) return { isBranching: false };

        const updatedTree = insertNodes(
          state.activeTree,
          payload.parentNodeId,
          questionNode,
          answerNode
        );

        return { activeTree: updatedTree, isBranching: false };
      });
    } catch (err) {
      set({ error: String(err), isBranching: false });
    }
  },

  // ── Create new conversation ──────────────────
  createConversation: async (title: string, ownerId: string) => {
    try {
      const conversation = await api.conversations.create({ title, ownerId });
      set((state) => ({
        conversations: [conversation, ...state.conversations],
        activeConversationId: conversation.id,
        activeTree: null,
      }));
    } catch (err) {
      set({ error: String(err) });
    }
  },

  // ── Toggle favorite ──────────────────────────
  toggleFavorite: async (id: string) => {
    const current = get().conversations.find((c) => c.id === id);
    if (!current) return;

    // Optimistic update
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
      ),
    }));

    try {
      await api.conversations.toggleFavorite(id, !current.isFavorite);
    } catch (err) {
      // Revert on failure
      set((state) => ({
        conversations: state.conversations.map((c) =>
          c.id === id ? { ...c, isFavorite: current.isFavorite } : c
        ),
        error: String(err),
      }));
    }
  },

  // ── Delete conversation ──────────────────────
  deleteConversation: async (id: string) => {
    try {
      await api.conversations.delete(id);
      set((state) => ({
        conversations:        state.conversations.filter((c) => c.id !== id),
        activeConversationId: state.activeConversationId === id ? null : state.activeConversationId,
        activeTree:           state.activeConversationId === id ? null : state.activeTree,
      }));
    } catch (err) {
      set({ error: String(err) });
    }
  },

  clearError: () => set({ error: null }),
}));

// ─────────────────────────────────────────────
// Tree mutation helper
// Finds the parent node by id and appends question + answer as children.
// Returns a new tree (immutable update).
// ─────────────────────────────────────────────

function insertNodes(
  tree: TreeNode,
  parentNodeId: string | null,
  questionNode: TreeNode,
  answerNode: TreeNode
): TreeNode {
  // Attach answerNode as child of questionNode
  const questionWithAnswer: TreeNode = {
    ...questionNode,
    children: [{ ...answerNode, children: [] }],
  };

  // Root-level insertion (parentNodeId is null or is the root)
  if (!parentNodeId || tree.id === parentNodeId) {
    return {
      ...tree,
      children: [...(tree.children ?? []), questionWithAnswer],
    };
  }

  // Recursive search
  return {
    ...tree,
    children: (tree.children ?? []).map((child) =>
      insertNodes(child, parentNodeId, questionNode, answerNode)
    ),
  };
}