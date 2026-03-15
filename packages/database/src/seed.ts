// packages/database/src/seed.ts
// Converts the existing dummy data structure into real DB records.
// Run with: pnpm --filter @branch-ai/database db:seed

import { prisma } from './client';
import { createConversation, createNode, createBlocks } from './queries';

async function main() {
  console.log('🌱 Seeding BranchAI database...\n');

  // ── Clean slate ──────────────────────────────────
  await prisma.aiRequest.deleteMany();
  await prisma.blockItem.deleteMany();
  await prisma.block.deleteMany();
  await prisma.node.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.workspaceMember.deleteMany();
  await prisma.workspace.deleteMany();
  await prisma.user.deleteMany();
  console.log('✓ Cleared existing data');

  // ── User ─────────────────────────────────────────
  const user = await prisma.user.create({
    data: {
      email:  'alex@branchai.com',
      name:   'Alex Chen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    },
  });
  console.log(`✓ Created user: ${user.email}`);

  // ── Workspace ────────────────────────────────────
  const workspace = await prisma.workspace.create({
    data: {
      name: 'Personal Research',
      slug: 'personal-research',
      members: {
        create: { userId: user.id, role: 'owner' },
      },
    },
  });
  console.log(`✓ Created workspace: ${workspace.name}`);

  // ── Conversation 1: Consistent Hashing ───────────
  console.log('\n📝 Seeding "Understanding Consistent Hashing"...');

  const conv1 = await createConversation({
    title:       'Understanding Consistent Hashing',
    description: 'Deep dive into distributed systems concepts',
    ownerId:     user.id,
    workspaceId: workspace.id,
    tags:        ['distributed-systems', 'architecture', 'algorithms'],
  });
  await prisma.conversation.update({
    where: { id: conv1.id },
    data:  { isFavorite: true },
  });

  // Root question
  const q1 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   null,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'What is consistent hashing and why is it important in distributed systems?',
  });

  // Root answer (node-2)
  const a1 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   q1.id,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'answer',
    role:           'assistant',
  });

  const a1Blocks = await createBlocks([
    { nodeId: a1.id, type: 'heading',    content: 'What is Consistent Hashing?',           position: 0 },
    { nodeId: a1.id, type: 'paragraph',  content: 'Consistent hashing is a distributed hashing scheme that operates independently of the number of servers or objects in a distributed hash table. It was introduced by Karger et al. in 1997 and has become fundamental to modern distributed systems.', position: 1 },
    { nodeId: a1.id, type: 'heading',    content: 'The Hash Ring Concept',                  position: 2 },
    { nodeId: a1.id, type: 'paragraph',  content: 'The key idea is to map both servers and data keys onto a circular hash space (ring). Each server is assigned a position on the ring, and each data key is placed on the ring and assigned to the next server found by moving clockwise.', position: 3 },
    { nodeId: a1.id, type: 'heading',    content: 'Why It Matters',                         position: 4 },
    {
      nodeId: a1.id, type: 'bullet_list', content: '', position: 5,
      items: [
        'Minimal data redistribution when nodes join or leave',
        'Even distribution of load across nodes',
        'Scalability without major reconfiguration',
        'Foundation for systems like Cassandra, DynamoDB, and CDNs',
      ],
    },
    { nodeId: a1.id, type: 'heading',    content: 'Key Properties', position: 6 },
    { nodeId: a1.id, type: 'paragraph',  content: 'The algorithm guarantees that when a node is added or removed, only K/n keys need to be remapped on average, where K is the number of keys and n is the number of nodes.', position: 7 },
    {
      nodeId: a1.id, type: 'code',
      content: `function getNode(key: string, nodes: Node[]): Node {\n  const hash = hashFunction(key);\n  const ring = nodes.map(n => ({ node: n, hash: hashFunction(n.id) }))\n                    .sort((a, b) => a.hash - b.hash);\n  for (const entry of ring) {\n    if (hash <= entry.hash) return entry.node;\n  }\n  return ring[0].node;\n}`,
      position: 8, language: 'typescript',
    },
    { nodeId: a1.id, type: 'callout', content: 'Pro tip: In production, virtual nodes (vnodes) are used to ensure more even distribution and better fault tolerance.', position: 9, calloutType: 'info' },
  ]);

  // Find the block IDs we need for branching
  const hashRingBlock  = a1Blocks[2]; // "The Hash Ring Concept"
  const keyPropsBlock  = a1Blocks[6]; // "Key Properties"

  // Branch 1: from Hash Ring Concept block
  const q2 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   a1.id,
    parentBlockId:  hashRingBlock.id,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'Can you explain the hash ring visualization in more detail?',
  });

  const a2 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   q2.id,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'answer',
    role:           'assistant',
  });

  const a2Blocks = await createBlocks([
    { nodeId: a2.id, type: 'heading',   content: 'Visualizing the Hash Ring', position: 0 },
    { nodeId: a2.id, type: 'paragraph', content: 'Imagine a circle with positions from 0 to 2³² - 1 (using a 32-bit hash function). This represents all possible hash values arranged in a continuous ring.', position: 1 },
    { nodeId: a2.id, type: 'heading',   content: 'How Nodes Are Placed',      position: 2 },
    { nodeId: a2.id, type: 'paragraph', content: 'Each server is hashed (usually by IP or hostname) to get a position on the ring.', position: 3 },
    { nodeId: a2.id, type: 'heading',   content: 'Key Lookup Process',         position: 4 },
    {
      nodeId: a2.id, type: 'numbered_list', content: '', position: 5,
      items: [
        'Hash the key to get a position on the ring',
        'Start at that position and move clockwise',
        'The first server you encounter owns this key',
        'If you reach the end, wrap around to the beginning',
      ],
    },
  ]);

  // Deep branch: node failure
  const howNodesPlacedBlock = a2Blocks[2];

  const q3 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   a2.id,
    parentBlockId:  howNodesPlacedBlock.id,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'What happens when a node fails or is removed?',
  });

  const a3 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   q3.id,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'answer',
    role:           'assistant',
  });

  await createBlocks([
    { nodeId: a3.id, type: 'heading',   content: 'Node Failure Handling', position: 0 },
    { nodeId: a3.id, type: 'paragraph', content: 'When a node fails, only the keys that were assigned to that specific node need to be redistributed. The keys simply "fall through" to the next node in the clockwise direction.', position: 1 },
    { nodeId: a3.id, type: 'callout',   content: 'This is the magic of consistent hashing: node failures only affect K/n keys on average, not all keys!', position: 2, calloutType: 'success' },
  ]);

  // Branch 2: from Key Properties block (sibling of Branch 1)
  const q4 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   a1.id,
    parentBlockId:  keyPropsBlock.id,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'What are virtual nodes and why are they needed?',
  });

  const a4 = await createNode({
    conversationId: conv1.id,
    parentNodeId:   q4.id,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'answer',
    role:           'assistant',
  });

  await createBlocks([
    { nodeId: a4.id, type: 'heading',   content: 'Virtual Nodes (VNodes)',     position: 0 },
    { nodeId: a4.id, type: 'paragraph', content: 'Virtual nodes solve the problem of uneven distribution. Instead of one position per physical server, each server gets multiple positions on the ring.', position: 1 },
    { nodeId: a4.id, type: 'heading',   content: 'Benefits of Virtual Nodes',  position: 2 },
    {
      nodeId: a4.id, type: 'bullet_list', content: '', position: 3,
      items: [
        'More even load distribution across physical servers',
        'Heterogeneous hardware support',
        'Smoother rebalancing when nodes join/leave',
        'Reduced hotspot probability',
      ],
    },
    { nodeId: a4.id, type: 'callout', content: 'Cassandra uses 256 virtual nodes per physical node by default.', position: 4, calloutType: 'info' },
  ]);

  console.log(`✓ Conversation 1 seeded with ${5} nodes across 2 branches`);

  // ── Conversation 2: React Patterns ───────────────
  console.log('\n📝 Seeding "React Design Patterns"...');

  const conv2 = await createConversation({
    title:       'React Design Patterns',
    description: 'Advanced React patterns and best practices',
    ownerId:     user.id,
    workspaceId: workspace.id,
    tags:        ['react', 'frontend', 'patterns'],
  });

  const q5 = await createNode({
    conversationId: conv2.id,
    parentNodeId:   null,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'What are the most important React design patterns I should know?',
  });

  const a5 = await createNode({
    conversationId: conv2.id,
    parentNodeId:   q5.id,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'answer',
    role:           'assistant',
  });

  await createBlocks([
    { nodeId: a5.id, type: 'heading',   content: 'Essential React Design Patterns', position: 0 },
    { nodeId: a5.id, type: 'paragraph', content: 'React patterns help you write more maintainable, reusable, and scalable code.', position: 1 },
    { nodeId: a5.id, type: 'heading',   content: 'Compound Components', position: 2 },
    { nodeId: a5.id, type: 'paragraph', content: 'This pattern allows components to communicate implicitly while giving users flexible control over rendering.', position: 3 },
    { nodeId: a5.id, type: 'heading',   content: 'Render Props',        position: 4 },
    { nodeId: a5.id, type: 'paragraph', content: 'A technique for sharing code between components using a prop whose value is a function.', position: 5 },
    { nodeId: a5.id, type: 'heading',   content: 'Custom Hooks',        position: 6 },
    { nodeId: a5.id, type: 'paragraph', content: 'Extract component logic into reusable functions. This is now the primary way to share stateful logic.', position: 7 },
  ]);

  console.log(`✓ Conversation 2 seeded`);

  // ── Conversation 3: URL Shortener ────────────────
  console.log('\n📝 Seeding "Designing a URL Shortener"...');

  const conv3 = await createConversation({
    title:       'Designing a URL Shortener',
    description: 'System design interview prep',
    ownerId:     user.id,
    workspaceId: workspace.id,
    tags:        ['system-design', 'interview'],
  });
  await prisma.conversation.update({
    where: { id: conv3.id },
    data:  { isFavorite: true },
  });

  await createNode({
    conversationId: conv3.id,
    parentNodeId:   null,
    parentBlockId:  null,
    createdById:    user.id,
    type:           'question',
    role:           'user',
    content:        'How would you design a URL shortening service like bit.ly?',
  });

  console.log(`✓ Conversation 3 seeded`);

  console.log('\n✅ Seed complete!');
  console.log(`   1 user | 1 workspace | 3 conversations`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect()); 