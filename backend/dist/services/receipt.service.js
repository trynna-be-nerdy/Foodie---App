"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImageHash = generateImageHash;
exports.checkDuplicateReceipt = checkDuplicateReceipt;
exports.extractTextFromImage = extractTextFromImage;
exports.parseReceiptText = parseReceiptText;
exports.matchRestaurant = matchRestaurant;
exports.calculatePoints = calculatePoints;
exports.creditPoints = creditPoints;
exports.scanReceipt = scanReceipt;
exports.getReceiptHistory = getReceiptHistory;
exports.updateReceiptWithCorrections = updateReceiptWithCorrections;
const vision_1 = require("@google-cloud/vision");
const fuse_js_1 = __importDefault(require("fuse.js"));
const crypto_1 = __importDefault(require("crypto"));
const database_service_1 = require("./database.service");
const challengeJob_service_1 = require("./challengeJob.service");
// Initialize Vision API client
let visionClient = null;
function getVisionClient() {
    if (!visionClient) {
        // Use service account key if provided, otherwise use default credentials
        const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
            ? JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON)
            : undefined;
        visionClient = new vision_1.ImageAnnotatorClient(credentials ? { credentials } : undefined);
    }
    return visionClient;
}
// Generate perceptual hash for image
function generateImageHash(imageBuffer) {
    // Simple hash based on image content
    // For production, consider using a proper perceptual hashing library
    return crypto_1.default.createHash('sha256').update(imageBuffer).digest('hex');
}
// Check for duplicate receipt
async function checkDuplicateReceipt(userId, imageHash) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const existingReceipt = await database_service_1.prisma.receipt.findFirst({
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
async function extractTextFromImage(imageBuffer) {
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
function parseReceiptText(rawText) {
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
function extractRestaurantName(lines) {
    if (lines.length === 0)
        return null;
    // Usually the restaurant name is in the first few lines
    // Look for a line that looks like a business name (not an address or phone)
    for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i];
        // Skip lines that look like addresses, phone numbers, or dates
        if (/^\d{1,5}\s/.test(line))
            continue; // Street address
        if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line))
            continue; // Phone
        if (/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(line))
            continue; // Date
        if (/^(www\.|http)/i.test(line))
            continue; // Website
        if (line.length < 3)
            continue; // Too short
        // This might be the restaurant name
        return line;
    }
    return lines[0] || null;
}
// Extract total amount from receipt
function extractTotalAmount(text) {
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
function extractDate(text) {
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
                let dateStr;
                if (match[0].includes('/') || match[0].includes('-')) {
                    // Handle numeric dates
                    if (match[1].length === 4) {
                        // YYYY-MM-DD
                        dateStr = `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
                    }
                    else if (match[3].length === 2) {
                        // MM/DD/YY
                        const year = parseInt(match[3]) > 50 ? '19' + match[3] : '20' + match[3];
                        dateStr = `${year}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
                    }
                    else {
                        // MM/DD/YYYY
                        dateStr = `${match[3]}-${match[1].padStart(2, '0')}-${match[2].padStart(2, '0')}`;
                    }
                }
                else {
                    // Month name format
                    dateStr = match[0];
                }
                const date = new Date(dateStr);
                if (!isNaN(date.getTime()) && date <= new Date()) {
                    return date;
                }
            }
            catch {
                continue;
            }
        }
    }
    return null;
}
// Extract line items from receipt
function extractLineItems(lines) {
    const items = [];
    for (const line of lines) {
        // Look for lines with a price at the end
        const match = line.match(/^(.+?)\s+\$?\s*([\d,]+\.\d{2})\s*$/);
        if (match) {
            const name = match[1].trim();
            const price = parseFloat(match[2].replace(/,/g, ''));
            // Skip totals and subtotals
            if (/total|subtotal|tax|tip|balance|due|change/i.test(name))
                continue;
            if (name.length > 2 && !isNaN(price) && price > 0 && price < 1000) {
                items.push({ name, price });
            }
        }
    }
    return items;
}
// Fuzzy match restaurant name against database
async function matchRestaurant(extractedName) {
    if (!extractedName)
        return null;
    // Fetch all restaurants with loyalty programs
    const restaurants = await database_service_1.prisma.restaurant.findMany({
        where: { loyaltyProgramEnabled: true },
        select: { id: true, name: true },
    });
    if (restaurants.length === 0)
        return null;
    // Configure fuzzy search
    const fuse = new fuse_js_1.default(restaurants, {
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
async function calculatePoints(restaurantId, totalAmount) {
    const restaurant = await database_service_1.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { pointsPerDollar: true },
    });
    if (!restaurant)
        return 0;
    return Math.floor(totalAmount * restaurant.pointsPerDollar);
}
// Credit points to user wallet
async function creditPoints(userId, restaurantId, points, receiptId, totalAmount) {
    await database_service_1.prisma.$transaction(async (tx) => {
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
async function scanReceipt(userId, imageBuffer, userProvidedRestaurantId, userProvidedAmount) {
    // Generate image hash
    const imageHash = generateImageHash(imageBuffer);
    // Check for duplicates
    const duplicateCheck = await checkDuplicateReceipt(userId, imageHash);
    if (duplicateCheck.isDuplicate) {
        // Create receipt record marked as duplicate
        const receipt = await database_service_1.prisma.receipt.create({
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
    const receipt = await database_service_1.prisma.receipt.create({
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
            ? await database_service_1.prisma.restaurant.findUnique({
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
            await creditPoints(userId, matchedRestaurant.id, pointsEarned, receipt.id, totalAmount);
            (0, challengeJob_service_1.enqueueChallengeTracking)(userId, matchedRestaurant.id, {
                dishNames: extractedData.lineItems.map((item) => item.name),
                amount: totalAmount,
            });
        }
        // Update receipt record
        await database_service_1.prisma.receipt.update({
            where: { id: receipt.id },
            data: {
                restaurantId: matchedRestaurant?.id,
                extractedData: extractedData,
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
    }
    catch (error) {
        // Update receipt with error
        await database_service_1.prisma.receipt.update({
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
async function getReceiptHistory(userId, limit = 20, offset = 0) {
    const [receipts, total] = await Promise.all([
        database_service_1.prisma.receipt.findMany({
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
        database_service_1.prisma.receipt.count({ where: { userId } }),
    ]);
    return { receipts, total };
}
// Update receipt with user corrections
async function updateReceiptWithCorrections(receiptId, userId, restaurantId, totalAmount) {
    const receipt = await database_service_1.prisma.receipt.findFirst({
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
        (0, challengeJob_service_1.enqueueChallengeTracking)(userId, restaurantId, { amount: totalAmount });
    }
    // Update receipt
    await database_service_1.prisma.receipt.update({
        where: { id: receiptId },
        data: {
            restaurantId,
            totalAmount,
            pointsAwarded: pointsEarned,
            status: 'COMPLETED',
        },
    });
    const restaurant = await database_service_1.prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { id: true, name: true },
    });
    return {
        receiptId,
        status: 'COMPLETED',
        extractedData: receipt.extractedData,
        matchedRestaurant: restaurant ? { ...restaurant, confidence: 1 } : null,
        pointsEarned,
        isDuplicate: false,
    };
}
//# sourceMappingURL=receipt.service.js.map