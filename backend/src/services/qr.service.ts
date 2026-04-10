import crypto from 'crypto';
import { prisma } from './database.service';
import { redis } from './redis.service';
import { enqueueChallengeTracking } from './challengeJob.service';

// QR Code payload structure
export interface QRCodePayload {
  restaurantId: string;
  transactionId: string;
  amount: number;
  timestamp: number;
  signature: string;
}

export interface QRScanResult {
  success: boolean;
  scanId?: string;
  pointsEarned?: number;
  restaurantName?: string;
  error?: string;
  errorCode?: 'INVALID_SIGNATURE' | 'EXPIRED' | 'DUPLICATE' | 'RATE_LIMITED' | 'RESTAURANT_NOT_FOUND' | 'INVALID_FORMAT';
}


// Generate HMAC signature for QR code
export function generateSignature(
  restaurantId: string,
  transactionId: string,
  amount: number,
  timestamp: number,
  secret: string
): string {
  const data = `${restaurantId}:${transactionId}:${amount}:${timestamp}`;
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

// Verify HMAC signature
export function verifySignature(payload: QRCodePayload, secret: string): boolean {
  const expectedSignature = generateSignature(
    payload.restaurantId,
    payload.transactionId,
    payload.amount,
    payload.timestamp,
    secret
  );
  return crypto.timingSafeEqual(
    Buffer.from(payload.signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Check if QR code is expired (10 minute window)
export function isQRCodeExpired(timestamp: number): boolean {
  const now = Date.now();
  const tenMinutes = 10 * 60 * 1000;
  return now - timestamp > tenMinutes;
}

// Check rate limit for user (10 scans per day)
export async function checkRateLimit(userId: string): Promise<boolean> {
  const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
  const count = await redis.get(key);

  if (count && parseInt(count, 10) >= 10) {
    return false;
  }

  return true;
}

// Increment rate limit counter
export async function incrementRateLimit(userId: string): Promise<void> {
  const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
  const count = await redis.incr(key);

  if (count === 1) {
    // Set expiry to end of day (24 hours max)
    await redis.expire(key, 86400);
  }
}

// Get today's scan count for user
export async function getTodayScanCount(userId: string): Promise<number> {
  const key = `qr_rate_limit:${userId}:${new Date().toISOString().split('T')[0]}`;
  const count = await redis.get(key);
  return count ? parseInt(count, 10) : 0;
}

// Process QR code scan
export async function processQRScan(
  userId: string,
  payload: QRCodePayload
): Promise<QRScanResult> {
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
  const restaurant = await prisma.restaurant.findUnique({
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
  } catch {
    return {
      success: false,
      error: 'Invalid QR code signature',
      errorCode: 'INVALID_SIGNATURE',
    };
  }

  // Check for duplicate scan
  const existingScan = await prisma.qRScan.findUnique({
    where: { transactionId: payload.transactionId },
  });

  if (existingScan) {
    return {
      success: false,
      error: 'This QR code has already been scanned',
      errorCode: 'DUPLICATE',
    };
  }

  
  const pointsEarned = Math.floor(payload.amount * restaurant.pointsPerDollar);

  // Create scan record and credit points in transaction
  const scan = await prisma.$transaction(async (tx) => {
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

  enqueueChallengeTracking(userId, payload.restaurantId, { amount: payload.amount });

  return {
    success: true,
    scanId: scan.id,
    pointsEarned,
    restaurantName: restaurant.name,
  };
}

// Generate QR code data for a restaurant transaction
export async function generateQRCodeData(
  restaurantId: string,
  transactionId: string,
  amount: number
): Promise<QRCodePayload | null> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { qrSecret: true },
  });

  if (!restaurant?.qrSecret) {
    return null;
  }

  const timestamp = Date.now();
  const signature = generateSignature(
    restaurantId,
    transactionId,
    amount,
    timestamp,
    restaurant.qrSecret
  );

  return {
    restaurantId,
    transactionId,
    amount,
    timestamp,
    signature,
  };
}

// Generate a new QR secret for a restaurant
export function generateQRSecret(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Get scan history for user
export async function getScanHistory(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  scans: any[];
  total: number;
}> {
  const [scans, total] = await Promise.all([
    prisma.qRScan.findMany({
      where: { userId },
      orderBy: { scannedAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.qRScan.count({ where: { userId } }),
  ]);

  // Fetch restaurant names separately
  const restaurantIds = [...new Set(scans.map(s => s.restaurantId))];
  const restaurants = await prisma.restaurant.findMany({
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
