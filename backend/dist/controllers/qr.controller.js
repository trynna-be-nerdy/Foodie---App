"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanQRCode = scanQRCode;
exports.getScanStatus = getScanStatus;
exports.getScanHistoryHandler = getScanHistoryHandler;
exports.generateQR = generateQR;
exports.setupQRForRestaurant = setupQRForRestaurant;
exports.getQRStats = getQRStats;
const zod_1 = require("zod");
const qr_service_1 = require("../services/qr.service");
const database_service_1 = require("../services/database.service");
// Validation schema for QR scan payload
const qrScanSchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1),
    transactionId: zod_1.z.string().min(1),
    amount: zod_1.z.number().positive(),
    timestamp: zod_1.z.number().positive(),
    signature: zod_1.z.string().length(64), // SHA256 hex is 64 chars
});
// Scan QR code endpoint
async function scanQRCode(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const validation = qrScanSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                error: 'Invalid QR code format',
                errorCode: 'INVALID_FORMAT',
                issues: validation.error.issues,
            });
            return;
        }
        const payload = validation.data;
        const result = await (0, qr_service_1.processQRScan)(userId, payload);
        if (!result.success) {
            const statusCode = result.errorCode === 'RATE_LIMITED' ? 429 :
                result.errorCode === 'DUPLICATE' ? 409 :
                    result.errorCode === 'EXPIRED' ? 410 : 400;
            res.status(statusCode).json({
                error: result.error,
                errorCode: result.errorCode,
            });
            return;
        }
        res.status(200).json({
            success: true,
            scanId: result.scanId,
            pointsEarned: result.pointsEarned,
            restaurantName: result.restaurantName,
        });
    }
    catch (error) {
        next(error);
    }
}
// Get scan status/limit for user
async function getScanStatus(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const todayCount = await (0, qr_service_1.getTodayScanCount)(userId);
        const remaining = Math.max(0, 10 - todayCount);
        res.json({
            todayScans: todayCount,
            dailyLimit: 10,
            remaining,
            canScan: remaining > 0,
        });
    }
    catch (error) {
        next(error);
    }
}
// Get scan history
async function getScanHistoryHandler(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = parseInt(req.query.offset) || 0;
        const { scans, total } = await (0, qr_service_1.getScanHistory)(userId, limit, offset);
        res.json({
            scans,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + scans.length < total,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
// === ADMIN ENDPOINTS ===
// Generate QR code for a transaction (restaurant admin use)
const generateQRSchema = zod_1.z.object({
    transactionId: zod_1.z.string().min(1),
    amount: zod_1.z.number().positive(),
});
async function generateQR(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { restaurantId } = req.params;
        // Verify user has access to this restaurant (simplified - would need proper RBAC)
        const restaurant = await database_service_1.prisma.restaurant.findUnique({
            where: { id: restaurantId },
            select: { id: true, name: true, qrSecret: true },
        });
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        if (!restaurant.qrSecret) {
            res.status(400).json({ error: 'QR scanning not configured for this restaurant' });
            return;
        }
        const validation = generateQRSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                error: 'Validation failed',
                issues: validation.error.issues,
            });
            return;
        }
        const { transactionId, amount } = validation.data;
        const qrData = await (0, qr_service_1.generateQRCodeData)(restaurantId, transactionId, amount);
        if (!qrData) {
            res.status(500).json({ error: 'Failed to generate QR code' });
            return;
        }
        res.json({
            qrData,
            // Base64 encoded JSON for direct QR code generation
            qrString: Buffer.from(JSON.stringify(qrData)).toString('base64'),
            expiresAt: new Date(qrData.timestamp + 10 * 60 * 1000).toISOString(),
        });
    }
    catch (error) {
        next(error);
    }
}
// Setup QR scanning for a restaurant (admin)
async function setupQRForRestaurant(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { restaurantId } = req.params;
        // Verify restaurant exists
        const restaurant = await database_service_1.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });
        if (!restaurant) {
            res.status(404).json({ error: 'Restaurant not found' });
            return;
        }
        // Generate new QR secret
        const qrSecret = (0, qr_service_1.generateQRSecret)();
        await database_service_1.prisma.restaurant.update({
            where: { id: restaurantId },
            data: { qrSecret },
        });
        res.json({
            success: true,
            message: 'QR scanning enabled for restaurant',
            // Only return secret once - store it securely
            qrSecret,
        });
    }
    catch (error) {
        next(error);
    }
}
// Get QR stats for a restaurant
async function getQRStats(req, res, next) {
    try {
        const { restaurantId } = req.params;
        const [totalScans, todayScans, totalPoints] = await Promise.all([
            database_service_1.prisma.qRScan.count({
                where: { restaurantId },
            }),
            database_service_1.prisma.qRScan.count({
                where: {
                    restaurantId,
                    scannedAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0)),
                    },
                },
            }),
            database_service_1.prisma.qRScan.aggregate({
                where: { restaurantId },
                _sum: { pointsAwarded: true },
            }),
        ]);
        res.json({
            totalScans,
            todayScans,
            totalPointsAwarded: totalPoints._sum.pointsAwarded || 0,
        });
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=qr.controller.js.map