"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const qr_controller_1 = require("../controllers/qr.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rateLimiter_middleware_1 = require("../middleware/rateLimiter.middleware");
const router = (0, express_1.Router)();
// Rate limiter for QR scans (additional layer of protection)
const scanRateLimiter = (0, rateLimiter_middleware_1.createRateLimiter)({
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 15, // 15 requests per minute
    keyPrefix: 'ratelimit:qr',
});
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// === USER ENDPOINTS ===
// POST /api/v1/qr/scan - Scan a QR code
router.post('/scan', scanRateLimiter, qr_controller_1.scanQRCode);
// GET /api/v1/qr/status - Get scan status/limit for user
router.get('/status', qr_controller_1.getScanStatus);
// GET /api/v1/qr/history - Get scan history
router.get('/history', qr_controller_1.getScanHistoryHandler);
// === RESTAURANT ADMIN ENDPOINTS ===
// POST /api/v1/qr/restaurant/:restaurantId/generate - Generate QR code for transaction
router.post('/restaurant/:restaurantId/generate', qr_controller_1.generateQR);
// POST /api/v1/qr/restaurant/:restaurantId/setup - Setup QR scanning for restaurant
router.post('/restaurant/:restaurantId/setup', qr_controller_1.setupQRForRestaurant);
// GET /api/v1/qr/restaurant/:restaurantId/stats - Get QR scan stats
router.get('/restaurant/:restaurantId/stats', qr_controller_1.getQRStats);
exports.default = router;
//# sourceMappingURL=qr.route.js.map