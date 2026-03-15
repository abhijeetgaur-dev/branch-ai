// apps/api/src/ai/providers/index.ts
// Factory that returns the configured provider.
//
// To switch providers:
//   1. Set AI_PROVIDER=openai in .env
//   2. Create apps/api/src/ai/providers/openai.ts implementing AiProvider
//   3. Register it below — nothing else changes
//
// Current supported values for AI_PROVIDER: groq

import type { AiProvider } from '../types';
import { GroqProvider } from './groq';

type ProviderName = 'groq'; // extend this union as you add providers

// Singleton — one provider instance for the lifetime of the process
let _provider: AiProvider | null = null;

export function getProvider(): AiProvider {
  if (_provider) return _provider;

  const name = (process.env.AI_PROVIDER ?? 'groq') as ProviderName;

  switch (name) {
    case 'groq':
      _provider = new GroqProvider();
      break;

    // Future providers — uncomment and implement:
    // case 'openai':
    //   _provider = new OpenAiProvider();
    //   break;
    // case 'anthropic':
    //   _provider = new AnthropicProvider();
    //   break;

    default:
      throw new Error(
        `Unknown AI provider: "${name}". ` +
        `Set AI_PROVIDER to a supported value in .env`
      );
  }

  return _provider;
}

export function getModel(): string {
  return process.env.AI_MODEL ?? 'llama-3.3-70b-versatile';
}