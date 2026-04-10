type StripeResult = {error?: {message: string}} | {error?: undefined};

type StripeActions = {
  initPaymentSheet: (params: Record<string, unknown>) => Promise<StripeResult>;
  presentPaymentSheet: () => Promise<StripeResult>;
};

export function useStripeCompat(): StripeActions {
  return {
    initPaymentSheet: async () => ({
      error: {message: 'Stripe is unavailable in Expo Go.'},
    }),
    presentPaymentSheet: async () => ({
      error: {message: 'Stripe is unavailable in Expo Go.'},
    }),
  };
}
