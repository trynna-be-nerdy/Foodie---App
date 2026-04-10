interface TangoRecipient {
  name: string;
  email: string;
}

interface TangoOrderResponse {
  orderId?: string;
  reward?: {
    cards?: Array<{ cardNumber?: string; cardPin?: string; expiration?: string }>;
    redemptionCode?: string;
  };
}

const TANGO_API_BASE_URL =
  process.env.TANGO_API_BASE_URL || 'https://integration-api.tangocard.com/raas/v2';
const TANGO_PLATFORM_NAME = process.env.TANGO_PLATFORM_NAME || '';
const TANGO_PLATFORM_KEY = process.env.TANGO_PLATFORM_KEY || '';
const TANGO_ACCOUNT_IDENTIFIER = process.env.TANGO_ACCOUNT_IDENTIFIER || '';
const TANGO_CUSTOMER_IDENTIFIER = process.env.TANGO_CUSTOMER_IDENTIFIER || 'foodie';
const TANGO_SENDER_NAME = process.env.TANGO_SENDER_NAME || 'Foodie Rewards';
const TANGO_SENDER_EMAIL = process.env.TANGO_SENDER_EMAIL || 'rewards@foodie.app';

export function isTangoConfigured(): boolean {
  return Boolean(TANGO_PLATFORM_NAME && TANGO_PLATFORM_KEY && TANGO_ACCOUNT_IDENTIFIER);
}

export async function createTangoGiftCardOrder(params: {
  rewardId: string;
  amount: number;
  recipient: TangoRecipient;
  referenceId: string;
}): Promise<{
  orderId: string | null;
  cardNumber: string | null;
  cardPin: string | null;
  expirationDate: string | null;
}> {
  if (!isTangoConfigured()) {
    throw new Error('Tango Card API is not configured');
  }

  const auth = Buffer.from(`${TANGO_PLATFORM_NAME}:${TANGO_PLATFORM_KEY}`).toString('base64');
  const payload = {
    accountIdentifier: TANGO_ACCOUNT_IDENTIFIER,
    customerIdentifier: TANGO_CUSTOMER_IDENTIFIER,
    referenceOrderID: params.referenceId,
    amount: {
      currencyCode: 'USD',
      value: params.amount,
    },
    reward: {
      rewardId: params.rewardId,
    },
    recipient: params.recipient,
    sender: {
      name: TANGO_SENDER_NAME,
      email: TANGO_SENDER_EMAIL,
    },
  };

  const response = await fetch(`${TANGO_API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Tango API error: ${response.status} ${errorBody}`);
  }

  const data = (await response.json()) as TangoOrderResponse;
  const card = data.reward?.cards?.[0];

  return {
    orderId: data.orderId ?? null,
    cardNumber: card?.cardNumber ?? data.reward?.redemptionCode ?? null,
    cardPin: card?.cardPin ?? null,
    expirationDate: card?.expiration ?? null,
  };
}
