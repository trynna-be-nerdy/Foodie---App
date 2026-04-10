import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * POST /api/v1/posts
 * Create a new social post
 */
export declare function createPost(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/posts/feed
 * Get personalized social feed
 */
export declare function getSocialFeed(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/posts/:id
 * Get a single post by ID
 */
export declare function getPost(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/posts/:id/like
 * Like or unlike a post
 */
export declare function toggleLike(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/posts/:id/comment
 * Add a comment to a post
 */
export declare function addComment(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/posts/:id/comments
 * Get comments for a post
 */
export declare function getComments(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * DELETE /api/v1/posts/:id
 * Delete own post
 */
export declare function deletePost(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=post.controller.d.ts.map