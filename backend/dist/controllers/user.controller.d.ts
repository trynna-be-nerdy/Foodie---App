import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/users/me
 * Get current user profile
 */
export declare function getProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * PUT /api/v1/users/me
 * Update current user profile
 */
export declare function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/users/:id
 * Get another user's public profile
 */
export declare function getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/users/:id/follow
 * Follow or unfollow a user
 */
export declare function toggleFollow(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/users/:id/posts
 * Get posts by a specific user
 */
export declare function getUserPosts(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * DELETE /api/v1/users/me
 * Delete (soft delete) current user account
 */
export declare function deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/users/push-token
 * Register a push notification token for the current user
 */
export declare function registerUserPushToken(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * DELETE /api/v1/users/push-token
 * Unregister a push notification token for the current user
 */
export declare function unregisterUserPushToken(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map