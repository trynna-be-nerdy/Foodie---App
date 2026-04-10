import { Response, NextFunction } from 'express';
import { redis } from '../services/redis.service';
import { AuthenticatedRequest } from '../types';

interface RateLimitConfig {
  windowMs: number;      // Time window in milliseconds
  maxRequests: number;   // Maximum requests per window
  keyPrefix?: string;    // Redis key prefix
}

// Default rate limit configurations
const defaultConfig: RateLimitConfig = {
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  keyPrefix: 'ratelimit',
};

// Route-specific rate limits
const routeLimits: Record<string, RateLimitConfig> = {
  auth: {
    windowMs: 60000,     // 1 minute
    maxRequests: 5,      // 5 requests per minute for auth routes
    keyPrefix: 'ratelimit:auth',
  },
  public: {
    windowMs: 60000,     // 1 minute
    maxRequests: 50,     // 50 requests per minute for public routes
    keyPrefix: 'ratelimit:public',
  },
  authenticated: {
    windowMs: 60000,     // 1 minute
    maxRequests: 100,    // 100 requests per minute for authenticated routes
    keyPrefix: 'ratelimit:authenticated',
  },
};

/**
 * Get client identifier (userId if authenticated, IP otherwise)
 */
function getClientIdentifier(req: AuthenticatedRequest): string {
  if (req.user?.userId) {
    return `user:${req.user.userId}`;
  }

  // Get IP address (handle proxies)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const ip = Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
    return `ip:${ip.trim()}`;
  }

  return `ip:${req.ip || 'unknown'}`;
}

/**
 * Create rate limiter middleware with sliding window algorithm
 */
export function createRateLimiter(config: Partial<RateLimitConfig> = {}) {
  const mergedConfig = { ...defaultConfig, ...config };
  const { windowMs, maxRequests, keyPrefix } = mergedConfig;
  const windowSeconds = Math.floor(windowMs / 1000);

  return async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const clientId = getClientIdentifier(req);
      const now = Date.now();
      const windowStart = now - windowMs;
      const key = `${keyPrefix}:${clientId}`;

      // Use Redis sorted set for sliding window
      const multi = redis.multi();

      // Remove old entries outside the window
      multi.zremrangebyscore(key, 0, windowStart);

      // Add current request
      multi.zadd(key, now, `${now}-${Math.random()}`);

      // Count requests in window
      multi.zcard(key);

      // Set expiry on the key
      multi.expire(key, windowSeconds + 1);

      const results = await multi.exec();

      if (!results) {
        next();
        return;
      }

      const requestCount = results[2]?.[1] as number;

      // Set rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requestCount));
      res.setHeader('X-RateLimit-Reset', Math.ceil((now + windowMs) / 1000));

      if (requestCount > maxRequests) {
        const retryAfter = Math.ceil(windowMs / 1000);
        res.setHeader('Retry-After', retryAfter);

        res.status(429).json({
          success: false,
          error: {
            message: 'Too many requests. Please try again later.',
            code: 'RATE_LIMIT_EXCEEDED',
            details: {
              limit: maxRequests,
              windowMs,
              retryAfter,
            },
          },
        });
        return;
      }

      next();
    } catch (error) {
      // If Redis fails, allow the request but log the error
      console.error('Rate limiter error:', error);
      next();
    }
  };
}

// Pre-configured rate limiters for different route types
export const authRateLimiter = createRateLimiter(routeLimits.auth);
export const publicRateLimiter = createRateLimiter(routeLimits.public);
export const authenticatedRateLimiter = createRateLimiter(routeLimits.authenticated);

// Default rate limiter
export const rateLimiter = createRateLimiter();

export default rateLimiter;
