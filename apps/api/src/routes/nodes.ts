// apps/api/src/routes/nodes.ts
import { Router } from 'express';
import { z }      from 'zod';
import {
  createNode,
  getChildren,
  getNodePath,
  toggleNodeCollapsed,
} from '@branch-ai/database';

export const nodeRouter = Router();

// ── Validation ──────────────────────────────────────

const CreateNodeSchema = z.object({
  conversationId: z.string().cuid(),
  parentNodeId:   z.string().cuid().nullable(),
  parentBlockId:  z.string().cuid().nullable(),
  createdById:    z.string().cuid(),
  type:           z.enum(['question', 'answer']),
  role:           z.enum(['user', 'assistant']),
  content:        z.string().optional(),
});

// ── POST /api/nodes ────────────────────────────────
// Create a new node (question or answer)
// This is the core branching operation.
nodeRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateNodeSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const node = await createNode(parsed.data);
    res.status(201).json(node);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/nodes/:id/children ───────────────────
// Direct children of a node (for lazy loading)
nodeRouter.get('/:id/children', async (req, res, next) => {
  try {
    const children = await getChildren(req.params.id);
    res.json(children);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/nodes/:id/path ───────────────────────
// Full ancestor chain — used by the context engine
nodeRouter.get('/:id/path', async (req, res, next) => {
  try {
    const path = await getNodePath(req.params.id);
    res.json(path);
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/nodes/:id/collapse ─────────────────
nodeRouter.patch('/:id/collapse', async (req, res, next) => {
  try {
    const { isCollapsed } = req.body;

    if (typeof isCollapsed !== 'boolean') {
      res.status(400).json({ error: 'isCollapsed must be a boolean' });
      return;
    }

    const updated = await toggleNodeCollapsed(req.params.id, isCollapsed);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});