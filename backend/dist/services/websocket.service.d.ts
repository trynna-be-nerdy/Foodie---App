import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';
/**
 * Initialize WebSocket server
 */
export declare function initializeWebSocket(httpServer: HttpServer): Server;
/**
 * Get the WebSocket server instance
 */
export declare function getIO(): Server | null;
/**
 * Emit order status update to all clients tracking this order
 */
export declare function emitOrderStatusUpdate(orderId: string, status: string, data?: {
    estimatedReadyTime?: Date | null;
    updatedAt?: Date;
}): void;
/**
 * Send notification to a specific user
 */
export declare function emitUserNotification(userId: string, notification: {
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
}): void;
/**
 * Broadcast to all connected clients (for admin announcements)
 */
export declare function broadcastToAll(event: string, data: unknown): void;
//# sourceMappingURL=websocket.service.d.ts.map