import express, { Application } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Import configurations
import { corsOptions } from './config/cors.config';

// Import middleware
import { rateLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.middleware';

// Import routes
import healthRoutes from './routes/health.route';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import walletRoutes from './routes/wallet.route';
import restaurantRoutes from './routes/restaurant.route';
import receiptRoutes from './routes/receipt.route';
import qrRoutes from './routes/qr.route';
import feedRoutes from './routes/feed.route';
import postRoutes from './routes/post.route';
import moderationRoutes from './routes/moderation.route';
import orderRoutes from './routes/order.route';
import webhookRoutes from './routes/webhook.route';
import challengeRoutes from './routes/challenge.route';
import redemptionRoutes from './routes/redemption.route';

// Import services
import { testDatabaseConnection, disconnectDatabase } from './services/database.service';
import { testRedisConnection, disconnectRedis } from './services/redis.service';
import { initializeWebSocket } from './services/websocket.service';

const app: Application = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3000;

// ==================== MIDDLEWARE ====================

// CORS - must be before other middleware
app.use(cors(corsOptions));

// Cookie parser - for HTTP-only refresh token cookies
app.use(cookieParser());

// Webhook routes - MUST be before JSON body parsing (requires raw body)
app.use('/api/v1/webhooks', webhookRoutes);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
app.use(rateLimiter);

// Request logging (development only)
if (process.env.NODE_ENV === 'development') {
  app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
    next();
  });
}

// ==================== ROUTES ====================

// Health check routes
app.use('/api/v1/health', healthRoutes);

// Authentication routes
app.use('/api/v1/auth', authRoutes);

// User routes
app.use('/api/v1/users', userRoutes);

// Wallet routes
app.use('/api/v1/wallet', walletRoutes);

// Restaurant routes
app.use('/api/v1/restaurants', restaurantRoutes);

// Receipt routes
app.use('/api/v1/receipts', receiptRoutes);

// QR code routes
app.use('/api/v1/qr', qrRoutes);

// Feed routes
app.use('/api/v1/feed', feedRoutes);

// Social post routes
app.use('/api/v1/posts', postRoutes);

// Moderation routes (admin only)
app.use('/api/v1/moderation', moderationRoutes);

// Order routes
app.use('/api/v1/orders', orderRoutes);

// Challenge routes
app.use('/api/v1/challenges', challengeRoutes);

// Redemption routes
app.use('/api/v1/redemptions', redemptionRoutes);

// Root route
app.get('/', (_req, res) => {
  res.json({
    success: true,
    data: {
      message: 'Foodie API is running!',
      version: '1.0.0',
      documentation: '/api/v1/docs',
    },
  });
});

// API version info
app.get('/api/v1', (_req, res) => {
  res.json({
    success: true,
    data: {
      name: 'Foodie API',
      version: '1.0.0',
      endpoints: {
        health: '/api/v1/health',
        auth: '/api/v1/auth',
        users: '/api/v1/users',
        restaurants: '/api/v1/restaurants',
        wallet: '/api/v1/wallet',
        orders: '/api/v1/orders',
        posts: '/api/v1/posts',
        challenges: '/api/v1/challenges',
        redemptions: '/api/v1/redemptions',
        events: '/api/v1/events',
      },
    },
  });
});

// ==================== ERROR HANDLING ====================

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// ==================== SERVER STARTUP ====================

async function startServer(): Promise<void> {
  try {
    console.log('🚀 Starting Foodie API server...\n');

    // Test database connection
    console.log('📦 Testing database connection...');
    const dbConnected = await testDatabaseConnection().catch(() => false);
    if (!dbConnected) {
      console.warn('⚠️  Database not connected. Some features may be unavailable.');
    }

    // Test Redis connection
    console.log('📦 Testing Redis connection...');
    const redisConnected = await testRedisConnection().catch(() => false);
    if (!redisConnected) {
      console.warn('⚠️  Redis not connected. Caching and rate limiting may be affected.');
    }

    // Initialize WebSocket server
    initializeWebSocket(httpServer);

    // Start the server
    httpServer.listen(PORT, () => {
      console.log(`\n✅ Server is running on port ${PORT}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
      console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
      console.log(`❤️  Health Check: http://localhost:${PORT}/api/v1/health\n`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
async function gracefulShutdown(signal: string): Promise<void> {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  try {
    await disconnectDatabase();
    await disconnectRedis();
    console.log('Cleanup completed. Exiting.');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
startServer();

export default app;
