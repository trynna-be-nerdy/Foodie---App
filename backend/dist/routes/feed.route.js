"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const feed_controller_1 = require("../controllers/feed.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All feed routes require authentication
router.use(auth_middleware_1.authenticate);
/**
 * @route   GET /api/v1/feed/restaurants
 * @desc    Get personalized restaurant feed
 * @access  Private
 */
router.get('/restaurants', feed_controller_1.getFeedRestaurants);
/**
 * @route   GET /api/v1/feed/trending-dishes
 * @desc    Get trending dishes for discovery
 * @access  Private
 */
router.get('/trending-dishes', feed_controller_1.getTrendingDishes);
/**
 * @route   POST /api/v1/feed/not-interested
 * @desc    Mark restaurant as not interested
 * @access  Private
 */
router.post('/not-interested', feed_controller_1.markNotInterested);
exports.default = router;
//# sourceMappingURL=feed.route.js.map