"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const receipt_controller_1 = require("../controllers/receipt.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rateLimiter_middleware_1 = require("../middleware/rateLimiter.middleware");
const router = (0, express_1.Router)();
// Rate limiter: 10 receipt scans per minute
const scanRateLimiter = (0, rateLimiter_middleware_1.createRateLimiter)({
    windowMs: 60 * 1000,
    maxRequests: 10,
    keyPrefix: 'ratelimit:receipts',
});
// All routes require authentication
router.use(auth_middleware_1.authenticate);
// POST /api/v1/receipts/scan - Upload and scan a receipt
router.post('/scan', scanRateLimiter, receipt_controller_1.upload.single('image'), receipt_controller_1.scanReceiptHandler);
// GET /api/v1/receipts/restaurants - Get restaurants for dropdown
router.get('/restaurants', receipt_controller_1.getRestaurantsForReceipt);
// GET /api/v1/receipts/history - Get receipt history
router.get('/history', receipt_controller_1.getReceiptHistoryHandler);
// GET /api/v1/receipts/:id - Get receipt by ID
router.get('/:id', receipt_controller_1.getReceiptById);
// PUT /api/v1/receipts/:id - Update receipt with corrections
router.put('/:id', receipt_controller_1.updateReceiptHandler);
exports.default = router;
//# sourceMappingURL=receipt.route.js.map