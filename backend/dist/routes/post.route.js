"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route   POST /api/v1/posts
 * @desc    Create a new social post
 * @access  Private
 */
router.post('/', auth_middleware_1.authenticate, post_controller_1.createPost);
/**
 * @route   GET /api/v1/posts/feed
 * @desc    Get personalized social feed
 * @access  Private
 */
router.get('/feed', auth_middleware_1.authenticate, post_controller_1.getSocialFeed);
/**
 * @route   GET /api/v1/posts/:id
 * @desc    Get a single post by ID
 * @access  Public (with optional auth for like status)
 */
router.get('/:id', auth_middleware_1.optionalAuth, post_controller_1.getPost);
/**
 * @route   POST /api/v1/posts/:id/like
 * @desc    Like or unlike a post
 * @access  Private
 */
router.post('/:id/like', auth_middleware_1.authenticate, post_controller_1.toggleLike);
/**
 * @route   POST /api/v1/posts/:id/comment
 * @desc    Add a comment to a post
 * @access  Private
 */
router.post('/:id/comment', auth_middleware_1.authenticate, post_controller_1.addComment);
/**
 * @route   GET /api/v1/posts/:id/comments
 * @desc    Get comments for a post
 * @access  Public
 */
router.get('/:id/comments', post_controller_1.getComments);
/**
 * @route   DELETE /api/v1/posts/:id
 * @desc    Delete own post
 * @access  Private
 */
router.delete('/:id', auth_middleware_1.authenticate, post_controller_1.deletePost);
exports.default = router;
//# sourceMappingURL=post.route.js.map