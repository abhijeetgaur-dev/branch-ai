// apps/web/src/lib/api.ts
// Typed API client. All network calls go through here.
// No fetch() calls scattered across components or stores.

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

// ─────────────────────────────────────────────
// Base fetcher
// ─────────────────────────────────────────────

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed: ${res.status} ${path}`);
  }

  // 204 No Content
  if (res.status === 204) return null as T;

  return res.json();
}

// ─────────────────────────────────────────────
// Conversations
// ─────────────────────────────────────────────

export const api = {
  conversations: {
    list: (ownerId: string) =>
      request<ConversationSummary[]>(`/api/conversations?ownerId=${ownerId}`),

    getTree: (id: string) =>
      request<TreeNode>(`/api/conversations/${id}/tree`),

    create: (data: CreateConversationPayload) =>
      request<Conversation>('/api/conversations', {
        method: 'POST',
        body:   JSON.stringify(data),
      }),

    toggleFavorite: (id: string, isFavorite: boolean) =>
      request<Conversation>(`/api/conversations/${id}/favorite`, {
        method: 'PATCH',
        body:   JSON.stringify({ isFavorite }),
      }),

    delete: (id: string) =>
      request<null>(`/api/conversations/${id}`, { method: 'DELETE' }),
  },

  ai: {
    branch: (data: BranchPayload) =>
      request<BranchResponse>('/api/ai/branch', {
        method: 'POST',
        body:   JSON.stringify(data),
      }),
  },
};

// ─────────────────────────────────────────────
// Payload / response types
// These mirror the API's Zod schemas exactly
// ─────────────────────────────────────────────

export interface CreateConversationPayload {
  title:       string;
  description?: string;
  ownerId:     string;
  workspaceId?: string;
  tags?:       string[];
}

export interface BranchPayload {
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  question:       string;
  userId:         string;
}

export interface BranchResponse {
  questionNode: TreeNode;
  answerNode:   TreeNode;
}

// Minimal response shapes (enough for the UI)
export interface ConversationSummary {
  id:          string;
  title:       string;
  description: string | null;
  tags:        string[];
  isFavorite:  boolean;
  createdAt:   string;
  updatedAt:   string;
  _count:      { nodes: number };
}

export interface Conversation extends ConversationSummary {
  ownerId:     string;
  workspaceId: string | null;
}

export interface BlockItem {
  id:       string;
  content:  string;
  position: number;
}

export interface ApiBlock {
  id:          string;
  nodeId:      string;
  type:        string;
  content:     string;
  position:    number;
  language:    string | null;
  calloutType: string | null;
  items:       BlockItem[];
}

export interface TreeNode {
  id:            string;
  conversationId: string;
  parentNodeId:  string | null;
  parentBlockId: string | null;
  type:          'question' | 'answer';
  role:          'user' | 'assistant';
  content:       string | null;
  depth:         number;
  path:          string;
  isCollapsed:   boolean;
  createdAt:     string;
  blocks:        ApiBlock[];
  children:      TreeNode[];
}