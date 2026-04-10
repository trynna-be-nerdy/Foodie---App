import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/wallet
 * Get unified wallet with all connected restaurants and balances
 */
export declare function getWallet(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/wallet/connect
 * Connect a new restaurant to the wallet
 */
export declare function connectRestaurant(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/wallet/manual-entry
 * Add points manually (for unsupported restaurants)
 */
export declare function manualEntry(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/wallet/sync/:restaurantId
 * Trigger sync for a specific restaurant
 */
export declare function syncWallet(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/wallet/history
 * Get transaction history with filters
 */
export declare function getTransactionHistory(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * DELETE /api/v1/wallet/disconnect/:restaurantId
 * Disconnect a restaurant from wallet
 */
export declare function disconnectRestaurant(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=wallet.controller.d.ts.map