"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_service_1 = require("../services/database.service");
const redis_service_1 = require("../services/redis.service");
const router = (0, express_1.Router)();
/**
 * GET /api/v1/health
 * Health check endpoint for monitoring
 */
router.get('/', async (_req, res) => {
    const startTime = Date.now();
    // Check service connections
    const [dbConnected, redisConnected] = await Promise.all([
        (0, database_service_1.testDatabaseConnection)().catch(() => false),
        (0, redis_service_1.testRedisConnection)().catch(() => false),
    ]);
    const healthStatus = {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        version: process.env.npm_package_version || '1.0.0',
        services: {
            database: dbConnected ? 'connected' : 'disconnected',
            redis: redisConnected ? 'connected' : 'disconnected',
        },
    };
    // Determine overall health status
    if (!dbConnected && !redisConnected) {
        healthStatus.status = 'unhealthy';
    }
    else if (!dbConnected || !redisConnected) {
        healthStatus.status = 'degraded';
    }
    const statusCode = healthStatus.status === 'ok' ? 200 :
        healthStatus.status === 'degraded' ? 200 : 503;
    // Add response time header
    res.setHeader('X-Response-Time', `${Date.now() - startTime}ms`);
    res.status(statusCode).json({
        success: healthStatus.status !== 'unhealthy',
        data: healthStatus,
    });
});
/**
 * GET /api/v1/health/ready
 * Readiness probe for Kubernetes/container orchestration
 */
router.get('/ready', async (_req, res) => {
    const dbConnected = await (0, database_service_1.testDatabaseConnection)().catch(() => false);
    if (dbConnected) {
        res.status(200).json({
            success: true,
            data: { ready: true },
        });
    }
    else {
        res.status(503).json({
            success: false,
            data: { ready: false },
        });
    }
});
/**
 * GET /api/v1/health/live
 * Liveness probe for Kubernetes/container orchestration
 */
router.get('/live', (_req, res) => {
    res.status(200).json({
        success: true,
        data: { alive: true },
    });
});
exports.default = router;
//# sourceMappingURL=health.route.js.map