// apps/web/src/lib/api.ts
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

let _getToken: (() => Promise<string | null>) | null = null;

export function setTokenGetter(fn: () => Promise<string | null>) {
  _getToken = fn;
  (api as any)._hackyGetToken = fn;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (_getToken) {
    const token = await _getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  let res: Response;
  try {
    res = await fetch(`${BASE_URL}${path}`, { headers, ...options });
  } catch {
    throw new Error(`Network error — is the API running at ${BASE_URL}?`);
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    let message: string;
    if (typeof body.error === 'string') {
      message = body.error;
    } else if (body.error && typeof body.error === 'object') {
      const fieldErrors = Object.entries(body.error.fieldErrors ?? {})
        .map(([f, m]) => `${f}: ${(m as string[]).join(', ')}`).join(' · ');
      const formErrors = (body.error.formErrors ?? []).join(' · ');
      message = [fieldErrors, formErrors].filter(Boolean).join(' · ')
        || `Request failed (${res.status})`;
    } else {
      message = `Request failed: ${res.status} ${path}`;
    }
    throw new Error(message);
  }
  if (res.status === 204) return null as T;
  return res.json();
}

export const api = {
  conversations: {
    list:    ()                                    => request<ConversationSummary[]>('/api/conversations'),
    // Now returns TreeNode[] — an array of root threads
    getTree: (id: string)                          => request<TreeNode[]>(`/api/conversations/${id}/tree`),
    create:  (data: CreateConversationPayload)     =>
      request<Conversation>('/api/conversations', { method: 'POST', body: JSON.stringify(data) }),
    rename:  (id: string, title: string)           =>
      request<Conversation>(`/api/conversations/${id}`, { method: 'PATCH', body: JSON.stringify({ title }) }),
    toggleFavorite: (id: string, isFavorite: boolean) =>
      request<Conversation>(`/api/conversations/${id}/favorite`, { method: 'PATCH', body: JSON.stringify({ isFavorite }) }),
    delete:  (id: string)                          => request<null>(`/api/conversations/${id}`, { method: 'DELETE' }),
  },

  nodes: {
    delete: (nodeId: string) =>
      request<null>(`/api/nodes/${nodeId}`, { method: 'DELETE' }),

    updateContent: (nodeId: string, data: {
      content:        string;
      conversationId: string;
      answerNodeId:   string;
    }) =>
      request<{ blocks: ApiBlock[] }>(`/api/nodes/${nodeId}/content`, {
        method: 'PATCH',
        body:   JSON.stringify(data),
      }),

    reorder: (orderedNodeIds: string[]) =>
      request<{ ok: boolean }>('/api/nodes/reorder', {
        method: 'PATCH',
        body:   JSON.stringify({ orderedNodeIds }),
      }),
  },

  ai: {
    branch: (data: BranchPayload) =>
      request<BranchResponse>('/api/ai/branch', { method: 'POST', body: JSON.stringify(data) }),
  },

  documents: {
    list:   (conversationId?: string) => {
      const query = conversationId ? `?conversationId=${encodeURIComponent(conversationId)}` : '';
      return request<DocumentSummary[]>(`/api/documents${query}`);
    },
    delete: (id: string) => request<null>(`/api/documents/${id}`, { method: 'DELETE' }),
    upload: async (file: File, conversationId?: string) => {
      // Create custom logic for File since `request` wrapper enforces JSON and content type manually.
      
      const formData = new FormData();
      if (conversationId) formData.append('conversationId', conversationId);
      formData.append('file', file);

      
      const headers: Record<string, string> = {};
      const token = await (api as any)._hackyGetToken?.();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BASE_URL}/api/documents`, {
        method: 'POST',
        headers,
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      return res.json();
    }
  },

  intelligence: {
    getRelated: (nodeId: string) =>
      request<{ related: RelatedNode[] }>(`/api/intelligence/related?nodeId=${encodeURIComponent(nodeId)}`),
    summarize: (nodeId: string) =>
      request<{ summary: string }>(`/api/intelligence/summarize/${encodeURIComponent(nodeId)}`, { method: 'POST' }),
    getGraph: () =>
      request<GraphData>('/api/intelligence/graph'),
  },
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface CreateConversationPayload {
  title:        string;
  description?: string;
  workspaceId?: string;
  tags?:        string[];
}

export interface BranchPayload {
  conversationId: string;
  parentNodeId:   string | null;  // null = new root thread
  parentBlockId:  string | null;
  question:       string;
}

export interface BranchResponse {
  questionNode: TreeNode;
  answerNode:   TreeNode;
  suggestions?: string[];
}

export interface ConversationSummary {
  id: string; title: string; description: string | null;
  tags: string[]; isFavorite: boolean; createdAt: string; updatedAt: string;
  _count: { nodes: number };
}

export interface Conversation extends ConversationSummary {
  ownerId: string; workspaceId: string | null;
}

export interface BlockItem {
  id: string; content: string; position: number;
}

export interface ApiBlock {
  id: string; nodeId: string; type: string; content: string; position: number;
  language: string | null; calloutType: string | null; items: BlockItem[];
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
  position:       number;
  isCollapsed:    boolean;
  summarySnapshot?: string | null;
  createdAt:      string;
  blocks:         ApiBlock[];
  children:       TreeNode[];
}

export interface DocumentSummary {
  id: string;
  title: string;
  url: string | null;
  createdAt: string;
}

export interface RelatedNode {
  nodeId:            string;
  similarity:        number;
  questionContent:   string | null;
  questionNodeId:    string | null;
  conversationId:    string;
  conversationTitle: string;
}

export interface GraphNode {
  id: string;
  label: string;
  conversationId: string;
  conversationTitle: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}