// src/types/index.ts
// These types mirror the API response shapes exactly.
// Source of truth is apps/web/src/lib/api.ts — keep in sync.

export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'bullet_list'
  | 'numbered_list'
  | 'quote'
  | 'callout';

export type NodeType    = 'question' | 'answer';
export type Role        = 'user' | 'assistant';
export type CalloutType = 'info' | 'warning' | 'success' | 'error';

// ─────────────────────────────────────────────
// Block item — list entries from the API
// Previously was string[] in dummy data.
// API returns BlockItem[] with {id, content, position}.
// ─────────────────────────────────────────────
export interface BlockItem {
  id:       string;
  content:  string;
  position: number;
}

export interface Block {
  id:          string;
  nodeId:      string;
  type:        BlockType;
  content:     string;          // empty string for list types
  position:    number;
  language:    string | null;
  calloutType: CalloutType | null;
  items:       BlockItem[];     // populated for bullet_list / numbered_list
}

export interface Node {
  id:             string;
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  type:           NodeType;
  role:           Role;
  content:        string | null;  // only for question nodes
  depth:          number;
  path:           string;
  isCollapsed:    boolean;
  createdAt:      string;         // ISO string from API (not Date object)
  blocks:         Block[];
  children:       Node[];
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

// Full conversation with tree — used in ConversationView
export interface Conversation extends ConversationSummary {
  ownerId:     string;
  workspaceId: string | null;
  rootNode:    Node;
}

// ─────────────────────────────────────────────
// Tree sidebar item
// ─────────────────────────────────────────────
export interface TreeItem {
  id:         string;
  label:      string;
  depth:      number;
  type:       NodeType;
  hasChildren: boolean;
  isExpanded: boolean;
  path:       string;
}

export interface User {
  id:     string;
  name:   string;
  email:  string;
  avatar?: string;
}

export interface Workspace {
  id:   string;
  name: string;
  conversations: ConversationSummary[];
}