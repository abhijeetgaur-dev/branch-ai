// apps/api/src/ai/providers/groq.ts
// Groq provider — uses Llama 3.3 70B by default.
// Groq's API is OpenAI-compatible so the SDK is familiar.

import Groq from 'groq-sdk';
import type { AiProvider, AiCompletionRequest, AiCompletionResponse } from '../types';

export class GroqProvider implements AiProvider {
  private client: Groq;

  constructor() {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error('GROQ_API_KEY is not set in environment');

    this.client = new Groq({ apiKey });
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const start = Date.now();

    const response = await this.client.chat.completions.create({
      model:       request.model,
      messages:    request.messages,
      max_tokens:  request.maxTokens  ?? 2048,
      temperature: request.temperature ?? 0.7,
    });

    const choice = response.choices[0];
    if (!choice?.message?.content) {
      throw new Error('Groq returned an empty response');
    }

    return {
      content:      choice.message.content,
      promptTokens: response.usage?.prompt_tokens     ?? 0,
      outputTokens: response.usage?.completion_tokens ?? 0,
      durationMs:   Date.now() - start,
    };
  }
}