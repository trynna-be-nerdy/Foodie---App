"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderStatusNotification = sendOrderStatusNotification;
exports.sendPushNotification = sendPushNotification;
exports.registerPushToken = registerPushToken;
exports.unregisterPushToken = unregisterPushToken;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const database_service_1 = require("./database.service");
// Initialize Firebase Admin SDK (lazy initialization)
let firebaseInitialized = false;
function initializeFirebase() {
    if (firebaseInitialized)
        return;
    const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (serviceAccount) {
        try {
            const credentials = JSON.parse(serviceAccount);
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(credentials),
            });
            firebaseInitialized = true;
            console.log('Firebase Admin SDK initialized');
        }
        catch (error) {
            console.error('Failed to initialize Firebase Admin SDK:', error);
        }
    }
    else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
        // Use default credentials from environment
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.applicationDefault(),
        });
        firebaseInitialized = true;
        console.log('Firebase Admin SDK initialized with default credentials');
    }
    else {
        console.warn('Firebase credentials not configured. Push notifications disabled.');
    }
}
// Order status messages
const ORDER_STATUS_MESSAGES = {
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
async function sendOrderStatusNotification(userId, orderId, status, customMessage) {
    initializeFirebase();
    if (!firebaseInitialized) {
        console.log('Firebase not initialized, skipping push notification');
        return;
    }
    try {
        // Get user's push tokens
        const user = await database_service_1.prisma.user.findUnique({
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
                priority: 'high',
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
        const responses = await Promise.allSettled(notifications.map((msg) => firebase_admin_1.default.messaging().send(msg)));
        // Handle invalid tokens
        const invalidTokens = [];
        responses.forEach((response, index) => {
            if (response.status === 'rejected') {
                const error = response.reason;
                if (error.code === 'messaging/invalid-registration-token' ||
                    error.code === 'messaging/registration-token-not-registered') {
                    invalidTokens.push(user.pushTokens[index]);
                }
                console.error(`Failed to send notification to token ${index}:`, error.message);
            }
        });
        // Remove invalid tokens from database
        if (invalidTokens.length > 0) {
            const validTokens = user.pushTokens.filter((t) => !invalidTokens.includes(t));
            await database_service_1.prisma.user.update({
                where: { id: userId },
                data: { pushTokens: validTokens },
            });
            console.log(`Removed ${invalidTokens.length} invalid push tokens for user ${userId}`);
        }
        const successCount = responses.filter((r) => r.status === 'fulfilled').length;
        console.log(`Sent ${successCount}/${notifications.length} push notifications for order ${orderId}`);
    }
    catch (error) {
        console.error('Error sending order status notification:', error);
    }
}
/**
 * Send generic push notification to a user
 */
async function sendPushNotification(userId, title, body, data) {
    initializeFirebase();
    if (!firebaseInitialized) {
        return;
    }
    try {
        const user = await database_service_1.prisma.user.findUnique({
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
                priority: 'high',
            },
            apns: {
                payload: {
                    aps: { sound: 'default' },
                },
            },
        }));
        await Promise.allSettled(messages.map((msg) => firebase_admin_1.default.messaging().send(msg)));
    }
    catch (error) {
        console.error('Error sending push notification:', error);
    }
}
/**
 * Register a push token for a user
 */
async function registerPushToken(userId, token) {
    try {
        const user = await database_service_1.prisma.user.findUnique({
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
        await database_service_1.prisma.user.update({
            where: { id: userId },
            data: { pushTokens: updatedTokens },
        });
        console.log(`Registered push token for user ${userId}`);
    }
    catch (error) {
        console.error('Error registering push token:', error);
        throw error;
    }
}
/**
 * Unregister a push token for a user
 */
async function unregisterPushToken(userId, token) {
    try {
        const user = await database_service_1.prisma.user.findUnique({
            where: { id: userId },
            select: { pushTokens: true },
        });
        if (!user?.pushTokens) {
            return;
        }
        const updatedTokens = user.pushTokens.filter((t) => t !== token);
        await database_service_1.prisma.user.update({
            where: { id: userId },
            data: { pushTokens: updatedTokens },
        });
    }
    catch (error) {
        console.error('Error unregistering push token:', error);
        throw error;
    }
}
//# sourceMappingURL=notification.service.js.map