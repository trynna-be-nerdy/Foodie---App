"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSignature = generateSignature;
exports.verifySignature = verifySignature;
exports.isQRCodeExpired = isQRCodeExpired;
exports.checkRateLimit = checkRateLimit;
exports.incrementRateLimit = incrementRateLimit;
exports.getTodayScanCount = getTodayScanCount;
exports.processQRScan = processQRScan;
exports.generateQRCodeData = generateQRCodeData;
exports.generateQRSecret = generateQRSecret;
exports.getScanHistory = getScanHistory;
const crypto_1 = __importDefault(require("crypto"));
const database_service_1 = require("./database.service");
const redis_service_1 = require("./redis.service");
const challengeJob_service_1 = require("./challengeJob.service");
// Generate HMAC signature for QR code
function generateSignature(restaurantId, transactionId, amount, timestamp, secret) {
    const data = `${restaurantId}:${transactionId}:${amount}:${timestamp}`;
    return crypto_1.default.createHmac('sha256', secret).update(data).digest('hex');
}
// Verify HMAC signature
function verifySignature(payload, secret) {
    const expectedSignature = generateSignature(payload.restaurantId, payload.transactionId, payload.amount, payload.timestamp, secret);
    return crypto_1.default.timingSafeEqual(Buffer.from(payload.signature, 'hex'), Buffer.from(expectedSignature, 'hex'));
}
// Check if QR code is expired (10 minute window)
function isQRCodeExpired(timestamp) {
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    return now - timestamp > tenMinutes;
}
// Check rate limit for user (10 scans per day)
async function checkRateLimit(userId) {
    const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
    const count = await redis_service_1.redis.get(key);
    if (count && parseInt(count, 10) >= 10) {
        return false;
    }
    return true;
}
// Increment rate limit counter
async function incrementRateLimit(userId) {
    const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
    const count = await redis_service_1.redis.incr(key);
    if (count === 1) {
        // Set expiry to end of day (24 hours max)
        await redis_service_1.redis.expire(key, 86400);
    }
}
// Get today's scan count for user
async function getTodayScanCount(userId) {
    const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
    const count = await redis_service_1.redis.get(key);
    return count ? parseInt(count, 10) : 0;
}
// Process QR code scan
async function processQRScan(userId, payload) {
    // Check rate limit
    const withinLimit = await checkRateLimit(userId);
    if (!withinLimit) {
        return {
            success: false,
            error: 'Daily scan limit reached (10 scans per day)',
            errorCode: 'RATE_LIMITED',
        };
    }
    // Check if QR code is expired
    if (isQRCodeExpired(payload.timestamp)) {
        return {
            success: false,
            error: 'QR code has expired. Please request a new one.',
            errorCode: 'EXPIRED',
        };
    }
    // Get restaurant and verify it exists
    const restaurant = await database_service_1.prisma.restaurant.findUnique({
        where: { id: payload.restaurantId },
        select: {
            id: true,
            name: true,
            pointsPerDollar: true,
            qrSecret: true,
            loyaltyProgramEnabled: true,
        },
    });
    if (!restaurant) {
        return {
            success: false,
            error: 'Restaurant not found',
            errorCode: 'RESTAURANT_NOT_FOUND',
        };
    }
    // Verify signature
    if (!restaurant.qrSecret) {
        return {
            success: false,
            error: 'Restaurant QR scanning not configured',
            errorCode: 'INVALID_SIGNATURE',
        };
    }
    try {
        const isValid = verifySignature(payload, restaurant.qrSecret);
        if (!isValid) {
            return {
                success: false,
                error: 'Invalid QR code signature',
                errorCode: 'INVALID_SIGNATURE',
            };
        }
    }
    catch {
        return {
            success: false,
            error: 'Invalid QR code signature',
            errorCode: 'INVALID_SIGNATURE',
        };
    }
    // Check for duplicate scan
    const existingScan = await database_service_1.prisma.qRScan.findUnique({
        where: { transactionId: payload.transactionId },
    });
    if (existingScan) {
        return {
            success: false,
            error: 'This QR code has already been scanned',
            errorCode: 'DUPLICATE',
        };
    }
    // Calculate points
    const pointsEarned = Math.floor(payload.amount * restaurant.pointsPerDollar);
    // Create scan record and credit points in transaction
    const scan = await database_service_1.prisma.$transaction(async (tx) => {
        // Create QR scan record
        const newScan = await tx.qRScan.create({
            data: {
                userId,
                restaurantId: payload.restaurantId,
                transactionId: payload.transactionId,
                amount: payload.amount,
                pointsAwarded: pointsEarned,
            },
        });
        // Update or create wallet
        await tx.pointsWallet.upsert({
            where: {
                userId_restaurantId: { userId, restaurantId: payload.restaurantId },
            },
            create: {
                userId,
                restaurantId: payload.restaurantId,
                balance: pointsEarned,
                isConnected: true,
                lastSyncedAt: new Date(),
            },
            update: {
                balance: { increment: pointsEarned },
                lastSyncedAt: new Date(),
            },
        });
        // Create transaction record
        await tx.pointsTransaction.create({
            data: {
                userId,
                restaurantId: payload.restaurantId,
                amount: pointsEarned,
                type: 'EARN',
                source: 'qr_scan',
                metadata: {
                    transactionId: payload.transactionId,
                    purchaseAmount: payload.amount,
                    scanId: newScan.id,
                },
            },
        });
        return newScan;
    });
    // Increment rate limit counter
    await incrementRateLimit(userId);
    (0, challengeJob_service_1.enqueueChallengeTracking)(userId, payload.restaurantId, { amount: payload.amount });
    return {
        success: true,
        scanId: scan.id,
        pointsEarned,
        restaurantName: restaurant.name,
    };
}
// Generate QR code data for a restaurant transaction
async function generateQRCodeData(restaurantId, transactionId, amount) {
    const restaurant = await database_service_1.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { qrSecret: true },
    });
    if (!restaurant?.qrSecret) {
        return null;
    }
    const timestamp = Date.now();
    const signature = generateSignature(restaurantId, transactionId, amount, timestamp, restaurant.qrSecret);
    return {
        restaurantId,
        transactionId,
        amount,
        timestamp,
        signature,
    };
}
// Generate a new QR secret for a restaurant
function generateQRSecret() {
    return crypto_1.default.randomBytes(32).toString('hex');
}
// Get scan history for user
async function getScanHistory(userId, limit = 20, offset = 0) {
    const [scans, total] = await Promise.all([
        database_service_1.prisma.qRScan.findMany({
            where: { userId },
            orderBy: { scannedAt: 'desc' },
            take: limit,
            skip: offset,
        }),
        database_service_1.prisma.qRScan.count({ where: { userId } }),
    ]);
    // Fetch restaurant names separately
    const restaurantIds = [...new Set(scans.map(s => s.restaurantId))];
    const restaurants = await database_service_1.prisma.restaurant.findMany({
        where: { id: { in: restaurantIds } },
        select: { id: true, name: true, imageUrl: true },
    });
    const restaurantMap = new Map(restaurants.map(r => [r.id, r]));
    const scansWithRestaurant = scans.map(scan => ({
        ...scan,
        restaurant: restaurantMap.get(scan.restaurantId) || null,
    }));
    return { scans: scansWithRestaurant, total };
}
//# sourceMappingURL=qr.service.js.map