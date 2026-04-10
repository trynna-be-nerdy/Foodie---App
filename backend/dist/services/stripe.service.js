"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
exports.createPaymentIntent = createPaymentIntent;
exports.getPaymentIntent = getPaymentIntent;
exports.capturePaymentIntent = capturePaymentIntent;
exports.cancelPaymentIntent = cancelPaymentIntent;
exports.getOrCreateCustomer = getOrCreateCustomer;
exports.createEphemeralKey = createEphemeralKey;
exports.createRefund = createRefund;
exports.constructWebhookEvent = constructWebhookEvent;
const stripe_1 = __importDefault(require("stripe"));
// Initialize Stripe with API key
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-12-15.clover',
});
exports.stripe = stripe;
/**
 * Create a Stripe PaymentIntent for order checkout
 */
async function createPaymentIntent(params) {
    const { amount, currency = 'usd', customerId, metadata } = params;
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        customer: customerId,
        metadata,
        automatic_payment_methods: {
            enabled: true,
        },
    });
    return {
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret || '',
        status: paymentIntent.status,
    };
}
/**
 * Retrieve a PaymentIntent by ID
 */
async function getPaymentIntent(paymentIntentId) {
    return stripe.paymentIntents.retrieve(paymentIntentId);
}
/**
 * Capture a PaymentIntent (for manual capture flow)
 */
async function capturePaymentIntent(paymentIntentId) {
    return stripe.paymentIntents.capture(paymentIntentId);
}
/**
 * Cancel a PaymentIntent
 */
async function cancelPaymentIntent(paymentIntentId) {
    return stripe.paymentIntents.cancel(paymentIntentId);
}
/**
 * Create or retrieve a Stripe Customer
 */
async function getOrCreateCustomer(userId, email, name) {
    // Search for existing customer by metadata
    const existingCustomers = await stripe.customers.list({
        email,
        limit: 1,
    });
    if (existingCustomers.data.length > 0) {
        return existingCustomers.data[0];
    }
    // Create new customer
    return stripe.customers.create({
        email,
        name,
        metadata: {
            foodie_user_id: userId,
        },
    });
}
/**
 * Create an ephemeral key for the Stripe SDK (mobile)
 */
async function createEphemeralKey(customerId) {
    return stripe.ephemeralKeys.create({ customer: customerId }, { apiVersion: '2025-12-15.clover' });
}
/**
 * Process a refund for a PaymentIntent
 */
async function createRefund(paymentIntentId, amount) {
    return stripe.refunds.create({
        payment_intent: paymentIntentId,
        amount, // If not provided, refunds the full amount
    });
}
/**
 * Verify a webhook signature
 */
function constructWebhookEvent(payload, signature, webhookSecret) {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
//# sourceMappingURL=stripe.service.js.map