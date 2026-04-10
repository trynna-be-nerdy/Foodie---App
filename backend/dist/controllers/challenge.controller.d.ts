import { Response } from 'express';
import { AuthenticatedRequest } from '../types';
/**
 * GET /api/v1/challenges
 * Get all active challenges with user's participation status
 */
export declare function getChallenges(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/challenges/:id
 * Get a single challenge with detailed progress
 */
export declare function getChallenge(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/challenges/:id/accept
 * Accept a challenge and create participant record
 */
export declare function acceptChallenge(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/challenges/:id/progress
 * Get detailed progress for a specific challenge
 */
export declare function getChallengeProgress(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/challenges/leaderboard
 * Get leaderboard rankings (local, national, friends)
 */
export declare function getLeaderboard(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * POST /api/v1/challenges
 * Create a challenge (admin or restaurant owner)
 */
export declare function createChallenge(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/challenges/user/achievements
 * Get user's achievements and badges
 */
export declare function getUserAchievements(req: AuthenticatedRequest, res: Response): Promise<void>;
/**
 * GET /api/v1/challenges/user/foodie-points
 * Get user's Foodie Points balance and history
 */
export declare function getFoodiePoints(req: AuthenticatedRequest, res: Response): Promise<void>;
//# sourceMappingURL=challenge.controller.d.ts.map