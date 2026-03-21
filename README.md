# BranchAI

**Explore ideas without losing context.**

BranchAI is a non-linear AI conversation platform where answers are structured, expandable, and branchable. Instead of scrolling through a flat chat history, every conversation is a navigable knowledge tree — branch from any section, collapse what you don't need, and rearrange threads to match how you actually think.

---

## Why BranchAI

Every AI chat interface works the same way: you ask, it answers, you scroll. The deeper you go, the more you lose track of where you started.

BranchAI treats conversations as trees, not timelines. Ask a question, get a structured answer broken into sections, then branch from any specific section to go deeper — without losing the context of the original thread. Multiple root-level threads live in the same conversation. Drag to reorder them. Collapse branches you're done with. Navigate the whole structure from the sidebar.

---

## Features

- **Structured AI answers** — every response is broken into typed blocks: headings, paragraphs, code, lists, callouts, and quotes
- **Inline branching** — click any section heading to ask a follow-up right there, creating a branch at that exact point
- **Multiple root threads** — the bottom bar starts new top-level threads in the same conversation
- **Drag-to-reorder** — rearrange sibling branches at any depth, persisted to the database
- **Collapse / expand** — collapse any branch and all its sub-branches
- **Branch navigator** — sidebar shows the full conversation tree; click any node to scroll and highlight it
- **Edit questions** — edit any question inline; the answer regenerates automatically
- **Delete branches** — remove a node and all its descendants
- **Dark mode** — warm, readable Wes Anderson-inspired palette in both light and dark
- **Auth** — sign in with Clerk; each user's conversations are private
- **Context-aware AI** — the context engine sends only the relevant ancestry path to the AI, with token budgeting for deep trees

---

## Tech Stack

**Monorepo** managed with `pnpm` workspaces.

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4, Zustand, TanStack Query |
| Backend | Node.js, Express 5, TypeScript |
| Database | PostgreSQL, Prisma ORM |
| AI | Groq (Llama 3.3 70B) — provider-agnostic, swap via env var |
| Auth | Clerk |

---

## Project Structure

```
branch-ai/
├── apps/
│   ├── web/          # React frontend
│   └── api/          # Express backend
├── packages/
│   └── database/     # Prisma schema, queries, client
└── docs/             # Architecture docs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 10+
- PostgreSQL database
- [Clerk](https://clerk.com) account
- [Groq](https://console.groq.com) API key

### 1. Clone and install

```bash
git clone https://github.com/your-username/branch-ai.git
cd branch-ai
pnpm install
```

### 2. Set up environment variables

```bash
# apps/api/.env
DATABASE_URL="postgresql://user:password@localhost:5432/branchai"
PORT=4000
WEB_URL="http://localhost:5173"
NODE_ENV="development"

AI_PROVIDER="groq"
AI_MODEL="llama-3.3-70b-versatile"
GROQ_API_KEY="your_groq_api_key"

CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."
```

```bash
# apps/web/.env
VITE_API_URL=http://localhost:4000
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

### 3. Set up the database

```bash
pnpm db:push       # push schema to your database
pnpm db:generate   # generate Prisma client
```

### 4. Configure Clerk webhooks (for user sync)

In the [Clerk dashboard](https://dashboard.clerk.com):
- Go to **Webhooks → Add endpoint**
- URL: `https://your-domain.com/webhooks/clerk` (use [ngrok](https://ngrok.com) for local dev)
- Subscribe to: `user.created`, `user.updated`, `user.deleted`
- Copy the signing secret into `CLERK_WEBHOOK_SECRET`

### 5. Run

```bash
pnpm dev
```

Opens at `http://localhost:5173`.

---

## Switching AI Providers

The AI layer is provider-agnostic. To switch from Groq to another provider:

1. Set `AI_PROVIDER=openai` (or `anthropic`) in `apps/api/.env`
2. Create `apps/api/src/ai/providers/openai.ts` implementing the `AiProvider` interface
3. Register it in `apps/api/src/ai/providers/index.ts`

Nothing else changes. The context engine, prompt builder, and response parser are all provider-independent.

---

## Database Commands

```bash
pnpm db:push       # sync schema to database (dev)
pnpm db:migrate    # create and run migrations (production)
pnpm db:generate   # regenerate Prisma client after schema changes
pnpm db:studio     # open Prisma Studio
```

---

## How Branching Works

The data model is built around a self-referential node tree:

```
Conversation
  └── Node (question, depth 0)        ← root thread
        └── Node (answer, depth 1)
              ├── Node (question, depth 1)   ← inline branch from answer
              │     └── Node (answer, depth 2)
              └── Node (question, depth 1)   ← another inline branch
                    └── Node (answer, depth 2)
  └── Node (question, depth 0)        ← second root thread (bottom bar)
        └── Node (answer, depth 1)
```

Each node has a `path` field (e.g. `"nodeId1.nodeId2.nodeId3"`) that enables fast ancestor lookups without recursive SQL. The context engine uses this path to build AI prompts from only the relevant ancestry chain.

Sibling ordering is stored as a `position` integer on each node, updated atomically when you drag to reorder.

---

## Roadmap

- [ ] Collaboration — workspaces, shared conversations, permissions
- [ ] SaaS billing — Stripe integration, usage limits, plans
- [ ] Performance — Redis caching, lazy loading deep trees
- [ ] Auto-summaries — AI-generated summaries for collapsed branches
- [ ] Related branch suggestions — AI suggests what to explore next
- [ ] Knowledge graph — nodes become semantic entities with cross-conversation links

---

## License

MIT