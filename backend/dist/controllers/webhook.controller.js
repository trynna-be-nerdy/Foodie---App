"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleStripeWebhook = handleStripeWebhook;
const database_service_1 = require("../services/database.service");
const stripe_service_1 = require("../services/stripe.service");
const notification_service_1 = require("../services/notification.service");
/**
 * POST /api/v1/webhooks/stripe
 * Handle Stripe webhook events for payment processing
 */
async function handleStripeWebhook(req, res) {
    const signature = req.headers['stripe-signature'];
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
    let event;
    try {
        // req.body should be the raw buffer for webhook signature verification
        event = (0, stripe_service_1.constructWebhookEvent)(req.body, signature, webhookSecret);
    }
    catch (err) {
        console.error('Webhook signature verification failed:', err);
        res.status(400).json({ error: 'Webhook signature verification failed' });
        return;
    }
    console.log(`Received Stripe webhook: ${event.type}`);
    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentIntentSucceeded(event.data.object);
                break;
            case 'payment_intent.payment_failed':
                await handlePaymentIntentFailed(event.data.object);
                break;
            case 'payment_intent.requires_action':
                // Log for monitoring 3D Secure flows
                console.log('PaymentIntent requires action (3D Secure):', event.data.object.id);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        res.status(200).json({ received: true });
    }
    catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
}
/**
 * Handle successful payment - auto-confirm order
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
    const order = await database_service_1.prisma.order.findFirst({
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
    await database_service_1.prisma.order.update({
        where: { id: order.id },
        data: {
            status: 'CONFIRMED',
            estimatedReadyTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
        },
    });
    // Deduct points if used
    if (order.pointsUsed > 0) {
        await database_service_1.prisma.pointsWallet.update({
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
        await database_service_1.prisma.pointsTransaction.create({
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
    await (0, notification_service_1.sendOrderStatusNotification)(order.userId, order.id, 'CONFIRMED', `Your order from ${order.restaurant.name} has been confirmed!`);
    console.log(`Order ${order.id} auto-confirmed via webhook`);
}
/**
 * Handle failed payment - mark order as cancelled
 */
async function handlePaymentIntentFailed(paymentIntent) {
    const order = await database_service_1.prisma.order.findFirst({
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
    await database_service_1.prisma.order.update({
        where: { id: order.id },
        data: { status: 'CANCELLED' },
    });
    // Send push notification about failed payment
    await (0, notification_service_1.sendOrderStatusNotification)(order.userId, order.id, 'CANCELLED', 'Your payment failed. Please try again.');
    console.log(`Order ${order.id} cancelled due to payment failure`);
}
//# sourceMappingURL=webhook.controller.js.map