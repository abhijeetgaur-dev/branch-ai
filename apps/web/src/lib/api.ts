// apps/web/src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

let _getToken: (() => Promise<string | null>) | null = null;

export function setTokenGetter(fn: () => Promise<string | null>) {
  _getToken = fn;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (_getToken) {
    const token = await _getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  console.log(`[api] ${options?.method ?? 'GET'} ${BASE_URL}${path}`);

  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { headers, ...options });
  } catch (networkErr) {
    console.error(`[api] Network error on ${path}:`, networkErr);
    throw new Error(`Network error: could not reach ${BASE_URL}${path}`);
  }

  console.log(`[api] ${options?.method ?? 'GET'} ${path} → ${res.status}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    let message: string;
    if (typeof body.error === 'string') {
      message = body.error;
    } else if (body.error && typeof body.error === 'object') {
      const fieldErrors = Object.entries(body.error.fieldErrors ?? {})
        .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(', ')}`)
        .join(' · ');
      const formErrors = (body.error.formErrors ?? []).join(' · ');
      message = [fieldErrors, formErrors].filter(Boolean).join(' · ')
        || `Request failed (${res.status})`;
    } else {
      message = `Request failed: ${res.status} ${path}`;
    }
    console.error(`[api] Error response on ${path}:`, message);
    throw new Error(message);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

export const api = {
  conversations: {
    list: () =>
      request<ConversationSummary[]>('/api/conversations'),

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

export interface CreateConversationPayload {
  title:        string;
  description?: string;
  workspaceId?: string;
  tags?:        string[];
}

export interface BranchPayload {
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  question:       string;
}

export interface BranchResponse {
  questionNode: TreeNode;
  answerNode:   TreeNode;
}

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
  id:             string;
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  type:           'question' | 'answer';
  role:           'user' | 'assistant';
  content:        string | null;
  depth:          number;
  path:           string;
  isCollapsed:    boolean;
  createdAt:      string;
  blocks:         ApiBlock[];
  children:       TreeNode[];
}