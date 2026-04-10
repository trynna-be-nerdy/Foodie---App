import { Router, raw } from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller';

const router = Router();

// Stripe webhook requires raw body for signature verification
// This middleware must be before any body parsing
router.post('/stripe', raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
