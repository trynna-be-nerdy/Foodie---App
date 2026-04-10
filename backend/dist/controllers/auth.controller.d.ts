import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * POST /api/v1/auth/signup
 * Register a new user
 */
export declare function signup(req: Request, res: Response): Promise<void>;
/**
 * POST /api/v1/auth/login
 * Authenticate user and return tokens
 */
export declare function login(req: Request, res: Response): Promise<void>;
/**
 * POST /api/v1/auth/refresh
 * Refresh access token using refresh token from cookie
 */
export declare function refresh(req: Request, res: Response): Promise<void>;
/**
 * POST /api/v1/auth/logout
 * Invalidate refresh token and clear cookie
 */
export declare function logout(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/auth/forgot-password
 * Send password reset email
 */
export declare function forgotPassword(req: Request, res: Response): Promise<void>;
/**
 * POST /api/v1/auth/reset-password
 * Reset password using token
 */
export declare function resetPassword(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map