"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const moderation_controller_1 = require("../controllers/moderation.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All moderation routes require authentication and admin role
router.use(auth_middleware_1.authenticate);
router.use((0, auth_middleware_1.authorize)('ADMIN'));
/**
 * @route   GET /api/v1/moderation/flagged
 * @desc    Get flagged posts awaiting review
 * @access  Admin only
 */
router.get('/flagged', moderation_controller_1.getFlaggedPosts);
/**
 * @route   GET /api/v1/moderation/comments/flagged
 * @desc    Get flagged comments awaiting review
 * @access  Admin only
 */
router.get('/comments/flagged', moderation_controller_1.getFlaggedComments);
/**
 * @route   POST /api/v1/moderation/posts/:id
 * @desc    Approve or reject a flagged post
 * @access  Admin only
 */
router.post('/posts/:id', moderation_controller_1.moderatePost);
/**
 * @route   POST /api/v1/moderation/comments/:id
 * @desc    Approve or reject a flagged comment
 * @access  Admin only
 */
router.post('/comments/:id', moderation_controller_1.moderateComment);
exports.default = router;
//# sourceMappingURL=moderation.route.js.map