import { Router } from 'express';
import {
  createPost,
  getSocialFeed,
  getPost,
  toggleLike,
  addComment,
  getComments,
  deletePost,
  getUserPosts,
  savePost,
  unsavePost,
  getSavedPosts,
} from '../controllers/post.controller';
import { authenticate, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   POST /api/v1/posts
 * @desc    Create a new social post
 * @access  Private
 */
router.post('/', authenticate, createPost);

/**
 * @route   GET /api/v1/posts/feed
 * @desc    Get personalized social feed
 * @access  Private
 */
router.get('/feed', authenticate, getSocialFeed);

/**
 * @route   GET /api/v1/posts/:id
 * @desc    Get a single post by ID
 * @access  Public (with optional auth for like status)
 */
router.get('/:id', optionalAuth, getPost);

/**
 * @route   POST /api/v1/posts/:id/like
 * @desc    Like or unlike a post
 * @access  Private
 */
router.post('/:id/like', authenticate, toggleLike);

/**
 * @route   POST /api/v1/posts/:id/comment
 * @desc    Add a comment to a post
 * @access  Private
 */
router.post('/:id/comment', authenticate, addComment);

/**
 * @route   GET /api/v1/posts/:id/comments
 * @desc    Get comments for a post
 * @access  Public
 */
router.get('/:id/comments', getComments);

/**
 * @route   DELETE /api/v1/posts/:id
 * @desc    Delete own post
 * @access  Private
 */
router.delete('/:id', authenticate, deletePost);

/**
 * @route   GET /api/v1/posts/saved
 * @desc    Get user's saved/bookmarked posts
 * @access  Private
 */
router.get('/saved', authenticate, getSavedPosts);

/**
 * @route   GET /api/v1/posts/user/:userId
 * @desc    Get posts by a specific user
 * @access  Public (with optional auth for like status)
 */
router.get('/user/:userId', optionalAuth, getUserPosts);

/**
 * @route   POST /api/v1/posts/:id/save
 * @desc    Save/bookmark a post
 * @access  Private
 */
router.post('/:id/save', authenticate, savePost);

/**
 * @route   DELETE /api/v1/posts/:id/save
 * @desc    Unsave/unbookmark a post
 * @access  Private
 */
router.delete('/:id/save', authenticate, unsavePost);

export default router;
