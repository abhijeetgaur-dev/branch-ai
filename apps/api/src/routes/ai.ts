// apps/api/src/routes/ai.ts
import { Router }   from 'express';
import { z }        from 'zod';
import {
  createNode,
  createBlocks,
  createAiRequest,
  completeAiRequest,
  failAiRequest,
} from '@branch-ai/database';
import { getProvider, getModel } from '../ai/providers/index';
import { buildPromptMessages }   from '../ai/prompt';
import { parseAiResponse, fallbackResponse } from '../ai/parser';

export const aiRouter = Router();

const BranchSchema = z.object({
  conversationId: z.string().cuid(),
  parentNodeId:   z.string().cuid().nullable(),
  parentBlockId:  z.string().cuid().nullable(),
  question:       z.string().min(1).max(2000),
  userId:         z.string().cuid(),
});

aiRouter.post('/branch', async (req, res, next) => {
  try {
    const parsed = BranchSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { conversationId, parentNodeId, parentBlockId, question, userId } = parsed.data;

    // ── 1. Create question node ──────────────────
    const questionNode = await createNode({
      conversationId,
      parentNodeId,
      parentBlockId: null,
      createdById:   userId,
      type:          'question',
      role:          'user',
      content:       question,
    });

    // ── 2. Log AI request ────────────────────────
    const aiRequest = await createAiRequest({
      conversationId,
      userId,
      model: getModel(),
    });

    // ── 3. Build context-aware prompt ────────────
    const context = await buildPromptMessages({
      parentNodeId,
      parentBlockId,
      question,
    });

    // Log truncation in dev so you can see when context is being trimmed
    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[AI] ancestors=${context.ancestorCount} ` +
        `tokens≈${context.estimatedTokens} ` +
        `truncated=${context.wasTruncated}`
      );
    }

    // ── 4. Call AI provider ──────────────────────
    let aiResponse;
    try {
      aiResponse = await getProvider().complete({
        messages:    context.messages,
        model:       getModel(),
        maxTokens:   2048,
        temperature: 0.7,
      });
    } catch (err) {
      await failAiRequest(aiRequest.id, String(err));
      throw err;
    }

    // ── 5. Parse response ────────────────────────
    let structured;
    try {
      structured = parseAiResponse(aiResponse.content);
    } catch (parseErr) {
      console.error('[AI] parse error:', parseErr);
      structured = fallbackResponse(String(parseErr));
    }

    // ── 6. Create answer node ────────────────────
    const answerNode = await createNode({
      conversationId,
      parentNodeId:  questionNode.id,
      parentBlockId: null,
      createdById:   userId,
      type:          'answer',
      role:          'assistant',
    });

    // ── 7. Create blocks ─────────────────────────
    const blocks = await createBlocks(
      structured.blocks.map((block, i) => ({
        nodeId:      answerNode.id,
        type:        block.type,
        content:     'content' in block ? (block.content ?? '') : '',
        position:    i,
        language:    'language'    in block ? block.language    : undefined,
        calloutType: 'calloutType' in block ? block.calloutType : undefined,
        items:       'items'       in block ? block.items       : undefined,
      }))
    );

    // ── 8. Complete AI request log ───────────────
    await completeAiRequest(aiRequest.id, {
      nodeId:       answerNode.id,
      promptTokens: aiResponse.promptTokens,
      outputTokens: aiResponse.outputTokens,
      durationMs:   aiResponse.durationMs,
    });

    // ── 9. Return to frontend ────────────────────
    res.status(201).json({
      questionNode,
      answerNode: { ...answerNode, blocks },
      // Include context stats so the frontend can use them later (Phase 10 usage tracking)
      _meta: {
        estimatedTokens: context.estimatedTokens,
        wasTruncated:    context.wasTruncated,
        ancestorCount:   context.ancestorCount,
      },
    });
  } catch (err) {
    next(err);
  }
});