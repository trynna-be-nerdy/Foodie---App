import { Router } from 'express';
import {
  scanQRCode,
  getScanStatus,
  getScanHistoryHandler,
  generateQR,
  setupQRForRestaurant,
  getQRStats,
} from '../controllers/qr.controller';
import { authenticate } from '../middleware/auth.middleware';
import { createRateLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();

// Rate limiter for QR scans (additional layer of protection)
const scanRateLimiter = createRateLimiter({
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 15, // 15 requests per minute
  keyPrefix: 'ratelimit:qr',
});

// All routes require authentication
router.use(authenticate);

// === USER ENDPOINTS ===

// POST /api/v1/qr/scan - Scan a QR code
router.post('/scan', scanRateLimiter, scanQRCode);

// GET /api/v1/qr/status - Get scan status/limit for user
router.get('/status', getScanStatus);

// GET /api/v1/qr/history - Get scan history
router.get('/history', getScanHistoryHandler);

// === RESTAURANT ADMIN ENDPOINTS ===

// POST /api/v1/qr/restaurant/:restaurantId/generate - Generate QR code for transaction
router.post('/restaurant/:restaurantId/generate', generateQR);

// POST /api/v1/qr/restaurant/:restaurantId/setup - Setup QR scanning for restaurant
router.post('/restaurant/:restaurantId/setup', setupQRForRestaurant);

// GET /api/v1/qr/restaurant/:restaurantId/stats - Get QR scan stats
router.get('/restaurant/:restaurantId/stats', getQRStats);

export default router;
