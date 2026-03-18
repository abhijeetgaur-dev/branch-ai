// apps/api/src/routes/conversations.ts
import { Router }   from 'express';
import { z }        from 'zod';
import {
  createConversation,
  getConversationsByOwner,
  getConversationTree,
  toggleFavorite,
  deleteConversation,
} from '@branch-ai/database';
import { prisma }      from '@branch-ai/database';
import { requireAuth } from '../middleware/auth';
import type { AuthedRequest } from '../middleware/auth';

export const conversationRouter = Router();

conversationRouter.use(requireAuth);

const CreateConversationSchema = z.object({
  title:       z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  workspaceId: z.string().cuid().optional(),
  tags:        z.array(z.string()).default([]),
});

const RenameSchema = z.object({
  title: z.string().min(1).max(200),
});

// GET /api/conversations
conversationRouter.get('/', async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;
    res.json(await getConversationsByOwner(userId));
  } catch (err) { next(err); }
});

// POST /api/conversations
conversationRouter.post('/', async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;
    const parsed = CreateConversationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const conversation = await createConversation({ ...parsed.data, ownerId: userId });
    res.status(201).json(conversation);
  } catch (err) { next(err); }
});

// GET /api/conversations/:id/tree
conversationRouter.get('/:id/tree', async (req, res, next) => {
  try {
    const tree = await getConversationTree(req.params.id);
    if (!tree) {
      res.status(404).json({ error: 'Conversation not found or has no nodes' });
      return;
    }
    res.json(tree);
  } catch (err) { next(err); }
});

// PATCH /api/conversations/:id — rename
conversationRouter.patch('/:id', async (req, res, next) => {
  try {
    const parsed = RenameSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }
    const updated = await prisma.conversation.update({
      where: { id: req.params.id },
      data:  { title: parsed.data.title },
    });
    res.json(updated);
  } catch (err) { next(err); }
});

// PATCH /api/conversations/:id/favorite
conversationRouter.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { isFavorite } = req.body;
    if (typeof isFavorite !== 'boolean') {
      res.status(400).json({ error: 'isFavorite must be a boolean' });
      return;
    }
    res.json(await toggleFavorite(req.params.id, isFavorite));
  } catch (err) { next(err); }
});

// DELETE /api/conversations/:id
conversationRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteConversation(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
});