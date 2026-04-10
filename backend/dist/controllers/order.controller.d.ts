import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * POST /api/v1/orders
 * Create a new order and initiate payment
 */
export declare function createOrder(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/orders/:id/confirm
 * Confirm order after successful payment
 */
export declare function confirmOrder(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/orders/:id
 * Get order details
 */
export declare function getOrder(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/orders/history
 * Get user's order history
 */
export declare function getOrderHistory(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * PUT /api/v1/orders/:id/status
 * Update order status (restaurant/admin only)
 */
export declare function updateOrderStatus(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/orders/:id/cancel
 * Cancel an order
 */
export declare function cancelOrder(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/orders/:id/track
 * Get real-time order tracking info
 */
export declare function trackOrder(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/restaurants/:restaurantId/menu
 * Get restaurant menu grouped by category
 */
export declare function getRestaurantMenu(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=order.controller.d.ts.map