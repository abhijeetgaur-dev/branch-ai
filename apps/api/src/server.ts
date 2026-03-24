// apps/api/src/server.ts
import 'dotenv/config';
import express       from 'express';
import cors          from 'cors';
import { clerkAuth } from './middleware/auth';

import { conversationRouter } from './routes/conversations';
import { nodeRouter }         from './routes/nodes';
import { aiRouter }           from './routes/ai';
import { webhookRouter }      from './routes/webhooks';
import { documentRouter }     from './routes/documents';

const app  = express();
const PORT = process.env.PORT ?? 4000;

// Wide-open CORS for local dev
app.use(cors({
  origin: true,          // allow any origin in dev
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Log every incoming request so we can see if the API receives them
app.use((req, _res, next) => {
  console.log(`[server] ${req.method} ${req.path}`);
  next();
});

// Webhook route needs raw body for svix signature verification
app.use(
  '/webhooks',
  express.raw({ type: 'application/json' }),
  (req, _res, next) => {
    if (Buffer.isBuffer(req.body)) {
      (req as any).rawBody = req.body;
      req.body = JSON.parse(req.body.toString());
    }
    next();
  },
  webhookRouter
);

app.use(express.json());

// Clerk session verification
app.use(clerkAuth());

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    ts: new Date().toISOString(),
    env: {
      hasClerkSecret:  !!process.env.CLERK_SECRET_KEY,
      hasDatabase:     !!process.env.DATABASE_URL,
      hasGroqKey:      !!process.env.GROQ_API_KEY,
    },
  });
});

app.use('/api/conversations', conversationRouter);
app.use('/api/nodes',         nodeRouter);
app.use('/api/ai',            aiRouter);
app.use('/api/documents',     documentRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server] unhandled error:', err.message);
  res.status(500).json({ error: err.message ?? 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API running → http://localhost:${PORT}`);
  console.log(`  CLERK_SECRET_KEY: ${process.env.CLERK_SECRET_KEY ? 'SET' : 'MISSING !!!'}`);
  console.log(`  DATABASE_URL:     ${process.env.DATABASE_URL     ? 'SET' : 'MISSING !!!'}`);
});