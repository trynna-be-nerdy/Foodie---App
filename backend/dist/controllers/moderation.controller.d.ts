import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/moderation/flagged
 * Get flagged posts awaiting review (admin only)
 */
export declare function getFlaggedPosts(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/moderation/comments/flagged
 * Get flagged comments awaiting review (admin only)
 */
export declare function getFlaggedComments(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/moderation/posts/:id
 * Approve or reject a flagged post (admin only)
 */
export declare function moderatePost(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/moderation/comments/:id
 * Approve or reject a flagged comment (admin only)
 */
export declare function moderateComment(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=moderation.controller.d.ts.map