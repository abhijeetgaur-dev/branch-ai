// apps/api/src/routes/nodes.ts
import { Router } from 'express';
import { z }      from 'zod';
import {
  createNode, getChildren, getNodePath, toggleNodeCollapsed,
  updateNodeContent, deleteNodeWithChildren, reorderSiblings,
  deleteAnswerBlocks, createBlocks,
} from '@branch-ai/database';
import { requireAuth }               from '../middleware/auth';
import type { AuthedRequest }        from '../middleware/auth';
import { getProvider, getModel }     from '../ai/providers/index';
import { buildPromptMessages }       from '../ai/prompt';
import { parseAiResponse, fallbackResponse } from '../ai/parser';
import { createAiRequest, completeAiRequest, failAiRequest } from '@branch-ai/database';

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

const ReorderSchema = z.object({
  orderedNodeIds: z.array(z.string().cuid()).min(1),
});

const UpdateContentSchema = z.object({
  content:        z.string().min(1).max(2000),
  conversationId: z.string().cuid(),
  // The answer node ID that needs to be regenerated
  answerNodeId:   z.string().cuid(),
});

// ── POST /api/nodes ─────────────────────────────
nodeRouter.post('/', async (req, res, next) => {
  try {
    const parsed = CreateNodeSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
    const { userId } = (req as AuthedRequest).auth;
    const node = await createNode({ ...parsed.data, createdById: userId });
    res.status(201).json(node);
  } catch (err) { next(err); }
});

// ── GET /api/nodes/:id/children ─────────────────
nodeRouter.get('/:id/children', async (req, res, next) => {
  try { res.json(await getChildren(req.params.id)); }
  catch (err) { next(err); }
});

// ── GET /api/nodes/:id/path ─────────────────────
nodeRouter.get('/:id/path', async (req, res, next) => {
  try { res.json(await getNodePath(req.params.id)); }
  catch (err) { next(err); }
});

// ── PATCH /api/nodes/:id/collapse ───────────────
nodeRouter.patch('/:id/collapse', async (req, res, next) => {
  try {
    const { isCollapsed } = req.body;
    if (typeof isCollapsed !== 'boolean') {
      res.status(400).json({ error: 'isCollapsed must be a boolean' }); return;
    }
    res.json(await toggleNodeCollapsed(req.params.id, isCollapsed));
  } catch (err) { next(err); }
});

// ── DELETE /api/nodes/:id ────────────────────────
// Deletes the node and all its descendants (cascade via DB schema)
nodeRouter.delete('/:id', async (req, res, next) => {
  try {
    await deleteNodeWithChildren(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
});

// ── PATCH /api/nodes/:id/content ────────────────
// Updates question text and regenerates the answer
nodeRouter.patch('/:id/content', async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;
    const parsed = UpdateContentSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }

    const { content, conversationId, answerNodeId } = parsed.data;
    const questionNodeId = req.params.id;

    // 1. Update question text
    await updateNodeContent(questionNodeId, content);

    // 2. Delete old answer blocks
    await deleteAnswerBlocks(answerNodeId);

    // 3. Log AI request
    const aiRequest = await createAiRequest({ conversationId, userId, model: getModel() });

    // 4. Build prompt from the updated question's path context
    const parentNode = await (async () => {
      const { prisma } = await import('@branch-ai/database');
      return prisma.node.findUnique({
        where: { id: questionNodeId },
        select: { parentNodeId: true, parentBlockId: true },
      });
    })();

    const context = await buildPromptMessages({
      parentNodeId:  parentNode?.parentNodeId ?? null,
      parentBlockId: parentNode?.parentBlockId ?? null,
      question:      content,
    });

    // 5. Call AI
    let aiResponse;
    try {
      aiResponse = await getProvider().complete({
        messages: context.messages, model: getModel(),
        maxTokens: 2048, temperature: 0.7,
      });
    } catch (err) {
      await failAiRequest(aiRequest.id, String(err));
      throw err;
    }

    // 6. Parse and store new blocks
    let structured;
    try { structured = parseAiResponse(aiResponse.content); }
    catch { structured = fallbackResponse('Parse error after question edit'); }

    const blocks = await createBlocks(
      structured.blocks.map((block, i) => ({
        nodeId:      answerNodeId,
        type:        block.type,
        content:     'content'     in block ? (block.content     ?? '') : '',
        position:    i,
        language:    'language'    in block ? block.language             : undefined,
        calloutType: 'calloutType' in block ? block.calloutType          : undefined,
        items:       'items'       in block ? block.items                : undefined,
      }))
    );

    await completeAiRequest(aiRequest.id, {
      nodeId:       answerNodeId,
      promptTokens: aiResponse.promptTokens,
      outputTokens: aiResponse.outputTokens,
      durationMs:   aiResponse.durationMs,
    });

    res.json({ blocks });
  } catch (err) { next(err); }
});

// ── PATCH /api/nodes/reorder ────────────────────
// Updates positions of sibling nodes
nodeRouter.patch('/reorder', async (req, res, next) => {
  try {
    const parsed = ReorderSchema.safeParse(req.body);
    if (!parsed.success) { res.status(400).json({ error: parsed.error.flatten() }); return; }
    await reorderSiblings(parsed.data.orderedNodeIds);
    res.json({ ok: true });
  } catch (err) { next(err); }
});