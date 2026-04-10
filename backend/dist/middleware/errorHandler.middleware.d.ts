import { Request, Response, NextFunction } from 'express';
/**
 * Global error handling middleware
 * Must be placed after all routes
 */
export declare function errorHandler(err: Error, req: Request, res: Response, _next: NextFunction): void;
/**
 * 404 Not Found handler
 * Place before error handler
 */
export declare function notFoundHandler(req: Request, res: Response): void;
/**
 * Async handler wrapper to catch async errors
 * Express 5 handles this natively, but this provides explicit handling
 */
export declare function asyncHandler<T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>): (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=errorHandler.middleware.d.ts.map