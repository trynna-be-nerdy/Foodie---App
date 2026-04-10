"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', auth_middleware_1.authenticate, user_controller_1.getProfile);
/**
 * @route   PUT /api/v1/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/me', auth_middleware_1.authenticate, user_controller_1.updateProfile);
/**
 * @route   DELETE /api/v1/users/me
 * @desc    Delete current user account
 * @access  Private
 */
router.delete('/me', auth_middleware_1.authenticate, user_controller_1.deleteAccount);
/**
 * @route   POST /api/v1/users/push-token
 * @desc    Register push notification token
 * @access  Private
 */
router.post('/push-token', auth_middleware_1.authenticate, user_controller_1.registerUserPushToken);
/**
 * @route   DELETE /api/v1/users/push-token
 * @desc    Unregister push notification token
 * @access  Private
 */
router.delete('/push-token', auth_middleware_1.authenticate, user_controller_1.unregisterUserPushToken);
/**
 * @route   GET /api/v1/users/:id
 * @desc    Get another user's public profile
 * @access  Public (with optional auth for follow status)
 */
router.get('/:id', auth_middleware_1.optionalAuth, user_controller_1.getUserProfile);
/**
 * @route   POST /api/v1/users/:id/follow
 * @desc    Follow or unfollow a user
 * @access  Private
 */
router.post('/:id/follow', auth_middleware_1.authenticate, user_controller_1.toggleFollow);
/**
 * @route   GET /api/v1/users/:id/posts
 * @desc    Get posts by a specific user
 * @access  Public (with optional auth for like status)
 */
router.get('/:id/posts', auth_middleware_1.optionalAuth, user_controller_1.getUserPosts);
exports.default = router;
//# sourceMappingURL=user.route.js.map