// src/types/index.ts
export type BlockType = 'heading' | 'paragraph' | 'code' | 'bullet_list' | 'numbered_list' | 'quote' | 'callout';
export type NodeType = 'question' | 'answer';
export type Role = 'user' | 'assistant';
export type CalloutType = 'info' | 'warning' | 'success' | 'error';

export interface Block {
  id: string;
  nodeId: string;
  type: BlockType;
  content: string;
  position: number;
  language?: string; // for code blocks
  calloutType?: CalloutType;
  items?: string[]; // for lists
  hasBranch?: boolean;
  isExpanded?: boolean;
}

export interface Node {
  id: string;
  conversationId: string;
  parentNodeId: string | null;
  parentBlockId?: string | null;
  type: NodeType;
  role: Role;
  content?: string; // for questions
  blocks?: Block[]; // for answers
  depth: number;
  path: string;
  createdAt: Date;
  isCollapsed?: boolean;
  children?: Node[];
}

export interface Conversation {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  rootNode: Node;
  tags?: string[];
  isFavorite?: boolean;
}

export interface TreeItem {
  id: string;
  label: string;
  depth: number;
  type: NodeType;
  hasChildren: boolean;
  isExpanded: boolean;
  path: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  conversations: Conversation[];
}