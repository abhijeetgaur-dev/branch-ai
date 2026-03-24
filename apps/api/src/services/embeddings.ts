import { pipeline, env } from '@xenova/transformers';

// Optionally disable local models caching if it causes issues, but usually fine
// env.allowLocalModels = false;

let extractor: any = null;

export async function getEmbeddingExtractor() {
  if (!extractor) {
    // all-MiniLM-L6-v2 outputs a 384-dimensional vector
    extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true, // run faster with quantized model
    });
  }
  return extractor;
}

export async function generateEmbeddings(text: string): Promise<number[]> {
  const ex = await getEmbeddingExtractor();
  // Generate embeddings, normalize and return as standard JS array
  const output = await ex(text, { pooling: 'mean', normalize: true });
  return Array.from(output.data);
}

// Utility to calculate cosine similarity since we are using standard Float[] arrays
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (normA === 0 || normB === 0) return 0;
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}
