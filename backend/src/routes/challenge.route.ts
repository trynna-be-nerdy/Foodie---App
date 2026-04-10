import { Router } from 'express';
import { authenticateToken, authorize, optionalAuth } from '../middleware/auth.middleware';
import {
  getChallenges,
  getChallenge,
  acceptChallenge,
  getChallengeProgress,
  getLeaderboard,
  getUserAchievements,
  getFoodiePoints,
  createChallenge,
} from '../controllers/challenge.controller';

const router = Router();

// Public routes (with optional auth for user-specific data)
router.get('/', optionalAuth, getChallenges);
router.get('/leaderboard', optionalAuth, getLeaderboard);

// Admin/restaurant owner routes
router.post('/', authenticateToken, authorize('ADMIN', 'RESTAURANT_OWNER'), createChallenge);

// Authenticated routes
router.get('/user/achievements', authenticateToken, getUserAchievements);
router.get('/user/foodie-points', authenticateToken, getFoodiePoints);

// Challenge-specific routes
router.get('/:id', optionalAuth, getChallenge);
router.post('/:id/accept', authenticateToken, acceptChallenge);
router.get('/:id/progress', authenticateToken, getChallengeProgress);

export default router;
