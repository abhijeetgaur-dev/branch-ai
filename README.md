# 🌱 BranchAI

> **Explore ideas without losing context. Think in trees, not timelines.**

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/frontend-React_19-61dafb.svg?logo=react)
![Node](https://img.shields.io/badge/backend-Node.js_Express-339933.svg?logo=nodedotjs)
![Prisma](https://img.shields.io/badge/database-Prisma_PostgreSQL-2d3748.svg?logo=prisma)
![AI](https://img.shields.io/badge/AI-OpenAI_%7C_Groq-FF3366.svg)

---

## 🎯 Purpose & Overview

**The Problem:** Every AI chat interface works exactly the same way: you ask, it answers, you scroll. The deeper you go down the rabbit hole investigating a single point, the more you lose track of where you started.

**The Solution:** BranchAI is a non-linear AI conversation platform where answers are structured, expandable, and natively branchable. Instead of scrolling back through a flat chat history to find where you pivoted, every conversation becomes an easily navigable knowledge tree.

**Elevator Pitch:** Stop losing answers in your chat's timeline. Start treating your conversations like a mind map and branch off into new directions dynamically. 

If you're a curious learner, a researcher, or a developer debugging deep architecture, this is for you.

---

## ✨ Features

- 📁 **Inline Document References (RAG)** — Seamlessly attach PDFs, MD, or TXT docs directly within your prompts. Branch AI parses and performs semantic searches locally.
- 🌳 **Inline Branching** — Click any specific section heading to ask a follow-up *right there*, building a child node at that exact point.
- 🗂 **Structured AI Responses** — Responses aren't just walls of text. Every output is parsed into semantic blocks: headings, code, lists, callouts, and quotes.
- 🔄 **Drag-To-Reorder** — Rearrange sibling branches at any depth directly in the UI. We sync positions to the database automatically.
- 👁 **Tree Visualization** — Utilize the global navigation sidebar to jump between branches, instantly expanding or collapsing nodes.
- 🔒 **Authentication & Workspaces** — Fast, secure sign-in via Clerk, featuring isolated workspaces and document sharing.
- 🎨 **Rich Aesthetics** — Custom vibrant UI gradients, responsive layouts, micro-animations, and a sleek modern aesthetic.
- 🧩 **Agnostic AI Layer** — Default support for Groq (Llama 3.3) and OpenAI, heavily optimized through the use of an ancestral prompt-building engine to save tokens on deep trees.

---

## 🛠️ Tech Stack

Built in a robust **Monorepo** managed with `pnpm` workspaces for clean separation of concerns.

| Component | Technology | Why it was chosen |
|---|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4 | Provides bleeding-edge performance, concurrent features, and rapid styling without bloated external component libraries. |
| **State Management**| Zustand, TanStack Query | Lightweight global state sync (for the conversation tree logic) alongside reliable server state caching. |
| **Backend API** | Node.js, Express 5, TypeScript | Typesafe, scalable, heavily customizable routing framework capable of cleanly managing our RAG upload streams. |
| **Database** | PostgreSQL, Prisma ORM | Relational querying matches perfectly with our self-referential Conversation Node hierarchies (`parentId`). |
| **AI Layer** | OpenAI, Groq, Xenova | Uses leading LLM endpoints alongside `@xenova/transformers` for incredibly fast, localized embedding generations. |
| **Integrations** | Clerk, AWS S3 | Rock-solid user/workspace context management alongside persistent knowledge base file uploads. |

---

## 🗺️ App Flow

BranchAI treats every prompt and response as a parent and child node.

```mermaid
flowchart TD
  A[Login via Clerk] --> B[Open Dashboard]
  B --> C[Bottom Bar: Type a prompt or Attach a Document]
  C --> D[Submit Query]
  D --> E{Has Attached File?}
  E -- Yes --> F[File parsed & vectorized locally via Xenova -> Stored in Postgres]
  E -- No --> G[Direct API Request Setup]
  F --> G
  G --> H[Backend processes query utilizing LLM and contextual RAG matches]
  H --> I[AI generates a beautifully structured JSON response]
  I --> J[Response chunks split into UI Blocks: Text, Code, Callout]
  J --> K[Inline Branching: User clicks to branch deeper from a specific block]
  K --> L[Nested Conversation Tree Node is appended to the tree]
```

---

## 📂 Project Structure

```text
branch-ai/
├── apps/
│   ├── web/                # React frontend (Vite)
│   │   ├── src/
│   │   │   ├── components/ # Core UI, node rendering, Branch inputs
│   │   │   ├── store/      # Zustand states (conversationStore & documentStore)
│   │   │   └── lib/        # Shared frontend API logic
│   └── api/                # Express backend
│       ├── src/
│       │   ├── ai/         # Intelligent core: prompt generation & parsers
│       │   ├── routes/     # App endpoints (ai, conversations, documents)
│       │   └── services/   # RAG chunking, embeddings, S3/Local Storage
├── packages/
│   └── database/           # Typesafe DB Layer (Prisma Schemas, Queries)
└── package.json            # Monorepo PNPM configurations
```

---

## 🚀 Setup & Installation Guide

### Prerequisites
* **Node.js** 18+
* **pnpm** 10+ (`npm i -g pnpm`)
* **PostgreSQL** instance running locally or via Docker
* **Clerk** account for Auth
* **OpenAI** or **Groq** API Key

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/branch-ai.git
cd branch-ai
pnpm install
```

### 2. Configure Environment Variables
Copy and rename the default `.env` files for both applications.

**For `apps/api/.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/branchai"
PORT=4000
WEB_URL="http://localhost:5173"
NODE_ENV="development"

# Set your preferred provider (openai | groq)
AI_PROVIDER="openai"
OPEN_AI_API_KEY="sk-proj-YourToken..."

# Toggle Storage (s3 | local)
STORAGE_TYPE="local"

# Clerk Config
CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
```

**For `apps/web/.env`:**
```env
VITE_API_URL="http://localhost:4000"
VITE_CLERK_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Initialize the Database
Build the schema and generate the typescript interfaces:
```bash
pnpm db:push
pnpm db:generate
```

### 4. Start Development Servers
Start both the Frontend and Backend concurrently using our monorepo script:
```bash
pnpm dev
```
The client dashboard should now be running at `http://localhost:5173`.

---

## 💡 How to Use (Personal Use Guide)

Whether you are studying for exams, architecting a codebase, or researching topics:

1. **Creating a Document Baseline**: Instead of juggling separate tabs, click the **paperclip** icon in the bottom input bar to attach your PDF or code file.
2. **First Broad Question**: Ask the AI a general question (e.g., *"Summarize the overarching goals of this architecture doc"*) and send the prompt. 
3. **Pivoting your logic**: The AI will return structured blocks of text. Let's say one block touches on "Authentication". Hover over that specific block and click **Ask a follow-up**.
4. **Context Switching Without Forgetting**: After you spend 5 messages diving into Auth, you don't have to scroll infinitely to get back. Just look to your **Sidebar Navigator**, click the original root node, and start an entirely different branch discussing "Database Models". 

---

## 🛤️ Upcoming Features (Roadmap)

**v1.1**
- [ ] Auto-summaries — AI-generated summaries for visually collapsed branches to maintain visual clarity.
- [ ] Related Branch Knowledge Graphs — Semantic networking linking nodes across entirely separate conversations.

**v2.0**
- [ ] Multi-user Workspaces — Realtime collaboration allowing users to branch off each other's ideas.
- [ ] Voice Mode — Talk your way through a conversational tree utilizing real-time web audio.
- [ ] Advanced Exporting — Export your entire tree logic directly into a beautiful markdown Wiki.

---

## 🤝 Contributing

We love contributions! If you'd like to help push the non-linear AI boundary:
1. Fork the repo.
2. Create a feature branch `git checkout -b feature/your-idea`.
3. Read the codebase architecture in the `docs/` folder (if available).
4. Commit your changes logically.
5. Open a Pull Request for review!

---

## 📄 License

This project operates beneath the **MIT** License.