"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wallet_controller_1 = require("../controllers/wallet.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All wallet routes require authentication
router.use(auth_middleware_1.authenticate);
/**
 * @route   GET /api/v1/wallet
 * @desc    Get unified wallet with all connected restaurants and balances
 * @access  Private
 */
router.get('/', wallet_controller_1.getWallet);
/**
 * @route   POST /api/v1/wallet/connect
 * @desc    Connect a new restaurant to the wallet
 * @access  Private
 */
router.post('/connect', wallet_controller_1.connectRestaurant);
/**
 * @route   POST /api/v1/wallet/manual-entry
 * @desc    Add points manually (for unsupported restaurants)
 * @access  Private
 */
router.post('/manual-entry', wallet_controller_1.manualEntry);
/**
 * @route   POST /api/v1/wallet/sync/:restaurantId
 * @desc    Trigger sync for a specific restaurant
 * @access  Private
 */
router.post('/sync/:restaurantId', wallet_controller_1.syncWallet);
/**
 * @route   GET /api/v1/wallet/history
 * @desc    Get transaction history with filters
 * @access  Private
 */
router.get('/history', wallet_controller_1.getTransactionHistory);
/**
 * @route   DELETE /api/v1/wallet/disconnect/:restaurantId
 * @desc    Disconnect a restaurant from wallet
 * @access  Private
 */
router.delete('/disconnect/:restaurantId', wallet_controller_1.disconnectRestaurant);
exports.default = router;
//# sourceMappingURL=wallet.route.js.map