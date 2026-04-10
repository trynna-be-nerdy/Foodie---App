import { ImageAnnotatorClient } from '@google-cloud/vision';
import Fuse from 'fuse.js';
import crypto from 'crypto';
import { prisma } from './database.service';
import { ReceiptStatus } from '../generated/prisma/enums';
import { enqueueChallengeTracking } from './challengeJob.service';

// Types
export interface ExtractedReceiptData {
  restaurantName: string | null;
  restaurantNameConfidence: number;
  totalAmount: number | null;
  receiptDate: Date | null;
  lineItems: Array<{ name: string; price: number }>;
  rawText: string;
}

export interface ReceiptScanResult {
  receiptId: string;
  status: ReceiptStatus;
  extractedData: ExtractedReceiptData | null;
  matchedRestaurant: {
    id: string;
    name: string;
    confidence: number;
  } | null;
  pointsEarned: number;
  isDuplicate: boolean;
  error?: string;
}

// Initialize Vision API client
let visionClient: ImageAnnotatorClient | null = null;

function getVisionClient(): ImageAnnotatorClient {
  if (!visionClient) {
    // Use service account key if provided, otherwise use default credentials
    const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
      ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
      : undefined;

    visionClient = new ImageAnnotatorClient(
      credentials ? { credentials } : undefined
    );
  }
  return visionClient;
}

// Generate perceptual hash for image
export function generateImageHash(imageBuffer: Buffer): string {
  // Simple hash based on image content
  // For production, consider using a proper perceptual hashing library
  return crypto.createHash('sha256').update(imageBuffer).digest('hex');
}

// Check for duplicate receipt
export async function checkDuplicateReceipt(
  userId: string,
  imageHash: string
): Promise<{ isDuplicate: boolean; existingReceiptId?: string }> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const existingReceipt = await prisma.receipt.findFirst({
    where: {
      userId,
      imageHash,
      createdAt: {
        gte: thirtyDaysAgo,
      },
      status: {
        in: ['COMPLETED', 'PROCESSING'],
      },
    },
    select: { id: true },
  });

  return {
    isDuplicate: !!existingReceipt,
    existingReceiptId: existingReceipt?.id,
  };
}

// Extract text from receipt image using Google Vision API
export async function extractTextFromImage(
  imageBuffer: Buffer
): Promise<string> {
  const client = getVisionClient();

  const [result] = await client.textDetection({
    image: { content: imageBuffer.toString('base64') },
  });

  const detections = result.textAnnotations;
  if (!detections || detections.length === 0) {
    throw new Error('No text found in image');
  }

  // First annotation contains the full text
  return detections[0].description || '';
}

// Parse receipt text to extract structured data
export function parseReceiptText(rawText: string): ExtractedReceiptData {
  const lines = rawText.split('\n').map(line => line.trim()).filter(Boolean);

  // Extract restaurant name (usually at the top)
  const restaurantName = extractRestaurantName(lines);

  // Extract total amount
  const totalAmount = extractTotalAmount(rawText);

  // Extract date
  const receiptDate = extractDate(rawText);

  // Extract line items
  const lineItems = extractLineItems(lines);

  return {
    restaurantName,
    restaurantNameConfidence: restaurantName ? 0.7 : 0,
    totalAmount,
    receiptDate,
    lineItems,
    rawText,
  };
}

// Extract restaurant name from top of receipt
function extractRestaurantName(lines: string[]): string | null {
  if (lines.length === 0) return null;

  // Usually the restaurant name is in the first few lines
  // Look for a line that looks like a business name (not an address or phone)
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];

    // Skip lines that look like addresses, phone numbers, or dates
    if (/^\d{1,5}\s/.test(line)) continue; // Street address
    if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line)) continue; // Phone
    if (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(line)) continue; // Date
    if (/^(www\.|http)/i.test(line)) continue; // Website
    if (line.length < 3) continue; // Too short

    // This might be the restaurant name
    return line;
  }

  return lines[0] || null;
}

// Extract total amount from receipt
function extractTotalAmount(text: string): number | null {
  // Common patterns for total
  const patterns = [
    /total[:\s]*\$?\s*([\d,]+\.?\d*)/i,
    /grand\s*total[:\s]*\$?\s*([\d,]+\.?\d*)/i,
    /amount\s*due[:\s]*\$?\s*([\d,]+\.?\d*)/i,
    /balance\s*due[:\s]*\$?\s*([\d,]+\.?\d*)/i,
    /total\s*due[:\s]*\$?\s*([\d,]+\.?\d*)/i,
    /\$\s*([\d,]+\.\d{2})\s*$/m, // Last dollar amount on a line
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      const amount = parseFloat(match[1].replace(/,/g, ''));
      if (!isNaN(amount) && amount > 0 && amount < 10000) {
        return amount;
      }
    }
  }

  // Fallback: find the largest dollar amount
  const allAmounts = text.match(/\$?\s*([\d,]+\.\d{2})/g);
  if (allAmounts && allAmounts.length > 0) {
    const amounts = allAmounts
      .map(a => parseFloat(a.replace(/[$,\s]/g, '')))
      .filter(a => !isNaN(a) && a > 0 && a < 10000)
      .sort((a, b) => b - a);

    if (amounts.length > 0) {
      return amounts[0];
    }
  }

  return null;
}

