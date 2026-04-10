import { Request, Response, NextFunction } from 'express';
import multer, { FileFilterCallback } from 'multer';
import {
  scanReceipt,
  getReceiptHistory,
  updateReceiptWithCorrections,
} from '../services/receipt.service';
import { prisma } from '../services/database.service';
import { z } from 'zod';
import { AuthenticatedRequest } from '../types';

interface ReceiptUploadRequest extends AuthenticatedRequest {
  file?: Express.Multer.File;
}

// Configure multer for memory storage
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB max
  },
  fileFilter: (_req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
    }
  },
});

// Scan receipt endpoint
export async function scanReceiptHandler(
  req: ReceiptUploadRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!req.file) {
      res.status(400).json({ error: 'No image file provided' });
      return;
    }

    // Optional: user-provided restaurant ID and amount
    const { restaurantId, totalAmount } = req.body;

    const result = await scanReceipt(
      userId,
      req.file.buffer,
      restaurantId,
      totalAmount ? parseFloat(totalAmount) : undefined
    );

    if (result.isDuplicate) {
      res.status(409).json({
        error: 'Duplicate receipt',
        message: result.error,
        receiptId: result.receiptId,
      });
      return;
    }

    if (result.status === 'FAILED') {
      res.status(422).json({
        error: 'OCR processing failed',
        message: result.error,
        receiptId: result.receiptId,
      });
      return;
    }

    res.status(200).json({
      receiptId: result.receiptId,
      status: result.status,
      extractedData: result.extractedData,
      matchedRestaurant: result.matchedRestaurant,
      pointsEarned: result.pointsEarned,
      needsReview: result.status === 'PENDING',
    });
  } catch (error) {
    next(error);
  }
}

// Get receipt by ID
export async function getReceiptById(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const receipt = await prisma.receipt.findFirst({
      where: { id, userId },
    });

    if (!receipt) {
      res.status(404).json({ error: 'Receipt not found' });
      return;
    }

    res.json(receipt);
  } catch (error) {
    next(error);
  }
}

// Get receipt history
export async function getReceiptHistoryHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    const { receipts, total } = await getReceiptHistory(userId, limit, offset);

    res.json({
      receipts,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + receipts.length < total,
      },
    });
  } catch (error) {
    next(error);
  }
}

// Update receipt with user corrections
const updateReceiptSchema = z.object({
  restaurantId: z.string().min(1),
  totalAmount: z.number().positive(),
});

export async function updateReceiptHandler(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const validation = updateReceiptSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        error: 'Validation failed',
        issues: validation.error.issues,
      });
      return;
    }

    const { restaurantId, totalAmount } = validation.data;

    const result = await updateReceiptWithCorrections(
      id,
      userId,
      restaurantId,
      totalAmount
    );

    res.json({
      receiptId: result.receiptId,
      status: result.status,
      pointsEarned: result.pointsEarned,
      matchedRestaurant: result.matchedRestaurant,
    });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Receipt not found') {
        res.status(404).json({ error: error.message });
        return;
      }
      if (error.message === 'Receipt already processed') {
        res.status(400).json({ error: error.message });
        return;
      }
    }
    next(error);
  }
}

// Get all restaurants for dropdown
export async function getRestaurantsForReceipt(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const restaurants = await prisma.restaurant.findMany({
      where: { loyaltyProgramEnabled: true },
      select: {
        id: true,
        name: true,
        imageUrl: true,
        pointsPerDollar: true,
      },
      orderBy: { name: 'asc' },
    });

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
}
