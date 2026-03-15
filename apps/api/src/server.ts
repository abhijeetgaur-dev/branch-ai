// apps/api/src/server.ts
import 'dotenv/config';
import express from 'express';
import cors    from 'cors';

import { conversationRouter } from './routes/conversations';
import { nodeRouter }         from './routes/nodes';
import { aiRouter }           from './routes/ai';

const app  = express();
const PORT = process.env.PORT ?? 4000;

// ── Middleware ─────────────────────────────────────
app.use(cors({ origin: process.env.WEB_URL ?? 'http://localhost:5173' }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.use('/api/conversations', conversationRouter);
app.use('/api/nodes',         nodeRouter);
app.use('/api/ai',            aiRouter);

// ── Global error handler ───────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message ?? 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`API running → http://localhost:${PORT}`);
});