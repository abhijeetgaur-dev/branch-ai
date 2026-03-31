// apps/api/src/ai/providers/openai.ts
// OpenAI provider — uses the official openai npm SDK.
// Drop-in replacement for the Groq provider.

import OpenAI from 'openai';
import type { AiProvider, AiCompletionRequest, AiCompletionResponse } from '../types';

export class OpenAiProvider implements AiProvider {
  private client: OpenAI;

  constructor() {
    const apiKey = process.env.OPEN_AI_API_KEY;
    if (!apiKey) throw new Error('OPEN_AI_API_KEY is not set in environment');

    this.client = new OpenAI({ apiKey });
  }

  async complete(request: AiCompletionRequest): Promise<AiCompletionResponse> {
    const start = Date.now();

    const response = await this.client.chat.completions.create({
      model:       request.model,
      messages:    request.messages as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens:  request.maxTokens  ?? 2048,
      temperature: request.temperature ?? 0.7,
    });

    const choice = response.choices[0];
    if (!choice?.message?.content) {
      throw new Error('OpenAI returned an empty response');
    }

    return {
      content:      choice.message.content,
      promptTokens: response.usage?.prompt_tokens     ?? 0,
      outputTokens: response.usage?.completion_tokens ?? 0,
      durationMs:   Date.now() - start,
    };
  }
}
