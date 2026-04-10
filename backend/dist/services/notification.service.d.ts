/**
 * Send push notification for order status change
 */
export declare function sendOrderStatusNotification(userId: string, orderId: string, status: string, customMessage?: string): Promise<void>;
/**
 * Send generic push notification to a user
 */
export declare function sendPushNotification(userId: string, title: string, body: string, data?: Record<string, string>): Promise<void>;
/**
 * Register a push token for a user
 */
export declare function registerPushToken(userId: string, token: string): Promise<void>;
/**
 * Unregister a push token for a user
 */
export declare function unregisterPushToken(userId: string, token: string): Promise<void>;
//# sourceMappingURL=notification.service.d.ts.map