import { Router } from 'express';
import {
  getFlaggedPosts,
  getFlaggedComments,
  moderatePost,
  moderateComment,
} from '../controllers/moderation.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';

const router = Router();

// All moderation routes require authentication and admin role
router.use(authenticate);
router.use(authorize('ADMIN'));

/**
 * @route   GET /api/v1/moderation/flagged
 * @desc    Get flagged posts awaiting review
 * @access  Admin only
 */
router.get('/flagged', getFlaggedPosts);

/**
 * @route   GET /api/v1/moderation/comments/flagged
 * @desc    Get flagged comments awaiting review
 * @access  Admin only
 */
router.get('/comments/flagged', getFlaggedComments);

/**
 * @route   POST /api/v1/moderation/posts/:id
 * @desc    Approve or reject a flagged post
 * @access  Admin only
 */
router.post('/posts/:id', moderatePost);

/**
 * @route   POST /api/v1/moderation/comments/:id
 * @desc    Approve or reject a flagged comment
 * @access  Admin only
 */
router.post('/comments/:id', moderateComment);

export default router;
