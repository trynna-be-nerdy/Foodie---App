import { Router } from 'express';
import {
  getProfile,
  updateProfile,
  deleteAccount,
  getUserProfile,
  toggleFollow,
  getUserPosts,
  registerUserPushToken,
  unregisterUserPushToken,
} from '../controllers/user.controller';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   GET /api/v1/users/me
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/me', authenticate, getProfile);

/**
 * @route   PUT /api/v1/users/me
 * @desc    Update current user profile
 * @access  Private
 */
router.put('/me', authenticate, updateProfile);

/**
 * @route   DELETE /api/v1/users/me
 * @desc    Delete current user account
 * @access  Private
 */
router.delete('/me', authenticate, deleteAccount);

/**
 * @route   POST /api/v1/users/push-token
 * @desc    Register push notification token
 * @access  Private
 */
router.post('/push-token', authenticate, registerUserPushToken);

/**
 * @route   DELETE /api/v1/users/push-token
 * @desc    Unregister push notification token
 * @access  Private
 */
router.delete('/push-token', authenticate, unregisterUserPushToken);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get another user's public profile
 * @access  Public (with optional auth for follow status)
 */
router.get('/:id', optionalAuth, getUserProfile);

/**
 * @route   POST /api/v1/users/:id/follow
 * @desc    Follow or unfollow a user
 * @access  Private
 */
router.post('/:id/follow', authenticate, toggleFollow);

/**
 * @route   GET /api/v1/users/:id/posts
 * @desc    Get posts by a specific user
 * @access  Public (with optional auth for like status)
 */
router.get('/:id/posts', optionalAuth, getUserPosts);

export default router;
