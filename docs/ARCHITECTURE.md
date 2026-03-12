# BranchAI — System Architecture (React + Express)

## 1. High-Level Overview

User
  ↓
React Frontend
  ↓
Express API (TypeScript)
  ↓
Context Engine
  ↓
Prompt Constructor
  ↓
Claude Adapter
  ↓
LLM
  ↓
Response Parser
  ↓
PostgreSQL

---

## 2. Architecture Layers

### 2.1 Frontend (React + Vite)

Tech:
- React
- TypeScript
- Zustand (state)
- TailwindCSS

Responsibilities:
- Render hierarchical tree
- Expand / collapse nodes
- Inline follow-up UI
- API communication
- Local UI state only

No AI logic in frontend.

---

### 2.2 Backend (Express + TypeScript)

Structure:

src/
  routes/
  controllers/
  services/
  ai/
  db/
  utils/

Responsibilities:
- Handle HTTP requests
- Node CRUD
- Tree traversal
- Delegation to Context Engine
- Structured AI orchestration

Controllers must remain thin.

---

### 2.3 Context Engine

Responsible for:
- Fetching ancestor chain
- Context formatting
- Token budgeting
- Summarization (future)
- Structured memory generation

This is core IP.

---

### 2.4 Prompt Constructor

Responsible for:
- Building Claude prompt
- Enforcing JSON schema
- Deterministic output structure

All prompt strings live here.

---

### 2.5 Claude Adapter

Responsible for:
- Claude SDK calls
- Retry logic
- Token logging
- Model switching
- Error handling

No business logic here.

---

## 3. Key Rules

- No LLM calls outside ClaudeService.
- No prompt strings outside PromptConstructor.
- No tree traversal logic in controllers.
- No AI logic in frontend.
- All AI responses must be structured JSON.