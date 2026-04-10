import { Response } from 'express';
import { prisma } from '../services/database.service';
import { failRedemption, fulfillRedemption } from '../services/redemption.service';
import { AuthenticatedRequest } from '../types';

/**
 * GET /api/v1/redemptions
 * Get current user's redemptions
 */
export async function getUserRedemptions(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const redemptions = await prisma.redemption.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({
      success: true,
      data: { redemptions },
    });
  } catch (error) {
    console.error('Get redemptions error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch redemptions', code: 'REDEMPTIONS_FETCH_FAILED' },
    });
  }
}

/**
 * POST /api/v1/redemptions/:id/fulfill
 * Fulfill a pending redemption (admin only)
 */
export async function fulfillRedemptionRequest(
  req: AuthenticatedRequest,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    await fulfillRedemption(id);

    res.status(200).json({
      success: true,
      data: { redemptionId: id },
    });
  } catch (error) {
    console.error('Fulfill redemption error:', error);
    if (req.params.id) {
      await failRedemption(req.params.id).catch(() => undefined);
    }
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fulfill redemption', code: 'REDEMPTION_FULFILL_FAILED' },
    });
  }
}
