import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/redemptions
 * Get current user's redemptions
 */
export declare function getUserRedemptions(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/redemptions/:id/fulfill
 * Fulfill a pending redemption (admin only)
 */
export declare function fulfillRedemptionRequest(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=redemption.controller.d.ts.map