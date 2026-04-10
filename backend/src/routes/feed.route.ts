import { Router } from 'express';
import {
  getFeedRestaurants,
  getTrendingDishes,
  markNotInterested,
} from '../controllers/feed.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All feed routes require authentication
router.use(authenticate);

/**
 * @route   GET /api/v1/feed/restaurants
 * @desc    Get personalized restaurant feed
 * @access  Private
 */
router.get('/restaurants', getFeedRestaurants);

/**
 * @route   GET /api/v1/feed/trending-dishes
 * @desc    Get trending dishes for discovery
 * @access  Private
 */
router.get('/trending-dishes', getTrendingDishes);

/**
 * @route   POST /api/v1/feed/not-interested
 * @desc    Mark restaurant as not interested
 * @access  Private
 */
router.post('/not-interested', markNotInterested);

export default router;
