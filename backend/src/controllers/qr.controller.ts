import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  processQRScan,
  generateQRCodeData,
  generateQRSecret,
  getScanHistory,
  getTodayScanCount,
  QRCodePayload,
} from '../services/qr.service';
import { prisma } from '../services/database.service';

// Validation schema for QR scan payload
const qrScanSchema = z.object({
  restaurantId: z.string().min(1),
  transactionId: z.string().min(1),
  amount: z.number().positive(),
  timestamp: z.number().positive(),
  signature: z.string().length(64), // SHA256 hex is 64 chars
});

// Scan QR code endpoint
export async function scanQRCode(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user?.id;
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

    const payload: QRCodePayload = validation.data;
    const result = await processQRScan(userId, payload);

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
  } catch (error) {
    next(error);
  }
}

// Get scan status/limit for user
export async function getScanStatus(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const todayCount = await getTodayScanCount(userId);
    const remaining = Math.max(0, 10 - todayCount);

    res.json({
      todayScans: todayCount,
      dailyLimit: 10,
      remaining,
      canScan: remaining > 0,
    });
  } catch (error) {
    next(error);
  }
}

// Get scan history
export async function getScanHistoryHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    const { scans, total } = await getScanHistory(userId, limit, offset);

    res.json({
      scans,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + scans.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
}

// === ADMIN ENDPOINTS ===

// Generate QR code for a transaction (restaurant admin use)
const generateQRSchema = z.object({
  transactionId: z.string().min(1),
  amount: z.number().positive(),
});

export async function generateQR(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { restaurantId } = req.params;

    // Verify user has access to this restaurant (simplified - would need proper RBAC)
    const restaurant = await prisma.restaurant.findUnique({
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

    const qrData = await generateQRCodeData(restaurantId, transactionId, amount);
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
  } catch (error) {
    next(error);
  }
}

// Setup QR scanning for a restaurant (admin)
export async function setupQRForRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { restaurantId } = req.params;

    // Verify restaurant exists
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      res.status(404).json({ error: 'Restaurant not found' });
      return;
    }

    // Generate new QR secret
    const qrSecret = generateQRSecret();

    await prisma.restaurant.update({
      where: { id: restaurantId },
      data: { qrSecret },
    });

    res.json({
      success: true,
      message: 'QR scanning enabled for restaurant',
      // Only return secret once - store it securely
      qrSecret,
    });
  } catch (error) {
    next(error);
  }
}

// Get QR stats for a restaurant
export async function getQRStats(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { restaurantId } = req.params;

    const [totalScans, todayScans, totalPoints] = await Promise.all([
      prisma.qRScan.count({
        where: { restaurantId },
      }),
      prisma.qRScan.count({
        where: {
          restaurantId,
          scannedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.qRScan.aggregate({
        where: { restaurantId },
        _sum: { pointsAwarded: true },
      }),
    ]);

    res.json({
      totalScans,
      todayScans,
      totalPointsAwarded: totalPoints._sum.pointsAwarded || 0,
    });
  } catch (error) {
    next(error);
  }
}
