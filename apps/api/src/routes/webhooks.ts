// apps/api/src/routes/webhooks.ts
// Handles Clerk webhook events.
// Clerk calls this endpoint when users are created, updated, or deleted.
// We sync these events to our PostgreSQL users table.
//
// Setup in Clerk dashboard:
//   Webhooks → Add endpoint → https://your-domain.com/webhooks/clerk
//   Events to subscribe: user.created, user.updated, user.deleted

import { Router }       from 'express';
import { Webhook }      from 'svix';
import { prisma }       from '@branch-ai/database';
import type { Request } from 'express';

export const webhookRouter = Router();

// Clerk sends webhook payloads with svix signature headers
const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

// ── POST /webhooks/clerk ─────────────────────────
webhookRouter.post('/clerk', async (req: Request, res) => {
  if (!WEBHOOK_SECRET) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  // Verify the webhook signature using svix
  const svix_id         = req.headers['svix-id']         as string;
  const svix_timestamp  = req.headers['svix-timestamp']  as string;
  const svix_signature  = req.headers['svix-signature']  as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    res.status(400).json({ error: 'Missing svix headers' });
    return;
  }

  let payload: WebhookPayload;
  try {
    const wh    = new Webhook(WEBHOOK_SECRET);
    const body  = JSON.stringify(req.body);
    payload     = wh.verify(body, {
      'svix-id':        svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookPayload;
  } catch {
    res.status(400).json({ error: 'Invalid webhook signature' });
    return;
  }

  const { type, data } = payload;

  try {
    switch (type) {

      // ── User created in Clerk → create in our DB ──
      case 'user.created': {
        const primaryEmail = data.email_addresses?.find(
          (e) => e.id === data.primary_email_address_id
        );

        await prisma.user.create({
          data: {
            id:     data.id,   // Use Clerk's user ID as our PK
            email:  primaryEmail?.email_address ?? '',
            name:   [data.first_name, data.last_name].filter(Boolean).join(' ') || 'User',
            avatar: data.image_url ?? null,
          },
        });

        console.log(`[webhook] user.created: ${data.id}`);
        break;
      }

      // ── User updated in Clerk → update in our DB ──
      case 'user.updated': {
        const primaryEmail = data.email_addresses?.find(
          (e) => e.id === data.primary_email_address_id
        );

        await prisma.user.update({
          where: { id: data.id },
          data: {
            email:  primaryEmail?.email_address ?? undefined,
            name:   [data.first_name, data.last_name].filter(Boolean).join(' ') || undefined,
            avatar: data.image_url ?? null,
          },
        });

        console.log(`[webhook] user.updated: ${data.id}`);
        break;
      }

      // ── User deleted in Clerk → delete in our DB ──
      case 'user.deleted': {
        // Cascade deletes conversations → nodes → blocks via schema relations
        await prisma.user.delete({
          where: { id: data.id },
        }).catch(() => {
          // User may not exist if webhook fires before user.created
          console.warn(`[webhook] user.deleted: ${data.id} not found in DB`);
        });

        console.log(`[webhook] user.deleted: ${data.id}`);
        break;
      }

      default:
        console.log(`[webhook] unhandled event: ${type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error(`[webhook] error handling ${type}:`, err);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// ─────────────────────────────────────────────
// Webhook payload types (minimal, what we need)
// ─────────────────────────────────────────────

interface EmailAddress {
  id:            string;
  email_address: string;
}

interface UserData {
  id:                         string;
  first_name:                 string | null;
  last_name:                  string | null;
  image_url:                  string | null;
  primary_email_address_id:   string | null;
  email_addresses:            EmailAddress[];
}

interface WebhookPayload {
  type: 'user.created' | 'user.updated' | 'user.deleted' | string;
  data: UserData;
}