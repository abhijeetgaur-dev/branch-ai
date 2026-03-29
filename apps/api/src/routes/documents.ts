import { Router }          from 'express';
import { requireAuth }     from '../middleware/auth';
import type { AuthedRequest } from '../middleware/auth';
import multer              from 'multer';
import { prisma }          from '@branch-ai/database';
import { chunkText }       from '../services/chunking';
import { generateEmbeddings } from '../services/embeddings';
import { uploadFile }       from '../services/storage';

const pdfParse = require('pdf-parse');
const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload a document
router.post('/', requireAuth, upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file;
    const { userId } = (req as AuthedRequest).auth;
    
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    
    // Auto-resolve workspace since frontend doesn't manage them yet
    let workspaceMember = await prisma.workspaceMember.findFirst({
       where: { userId },
       include: { workspace: true }
    });
    let workspaceId = workspaceMember?.workspaceId;
    
    // Check if conversationId was provided in the body
    const conversationId = req.body.conversationId as string | undefined;

    if (!conversationId && !workspaceId) {
      const newWs = await prisma.workspace.create({
         data: {
           name: 'Personal Workspace',
           slug: `personal-${userId}-${Date.now()}`,
           members: { create: { userId, role: 'owner' } }
         }
      });
      workspaceId = newWs.id;
    }

    let textContent = '';
    const ext = file.originalname.split('.').pop()?.toLowerCase();

    if (ext === 'pdf') {
      const data = await pdfParse(file.buffer);
      textContent = data.text;
    } else if (ext === 'txt' || ext === 'md' || ext === 'csv') {
      textContent = file.buffer.toString('utf-8');
    } else {
      res.status(400).json({ error: 'Unsupported file type. Use .pdf, .txt, or .md' });
      return;
    }

    if (!textContent.trim()) {
      res.status(400).json({ error: 'File is empty or unreadable' });
      return;
    }

    // 0. Upload to Storage (S3 or Local)
    // We do this first so we get the permanent URL
    const fileUrl = await uploadFile(file.buffer, file.originalname, file.mimetype);

    // 1. Create Document record
    const document = await prisma.document.create({
      data: {
        // If uploading to a conversation, don't link to workspace
        workspaceId: conversationId ? undefined : workspaceId,
        conversationId: conversationId || undefined,
        title: file.originalname,
        url: fileUrl, // The permanent URL (S3 or Local path)
      }
    });

    // 2. Chunk text
    const chunks = chunkText(textContent);

    // 3. Generate embeddings and save chunks
    const chunkPromises = chunks.map(async (text, index) => {
      const embedding = await generateEmbeddings(text);
      return {
        documentId: document.id,
        content: text,
        embedding: embedding,
        position: index,
      };
    });

    // Resolve all promises
    const chunkData = await Promise.all(chunkPromises);

    await prisma.documentChunk.createMany({
      data: chunkData
    });

    res.json({ success: true, document: { id: document.id, title: document.title } });
  } catch (err) {
    next(err);
  }
});

// List documents for a user's default workspace or specific conversation
router.get('/', requireAuth, async (req, res, next) => {
  try {
    const { userId } = (req as AuthedRequest).auth;
    const conversationId = req.query.conversationId as string | undefined;

    if (conversationId) {
      // Return documents specific to this conversation
      const docs = await prisma.document.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'desc' }
      });
      res.json(docs);
      return;
    }

    const member = await prisma.workspaceMember.findFirst({ where: { userId } });
    if (!member) {
      res.json([]);
      return;
    }
    const docs = await prisma.document.findMany({
      where: { workspaceId: member.workspaceId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(docs);
  } catch (err) {
    next(err);
  }
});

// Delete a document
router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    await prisma.document.delete({
      where: { id: req.params.id as string }
    });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
});

export const documentRouter = router;
