import { Router } from 'express';
import {
  scanReceiptHandler,
  getReceiptById,
  getReceiptHistoryHandler,
  updateReceiptHandler,
  getRestaurantsForReceipt,
  upload,
} from '../controllers/receipt.controller';
import { authenticate } from '../middleware/auth.middleware';
import { createRateLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Rate limiter: 10 receipt scans per minute
const scanRateLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  maxRequests: 10,
  keyPrefix: 'ratelimit:receipts',
});

// All routes require authentication
router.use(authenticate);

// POST /api/v1/receipts/scan - Upload and scan a receipt
router.post('/scan', scanRateLimiter, upload.single('image'), scanReceiptHandler);

// GET /api/v1/receipts/restaurants - Get restaurants for dropdown
router.get('/restaurants', getRestaurantsForReceipt);

// GET /api/v1/receipts/history - Get receipt history
router.get('/history', getReceiptHistoryHandler);

// GET /api/v1/receipts/:id - Get receipt by ID
router.get('/:id', getReceiptById);

// PUT /api/v1/receipts/:id - Update receipt with corrections
router.put('/:id', updateReceiptHandler);

export default router;
