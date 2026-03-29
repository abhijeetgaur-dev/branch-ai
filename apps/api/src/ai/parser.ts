// apps/api/src/ai/parser.ts
// Parses the AI's raw string response into a validated AiStructuredResponse.
// Handles the common failure modes: markdown fences, extra text, malformed JSON.

import { z } from 'zod';
import type { AiStructuredResponse } from './types';

// ─────────────────────────────────────────────
// Zod schema — validates the AI output
// ─────────────────────────────────────────────

const AiBlockSchema = z.discriminatedUnion('type', [
  z.object({
    type:    z.literal('heading'),
    content: z.string().min(1),
  }),
  z.object({
    type:    z.literal('paragraph'),
    content: z.string().min(1),
  }),
  z.object({
    type:     z.literal('code'),
    content:  z.string(),
    language: z.string().optional().default('text'),
  }),
  z.object({
    type:  z.literal('bullet_list'),
    items: z.array(z.string()).min(1),
  }),
  z.object({
    type:  z.literal('numbered_list'),
    items: z.array(z.string()).min(1),
  }),
  z.object({
    type:        z.literal('callout'),
    content:     z.string().min(1),
    calloutType: z.enum(['info', 'warning', 'success', 'error']).default('info'),
  }),
  z.object({
    type:    z.literal('quote'),
    content: z.string().min(1),
  }),
]);

const AiResponseSchema = z.object({
  blocks:      z.array(AiBlockSchema).min(1),
  suggestions: z.array(z.string()).min(1),
});

// ─────────────────────────────────────────────
// Parser
// ─────────────────────────────────────────────

export function parseAiResponse(raw: string): AiStructuredResponse {
  // Step 1: Strip markdown code fences if the model wrapped the JSON
  let cleaned = raw.trim();

  const fenceMatch = cleaned.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenceMatch) {
    cleaned = fenceMatch[1].trim();
  }

  // Step 2: Extract the first JSON object if there's surrounding text
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error(`AI response contains no JSON object.\nRaw: ${raw.slice(0, 200)}`);
  }

  // Step 3: Parse
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonMatch[0]);
  } catch {
    throw new Error(`AI response is not valid JSON.\nRaw: ${raw.slice(0, 200)}`);
  }

  // Step 4: Validate shape
  const result = AiResponseSchema.safeParse(parsed);
  if (!result.success) {
    throw new Error(
      `AI response failed validation: ${result.error.message}\nRaw: ${raw.slice(0, 200)}`
    );
  }

  return result.data as AiStructuredResponse;
}

// ─────────────────────────────────────────────
// Fallback — used when parsing fails completely
// Returns a single error block so the UI never crashes
// ─────────────────────────────────────────────

export function fallbackResponse(error: string): AiStructuredResponse {
  return {
    blocks: [
      {
        type:    'heading',
        content: 'Something went wrong',
      },
      {
        type:    'callout',
        content: `The AI returned an unexpected response. Please try again. (${error})`,
        calloutType: 'error',
      },
    ],
    suggestions: [
      'Try rephrasing the question',
      'Check if the concept is within my knowledge base',
      'Try asking a simpler follow-up'
    ]
  };
}