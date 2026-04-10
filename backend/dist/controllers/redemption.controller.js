"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRedemptions = getUserRedemptions;
exports.fulfillRedemptionRequest = fulfillRedemptionRequest;
const database_service_1 = require("../services/database.service");
const redemption_service_1 = require("../services/redemption.service");
/**
 * GET /api/v1/redemptions
 * Get current user's redemptions
 */
async function getUserRedemptions(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const redemptions = await database_service_1.prisma.redemption.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({
            success: true,
            data: { redemptions },
        });
    }
    catch (error) {
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
async function fulfillRedemptionRequest(req, res) {
    try {
        const { id } = req.params;
        await (0, redemption_service_1.fulfillRedemption)(id);
        res.status(200).json({
            success: true,
            data: { redemptionId: id },
        });
    }
    catch (error) {
        console.error('Fulfill redemption error:', error);
        if (req.params.id) {
            await (0, redemption_service_1.failRedemption)(req.params.id).catch(() => undefined);
        }
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fulfill redemption', code: 'REDEMPTION_FULFILL_FAILED' },
        });
    }
}
//# sourceMappingURL=redemption.controller.js.map