const { prisma } = require('@branch-ai/database');
const { cosineSimilarity, generateEmbeddings } = require('./src/services/embeddings');

async function test() {
  const chunks = await prisma.documentChunk.findMany();
  if (chunks.length > 0) {
    const e1 = await generateEmbeddings("Who is Abhijeet?");
    const score = cosineSimilarity(e1, chunks[0].embedding);
    console.log(`Similarity to 'Who is Abhijeet?':`, score);

    const e2 = await generateEmbeddings("What is his email address?");
    const score2 = cosineSimilarity(e2, chunks[0].embedding);
    console.log(`Similarity to 'What is his email address?':`, score2);
  }
}
test().finally(() => prisma.$disconnect());
