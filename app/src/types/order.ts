export type FulfillmentType = 'PICKUP' | 'DELIVERY' | 'DINE_IN';

export interface DeliveryAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  instructions?: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  imageUrl?: string | null;
  unitPrice: number;
  quantity: number;
  customizations?: Record<string, unknown> | null;
  specialInstructions?: string | null;
}

export interface OrderItemPayload {
  menuItemId: string;
  quantity: number;
  customizations?: Record<string, unknown> | null;
  specialInstructions?: string | null;
}

export interface CreateOrderPayload {
  restaurantId: string;
  items: OrderItemPayload[];
  fulfillmentType: FulfillmentType;
  deliveryAddress?: DeliveryAddress;
  tip?: number;
  pointsToUse?: number;
  specialInstructions?: string;
}

export interface OrderPaymentData {
  clientSecret: string;
  ephemeralKey: string;
  customerId: string;
  paymentIntentId: string;
}

export interface OrderTotals {
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  pointsDiscount: number;
  pointsUsed: number;
  pointsToEarn: number;
}
