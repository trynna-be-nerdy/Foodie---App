import { Router, Request, Response } from 'express';
import { testDatabaseConnection } from '../services/database.service';
import { testRedisConnection } from '../services/redis.service';

const router = Router();

interface HealthStatus {
  status: 'ok' | 'degraded' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  services: {
    database: 'connected' | 'disconnected';
    redis: 'connected' | 'disconnected';
  };
}

/**
 * GET /api/v1/health
 * Health check endpoint for monitoring
 */
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const startTime = Date.now();

  // Check service connections
  const [dbConnected, redisConnected] = await Promise.all([
    testDatabaseConnection().catch(() => false),
    testRedisConnection().catch(() => false),
  ]);

  const healthStatus: HealthStatus = {
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
  } else if (!dbConnected || !redisConnected) {
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
router.get('/ready', async (_req: Request, res: Response): Promise<void> => {
  const dbConnected = await testDatabaseConnection().catch(() => false);

  if (dbConnected) {
    res.status(200).json({
      success: true,
      data: { ready: true },
    });
  } else {
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
router.get('/live', (_req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    data: { alive: true },
  });
});

export default router;
