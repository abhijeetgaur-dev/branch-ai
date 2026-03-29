// apps/api/src/routes/intelligence.ts
// GET /api/intelligence/related?nodeId=<answerId>
//   Returns the top-5 semantically similar answer nodes for the
//   authenticated user, excluding the queried node itself.

import { Router }           from 'express';
import { requireAuth }      from '../middleware/auth';
import type { AuthedRequest } from '../middleware/auth';
import { prisma, findSimilarNodes } from '@branch-ai/database';

export const intelligenceRouter = Router();
intelligenceRouter.use(requireAuth);

intelligenceRouter.get('/related', async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;
    const { nodeId }  = req.query;

    if (!nodeId || typeof nodeId !== 'string') {
      res.status(400).json({ error: 'nodeId query param is required' });
      return;
    }

    // Load the embedding for the requested node
    const node = await prisma.node.findUnique({
      where:  { id: nodeId },
      select: { embedding: true, type: true },
    });

    if (!node) {
      res.status(404).json({ error: 'Node not found' });
      return;
    }

    if (!node.embedding || node.embedding.length === 0) {
      // Not yet embedded — return empty (embedding happens async after AI response)
      res.json({ related: [] });
      return;
    }

    const related = await findSimilarNodes(userId, node.embedding, nodeId);

    res.json({ related });
  } catch (err) {
    next(err);
  }
});
