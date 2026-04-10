"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlaggedPosts = getFlaggedPosts;
exports.getFlaggedComments = getFlaggedComments;
exports.moderatePost = moderatePost;
exports.moderateComment = moderateComment;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
const moderationActionSchema = zod_1.z.object({
    action: zod_1.z.enum(['approve', 'reject']),
});
/**
 * GET /api/v1/moderation/flagged
 * Get flagged posts awaiting review (admin only)
 */
async function getFlaggedPosts(req, res) {
    try {
        if (!req.user?.userId || req.user.role !== 'ADMIN') {
            res.status(403).json({
                success: false,
                error: { message: 'Admin access required', code: 'FORBIDDEN' },
            });
            return;
        }
        const { cursor, limit: limitStr = '20' } = req.query;
        const limit = Math.min(50, Math.max(1, parseInt(limitStr, 10)));
        const posts = await database_service_1.prisma.socialPost.findMany({
            where: {
                isFlagged: true,
                ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePhoto: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        const nextCursor = posts.length === limit
            ? posts[posts.length - 1]?.createdAt.toISOString()
            : null;
        res.status(200).json({
            success: true,
            data: {
                posts: posts.map((post) => ({
                    id: post.id,
                    content: post.content,
                    mediaUrls: post.mediaUrls,
                    rating: post.rating,
                    flagReason: post.flagReason,
                    createdAt: post.createdAt,
                    user: post.user,
                    restaurant: post.restaurant,
                    likeCount: post._count.likes,
                    commentCount: post._count.comments,
                })),
                nextCursor,
            },
        });
    }
    catch (error) {
        console.error('Get flagged posts error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch flagged posts', code: 'FLAGGED_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/moderation/comments/flagged
 * Get flagged comments awaiting review (admin only)
 */
async function getFlaggedComments(req, res) {
    try {
        if (!req.user?.userId || req.user.role !== 'ADMIN') {
            res.status(403).json({
                success: false,
                error: { message: 'Admin access required', code: 'FORBIDDEN' },
            });
            return;
        }
        const { cursor, limit: limitStr = '20' } = req.query;
        const limit = Math.min(50, Math.max(1, parseInt(limitStr, 10)));
        const comments = await database_service_1.prisma.comment.findMany({
            where: {
                isFlagged: true,
                ...(cursor ? { createdAt: { lt: new Date(cursor) } } : {}),
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profilePhoto: true,
                    },
                },
                post: {
                    select: {
                        id: true,
                        content: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        const nextCursor = comments.length === limit
            ? comments[comments.length - 1]?.createdAt.toISOString()
            : null;
        res.status(200).json({
            success: true,
            data: {
                comments: comments.map((comment) => ({
                    id: comment.id,
                    content: comment.content,
                    flagReason: comment.flagReason,
                    createdAt: comment.createdAt,
                    user: comment.user,
                    post: comment.post,
                })),
                nextCursor,
            },
        });
    }
    catch (error) {
        console.error('Get flagged comments error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch flagged comments', code: 'FLAGGED_FETCH_FAILED' },
        });
    }
}
/**
 * POST /api/v1/moderation/posts/:id
 * Approve or reject a flagged post (admin only)
 */
async function moderatePost(req, res) {
    try {
        if (!req.user?.userId || req.user.role !== 'ADMIN') {
            res.status(403).json({
                success: false,
                error: { message: 'Admin access required', code: 'FORBIDDEN' },
            });
            return;
        }
        const { id } = req.params;
        const validation = moderationActionSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { action } = validation.data;
        const post = await database_service_1.prisma.socialPost.findUnique({
            where: { id },
            select: { id: true, isFlagged: true },
        });
        if (!post) {
            res.status(404).json({
                success: false,
                error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
            });
            return;
        }
        if (action === 'approve') {
            // Clear the flag
            await database_service_1.prisma.socialPost.update({
                where: { id },
                data: {
                    isFlagged: false,
                    flagReason: null,
                },
            });
        }
        else {
            // Delete the post
            await database_service_1.prisma.socialPost.delete({
                where: { id },
            });
        }
        res.status(200).json({
            success: true,
            data: {
                message: action === 'approve' ? 'Post approved' : 'Post removed',
                postId: id,
                action,
            },
        });
    }
    catch (error) {
        console.error('Moderate post error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to moderate post', code: 'MODERATION_FAILED' },
        });
    }
}
/**
 * POST /api/v1/moderation/comments/:id
 * Approve or reject a flagged comment (admin only)
 */
async function moderateComment(req, res) {
    try {
        if (!req.user?.userId || req.user.role !== 'ADMIN') {
            res.status(403).json({
                success: false,
                error: { message: 'Admin access required', code: 'FORBIDDEN' },
            });
            return;
        }
        const { id } = req.params;
        const validation = moderationActionSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid request body', details: validation.error.issues },
            });
            return;
        }
        const { action } = validation.data;
        const comment = await database_service_1.prisma.comment.findUnique({
            where: { id },
            select: { id: true, isFlagged: true },
        });
        if (!comment) {
            res.status(404).json({
                success: false,
                error: { message: 'Comment not found', code: 'COMMENT_NOT_FOUND' },
            });
            return;
        }
        if (action === 'approve') {
            // Clear the flag
            await database_service_1.prisma.comment.update({
                where: { id },
                data: {
                    isFlagged: false,
                    flagReason: null,
                },
            });
        }
        else {
            // Delete the comment
            await database_service_1.prisma.comment.delete({
                where: { id },
            });
        }
        res.status(200).json({
            success: true,
            data: {
                message: action === 'approve' ? 'Comment approved' : 'Comment removed',
                commentId: id,
                action,
            },
        });
    }
    catch (error) {
        console.error('Moderate comment error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to moderate comment', code: 'MODERATION_FAILED' },
        });
    }
}
//# sourceMappingURL=moderation.controller.js.map