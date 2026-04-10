"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = exports.authenticatedRateLimiter = exports.publicRateLimiter = exports.authRateLimiter = void 0;
exports.createRateLimiter = createRateLimiter;
const redis_service_1 = require("../services/redis.service");
// Default rate limit configurations
const defaultConfig = {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10),
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
    keyPrefix: 'ratelimit',
};
// Route-specific rate limits
const routeLimits = {
    auth: {
        windowMs: 60000, // 1 minute
        maxRequests: 5, // 5 requests per minute for auth routes
        keyPrefix: 'ratelimit:auth',
    },
    public: {
        windowMs: 60000, // 1 minute
        maxRequests: 50, // 50 requests per minute for public routes
        keyPrefix: 'ratelimit:public',
    },
    authenticated: {
        windowMs: 60000, // 1 minute
        maxRequests: 100, // 100 requests per minute for authenticated routes
        keyPrefix: 'ratelimit:authenticated',
    },
};
/**
 * Get client identifier (userId if authenticated, IP otherwise)
 */
function getClientIdentifier(req) {
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
function createRateLimiter(config = {}) {
    const mergedConfig = { ...defaultConfig, ...config };
    const { windowMs, maxRequests, keyPrefix } = mergedConfig;
    const windowSeconds = Math.floor(windowMs / 1000);
    return async (req, res, next) => {
        try {
            const clientId = getClientIdentifier(req);
            const now = Date.now();
            const windowStart = now - windowMs;
            const key = `${keyPrefix}:${clientId}`;
            // Use Redis sorted set for sliding window
            const multi = redis_service_1.redis.multi();
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
            const requestCount = results[2]?.[1];
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
        }
        catch (error) {
            // If Redis fails, allow the request but log the error
            console.error('Rate limiter error:', error);
            next();
        }
    };
}
// Pre-configured rate limiters for different route types
exports.authRateLimiter = createRateLimiter(routeLimits.auth);
exports.publicRateLimiter = createRateLimiter(routeLimits.public);
exports.authenticatedRateLimiter = createRateLimiter(routeLimits.authenticated);
// Default rate limiter
exports.rateLimiter = createRateLimiter();
exports.default = exports.rateLimiter;
//# sourceMappingURL=rateLimiter.middleware.js.map