import Stripe from 'stripe';

// Initialize Stripe with API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-12-15.clover',
});

export interface CreatePaymentIntentParams {
  amount: number; // Amount in cents
  currency?: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export interface PaymentIntentResult {
  paymentIntentId: string;
  clientSecret: string;
  status: string;
}

/**
 * Create a Stripe PaymentIntent for order checkout
 */
export async function createPaymentIntent(
  params: CreatePaymentIntentParams
): Promise<PaymentIntentResult> {
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
export async function getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.retrieve(paymentIntentId);
}

/**
 * Capture a PaymentIntent (for manual capture flow)
 */
export async function capturePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.capture(paymentIntentId);
}

/**
 * Cancel a PaymentIntent
 */
export async function cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
  return stripe.paymentIntents.cancel(paymentIntentId);
}

/**
 * Create or retrieve a Stripe Customer
 */
export async function getOrCreateCustomer(
  userId: string,
  email: string,
  name?: string
): Promise<Stripe.Customer> {
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
export async function createEphemeralKey(customerId: string): Promise<Stripe.EphemeralKey> {
  return stripe.ephemeralKeys.create(
    { customer: customerId },
    { apiVersion: '2025-12-15.clover' }
  );
}

/**
 * Process a refund for a PaymentIntent
 */
export async function createRefund(
  paymentIntentId: string,
  amount?: number
): Promise<Stripe.Refund> {
  return stripe.refunds.create({
    payment_intent: paymentIntentId,
    amount, // If not provided, refunds the full amount
  });
}

/**
 * Verify a webhook signature
 */
export function constructWebhookEvent(
  payload: string | Buffer,
  signature: string,
  webhookSecret: string
): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}

export { stripe };
