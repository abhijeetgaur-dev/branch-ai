// apps/api/src/ai/types.ts
// The provider contract. Every AI provider implements this interface.
// Adding a new provider = implement this interface + register in providers/index.ts

export interface AiMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AiCompletionRequest {
  messages: AiMessage[];
  model: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AiCompletionResponse {
  content: string;       // raw string from the model
  promptTokens: number;
  outputTokens: number;
  durationMs: number;
}

// Every provider must implement this
export interface AiProvider {
  complete(request: AiCompletionRequest): Promise<AiCompletionResponse>;
}

// ─────────────────────────────────────────────
// Structured block types returned by the AI
// These map 1:1 to the Block DB model
// ─────────────────────────────────────────────

export type AiBlockType =
  | 'heading'
  | 'paragraph'
  | 'code'
  | 'bullet_list'
  | 'numbered_list'
  | 'quote'
  | 'callout';

export type AiCalloutType = 'info' | 'warning' | 'success' | 'error';

export interface AiBlock {
  type: AiBlockType;
  content?: string;
  language?: string;          // for code blocks
  calloutType?: AiCalloutType; // for callout blocks
  items?: string[];           // for bullet_list / numbered_list
}

export interface AiStructuredResponse {
  blocks:      AiBlock[];
  suggestions: string[];
}