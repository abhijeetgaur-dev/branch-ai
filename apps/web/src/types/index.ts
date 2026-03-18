// src/types/index.ts

export type BlockType =
  | 'heading' | 'paragraph' | 'code'
  | 'bullet_list' | 'numbered_list' | 'quote' | 'callout';

export type NodeType    = 'question' | 'answer';
export type Role        = 'user' | 'assistant';
export type CalloutType = 'info' | 'warning' | 'success' | 'error';

export interface BlockItem {
  id:       string;
  content:  string;
  position: number;
}

export interface Block {
  id:          string;
  nodeId:      string;
  type:        BlockType;
  content:     string;
  position:    number;
  language:    string | null;
  calloutType: CalloutType | null;
  items:       BlockItem[];
}

export interface Node {
  id:             string;
  conversationId: string;
  parentNodeId:   string | null;
  parentBlockId:  string | null;
  type:           NodeType;
  role:           Role;
  content:        string | null;
  depth:          number;
  path:           string;
  position:       number;
  isCollapsed:    boolean;
  createdAt:      string;
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

// Conversation now holds an array of root threads
export interface Conversation extends ConversationSummary {
  ownerId:     string;
  workspaceId: string | null;
  rootNodes:   Node[];   // was rootNode: Node
}

export interface TreeItem {
  id:          string;
  label:       string;
  depth:       number;
  type:        NodeType;
  hasChildren: boolean;
  isExpanded:  boolean;
  path:        string;
}

export interface User {
  id:     string;
  name:   string;
  email:  string;
  avatar?: string;
}

export interface Workspace {
  id:            string;
  name:          string;
  conversations: ConversationSummary[];
}