export function chunkText(text: string, maxChunkSize = 1000, overlap = 200): string[] {
  // A simple chunking function that splits by logical boundaries (paragraphs, then sentences)
  // To keep it simple, we'll split by newlines, measure lengths, and group.
  const paragraphs = text.split(/\n\s*\n/);
  const chunks: string[] = [];
  
  let currentChunk = '';
  
  for (const p of paragraphs) {
    if ((currentChunk.length + p.length) > maxChunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      // Handle overlap by keeping the last part of the current chunk
      const overlapStart = Math.max(0, currentChunk.length - overlap);
      currentChunk = currentChunk.slice(overlapStart) + '\n\n' + p;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + p;
    }
    
    // If a single paragraph is larger than maxChunkSize, we should split it further
    // (Simplification for MVP: just push it if it got too large)
    if (currentChunk.length > maxChunkSize * 1.5) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
    }
  }
  
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks.filter(c => c.length > 0);
}
