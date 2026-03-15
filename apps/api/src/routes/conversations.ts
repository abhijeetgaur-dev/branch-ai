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

export const conversationRouter = Router();

// ── Validation schemas ─────────────────────────────

const CreateConversationSchema = z.object({
  title:       z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  ownerId:     z.string().cuid(),
  workspaceId: z.string().cuid().optional(),
  tags:        z.array(z.string()).default([]),
});

// ── GET /api/conversations?ownerId=xxx ─────────────
// List all conversations for a user
conversationRouter.get('/', async (req, res, next) => {
  try {
    const { ownerId } = req.query;

    if (!ownerId || typeof ownerId !== 'string') {
      res.status(400).json({ error: 'ownerId query param required' });
      return;
    }

    const conversations = await getConversationsByOwner(ownerId);
    res.json(conversations);
  } catch (err) {
    next(err);
  }
});

// ── POST /api/conversations ────────────────────────
// Create a new conversation
conversationRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateConversationSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const conversation = await createConversation(parsed.data);
    res.status(201).json(conversation);
  } catch (err) {
    next(err);
  }
});

// ── GET /api/conversations/:id/tree ───────────────
// Get the full node tree for a conversation
conversationRouter.get('/:id/tree', async (req, res, next) => {
  try {
    const tree = await getConversationTree(req.params.id);

    if (!tree) {
      res.status(404).json({ error: 'Conversation not found or has no nodes' });
      return;
    }

    res.json(tree);
  } catch (err) {
    next(err);
  }
});

// ── PATCH /api/conversations/:id/favorite ─────────
conversationRouter.patch('/:id/favorite', async (req, res, next) => {
  try {
    const { isFavorite } = req.body;

    if (typeof isFavorite !== 'boolean') {
      res.status(400).json({ error: 'isFavorite must be a boolean' });
      return;
    }

    const updated = await toggleFavorite(req.params.id, isFavorite);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// ── DELETE /api/conversations/:id ─────────────────
conversationRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteConversation(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});