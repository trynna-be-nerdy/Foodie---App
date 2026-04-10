import admin from 'firebase-admin';
import { prisma } from './database.service';

// Initialize Firebase Admin SDK (lazy initialization)
let firebaseInitialized = false;

function initializeFirebase(): void {
  if (firebaseInitialized) return;

  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (serviceAccount) {
    try {
      const credentials = JSON.parse(serviceAccount);
      admin.initializeApp({
        credential: admin.credential.cert(credentials),
      });
      firebaseInitialized = true;
      console.log('Firebase Admin SDK initialized');
    } catch (error) {
      console.error('Failed to initialize Firebase Admin SDK:', error);
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // Use default credentials from environment
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    firebaseInitialized = true;
    console.log('Firebase Admin SDK initialized with default credentials');
  } else {
    console.warn('Firebase credentials not configured. Push notifications disabled.');
  }
}

// Order status messages
const ORDER_STATUS_MESSAGES: Record<string, string> = {
  CONFIRMED: 'Your order has been confirmed!',
  PREPARING: 'Your order is being prepared.',
  READY: 'Your order is ready!',
  OUT_FOR_DELIVERY: 'Your order is out for delivery!',
  DELIVERED: 'Your order has been delivered. Enjoy!',
  COMPLETED: 'Thank you for your order!',
  CANCELLED: 'Your order has been cancelled.',
};

/**
 * Send push notification for order status change
 */
export async function sendOrderStatusNotification(
  userId: string,
  orderId: string,
  status: string,
  customMessage?: string
): Promise<void> {
  initializeFirebase();

  if (!firebaseInitialized) {
    console.log('Firebase not initialized, skipping push notification');
    return;
  }

  try {
    // Get user's push tokens
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushTokens: true, name: true },
    });

    if (!user?.pushTokens || user.pushTokens.length === 0) {
      console.log(`No push tokens for user ${userId}`);
      return;
    }

    const message = customMessage || ORDER_STATUS_MESSAGES[status] || `Order status updated to ${status}`;
    const title = status === 'CANCELLED' ? 'Order Cancelled' : 'Order Update';

    // Send to all user's devices
    const notifications = user.pushTokens.map((token) => ({
      token,
      notification: {
        title,
        body: message,
      },
      data: {
        type: 'ORDER_UPDATE',
        orderId,
        status,
        routeName: 'OrderTracking',
        routeParams: JSON.stringify({ orderId }),
      },
      android: {
        priority: 'high' as const,
        notification: {
          channelId: 'orders',
          sound: 'default',
        },
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1,
          },
        },
      },
    }));

    const responses = await Promise.allSettled(
      notifications.map((msg) => admin.messaging().send(msg))
    );

    // Handle invalid tokens
    const invalidTokens: string[] = [];
    responses.forEach((response, index) => {
      if (response.status === 'rejected') {
        const error = response.reason;
        if (
          error.code === 'messaging/invalid-registration-token' ||
          error.code === 'messaging/registration-token-not-registered'
        ) {
          invalidTokens.push(user.pushTokens[index]);
        }
        console.error(`Failed to send notification to token ${index}:`, error.message);
      }
    });

    // Remove invalid tokens from database
    if (invalidTokens.length > 0) {
      const validTokens = user.pushTokens.filter((t) => !invalidTokens.includes(t));
      await prisma.user.update({
        where: { id: userId },
        data: { pushTokens: validTokens },
      });
      console.log(`Removed ${invalidTokens.length} invalid push tokens for user ${userId}`);
    }

    const successCount = responses.filter((r) => r.status === 'fulfilled').length;
    console.log(`Sent ${successCount}/${notifications.length} push notifications for order ${orderId}`);
  } catch (error) {
    console.error('Error sending order status notification:', error);
  }
}

/**
 * Send generic push notification to a user
 */
export async function sendPushNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  initializeFirebase();

  if (!firebaseInitialized) {
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushTokens: true },
    });

    if (!user?.pushTokens || user.pushTokens.length === 0) {
      return;
    }

    const messages = user.pushTokens.map((token) => ({
      token,
      notification: { title, body },
      data: data || {},
      android: {
        priority: 'high' as const,
      },
      apns: {
        payload: {
          aps: { sound: 'default' },
        },
      },
    }));

    await Promise.allSettled(messages.map((msg) => admin.messaging().send(msg)));
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
}

/**
 * Register a push token for a user
 */
export async function registerPushToken(userId: string, token: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushTokens: true },
    });

    const currentTokens = user?.pushTokens || [];

    // Don't add duplicate tokens
    if (currentTokens.includes(token)) {
      return;
    }

    // Keep max 5 tokens per user (most recent devices)
    const updatedTokens = [...currentTokens, token].slice(-5);

    await prisma.user.update({
      where: { id: userId },
      data: { pushTokens: updatedTokens },
    });

    console.log(`Registered push token for user ${userId}`);
  } catch (error) {
    console.error('Error registering push token:', error);
    throw error;
  }
}

/**
 * Unregister a push token for a user
 */
export async function unregisterPushToken(userId: string, token: string): Promise<void> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { pushTokens: true },
    });

    if (!user?.pushTokens) {
      return;
    }

    const updatedTokens = user.pushTokens.filter((t) => t !== token);

    await prisma.user.update({
      where: { id: userId },
      data: { pushTokens: updatedTokens },
    });
  } catch (error) {
    console.error('Error unregistering push token:', error);
    throw error;
  }
}
