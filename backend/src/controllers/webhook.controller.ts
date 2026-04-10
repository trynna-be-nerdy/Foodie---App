import { Request, Response } from 'express';
import Stripe from 'stripe';
import { prisma } from '../services/database.service';
import { constructWebhookEvent } from '../services/stripe.service';
import { sendOrderStatusNotification } from '../services/notification.service';

/**
 * POST /api/v1/webhooks/stripe
 * Handle Stripe webhook events for payment processing
 */
export async function handleStripeWebhook(req: Request, res: Response): Promise<void> {
  const signature = req.headers['stripe-signature'] as string;

  if (!signature) {
    res.status(400).json({ error: 'Missing stripe-signature header' });
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not configured');
    res.status(500).json({ error: 'Webhook secret not configured' });
    return;
  }

  let event: Stripe.Event;

  try {
    // req.body should be the raw buffer for webhook signature verification
    event = constructWebhookEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).json({ error: 'Webhook signature verification failed' });
    return;
  }

  console.log(`Received Stripe webhook: ${event.type}`);

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentIntentFailed(event.data.object as Stripe.PaymentIntent);
        break;

      case 'payment_intent.requires_action':
        // Log for monitoring 3D Secure flows
        console.log('PaymentIntent requires action (3D Secure):', (event.data.object as Stripe.PaymentIntent).id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
}

/**
 * Handle successful payment - auto-confirm order
 */
async function handlePaymentIntentSucceeded(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const order = await prisma.order.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
    include: {
      restaurant: {
        select: { id: true, name: true },
      },
    },
  });

  if (!order) {
    console.error(`Order not found for PaymentIntent: ${paymentIntent.id}`);
    return;
  }

  // Skip if already processed (idempotency)
  if (order.status !== 'PENDING') {
    console.log(`Order ${order.id} already processed, status: ${order.status}`);
    return;
  }

  // Update order status to CONFIRMED
  await prisma.order.update({
    where: { id: order.id },
    data: {
      status: 'CONFIRMED',
      estimatedReadyTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
    },
  });

  // Deduct points if used
  if (order.pointsUsed > 0) {
    await prisma.pointsWallet.update({
      where: {
        userId_restaurantId: {
          userId: order.userId,
          restaurantId: order.restaurantId,
        },
      },
      data: {
        balance: { decrement: order.pointsUsed },
      },
    });

    await prisma.pointsTransaction.create({
      data: {
        userId: order.userId,
        restaurantId: order.restaurantId,
        amount: -order.pointsUsed,
        type: 'REDEEM',
        source: 'order',
        orderId: order.id,
      },
    });
  }

  // Send push notification
  await sendOrderStatusNotification(
    order.userId,
    order.id,
    'CONFIRMED',
    `Your order from ${order.restaurant.name} has been confirmed!`
  );

  console.log(`Order ${order.id} auto-confirmed via webhook`);
}

/**
 * Handle failed payment - mark order as cancelled
 */
async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  const order = await prisma.order.findFirst({
    where: { stripePaymentIntentId: paymentIntent.id },
  });

  if (!order) {
    console.error(`Order not found for failed PaymentIntent: ${paymentIntent.id}`);
    return;
  }

  // Skip if already processed
  if (order.status !== 'PENDING') {
    console.log(`Order ${order.id} already processed, status: ${order.status}`);
    return;
  }

  // Update order status to CANCELLED
  await prisma.order.update({
    where: { id: order.id },
    data: { status: 'CANCELLED' },
  });

  // Send push notification about failed payment
  await sendOrderStatusNotification(
    order.userId,
    order.id,
    'CANCELLED',
    'Your payment failed. Please try again.'
  );

  console.log(`Order ${order.id} cancelled due to payment failure`);
}
