"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_controller_1 = require("../controllers/restaurant.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/v1/restaurants
 * @desc    Get list of restaurants with optional filters
 * @access  Public
 */
router.get('/', restaurant_controller_1.getRestaurants);
/**
 * @route   GET /api/v1/restaurants/nearby
 * @desc    Get restaurants near a location
 * @access  Public
 */
router.get('/nearby', restaurant_controller_1.getNearbyRestaurants);
/**
 * @route   GET /api/v1/restaurants/loyalty
 * @desc    Get restaurants with loyalty programs
 * @access  Public
 */
router.get('/loyalty', restaurant_controller_1.getLoyaltyRestaurants);
/**
 * @route   PUT /api/v1/restaurants/:id/location-count
 * @desc    Update restaurant location count
 * @access  Admin/Restaurant Owner
 */
router.put('/:id/location-count', auth_middleware_1.authenticate, (0, auth_middleware_1.authorize)('ADMIN', 'RESTAURANT_OWNER'), restaurant_controller_1.updateRestaurantLocationCount);
/**
 * @route   GET /api/v1/restaurants/:id
 * @desc    Get a single restaurant by ID
 * @access  Public
 */
router.get('/:id', restaurant_controller_1.getRestaurantById);
exports.default = router;
//# sourceMappingURL=restaurant.route.js.map