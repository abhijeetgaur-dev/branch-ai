// src/data/dummyData.ts
import type { Conversation, Node, Block, User, Workspace } from '../types';

export const currentUser: User = {
  id: 'user-1',
  name: 'Alex Chen',
  email: 'alex@branchai.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
};

const createBlock = (
  id: string,
  nodeId: string,
  type: Block['type'],
  content: string,
  position: number,
  extras?: Partial<Block>
): Block => ({
  id,
  nodeId,
  type,
  content,
  position,
  ...extras,
});

// Deep nested conversation about distributed systems
export const consistentHashingConversation: Conversation = {
  id: 'conv-1',
  title: 'Understanding Consistent Hashing',
  description: 'Deep dive into distributed systems concepts',
  ownerId: 'user-1',
  createdAt: new Date('2024-01-15T10:00:00'),
  updatedAt: new Date('2024-01-15T14:30:00'),
  tags: ['distributed-systems', 'architecture', 'algorithms'],
  isFavorite: true,
  rootNode: {
    id: 'node-1',
    conversationId: 'conv-1',
    parentNodeId: null,
    type: 'question',
    role: 'user',
    content: 'What is consistent hashing and why is it important in distributed systems?',
    depth: 0,
    path: '1',
    createdAt: new Date('2024-01-15T10:00:00'),
    children: [
      {
        id: 'node-2',
        conversationId: 'conv-1',
        parentNodeId: 'node-1',
        type: 'answer',
        role: 'assistant',
        depth: 1,
        path: '1.2',
        createdAt: new Date('2024-01-15T10:00:05'),
        blocks: [
          createBlock('block-1', 'node-2', 'heading', 'What is Consistent Hashing?', 0),
          createBlock('block-2', 'node-2', 'paragraph', 
            'Consistent hashing is a distributed hashing scheme that operates independently of the number of servers or objects in a distributed hash table. It was introduced by Karger et al. in 1997 and has become fundamental to modern distributed systems.',
            1
          ),
          createBlock('block-3', 'node-2', 'heading', 'The Hash Ring Concept', 2, { hasBranch: true }),
          createBlock('block-4', 'node-2', 'paragraph',
            'The key idea is to map both servers and data keys onto a circular hash space (ring). Each server is assigned a position on the ring, and each data key is placed on the ring and assigned to the next server found by moving clockwise.',
            3
          ),
          createBlock('block-5', 'node-2', 'heading', 'Why It Matters', 4),
          createBlock('block-6', 'node-2', 'bullet_list', '', 5, {
            items: [
              'Minimal data redistribution when nodes join or leave',
              'Even distribution of load across nodes',
              'Scalability without major reconfiguration',
              'Foundation for systems like Cassandra, DynamoDB, and CDNs'
            ]
          }),
          createBlock('block-7', 'node-2', 'heading', 'Key Properties', 6, { hasBranch: true }),
          createBlock('block-8', 'node-2', 'paragraph',
            'The algorithm guarantees that when a node is added or removed, only K/n keys need to be remapped on average, where K is the number of keys and n is the number of nodes.',
            7
          ),
          createBlock('block-9', 'node-2', 'code', 
`function getNode(key: string, nodes: Node[]): Node {
  const hash = hashFunction(key);
  const ring = nodes.map(n => ({ node: n, hash: hashFunction(n.id) }))
                    .sort((a, b) => a.hash - b.hash);
  
  for (const entry of ring) {
    if (hash <= entry.hash) return entry.node;
  }
  return ring[0].node; // Wrap around
}`,
            8,
            { language: 'typescript' }
          ),
          createBlock('block-10', 'node-2', 'callout',
            'Pro tip: In production, virtual nodes (vnodes) are used to ensure more even distribution and better fault tolerance.',
            9,
            { calloutType: 'info' }
          ),
        ],
        children: [
          // Branch from "Hash Ring Concept"
          {
            id: 'node-3',
            conversationId: 'conv-1',
            parentNodeId: 'node-2',
            parentBlockId: 'block-3',
            type: 'question',
            role: 'user',
            content: 'Can you explain the hash ring visualization in more detail?',
            depth: 2,
            path: '1.2.3',
            createdAt: new Date('2024-01-15T10:05:00'),
            children: [
              {
                id: 'node-4',
                conversationId: 'conv-1',
                parentNodeId: 'node-3',
                type: 'answer',
                role: 'assistant',
                depth: 3,
                path: '1.2.3.4',
                createdAt: new Date('2024-01-15T10:05:05'),
                blocks: [
                  createBlock('block-11', 'node-4', 'heading', 'Visualizing the Hash Ring', 0),
                  createBlock('block-12', 'node-4', 'paragraph',
                    'Imagine a circle with positions from 0 to 2³² - 1 (using a 32-bit hash function). This represents all possible hash values arranged in a continuous ring.',
                    1
                  ),
                  createBlock('block-13', 'node-4', 'heading', 'How Nodes Are Placed', 2, { hasBranch: true }),
                  createBlock('block-14', 'node-4', 'paragraph',
                    'Each server is hashed (usually by IP or hostname) to get a position on the ring. For example, if we hash "server-1.example.com", we might get position 42,000,000.',
                    3
                  ),
                  createBlock('block-15', 'node-4', 'code',
`Ring visualization:
                    0
                    │
         Server C ──┼── Server A
              \\     │     /
               \\    │    /
                \\   │   /
       ──────────\\──┼──/──────────
                  \\ │ /
                   \\│/
                    ●
                 2³² - 1
                 
Data key "user:123" hashes to position X
→ Walk clockwise → Find Server A
→ Server A owns this key`,
                    4,
                    { language: 'text' }
                  ),
                  createBlock('block-16', 'node-4', 'heading', 'Key Lookup Process', 5),
                  createBlock('block-17', 'node-4', 'numbered_list', '', 6, {
                    items: [
                      'Hash the key to get a position on the ring',
                      'Start at that position and move clockwise',
                      'The first server you encounter owns this key',
                      'If you reach the end, wrap around to the beginning'
                    ]
                  }),
                ],
                children: [
                  // Deeper branch
                  {
                    id: 'node-7',
                    conversationId: 'conv-1',
                    parentNodeId: 'node-4',
                    parentBlockId: 'block-13',
                    type: 'question',
                    role: 'user',
                    content: 'What happens when a node fails or is removed?',
                    depth: 4,
                    path: '1.2.3.4.7',
                    createdAt: new Date('2024-01-15T10:15:00'),
                    children: [
                      {
                        id: 'node-8',
                        conversationId: 'conv-1',
                        parentNodeId: 'node-7',
                        type: 'answer',
                        role: 'assistant',
                        depth: 5,
                        path: '1.2.3.4.7.8',
                        createdAt: new Date('2024-01-15T10:15:05'),
                        blocks: [
                          createBlock('block-22', 'node-8', 'heading', 'Node Failure Handling', 0),
                          createBlock('block-23', 'node-8', 'paragraph',
                            'When a node fails, only the keys that were assigned to that specific node need to be redistributed. The keys simply "fall through" to the next node in the clockwise direction.',
                            1
                          ),
                          createBlock('block-24', 'node-8', 'callout',
                            'This is the magic of consistent hashing: node failures only affect K/n keys on average, not all keys!',
                            2,
                            { calloutType: 'success' }
                          ),
                          createBlock('block-25', 'node-8', 'code',
`Before failure:
[Server A] ← owns keys in range (C, A]
[Server B] ← owns keys in range (A, B]
[Server C] ← owns keys in range (B, C]

After Server B fails:
[Server A] ← owns keys in range (C, A]
[Server C] ← owns keys in range (A, C] ← absorbed B's keys

Only keys from (A, B] moved!`,
                            3,
                            { language: 'text' }
                          ),
                        ],
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // Branch from "Key Properties"
          {
            id: 'node-5',
            conversationId: 'conv-1',
            parentNodeId: 'node-2',
            parentBlockId: 'block-7',
            type: 'question',
            role: 'user',
            content: 'What are virtual nodes and why are they needed?',
            depth: 2,
            path: '1.2.5',
            createdAt: new Date('2024-01-15T10:10:00'),
            children: [
              {
                id: 'node-6',
                conversationId: 'conv-1',
                parentNodeId: 'node-5',
                type: 'answer',
                role: 'assistant',
                depth: 3,
                path: '1.2.5.6',
                createdAt: new Date('2024-01-15T10:10:05'),
                blocks: [
                  createBlock('block-18', 'node-6', 'heading', 'Virtual Nodes (VNodes)', 0),
                  createBlock('block-19', 'node-6', 'paragraph',
                    'Virtual nodes solve the problem of uneven distribution. Instead of one position per physical server, each server gets multiple positions (virtual nodes) on the ring.',
                    1
                  ),
                  createBlock('block-20', 'node-6', 'heading', 'Benefits of Virtual Nodes', 2),
                  createBlock('block-21', 'node-6', 'bullet_list', '', 3, {
                    items: [
                      'More even load distribution across physical servers',
                      'Heterogeneous hardware support (more powerful servers get more vnodes)',
                      'Smoother rebalancing when nodes join/leave',
                      'Reduced hotspot probability'
                    ]
                  }),
                  createBlock('block-26', 'node-6', 'code',
`// Instead of 1 position per server:
Server A → position 1000

// Use multiple virtual nodes:
Server A → [position 1000, 25000, 50000, 75000]

// This spreads Server A's responsibility across the ring`,
                    4,
                    { language: 'typescript' }
                  ),
                  createBlock('block-27', 'node-6', 'callout',
                    'Cassandra uses 256 virtual nodes per physical node by default. DynamoDB uses a similar approach.',
                    5,
                    { calloutType: 'info' }
                  ),
                ],
                children: [],
              },
            ],
          },
        ],
      },
    ],
  },
};

// Second conversation
export const reactPatternsConversation: Conversation = {
  id: 'conv-2',
  title: 'React Design Patterns',
  description: 'Advanced React patterns and best practices',
  ownerId: 'user-1',
  createdAt: new Date('2024-01-14T09:00:00'),
  updatedAt: new Date('2024-01-14T12:00:00'),
  tags: ['react', 'frontend', 'patterns'],
  isFavorite: false,
  rootNode: {
    id: 'node-20',
    conversationId: 'conv-2',
    parentNodeId: null,
    type: 'question',
    role: 'user',
    content: 'What are the most important React design patterns I should know?',
    depth: 0,
    path: '1',
    createdAt: new Date('2024-01-14T09:00:00'),
    children: [
      {
        id: 'node-21',
        conversationId: 'conv-2',
        parentNodeId: 'node-20',
        type: 'answer',
        role: 'assistant',
        depth: 1,
        path: '1.2',
        createdAt: new Date('2024-01-14T09:00:05'),
        blocks: [
          createBlock('block-30', 'node-21', 'heading', 'Essential React Design Patterns', 0),
          createBlock('block-31', 'node-21', 'paragraph',
            'React patterns help you write more maintainable, reusable, and scalable code. Here are the most important ones every React developer should master.',
            1
          ),
          createBlock('block-32', 'node-21', 'heading', 'Compound Components', 2, { hasBranch: true }),
          createBlock('block-33', 'node-21', 'paragraph',
            'This pattern allows components to communicate implicitly while giving users flexible control over rendering.',
            3
          ),
          createBlock('block-34', 'node-21', 'heading', 'Render Props', 4, { hasBranch: true }),
          createBlock('block-35', 'node-21', 'paragraph',
            'A technique for sharing code between components using a prop whose value is a function.',
            5
          ),
          createBlock('block-36', 'node-21', 'heading', 'Custom Hooks', 6),
          createBlock('block-37', 'node-21', 'paragraph',
            'Extract component logic into reusable functions. This is now the primary way to share stateful logic.',
            7
          ),
        ],
        children: [],
      },
    ],
  },
};

// Third conversation
export const systemDesignConversation: Conversation = {
  id: 'conv-3',
  title: 'Designing a URL Shortener',
  description: 'System design interview prep',
  ownerId: 'user-1',
  createdAt: new Date('2024-01-13T14:00:00'),
  updatedAt: new Date('2024-01-13T16:00:00'),
  tags: ['system-design', 'interview'],
  isFavorite: true,
  rootNode: {
    id: 'node-30',
    conversationId: 'conv-3',
    parentNodeId: null,
    type: 'question',
    role: 'user',
    content: 'How would you design a URL shortening service like bit.ly?',
    depth: 0,
    path: '1',
    createdAt: new Date('2024-01-13T14:00:00'),
    children: [],
  },
};

export const allConversations: Conversation[] = [
  consistentHashingConversation,
  reactPatternsConversation,
  systemDesignConversation,
];

export const workspace: Workspace = {
  id: 'ws-1',
  name: 'Personal Research',
  conversations: allConversations,
};