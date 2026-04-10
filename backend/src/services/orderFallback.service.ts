import nodemailer from 'nodemailer';
import twilio from 'twilio';

interface OrderItemInfo {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  menuItem: { name: string };
  customizations?: unknown;
  specialInstructions?: string | null;
}

interface OrderInfo {
  id: string;
  fulfillmentType: string;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  serviceFee: number;
  tip: number;
  total: number;
  pointsUsed: number;
  deliveryAddress?: unknown;
  specialInstructions?: string | null;
  createdAt: Date;
}

interface RestaurantInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone?: string | null;
  email?: string | null;
}

interface UserInfo {
  name: string;
  email: string;
  phone?: string | null;
}

interface OrderFallbackPayload {
  order: OrderInfo;
  items: OrderItemInfo[];
  restaurant: RestaurantInfo;
  user: UserInfo;
}

const FALLBACK_ENABLED = process.env.ORDER_FALLBACK_ENABLED !== 'false';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_FROM = process.env.SMTP_FROM;
const SMTP_SECURE = process.env.SMTP_SECURE === 'true';

const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_FROM_NUMBER = process.env.TWILIO_FROM_NUMBER;

const canSendEmail = () =>
  Boolean(SMTP_HOST && SMTP_PORT && SMTP_FROM && (!SMTP_USER || SMTP_PASS));

const canSendSms = () =>
  Boolean(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_FROM_NUMBER);

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

const formatAddress = (restaurant: RestaurantInfo) =>
  `${restaurant.address}, ${restaurant.city}, ${restaurant.state} ${restaurant.zipCode}`;

const formatDeliveryAddress = (address?: unknown) => {
  if (!address || typeof address !== 'object') {
    return 'N/A';
  }
  const safeAddress = address as Record<string, unknown>;
  const street = safeAddress.street || safeAddress.address || '';
  const city = safeAddress.city || '';
  const state = safeAddress.state || '';
  const zip = safeAddress.zipCode || safeAddress.postalCode || '';
  return `${street}, ${city}, ${state} ${zip}`.trim();
};

const formatItems = (items: OrderItemInfo[]) =>
  items
    .map(item => {
      const lineTotal = formatCurrency(item.totalPrice);
      const instructions = item.specialInstructions ? ` (${item.specialInstructions})` : '';
      return `${item.quantity}x ${item.menuItem.name} - ${lineTotal}${instructions}`;
    })
    .join('\n');

const buildEmailBody = ({order, items, restaurant, user}: OrderFallbackPayload) => `
New Foodie Order ${order.id}

Restaurant: ${restaurant.name}
Address: ${formatAddress(restaurant)}

Customer: ${user.name}
Email: ${user.email}
Phone: ${user.phone || 'N/A'}

Fulfillment: ${order.fulfillmentType}
Delivery Address: ${formatDeliveryAddress(order.deliveryAddress)}
Special Instructions: ${order.specialInstructions || 'None'}

Items:
${formatItems(items)}

Subtotal: ${formatCurrency(order.subtotal)}
Tax: ${formatCurrency(order.tax)}
Service Fee: ${formatCurrency(order.serviceFee)}
Delivery Fee: ${formatCurrency(order.deliveryFee)}
Tip: ${formatCurrency(order.tip)}
Points Used: ${order.pointsUsed}
Total: ${formatCurrency(order.total)}
`;

const buildSmsBody = ({order, items, restaurant}: OrderFallbackPayload) => {
  const itemSummary = items
    .slice(0, 3)
    .map(item => `${item.quantity}x ${item.menuItem.name}`)
    .join(', ');
  const moreItems = items.length > 3 ? ` +${items.length - 3} more` : '';

  return `New Foodie order ${order.id} for ${restaurant.name}. ${itemSummary}${moreItems}. Total ${formatCurrency(order.total)}. ${order.fulfillmentType}.`;
};

const createTransporter = () => {
  if (!canSendEmail()) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: SMTP_USER && SMTP_PASS ? {user: SMTP_USER, pass: SMTP_PASS} : undefined,
  });
};

const getTwilioClient = () => {
  if (!canSendSms()) {
    return null;
  }
  return twilio(TWILIO_ACCOUNT_SID as string, TWILIO_AUTH_TOKEN as string);
};

export async function sendOrderFallbackNotifications(payload: OrderFallbackPayload): Promise<void> {
  if (!FALLBACK_ENABLED) {
    return;
  }

  const tasks: Promise<unknown>[] = [];
  const emailTransporter = createTransporter();

  if (emailTransporter && payload.restaurant.email) {
    tasks.push(
      emailTransporter.sendMail({
        from: SMTP_FROM,
        to: payload.restaurant.email,
        subject: `New Foodie Order ${payload.order.id}`,
        text: buildEmailBody(payload),
      }),
    );
  }

  const smsClient = getTwilioClient();
  if (smsClient && payload.restaurant.phone) {
    tasks.push(
      smsClient.messages.create({
        from: TWILIO_FROM_NUMBER as string,
        to: payload.restaurant.phone,
        body: buildSmsBody(payload),
      }),
    );
  }

  if (tasks.length === 0) {
    return;
  }

  const results = await Promise.allSettled(tasks);
  const failures = results.filter(result => result.status === 'rejected');
  if (failures.length > 0) {
    failures.forEach(result => {
      if (result.status === 'rejected') {
        console.error('Order fallback notification failed:', result.reason);
      }
    });
  }
}
