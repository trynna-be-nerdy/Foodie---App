"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables first
dotenv_1.default.config();
// Import configurations
const cors_config_1 = require("./config/cors.config");
// Import middleware
const rateLimiter_middleware_1 = require("./middleware/rateLimiter.middleware");
const errorHandler_middleware_1 = require("./middleware/errorHandler.middleware");
// Import routes
const health_route_1 = __importDefault(require("./routes/health.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const wallet_route_1 = __importDefault(require("./routes/wallet.route"));
const restaurant_route_1 = __importDefault(require("./routes/restaurant.route"));
const receipt_route_1 = __importDefault(require("./routes/receipt.route"));
const qr_route_1 = __importDefault(require("./routes/qr.route"));
const feed_route_1 = __importDefault(require("./routes/feed.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const moderation_route_1 = __importDefault(require("./routes/moderation.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const webhook_route_1 = __importDefault(require("./routes/webhook.route"));
const challenge_route_1 = __importDefault(require("./routes/challenge.route"));
const redemption_route_1 = __importDefault(require("./routes/redemption.route"));
// Import services
const database_service_1 = require("./services/database.service");
const redis_service_1 = require("./services/redis.service");
const websocket_service_1 = require("./services/websocket.service");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const PORT = process.env.PORT || 3000;
// ==================== MIDDLEWARE ====================
// CORS - must be before other middleware
app.use((0, cors_1.default)(cors_config_1.corsOptions));
// Cookie parser - for HTTP-only refresh token cookies
app.use((0, cookie_parser_1.default)());
// Webhook routes - MUST be before JSON body parsing (requires raw body)
app.use('/api/v1/webhooks', webhook_route_1.default);
// Body parsing
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
// Rate limiting
app.use(rateLimiter_middleware_1.rateLimiter);
// Request logging (development only)
if (process.env.NODE_ENV === 'development') {
    app.use((req, _res, next) => {
        console.log(`${new Date().toISOString()} | ${req.method} ${req.path}`);
        next();
    });
}
// ==================== ROUTES ====================
// Health check routes
app.use('/api/v1/health', health_route_1.default);
// Authentication routes
app.use('/api/v1/auth', auth_route_1.default);
// User routes
app.use('/api/v1/users', user_route_1.default);
// Wallet routes
app.use('/api/v1/wallet', wallet_route_1.default);
// Restaurant routes
app.use('/api/v1/restaurants', restaurant_route_1.default);
// Receipt routes
app.use('/api/v1/receipts', receipt_route_1.default);
// QR code routes
app.use('/api/v1/qr', qr_route_1.default);
// Feed routes
app.use('/api/v1/feed', feed_route_1.default);
// Social post routes
app.use('/api/v1/posts', post_route_1.default);
// Moderation routes (admin only)
app.use('/api/v1/moderation', moderation_route_1.default);
// Order routes
app.use('/api/v1/orders', order_route_1.default);
// Challenge routes
app.use('/api/v1/challenges', challenge_route_1.default);
// Redemption routes
app.use('/api/v1/redemptions', redemption_route_1.default);
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
app.use(errorHandler_middleware_1.notFoundHandler);
// Global error handler
app.use(errorHandler_middleware_1.errorHandler);
// ==================== SERVER STARTUP ====================
async function startServer() {
    try {
        console.log('🚀 Starting Foodie API server...\n');
        // Test database connection
        console.log('📦 Testing database connection...');
        const dbConnected = await (0, database_service_1.testDatabaseConnection)().catch(() => false);
        if (!dbConnected) {
            console.warn('⚠️  Database not connected. Some features may be unavailable.');
        }
        // Test Redis connection
        console.log('📦 Testing Redis connection...');
        const redisConnected = await (0, redis_service_1.testRedisConnection)().catch(() => false);
        if (!redisConnected) {
            console.warn('⚠️  Redis not connected. Caching and rate limiting may be affected.');
        }
        // Initialize WebSocket server
        (0, websocket_service_1.initializeWebSocket)(httpServer);
        // Start the server
        httpServer.listen(PORT, () => {
            console.log(`\n✅ Server is running on port ${PORT}`);
            console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`);
            console.log(`🔌 WebSocket: ws://localhost:${PORT}`);
            console.log(`❤️  Health Check: http://localhost:${PORT}/api/v1/health\n`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
// Graceful shutdown
async function gracefulShutdown(signal) {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    try {
        await (0, database_service_1.disconnectDatabase)();
        await (0, redis_service_1.disconnectRedis)();
        console.log('Cleanup completed. Exiting.');
        process.exit(0);
    }
    catch (error) {
        console.error('Error during shutdown:', error);
        process.exit(1);
    }
}
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// Start the server
startServer();
exports.default = app;
//# sourceMappingURL=index.js.map