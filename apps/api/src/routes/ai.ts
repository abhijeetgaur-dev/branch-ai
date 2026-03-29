// apps/api/src/routes/ai.ts
import { Router }   from 'express';
import { z }        from 'zod';
import {
  createNode, createBlocks,
  createAiRequest, completeAiRequest, failAiRequest,
} from '@branch-ai/database';
import { getProvider, getModel }             from '../ai/providers/index';
import { buildPromptMessages }               from '../ai/prompt';
import { parseAiResponse, fallbackResponse } from '../ai/parser';
import { embedAnswerNode, summarizeLineage } from '../ai/intelligence';
import { requireAuth }                       from '../middleware/auth';
import type { AuthedRequest }                from '../middleware/auth';
import { prisma }                            from '@branch-ai/database';
import { generateEmbeddings, cosineSimilarity } from '../services/embeddings';

export const aiRouter = Router();

aiRouter.use(requireAuth);

// userId removed from schema — comes from session now
const BranchSchema = z.object({
  conversationId: z.string().cuid(),
  parentNodeId:   z.string().cuid().nullable(),
  parentBlockId:  z.string().cuid().nullable(),
  question:       z.string().min(1).max(2000),
});

aiRouter.post('/branch', async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;

    const parsed = BranchSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.flatten() });
      return;
    }

    const { conversationId, parentNodeId, parentBlockId, question } = parsed.data;

    const questionNode = await createNode({
      conversationId,
      parentNodeId,
      parentBlockId: null,
      createdById:   userId,
      type:          'question',
      role:          'user',
      content:       question,
    });

    const aiRequest = await createAiRequest({ conversationId, userId, model: getModel() });

    let ragContextString: string | null = null;
    let targetWorkspaceId = null;
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { workspaceId: true }
    });
    
    if (conversation?.workspaceId) {
       targetWorkspaceId = conversation.workspaceId;
    } else {
       const member = await prisma.workspaceMember.findFirst({ where: { userId } });
       if (member) targetWorkspaceId = member.workspaceId;
    }

    if (targetWorkspaceId) {
      try {
        const questionEmbedding = await generateEmbeddings(question);
        
        // Fetch chunks for the workspace AND the conversation
        const chunks = await prisma.documentChunk.findMany({
          where: { 
            document: {
              OR: [
                { workspaceId: targetWorkspaceId },
                { conversationId: conversationId }
              ]
            }
          }
        });

        if (chunks.length > 0) {
          // Calculate similarity
          const scored = chunks.map(chunk => ({
            content: chunk.content,
            score: cosineSimilarity(questionEmbedding, chunk.embedding)
          }));
          
          // Deduplicate and take top 3
          scored.sort((a,b) => b.score - a.score);
          const topChunks = scored.slice(0, 3);
          
          // Only include if reasonably relevant (Xenova threshold can be typically around 0.15 - 0.25)
          if (topChunks[0].score > 0.1) {
             ragContextString = topChunks.map(c => c.content).join('\n\n');
             console.log(`[RAG] Found context with max score ${topChunks[0].score.toFixed(3)}`);
          }
        }
      } catch (err) {
         console.error('[RAG] Error retrieving context:', err);
      }
    }

    const context = await buildPromptMessages(
      { parentNodeId, parentBlockId, question },
      ragContextString
    );

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `[AI] ancestors=${context.ancestorCount} ` +
        `tokens≈${context.estimatedTokens} ` +
        `truncated=${context.wasTruncated}`
      );
    }

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

    let structured;
    try {
      structured = parseAiResponse(aiResponse.content);
    } catch (parseErr) {
      console.error('[AI] parse error:', parseErr);
      structured = fallbackResponse(String(parseErr));
    }

    const answerNode = await createNode({
      conversationId, parentNodeId: questionNode.id,
      parentBlockId: null, createdById: userId,
      type: 'answer', role: 'assistant',
    });

    const blocks = await createBlocks(
      structured.blocks.map((block, i) => ({
        nodeId:      answerNode.id,
        type:        block.type,
        content:     'content'     in block ? (block.content     ?? '') : '',
        position:    i,
        language:    'language'    in block ? block.language             : undefined,
        calloutType: 'calloutType' in block ? block.calloutType          : undefined,
        items:       'items'       in block ? block.items                : undefined,
      }))
    );

    await completeAiRequest(aiRequest.id, {
      nodeId:       answerNode.id,
      promptTokens: aiResponse.promptTokens,
      outputTokens: aiResponse.outputTokens,
      durationMs:   aiResponse.durationMs,
    });

    // Fire-and-forget: embed the answer node for knowledge graph
    void embedAnswerNode(answerNode.id, structured.blocks as any);

    // Fire-and-forget: summarize the branch if it just crossed a depth threshold
    if (answerNode.depth > 0 && answerNode.depth % 8 === 0) {
      void summarizeLineage(answerNode.id, conversationId, userId, context.pathNodes);
    }

    res.status(201).json({
      questionNode,
      answerNode: { ...answerNode, blocks },
      suggestions: structured.suggestions,
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