import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../services/database.service';
import { AuthenticatedRequest } from '../types';

// Validation schemas
const connectWalletSchema = z.object({
  restaurantId: z.string().min(1, 'Restaurant ID is required'),
  accountNumber: z.string().optional(),
  initialBalance: z.number().optional().default(0),
});

const manualEntrySchema = z.object({
  restaurantId: z.string().min(1, 'Restaurant ID is required'),
  balance: z.number().min(0, 'Balance must be non-negative'),
  accountNumber: z.string().optional(),
});

/**
 * GET /api/v1/wallet
 * Get unified wallet with all connected restaurants and balances
 */
export async function getWallet(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || 'demo-user'; // Fallback for demo

    const wallets = await prisma.pointsWallet.findMany({
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
  } catch (error) {
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
export async function connectRestaurant(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    const restaurant = await prisma.restaurant.findUnique({
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
    const existing = await prisma.pointsWallet.findUnique({
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
    const wallet = await prisma.pointsWallet.create({
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
  } catch (error) {
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
export async function manualEntry(req: AuthenticatedRequest, res: Response): Promise<void> {
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
    const wallet = await prisma.pointsWallet.upsert({
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
  } catch (error) {
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
export async function syncWallet(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || 'demo-user';
    const { restaurantId } = req.params;

    const wallet = await prisma.pointsWallet.findUnique({
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
    const updatedWallet = await prisma.pointsWallet.update({
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
  } catch (error) {
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
export async function getTransactionHistory(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || 'demo-user';
    const { restaurantId, type, limit = '50', offset = '0' } = req.query;

    const where: Record<string, unknown> = { userId };
    if (restaurantId) where.restaurantId = restaurantId;
    if (type) where.type = type;

    const transactions = await prisma.pointsTransaction.findMany({
      where,
      include: {
        restaurant: {
          select: { id: true, name: true, imageUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit as string),
      skip: parseInt(offset as string),
    });

    const total = await prisma.pointsTransaction.count({ where });

    res.status(200).json({
      success: true,
      data: {
        transactions,
        pagination: {
          total,
          limit: parseInt(limit as string),
          offset: parseInt(offset as string),
        },
      },
    });
  } catch (error) {
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
export async function disconnectRestaurant(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const userId = req.user?.userId || 'demo-user';
    const { restaurantId } = req.params;

    const wallet = await prisma.pointsWallet.findUnique({
      where: { userId_restaurantId: { userId, restaurantId } },
    });

    if (!wallet) {
      res.status(404).json({
        success: false,
        error: { message: 'Wallet not found', code: 'WALLET_NOT_FOUND' },
      });
      return;
    }

    await prisma.pointsWallet.delete({
      where: { id: wallet.id },
    });

    res.status(200).json({
      success: true,
      data: { message: 'Restaurant disconnected successfully' },
    });
  } catch (error) {
    console.error('Disconnect restaurant error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to disconnect', code: 'DISCONNECT_FAILED' },
    });
  }
}
