import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
interface RateLimitConfig {
    windowMs: number;
    maxRequests: number;
    keyPrefix?: string;
}
/**
 * Create rate limiter middleware with sliding window algorithm
 */
export declare function createRateLimiter(config?: Partial<RateLimitConfig>): (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authRateLimiter: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const publicRateLimiter: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const authenticatedRateLimiter: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const rateLimiter: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
export default rateLimiter;
//# sourceMappingURL=rateLimiter.middleware.d.ts.map