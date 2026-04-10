"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWallet = getWallet;
exports.connectRestaurant = connectRestaurant;
exports.manualEntry = manualEntry;
exports.syncWallet = syncWallet;
exports.getTransactionHistory = getTransactionHistory;
exports.disconnectRestaurant = disconnectRestaurant;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
// Validation schemas
const connectWalletSchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1, 'Restaurant ID is required'),
    accountNumber: zod_1.z.string().optional(),
    initialBalance: zod_1.z.number().optional().default(0),
});
const manualEntrySchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1, 'Restaurant ID is required'),
    balance: zod_1.z.number().min(0, 'Balance must be non-negative'),
    accountNumber: zod_1.z.string().optional(),
});
/**
 * GET /api/v1/wallet
 * Get unified wallet with all connected restaurants and balances
 */
async function getWallet(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user'; // Fallback for demo
        const wallets = await database_service_1.prisma.pointsWallet.findMany({
            where: { userId },
            include: {
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        cuisineTypes: true,
                        pointsPerDollar: true,
                        loyaltyProgramEnabled: true,
                    },
                },
            },
            orderBy: { updatedAt: 'desc' },
        });
        // Calculate totals
        const totalPoints = wallets.reduce((sum, w) => sum + w.balance, 0);
        const expiringPoints = wallets
            .filter(w => w.expirationDate && w.expirationDate < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
            .reduce((sum, w) => sum + w.balance, 0);
        res.status(200).json({
            success: true,
            data: {
                totalPoints,
                expiringPoints,
                totalRestaurants: wallets.length,
                wallets: wallets.map(w => ({
                    id: w.id,
                    restaurantId: w.restaurantId,
                    restaurant: w.restaurant,
                    balance: w.balance,
                    expirationDate: w.expirationDate,
                    lastSyncedAt: w.lastSyncedAt,
                    isConnected: w.isConnected,
                    accountNumber: w.accountNumber,
                    // Calculate dollar value (assume 100 pts = $1)
                    dollarValue: (w.balance / 100).toFixed(2),
                })),
            },
        });
    }
    catch (error) {
        console.error('Get wallet error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch wallet', code: 'WALLET_FETCH_FAILED' },
        });
    }
}
/**
 * POST /api/v1/wallet/connect
 * Connect a new restaurant to the wallet
 */
async function connectRestaurant(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user';
        const validation = connectWalletSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Validation failed', details: validation.error.issues },
            });
            return;
        }
        const { restaurantId, accountNumber, initialBalance } = validation.data;
        // Check if restaurant exists
        const restaurant = await database_service_1.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });
        if (!restaurant) {
            res.status(404).json({
                success: false,
                error: { message: 'Restaurant not found', code: 'RESTAURANT_NOT_FOUND' },
            });
            return;
        }
        // Check if already connected
        const existing = await database_service_1.prisma.pointsWallet.findUnique({
            where: { userId_restaurantId: { userId, restaurantId } },
        });
        if (existing) {
            res.status(409).json({
                success: false,
                error: { message: 'Restaurant already connected', code: 'ALREADY_CONNECTED' },
            });
            return;
        }
        // Create wallet connection
        const wallet = await database_service_1.prisma.pointsWallet.create({
            data: {
                userId,
                restaurantId,
                balance: initialBalance || 0,
                accountNumber,
                isConnected: true,
                lastSyncedAt: new Date(),
            },
            include: { restaurant: true },
        });
        res.status(201).json({
            success: true,
            data: { wallet },
        });
    }
    catch (error) {
        console.error('Connect restaurant error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to connect restaurant', code: 'CONNECT_FAILED' },
        });
    }
}
/**
 * POST /api/v1/wallet/manual-entry
 * Add points manually (for unsupported restaurants)
 */
async function manualEntry(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user';
        const validation = manualEntrySchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Validation failed', details: validation.error.issues },
            });
            return;
        }
        const { restaurantId, balance, accountNumber } = validation.data;
        // Upsert wallet
        const wallet = await database_service_1.prisma.pointsWallet.upsert({
            where: { userId_restaurantId: { userId, restaurantId } },
            update: {
                balance,
                accountNumber,
                lastSyncedAt: new Date(),
            },
            create: {
                userId,
                restaurantId,
                balance,
                accountNumber,
                isConnected: false,
                lastSyncedAt: new Date(),
            },
            include: { restaurant: true },
        });
        res.status(200).json({
            success: true,
            data: { wallet },
        });
    }
    catch (error) {
        console.error('Manual entry error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to update balance', code: 'MANUAL_ENTRY_FAILED' },
        });
    }
}
/**
 * POST /api/v1/wallet/sync/:restaurantId
 * Trigger sync for a specific restaurant
 */
async function syncWallet(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user';
        const { restaurantId } = req.params;
        const wallet = await database_service_1.prisma.pointsWallet.findUnique({
            where: { userId_restaurantId: { userId, restaurantId } },
            include: { restaurant: true },
        });
        if (!wallet) {
            res.status(404).json({
                success: false,
                error: { message: 'Wallet not found', code: 'WALLET_NOT_FOUND' },
            });
            return;
        }
        // TODO: Implement actual OAuth sync with restaurant API
        // For now, simulate sync by updating lastSyncedAt
        const updatedWallet = await database_service_1.prisma.pointsWallet.update({
            where: { id: wallet.id },
            data: { lastSyncedAt: new Date() },
            include: { restaurant: true },
        });
        res.status(200).json({
            success: true,
            data: {
                wallet: updatedWallet,
                message: 'Sync completed',
            },
        });
    }
    catch (error) {
        console.error('Sync wallet error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to sync wallet', code: 'SYNC_FAILED' },
        });
    }
}
/**
 * GET /api/v1/wallet/history
 * Get transaction history with filters
 */
async function getTransactionHistory(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user';
        const { restaurantId, type, limit = '50', offset = '0' } = req.query;
        const where = { userId };
        if (restaurantId)
            where.restaurantId = restaurantId;
        if (type)
            where.type = type;
        const transactions = await database_service_1.prisma.pointsTransaction.findMany({
            where,
            include: {
                restaurant: {
                    select: { id: true, name: true, imageUrl: true },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: parseInt(limit),
            skip: parseInt(offset),
        });
        const total = await database_service_1.prisma.pointsTransaction.count({ where });
        res.status(200).json({
            success: true,
            data: {
                transactions,
                pagination: {
                    total,
                    limit: parseInt(limit),
                    offset: parseInt(offset),
                },
            },
        });
    }
    catch (error) {
        console.error('Get transaction history error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch history', code: 'HISTORY_FETCH_FAILED' },
        });
    }
}
/**
 * DELETE /api/v1/wallet/disconnect/:restaurantId
 * Disconnect a restaurant from wallet
 */
async function disconnectRestaurant(req, res) {
    try {
        const userId = req.user?.userId || 'demo-user';
        const { restaurantId } = req.params;
        const wallet = await database_service_1.prisma.pointsWallet.findUnique({
            where: { userId_restaurantId: { userId, restaurantId } },
        });
        if (!wallet) {
            res.status(404).json({
                success: false,
                error: { message: 'Wallet not found', code: 'WALLET_NOT_FOUND' },
            });
            return;
        }
        await database_service_1.prisma.pointsWallet.delete({
            where: { id: wallet.id },
        });
        res.status(200).json({
            success: true,
            data: { message: 'Restaurant disconnected successfully' },
        });
    }
    catch (error) {
        console.error('Disconnect restaurant error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to disconnect', code: 'DISCONNECT_FAILED' },
        });
    }
}
//# sourceMappingURL=wallet.controller.js.map