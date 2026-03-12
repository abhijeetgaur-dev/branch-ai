## BranchAI — AI Orchestration & Context Intelligence Layer

---

# 1. Purpose

The BranchAI Agent is the intelligence orchestration layer responsible for:

* Reconstructing hierarchical context
* Optimizing token usage
* Enforcing structured outputs
* Managing Claude API communication
* Maintaining branch-local memory
* Preventing linear chat history dumping

The Agent is not a chatbot proxy.

It is a structured reasoning orchestrator.

---

# 2. Core Responsibilities

## 2.1 Context Reconstruction

When a user asks a follow-up under Node X:

1. Fetch Node X.
2. Fetch all ancestor nodes recursively.
3. Order by depth (root → current).
4. Apply summarization if needed.
5. Apply token budgeting.
6. Construct structured memory object.
7. Pass to PromptConstructor.

The Agent must never send the full conversation blindly.

---

## 2.2 Structured Output Enforcement

All Claude responses must follow strict JSON schema:

```json
{
  "sections": [
    {
      "title": "string",
      "content": "string",
      "subsections": []
    }
  ]
}
```

Rules:

* No markdown
* No extra commentary
* No text outside JSON
* Must be valid parsable JSON

If malformed:

* Retry with repair instruction
* Attempt maximum 2 retries

---

## 2.3 Token Budget Management

Strategy:

* Use max 70% of model token limit for context
* Reserve 30% for response
* Estimate tokens before request
* If overflow:

  * Summarize older nodes
  * Replace with summary_snapshot

Agent must log:

* Input tokens
* Output tokens
* Total tokens
* Model used

---

## 2.4 Branch Isolation

Each branch must:

* Only use its ancestor chain
* Not pull sibling branches
* Not use global workspace history
* Remain locally contextual

This preserves tree integrity.

---

# 3. Agent Architecture

```
User Follow-Up
      ↓
ContextBuilder
      ↓
TokenManager
      ↓
PromptConstructor
      ↓
ClaudeService
      ↓
ResponseParser
      ↓
NodeService (store structured result)
```

---

# 4. System Components

## 4.1 ContextBuilder

Responsibilities:

* Fetch ancestor chain
* Order by depth
* Construct structured context object
* Include summary_snapshot if present
* Calculate depth

Must not:

* Call Claude
* Build prompts
* Access controllers

---

## 4.2 TokenManager

Responsibilities:

* Estimate token usage
* Enforce 70/30 rule
* Trigger summarization if needed

Future:

* Model-aware token calculation

---

## 4.3 PromptConstructor

Responsibilities:

* Build structured Claude prompt
* Insert context
* Insert user input
* Define strict JSON schema

All prompt strings must live here.

No prompt strings elsewhere in codebase.

---

## 4.4 ClaudeService

Responsibilities:

* Call Claude API
* Handle retries
* Handle malformed output repair
* Log metrics
* Support model switching

Must not:

* Contain business logic
* Traverse tree
* Modify DB directly

---

## 4.5 ResponseParser

Responsibilities:

* Validate JSON
* Repair minor syntax issues
* Ensure schema compliance
* Transform into structured node objects

---

# 5. Data Expectations

Each Node stored must contain:

* id
* workspace_id
* parent_node_id
* role (user | assistant)
* content (raw text)
* structured_content (JSON)
* depth
* token_count
* created_at

Structured content must match enforced schema.

---

# 6. Error Handling Strategy

If Claude:

* Returns invalid JSON → repair attempt
* Exceeds token limit → summarize & retry
* Times out → retry once
* Fails repeatedly → return structured error node

Errors must not crash branch tree.

---

# 7. Logging Requirements

Every AI request must log:

* Model name
* Input tokens
* Output tokens
* Total tokens
* Response time
* Retry count

This supports optimization later.

---

# 8. Constraints

The Agent must:

* Never expose raw prompts to frontend
* Never mix controller logic with AI logic
* Never bypass ContextBuilder
* Never accept free-form output
* Never inject entire workspace history

---

# 9. Non-Goals

The Agent is NOT responsible for:

* UI rendering
* Authentication
* Authorization
* Workspace management
* Global analytics

---

# 10. Extensibility Roadmap

Future Agent upgrades may include:

* Embedding-based relevance scoring
* Cross-branch thematic linking
* Auto-summarization on deep chains
* Multi-model orchestration
* Context weighting by recency or depth
* Knowledge graph integration

---

# 11. Design Philosophy

We optimize for:

* Structured reasoning
* Deep exploration
* Cognitive clarity
* Context precision

We do NOT optimize for:

* Fastest possible response
* Maximum verbosity
* Chat-like experience

The Agent enables users to think in trees, not threads.