// Extract date from receipt
function extractDate(text: string): Date | null {
  const patterns = [
    // MM/DD/YYYY or MM-DD-YYYY
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
    // YYYY/MM/DD or YYYY-MM-DD
    /(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/,
    // MM/DD/YY
    /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})\b/,
    // Month DD, YYYY
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\.?\s+(\d{1,2}),?\s+(\d{4})/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      try {
        let dateStr: string;

        if (match[0].includes('/') || match[0].includes('-')) {
          // Handle numeric dates
          if (match[1].length === 4) {
            // YYYY-MM-DD
            dateStr = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
          } else if (match[3].length === 2) {
            // MM/DD/YY
            const year = parseInt(match[3]) > 50 ? '19' + match[3] : '20' + match[3];
            dateStr = `${year}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
          } else {
            // MM/DD/YYYY
            dateStr = `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
          }
        } else {
          // Month name format
          dateStr = match[0];
        }

        const date = new Date(dateStr);
        if (!isNaN(date.getTime()) && date <= new Date()) {
          return date;
        }
      } catch {
        continue;
      }
    }
  }

  return null;
}

// Extract line items from receipt
function extractLineItems(lines: string[]): Array<{ name: string; price: number }> {
  const items: Array<{ name: string; price: number }> = [];

  for (const line of lines) {
    // Look for lines with a price at the end
    const match = line.match(/^(.+?)\s+\$?\s*([\d,]+\.\d{2})\s*$/);
    if (match) {
      const name = match[1].trim();
      const price = parseFloat(match[2].replace(/,/g, ''));

      // Skip totals and subtotals
      if (/total|subtotal|tax|tip|balance|due|change/i.test(name)) continue;

      if (name.length > 2 && !isNaN(price) && price > 0 && price < 1000) {
        items.push({ name, price });
      }
    }
  }

  return items;
}

// Fuzzy match restaurant name against database
export async function matchRestaurant(
  extractedName: string
): Promise<{ id: string; name: string; confidence: number } | null> {
  if (!extractedName) return null;

  // Fetch all restaurants with loyalty programs
  const restaurants = await prisma.restaurant.findMany({
    where: { loyaltyProgramEnabled: true },
    select: { id: true, name: true },
  });

  if (restaurants.length === 0) return null;

  // Configure fuzzy search
  const fuse = new Fuse(restaurants, {
    keys: ['name'],
    threshold: 0.4,
    includeScore: true,
  });

  const results = fuse.search(extractedName);

  if (results.length > 0 && results[0].score !== undefined) {
    const confidence = 1 - results[0].score;
    return {
      id: results[0].item.id,
      name: results[0].item.name,
      confidence,
    };
  }

  return null;
}

// Calculate points earned based on restaurant formula
export async function calculatePoints(
  restaurantId: string,
  totalAmount: number
): Promise<number> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { pointsPerDollar: true },
  });

  if (!restaurant) return 0;

  return Math.floor(totalAmount * restaurant.pointsPerDollar);
}

// Credit points to user wallet
export async function creditPoints(
  userId: string,
  restaurantId: string,
  points: number,
  receiptId: string,
  totalAmount: number
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    // Get or create wallet
    const wallet = await tx.pointsWallet.upsert({
      where: {
        userId_restaurantId: { userId, restaurantId },
      },
      create: {
        userId,
        restaurantId,
        balance: points,
        isConnected: true,
        lastSyncedAt: new Date(),
      },
      update: {
        balance: { increment: points },
        lastSyncedAt: new Date(),
      },
    });

    // Create transaction record
    await tx.pointsTransaction.create({
      data: {
        userId,
        restaurantId,
        amount: points,
        type: 'EARN',
        source: 'receipt_scan',
        metadata: {
          receiptId,
          totalAmount,
        },
      },
    });
  });
}

