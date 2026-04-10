"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
exports.scanReceiptHandler = scanReceiptHandler;
exports.getReceiptById = getReceiptById;
exports.getReceiptHistoryHandler = getReceiptHistoryHandler;
exports.updateReceiptHandler = updateReceiptHandler;
exports.getRestaurantsForReceipt = getRestaurantsForReceipt;
const multer_1 = __importDefault(require("multer"));
const receipt_service_1 = require("../services/receipt.service");
const database_service_1 = require("../services/database.service");
const zod_1 = require("zod");
// Configure multer for memory storage
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB max
    },
    fileFilter: (_req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error('Invalid file type. Only JPEG, PNG, and WebP are allowed.'));
        }
    },
});
// Scan receipt endpoint
async function scanReceiptHandler(req, res, next) {
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
        const result = await (0, receipt_service_1.scanReceipt)(userId, req.file.buffer, restaurantId, totalAmount ? parseFloat(totalAmount) : undefined);
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
    }
    catch (error) {
        next(error);
    }
}
// Get receipt by ID
async function getReceiptById(req, res, next) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const { id } = req.params;
        const receipt = await database_service_1.prisma.receipt.findFirst({
            where: { id, userId },
        });
        if (!receipt) {
            res.status(404).json({ error: 'Receipt not found' });
            return;
        }
        res.json(receipt);
    }
    catch (error) {
        next(error);
    }
}
// Get receipt history
async function getReceiptHistoryHandler(req, res, next) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        const limit = Math.min(parseInt(req.query.limit) || 20, 100);
        const offset = parseInt(req.query.offset) || 0;
        const { receipts, total } = await (0, receipt_service_1.getReceiptHistory)(userId, limit, offset);
        res.json({
            receipts,
            pagination: {
                total,
                limit,
                offset,
                hasMore: offset + receipts.length < total,
            },
        });
    }
    catch (error) {
        next(error);
    }
}
// Update receipt with user corrections
const updateReceiptSchema = zod_1.z.object({
    restaurantId: zod_1.z.string().min(1),
    totalAmount: zod_1.z.number().positive(),
});
async function updateReceiptHandler(req, res, next) {
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
        const result = await (0, receipt_service_1.updateReceiptWithCorrections)(id, userId, restaurantId, totalAmount);
        res.json({
            receiptId: result.receiptId,
            status: result.status,
            pointsEarned: result.pointsEarned,
            matchedRestaurant: result.matchedRestaurant,
        });
    }
    catch (error) {
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
async function getRestaurantsForReceipt(req, res, next) {
    try {
        const restaurants = await database_service_1.prisma.restaurant.findMany({
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
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=receipt.controller.js.map