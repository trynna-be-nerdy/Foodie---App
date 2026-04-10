import Stripe from 'stripe';
declare const stripe: Stripe;
export interface CreatePaymentIntentParams {
    amount: number;
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
export declare function createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult>;
/**
 * Retrieve a PaymentIntent by ID
 */
export declare function getPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
/**
 * Capture a PaymentIntent (for manual capture flow)
 */
export declare function capturePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
/**
 * Cancel a PaymentIntent
 */
export declare function cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent>;
/**
 * Create or retrieve a Stripe Customer
 */
export declare function getOrCreateCustomer(userId: string, email: string, name?: string): Promise<Stripe.Customer>;
/**
 * Create an ephemeral key for the Stripe SDK (mobile)
 */
export declare function createEphemeralKey(customerId: string): Promise<Stripe.EphemeralKey>;
/**
 * Process a refund for a PaymentIntent
 */
export declare function createRefund(paymentIntentId: string, amount?: number): Promise<Stripe.Refund>;
/**
 * Verify a webhook signature
 */
export declare function constructWebhookEvent(payload: string | Buffer, signature: string, webhookSecret: string): Stripe.Event;
export { stripe };
//# sourceMappingURL=stripe.service.d.ts.map