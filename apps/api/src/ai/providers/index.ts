// apps/api/src/ai/providers/index.ts
// Factory that returns the configured provider.
//
// To switch providers set AI_PROVIDER in .env:
//   AI_PROVIDER=openai   → uses OpenAI (GPT-4o, etc.)
//   AI_PROVIDER=groq     → uses Groq  (Llama 3.3 70B, etc.)
//
// Also set AI_MODEL to override the default model for the chosen provider.

import type { AiProvider } from '../types';
import { GroqProvider }   from './groq';
import { OpenAiProvider } from './openai';

type ProviderName = 'groq' | 'openai';

// Singleton — one provider instance for the lifetime of the process
let _provider: AiProvider | null = null;

export function getProvider(): AiProvider {
  if (_provider) return _provider;

  const name = (process.env.AI_PROVIDER ?? 'groq') as ProviderName;

  switch (name) {
    case 'groq':
      _provider = new GroqProvider();
      break;

    case 'openai':
      _provider = new OpenAiProvider();
      break;

    // Future providers — uncomment and implement:
    // case 'anthropic':
    //   _provider = new AnthropicProvider();
    //   break;

    default:
      throw new Error(
        `Unknown AI provider: "${name}". ` +
        `Set AI_PROVIDER to a supported value in .env (groq | openai)`
      );
  }

  return _provider;
}

/** Returns the model override from .env, or a sensible default per provider. */
export function getModel(): string {
  if (process.env.AI_MODEL) return process.env.AI_MODEL;

  const name = process.env.AI_PROVIDER ?? 'groq';
  if (name === 'openai') return 'gpt-4o';
  return 'llama-3.3-70b-versatile'; // groq default
}