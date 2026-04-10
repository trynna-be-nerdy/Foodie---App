import { Router } from 'express';
import {
  getWallet,
  connectRestaurant,
  manualEntry,
  syncWallet,
  getTransactionHistory,
  disconnectRestaurant,
} from '../controllers/wallet.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All wallet routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/wallet
 * @desc    Get unified wallet with all connected restaurants and balances
 * @access  Private
 */
router.get('/', getWallet);

/**
 * @route   POST /api/v1/wallet/connect
 * @desc    Connect a new restaurant to the wallet
 * @access  Private
 */
router.post('/connect', connectRestaurant);

/**
 * @route   POST /api/v1/wallet/manual-entry
 * @desc    Add points manually (for unsupported restaurants)
 * @access  Private
 */
router.post('/manual-entry', manualEntry);

/**
 * @route   POST /api/v1/wallet/sync/:restaurantId
 * @desc    Trigger sync for a specific restaurant
 * @access  Private
 */
router.post('/sync/:restaurantId', syncWallet);

/**
 * @route   GET /api/v1/wallet/history
 * @desc    Get transaction history with filters
 * @access  Private
 */
router.get('/history', getTransactionHistory);

/**
 * @route   DELETE /api/v1/wallet/disconnect/:restaurantId
 * @desc    Disconnect a restaurant from wallet
 * @access  Private
 */
router.delete('/disconnect/:restaurantId', disconnectRestaurant);

export default router;
