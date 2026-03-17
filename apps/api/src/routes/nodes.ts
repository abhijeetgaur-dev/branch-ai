// apps/api/src/routes/nodes.ts
import { Router } from 'express';
import { z }      from 'zod';
import {
  createNode, getChildren,
  getNodePath, toggleNodeCollapsed,
} from '@branch-ai/database';
import { requireAuth } from '../middleware/auth';

export const nodeRouter = Router();

nodeRouter.use(requireAuth);

const CreateNodeSchema = z.object({
  conversationId: z.string().cuid(),
  parentNodeId:   z.string().cuid().nullable(),
  parentBlockId:  z.string().cuid().nullable(),
  type:           z.enum(['question', 'answer']),
  role:           z.enum(['user', 'assistant']),
  content:        z.string().optional(),
});

nodeRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateNodeSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    // userId comes from session via requireAuth
    const { userId } = (req as any).auth;
    const node = await createNode({ ...parsed.data, createdById: userId });
    res.status(201).json(node);
  } catch (err) {
    next(err);
  }
});

nodeRouter.get('/:id/children', async (req, res, next) => {
  try {
    res.json(await getChildren(req.params.id));
  } catch (err) { next(err); }
});

nodeRouter.get('/:id/path', async (req, res, next) => {
  try {
    res.json(await getNodePath(req.params.id));
  } catch (err) { next(err); }
});

nodeRouter.patch('/:id/collapse', async (req, res, next) => {
  try {
    const { isCollapsed } = req.body;
    if (typeof isCollapsed !== 'boolean') {
      res.status(400).json({ error: 'isCollapsed must be a boolean' });
      return;
    }
    res.json(await toggleNodeCollapsed(req.params.id, isCollapsed));
  } catch (err) { next(err); }
});