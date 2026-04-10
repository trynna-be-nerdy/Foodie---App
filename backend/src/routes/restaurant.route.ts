import { Router } from 'express';
import {
  getRestaurants,
  getRestaurantById,
  getNearbyRestaurants,
  getLoyaltyRestaurants,
  updateRestaurantLocationCount,
} from '../controllers/restaurant.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   GET /api/v1/restaurants
 * @desc    Get list of restaurants with optional filters
 * @access  Public
 */
router.get('/', getRestaurants);

/**
 * @route   GET /api/v1/restaurants/nearby
 * @desc    Get restaurants near a location
 * @access  Public
 */
router.get('/nearby', getNearbyRestaurants);

/**
 * @route   GET /api/v1/restaurants/loyalty
 * @desc    Get restaurants with loyalty programs
 * @access  Public
 */
router.get('/loyalty', getLoyaltyRestaurants);

/**
 * @route   PUT /api/v1/restaurants/:id/location-count
 * @desc    Update restaurant location count
 * @access  Admin/Restaurant Owner
 */
router.put(
  '/:id/location-count',
  authenticate,
  authorize('ADMIN', 'RESTAURANT_OWNER'),
  updateRestaurantLocationCount
);

/**
 * @route   GET /api/v1/restaurants/:id
 * @desc    Get a single restaurant by ID
 * @access  Public
 */
router.get('/:id', getRestaurantById);

export default router;
