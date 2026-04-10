import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { prisma } from './database.service';

let io: Server | null = null;

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

/**
 * Initialize WebSocket server
 */
export function initializeWebSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
  });

  // Authentication middleware
  io.use(async (socket: AuthenticatedSocket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');

      if (!token) {
        return next(new Error('Authentication required'));
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return next(new Error('Server configuration error'));
      }

      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;
      socket.userId = decoded.userId;
      next();
    } catch (error) {
      next(new Error('Invalid authentication token'));
    }
  });

  // Connection handler
  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log(`WebSocket connected: ${socket.id} (user: ${socket.userId})`);

    // Join user's personal room for notifications
    if (socket.userId) {
      socket.join(`user:${socket.userId}`);
    }

    // Handle joining order tracking room
    socket.on('join_order', async (data: { orderId: string }) => {
      try {
        const { orderId } = data;

        // Verify user owns this order
        const order = await prisma.order.findFirst({
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
      } catch (error) {
        console.error('Error joining order room:', error);
        socket.emit('error', { message: 'Failed to join order room' });
      }
    });

    // Handle leaving order tracking room
    socket.on('leave_order', (data: { orderId: string }) => {
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
export function getIO(): Server | null {
  return io;
}

/**
 * Emit order status update to all clients tracking this order
 */
export function emitOrderStatusUpdate(
  orderId: string,
  status: string,
  data?: {
    estimatedReadyTime?: Date | null;
    updatedAt?: Date;
  }
): void {
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
export function emitUserNotification(
  userId: string,
  notification: {
    type: string;
    title: string;
    message: string;
    data?: Record<string, unknown>;
  }
): void {
  if (!io) {
    return;
  }

  io.to(`user:${userId}`).emit('notification', notification);
}

/**
 * Broadcast to all connected clients (for admin announcements)
 */
export function broadcastToAll(event: string, data: unknown): void {
  if (!io) {
    return;
  }

  io.emit(event, data);
}