// Main receipt scanning function
export async function scanReceipt(
  userId: string,
  imageBuffer: Buffer,
  userProvidedRestaurantId?: string,
  userProvidedAmount?: number
): Promise<ReceiptScanResult> {
  // Generate image hash
  const imageHash = generateImageHash(imageBuffer);

  // Check for duplicates
  const duplicateCheck = await checkDuplicateReceipt(userId, imageHash);
  if (duplicateCheck.isDuplicate) {
    // Create receipt record marked as duplicate
    const receipt = await prisma.receipt.create({
      data: {
        userId,
        imageHash,
        status: 'DUPLICATE',
        errorMessage: 'This receipt has already been scanned',
      },
    });

    return {
      receiptId: receipt.id,
      status: 'DUPLICATE',
      extractedData: null,
      matchedRestaurant: null,
      pointsEarned: 0,
      isDuplicate: true,
      error: 'This receipt has already been scanned within the last 30 days',
    };
  }

  // Create pending receipt record
  const receipt = await prisma.receipt.create({
    data: {
      userId,
      imageHash,
      status: 'PROCESSING',
    },
  });

  try {
    // Extract text from image
    const rawText = await extractTextFromImage(imageBuffer);

    // Parse receipt data
    const extractedData = parseReceiptText(rawText);

    // Match restaurant
    let matchedRestaurant = userProvidedRestaurantId
      ? await prisma.restaurant.findUnique({
          where: { id: userProvidedRestaurantId },
          select: { id: true, name: true },
        }).then(r => r ? { ...r, confidence: 1 } : null)
      : await matchRestaurant(extractedData.restaurantName || '');

    // Use provided amount or extracted amount
    const totalAmount = userProvidedAmount ?? extractedData.totalAmount;

    // Calculate points if we have restaurant and amount
    let pointsEarned = 0;
    if (matchedRestaurant && totalAmount && totalAmount > 0) {
      pointsEarned = await calculatePoints(matchedRestaurant.id, totalAmount);

      // Credit points
      await creditPoints(
        userId,
        matchedRestaurant.id,
        pointsEarned,
        receipt.id,
        totalAmount
      );

      enqueueChallengeTracking(userId, matchedRestaurant.id, {
        dishNames: extractedData.lineItems.map((item) => item.name),
        amount: totalAmount,
      });
    }

    // Update receipt record
    await prisma.receipt.update({
      where: { id: receipt.id },
      data: {
        restaurantId: matchedRestaurant?.id,
        extractedData: extractedData as any,
        totalAmount,
        receiptDate: extractedData.receiptDate,
        pointsAwarded: pointsEarned,
        status: matchedRestaurant && totalAmount ? 'COMPLETED' : 'PENDING',
      },
    });

    return {
      receiptId: receipt.id,
      status: matchedRestaurant && totalAmount ? 'COMPLETED' : 'PENDING',
      extractedData,
      matchedRestaurant,
      pointsEarned,
      isDuplicate: false,
    };
  } catch (error) {
    // Update receipt with error
    await prisma.receipt.update({
      where: { id: receipt.id },
      data: {
        status: 'FAILED',
        errorMessage: error instanceof Error ? error.message : 'OCR processing failed',
      },
    });

    return {
      receiptId: receipt.id,
      status: 'FAILED',
      extractedData: null,
      matchedRestaurant: null,
      pointsEarned: 0,
      isDuplicate: false,
      error: error instanceof Error ? error.message : 'OCR processing failed',
    };
  }
}

// Get receipt history for user
export async function getReceiptHistory(
  userId: string,
  limit: number = 20,
  offset: number = 0
): Promise<{
  receipts: any[];
  total: number;
}> {
  const [receipts, total] = await Promise.all([
    prisma.receipt.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
      select: {
        id: true,
        restaurantId: true,
        imageUrl: true,
        totalAmount: true,
        receiptDate: true,
        pointsAwarded: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.receipt.count({ where: { userId } }),
  ]);

  return { receipts, total };
}

// Update receipt with user corrections
export async function updateReceiptWithCorrections(
  receiptId: string,
  userId: string,
  restaurantId: string,
  totalAmount: number
): Promise<ReceiptScanResult> {
  const receipt = await prisma.receipt.findFirst({
    where: { id: receiptId, userId },
  });

  if (!receipt) {
    throw new Error('Receipt not found');
  }

  if (receipt.status === 'COMPLETED') {
    throw new Error('Receipt already processed');
  }

  // Calculate and credit points
  const pointsEarned = await calculatePoints(restaurantId, totalAmount);

  if (pointsEarned > 0) {
    await creditPoints(userId, restaurantId, pointsEarned, receiptId, totalAmount);
    enqueueChallengeTracking(userId, restaurantId, { amount: totalAmount });
  }

  // Update receipt
  await prisma.receipt.update({
    where: { id: receiptId },
    data: {
      restaurantId,
      totalAmount,
      pointsAwarded: pointsEarned,
      status: 'COMPLETED',
    },
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
    select: { id: true, name: true },
  });

  return {
    receiptId,
    status: 'COMPLETED',
    extractedData: receipt.extractedData as ExtractedReceiptData | null,
    matchedRestaurant: restaurant ? { ...restaurant, confidence: 1 } : null,
    pointsEarned,
    isDuplicate: false,
  };
}
