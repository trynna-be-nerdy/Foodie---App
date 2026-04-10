"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeWebSocket = initializeWebSocket;
exports.getIO = getIO;
exports.emitOrderStatusUpdate = emitOrderStatusUpdate;
exports.emitUserNotification = emitUserNotification;
exports.broadcastToAll = broadcastToAll;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_service_1 = require("./database.service");
let io = null;
/**
 * Initialize WebSocket server
 */
function initializeWebSocket(httpServer) {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
            methods: ['GET', 'POST'],
            credentials: true,
        },
        pingTimeout: 60000,
        pingInterval: 25000,
    });
    // Authentication middleware
    io.use(async (socket, next) => {
        try {
            const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
            if (!token) {
                return next(new Error('Authentication required'));
            }
            const jwtSecret = process.env.JWT_SECRET;
            if (!jwtSecret) {
                return next(new Error('Server configuration error'));
            }
            const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
            socket.userId = decoded.userId;
            next();
        }
        catch (error) {
            next(new Error('Invalid authentication token'));
        }
    });
    // Connection handler
    io.on('connection', (socket) => {
        console.log(`WebSocket connected: ${socket.id} (user: ${socket.userId})`);
        // Join user's personal room for notifications
        if (socket.userId) {
            socket.join(`user:${socket.userId}`);
        }
        // Handle joining order tracking room
        socket.on('join_order', async (data) => {
            try {
                const { orderId } = data;
                // Verify user owns this order
                const order = await database_service_1.prisma.order.findFirst({
                    where: {
                        id: orderId,
                        userId: socket.userId,
                    },
                    select: { id: true },
                });
                if (!order) {
                    socket.emit('error', { message: 'Order not found or access denied' });
                    return;
                }
                socket.join(`order:${orderId}`);
                socket.emit('joined_order', { orderId });
                console.log(`User ${socket.userId} joined order room: ${orderId}`);
            }
            catch (error) {
                console.error('Error joining order room:', error);
                socket.emit('error', { message: 'Failed to join order room' });
            }
        });
        // Handle leaving order tracking room
        socket.on('leave_order', (data) => {
            const { orderId } = data;
            socket.leave(`order:${orderId}`);
            console.log(`User ${socket.userId} left order room: ${orderId}`);
        });
        // Handle disconnect
        socket.on('disconnect', (reason) => {
            console.log(`WebSocket disconnected: ${socket.id} (reason: ${reason})`);
        });
    });
    console.log('WebSocket server initialized');
    return io;
}
/**
 * Get the WebSocket server instance
 */
function getIO() {
    return io;
}
/**
 * Emit order status update to all clients tracking this order
 */
function emitOrderStatusUpdate(orderId, status, data) {
    if (!io) {
        console.warn('WebSocket server not initialized');
        return;
    }
    io.to(`order:${orderId}`).emit('order_status_updated', {
        orderId,
        status,
        estimatedReadyTime: data?.estimatedReadyTime?.toISOString() || null,
        updatedAt: data?.updatedAt?.toISOString() || new Date().toISOString(),
    });
    console.log(`Emitted order status update: ${orderId} -> ${status}`);
}
/**
 * Send notification to a specific user
 */
function emitUserNotification(userId, notification) {
    if (!io) {
        return;
    }
    io.to(`user:${userId}`).emit('notification', notification);
}
/**
 * Broadcast to all connected clients (for admin announcements)
 */
function broadcastToAll(event, data) {
    if (!io) {
        return;
    }
    io.emit(event, data);
}
//# sourceMappingURL=websocket.service.js.map