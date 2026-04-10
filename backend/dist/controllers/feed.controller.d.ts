import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
export declare function getFeedRestaurants(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function getTrendingDishes(req: AuthenticatedRequest, res: Response): Promise<void>;
export declare function markNotInterested(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=feed.controller.d.ts.map