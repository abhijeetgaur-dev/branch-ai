// apps/api/src/middleware/auth.ts
import { clerkMiddleware, getAuth, clerkClient } from '@clerk/express';
import { prisma } from '@branch-ai/database';
import type { Request, Response, NextFunction } from 'express';

export const clerkAuth = clerkMiddleware;

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Try to upsert user — but ALWAYS call next() regardless
    try {
      const clerkUser    = await clerkClient.users.getUser(userId);
      const primaryEmail = clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      );
      const name = [clerkUser.firstName, clerkUser.lastName]
        .filter(Boolean).join(' ') || 'User';

      await prisma.user.upsert({
        where:  { id: userId },
        update: { email: primaryEmail?.emailAddress ?? undefined, name, avatar: clerkUser.imageUrl ?? null },
        create: { id: userId, email: primaryEmail?.emailAddress ?? '', name, avatar: clerkUser.imageUrl ?? null },
      });

      console.log(`[auth] user synced: ${userId}`);
    } catch (upsertErr: any) {
      // Log but never let this block the request
      console.error('[auth] upsert error (non-fatal):', upsertErr?.message ?? upsertErr);
    }

    (req as AuthedRequest).auth = { userId };
    next();

  } catch (err: any) {
    console.error('[auth] requireAuth crashed:', err?.message ?? err);
    res.status(500).json({ error: 'Auth middleware error' });
  }
}

export interface AuthedRequest extends Request {
  auth: { userId: string };
}