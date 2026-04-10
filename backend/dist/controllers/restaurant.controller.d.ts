import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/restaurants
 * Get list of restaurants with optional filters
 */
export declare function getRestaurants(req: Request, res: Response): Promise<void>;
/**
 * GET /api/v1/restaurants/:id
 * Get a single restaurant by ID with full details
 */
export declare function getRestaurantById(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/restaurants/nearby
 * Get restaurants near a location
 */
export declare function getNearbyRestaurants(req: Request, res: Response): Promise<void>;
/**
 * GET /api/v1/restaurants/loyalty
 * Get restaurants with loyalty programs
 */
export declare function getLoyaltyRestaurants(req: Request, res: Response): Promise<void>;
/**
 * PUT /api/v1/restaurants/:id/location-count
 * Update restaurant location count (local business indicator)
 */
export declare function updateRestaurantLocationCount(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=restaurant.controller.d.ts.map