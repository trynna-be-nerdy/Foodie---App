import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * Authentication middleware - verifies JWT access token
 */
export declare function authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export declare const authenticateToken: typeof authenticate;
/**
 * Optional authentication - doesn't fail if no token provided
 */
export declare function optionalAuth(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
/**
 * Role-based authorization middleware
 */
export declare function authorize(...allowedRoles: string[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map