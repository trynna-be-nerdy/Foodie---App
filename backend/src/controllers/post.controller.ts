import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../services/database.service';
import { moderateContent, shouldAutoReject } from '../services/moderation.service';
import { AuthenticatedRequest } from '../types';

// Validation schemas
const createPostSchema = z.object({
  content: z.string().max(500, 'Caption must be 500 characters or less'),
  mediaUrls: z.array(z.string().url()).max(5, 'Maximum 5 photos allowed').optional().default([]),
  restaurantId: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  dishTags: z.array(z.string()).max(10).optional().default([]),
  privacy: z.enum(['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE']).optional().default('PUBLIC'),
});

const feedQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional().default('20'),
});

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty').max(500, 'Comment must be 500 characters or less'),
  parentId: z.string().optional(),
});

/**
 * POST /api/v1/posts
 * Create a new social post
 */
export async function createPost(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const validation = createPostSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid request body', details: validation.error.issues },
      });
      return;
    }

    const { content, mediaUrls, restaurantId, rating, dishTags, privacy } = validation.data;

    // Verify restaurant exists if provided
    if (restaurantId) {
      const restaurant = await prisma.restaurant.findUnique({
        where: { id: restaurantId },
        select: { id: true },
      });

      if (!restaurant) {
        res.status(400).json({
          success: false,
          error: { message: 'Restaurant not found', code: 'RESTAURANT_NOT_FOUND' },
        });
        return;
      }
    }

    // Moderate content
    const moderationResult = moderateContent(content);

    // Auto-reject severely toxic content
    if (shouldAutoReject(moderationResult)) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Your post contains inappropriate content that violates our community guidelines.',
          code: 'CONTENT_REJECTED',
          details: moderationResult.flagReasons,
        },
      });
      return;
    }

    // Create the post (flag if moderately toxic for review)
    const post = await prisma.socialPost.create({
      data: {
        userId: req.user.userId,
        content,
        mediaUrls,
        restaurantId: restaurantId || null,
        rating: rating || null,
        dishTags,
        privacy,
        isFlagged: moderationResult.isFlagged,
        flagReason: moderationResult.isFlagged ? moderationResult.flagReasons.join('; ') : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      data: {
        post: {
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls,
          rating: post.rating,
          dishTags: post.dishTags,
          privacy: post.privacy,
          viewCount: post.viewCount,
          createdAt: post.createdAt,
          user: post.user,
          restaurant: post.restaurant,
          likeCount: post._count.likes,
          commentCount: post._count.comments,
          isLiked: false,
        },
      },
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create post', code: 'POST_CREATE_FAILED' },
    });
  }
}

/**
 * GET /api/v1/posts/feed
 * Get personalized social feed
 */
export async function getSocialFeed(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const validation = feedQuerySchema.safeParse(req.query);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid query parameters', details: validation.error.issues },
      });
      return;
    }

    const limit = Math.min(50, Math.max(1, parseInt(validation.data.limit, 10)));
    const cursor = validation.data.cursor;

    // Get user's following list
    const following = await prisma.follow.findMany({
      where: { followerId: req.user.userId },
      select: { followingId: true },
    });
    const followingIds = following.map((f) => f.followingId);

    // Build cursor condition
    const cursorCondition = cursor ? { createdAt: { lt: new Date(cursor) } } : {};

    // Fetch posts from followed users (70%) and public posts (30%)
    const [followedPosts, publicPosts] = await Promise.all([
      // Posts from followed users
      prisma.socialPost.findMany({
        where: {
          userId: { in: followingIds },
          privacy: { in: ['PUBLIC', 'FRIENDS_ONLY'] },
          ...cursorCondition,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profilePhoto: true,
            },
          },
          restaurant: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
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
        take: Math.ceil(limit * 0.7),
      }),
      // Public posts from others (trending/recommended)
      prisma.socialPost.findMany({
        where: {
          userId: { notIn: [...followingIds, req.user.userId] },
          privacy: 'PUBLIC',
          ...cursorCondition,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              profilePhoto: true,
            },
          },
          restaurant: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
            },
          },
          _count: {
            select: {
              likes: true,
              comments: true,
            },
          },
        },
        orderBy: [
          { viewCount: 'desc' },
          { createdAt: 'desc' },
        ],
        take: Math.ceil(limit * 0.3),
      }),
    ]);

    // Check which posts user has liked
    const allPostIds = [...followedPosts, ...publicPosts].map((p) => p.id);
    const userLikes = await prisma.like.findMany({
      where: {
        userId: req.user.userId,
        postId: { in: allPostIds },
      },
      select: { postId: true },
    });
    const likedPostIds = new Set(userLikes.map((l) => l.postId));

    // Apply engagement boost and blend posts
    const scoredPosts = [...followedPosts, ...publicPosts]
      .map((post) => {
        // Engagement boost: +2 hours per 10 likes, +1 hour per comment
        const likesBoostHours = Math.floor(post._count.likes / 10) * 2;
        const commentsBoostHours = post._count.comments;
        const boostMs = (likesBoostHours + commentsBoostHours) * 60 * 60 * 1000;
        const effectiveTime = post.createdAt.getTime() + boostMs;

        return {
          ...post,
          effectiveTime,
          isLiked: likedPostIds.has(post.id),
        };
      })
      .sort((a, b) => b.effectiveTime - a.effectiveTime)
      .slice(0, limit);

    // Get next cursor
    const nextCursor = scoredPosts.length === limit
      ? scoredPosts[scoredPosts.length - 1]?.createdAt.toISOString()
      : null;

    res.status(200).json({
      success: true,
      data: {
        posts: scoredPosts.map((post) => ({
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls,
          rating: post.rating,
          dishTags: post.dishTags,
          privacy: post.privacy,
          viewCount: post.viewCount,
          createdAt: post.createdAt,
          user: post.user,
          restaurant: post.restaurant,
          likeCount: post._count.likes,
          commentCount: post._count.comments,
          isLiked: post.isLiked,
        })),
        nextCursor,
      },
    });
  } catch (error) {
    console.error('Get social feed error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch feed', code: 'FEED_FETCH_FAILED' },
    });
  }
}

/**
 * GET /api/v1/posts/:id
 * Get a single post by ID
 */
export async function getPost(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const post = await prisma.socialPost.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    // Check if user has liked the post
    let isLiked = false;
    if (req.user?.userId) {
      const like = await prisma.like.findUnique({
        where: {
          postId_userId: {
            postId: id,
            userId: req.user.userId,
          },
        },
      });
      isLiked = !!like;
    }

    // Increment view count
    await prisma.socialPost.update({
      where: { id },
      data: { viewCount: { increment: 1 } },
    });

    res.status(200).json({
      success: true,
      data: {
        post: {
          id: post.id,
          content: post.content,
          mediaUrls: post.mediaUrls,
          rating: post.rating,
          dishTags: post.dishTags,
          privacy: post.privacy,
          viewCount: post.viewCount + 1,
          createdAt: post.createdAt,
          user: post.user,
          restaurant: post.restaurant,
          likeCount: post._count.likes,
          commentCount: post._count.comments,
          isLiked,
        },
      },
    });
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch post', code: 'POST_FETCH_FAILED' },
    });
  }
}

/**
 * POST /api/v1/posts/:id/like
 * Like or unlike a post
 */
export async function toggleLike(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id: postId } = req.params;

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    // Check if already liked
    const existingLike = await prisma.like.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: req.user.userId,
        },
      },
    });

    let isLiked: boolean;
    let likeCount: number;

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
      isLiked = false;
    } else {
      // Like
      await prisma.like.create({
        data: {
          postId,
          userId: req.user.userId,
        },
      });
      isLiked = true;
    }

    // Get updated like count
    likeCount = await prisma.like.count({
      where: { postId },
    });

    res.status(200).json({
      success: true,
      data: {
        isLiked,
        likeCount,
      },
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update like', code: 'LIKE_UPDATE_FAILED' },
    });
  }
}

/**
 * POST /api/v1/posts/:id/comment
 * Add a comment to a post
 */
export async function addComment(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id: postId } = req.params;

    const validation = commentSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid request body', details: validation.error.issues },
      });
      return;
    }

    const { content, parentId } = validation.data;

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    // If replying to a comment, verify parent exists
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: parentId },
        select: { id: true, postId: true },
      });

      if (!parentComment || parentComment.postId !== postId) {
        res.status(400).json({
          success: false,
          error: { message: 'Parent comment not found', code: 'PARENT_NOT_FOUND' },
        });
        return;
      }
    }

    // Moderate comment content
    const moderationResult = moderateContent(content);

    // Auto-reject severely toxic content
    if (shouldAutoReject(moderationResult)) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Your comment contains inappropriate content.',
          code: 'CONTENT_REJECTED',
        },
      });
      return;
    }

    // Create comment
    const comment = await prisma.comment.create({
      data: {
        postId,
        userId: req.user.userId,
        content,
        parentId: parentId || null,
        isFlagged: moderationResult.isFlagged,
        flagReason: moderationResult.isFlagged ? moderationResult.flagReasons.join('; ') : null,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
      },
    });

    // Get updated comment count
    const commentCount = await prisma.comment.count({
      where: { postId },
    });

    res.status(201).json({
      success: true,
      data: {
        comment: {
          id: comment.id,
          content: comment.content,
          createdAt: comment.createdAt,
          user: comment.user,
          parentId: comment.parentId,
        },
        commentCount,
      },
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to add comment', code: 'COMMENT_ADD_FAILED' },
    });
  }
}

/**
 * GET /api/v1/posts/:id/comments
 * Get comments for a post
 */
export async function getComments(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id: postId } = req.params;
    const { cursor, limit: limitStr = '20' } = req.query;

    const limit = Math.min(50, Math.max(1, parseInt(limitStr as string, 10)));

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    // Get top-level comments (no parent)
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
        ...(cursor ? { createdAt: { lt: new Date(cursor as string) } } : {}),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profilePhoto: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
          take: 3, // Show first 3 replies
        },
        _count: {
          select: {
            replies: true,
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
          createdAt: comment.createdAt,
          user: comment.user,
          replies: comment.replies.map((reply) => ({
            id: reply.id,
            content: reply.content,
            createdAt: reply.createdAt,
            user: reply.user,
          })),
          replyCount: comment._count.replies,
        })),
        nextCursor,
      },
    });
  } catch (error) {
    console.error('Get comments error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch comments', code: 'COMMENTS_FETCH_FAILED' },
    });
  }
}

/**
 * DELETE /api/v1/posts/:id
 * Delete own post
 */
export async function deletePost(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id } = req.params;

    // Find post and verify ownership
    const post = await prisma.socialPost.findUnique({
      where: { id },
      select: { id: true, userId: true, mediaUrls: true },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    if (post.userId !== req.user.userId) {
      res.status(403).json({
        success: false,
        error: { message: 'You can only delete your own posts', code: 'FORBIDDEN' },
      });
      return;
    }

    // Delete post (cascade will delete comments and likes)
    await prisma.socialPost.delete({
      where: { id },
    });

    // TODO: Delete media from S3 (post.mediaUrls)

    res.status(200).json({
      success: true,
      data: { message: 'Post deleted successfully' },
    });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete post', code: 'POST_DELETE_FAILED' },
    });
  }
}

/**
 * GET /api/v1/posts/user/:userId
 * Get posts by a specific user
 */
export async function getUserPosts(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { userId } = req.params;
    const { cursor, limit: limitStr = '20' } = req.query;

    const limit = Math.min(50, Math.max(1, parseInt(limitStr as string, 10)));
    const cursorCondition = cursor ? { createdAt: { lt: new Date(cursor as string) } } : {};

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found', code: 'USER_NOT_FOUND' },
      });
      return;
    }

    // Get posts by user
    const posts = await prisma.socialPost.findMany({
      where: {
        userId,
        ...cursorCondition,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
          },
        },
        restaurant: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
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

    // Check which posts user has liked (if authenticated)
    let likedPostIds = new Set<string>();
    if (req.user?.userId) {
      const userLikes = await prisma.like.findMany({
        where: {
          userId: req.user.userId,
          postId: { in: posts.map((p) => p.id) },
        },
        select: { postId: true },
      });
      likedPostIds = new Set(userLikes.map((l) => l.postId));
    }

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
          dishTags: post.dishTags,
          privacy: post.privacy,
          viewCount: post.viewCount,
          createdAt: post.createdAt,
          user: post.user,
          restaurant: post.restaurant,
          likeCount: post._count.likes,
          commentCount: post._count.comments,
          isLiked: likedPostIds.has(post.id),
        })),
        nextCursor,
      },
    });
  } catch (error) {
    console.error('Get user posts error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch user posts', code: 'USER_POSTS_FETCH_FAILED' },
    });
  }
}

/**
 * POST /api/v1/posts/:id/save
 * Save/bookmark a post
 */
export async function savePost(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id: postId } = req.params;

    // Check if post exists
    const post = await prisma.socialPost.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!post) {
      res.status(404).json({
        success: false,
        error: { message: 'Post not found', code: 'POST_NOT_FOUND' },
      });
      return;
    }

    // Create save record (upsert to avoid duplicates)
    await prisma.savedPost.upsert({
      where: {
        postId_userId: {
          postId,
          userId: req.user.userId,
        },
      },
      create: {
        postId,
        userId: req.user.userId,
      },
      update: {},
    });

    res.status(200).json({
      success: true,
      data: { isSaved: true },
    });
  } catch (error) {
    console.error('Save post error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to save post', code: 'POST_SAVE_FAILED' },
    });
  }
}

/**
 * DELETE /api/v1/posts/:id/save
 * Unsave/unbookmark a post
 */
export async function unsavePost(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id: postId } = req.params;

    // Delete save record if exists
    await prisma.savedPost.deleteMany({
      where: {
        postId,
        userId: req.user.userId,
      },
    });

    res.status(200).json({
      success: true,
      data: { isSaved: false },
    });
  } catch (error) {
    console.error('Unsave post error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to unsave post', code: 'POST_UNSAVE_FAILED' },
    });
  }
}

/**
 * GET /api/v1/posts/saved
 * Get user's saved posts
 */
export async function getSavedPosts(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { cursor, limit: limitStr = '20' } = req.query;
    const limit = Math.min(50, Math.max(1, parseInt(limitStr as string, 10)));
    const cursorCondition = cursor ? { createdAt: { lt: new Date(cursor as string) } } : {};

    // Get saved posts
    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId: req.user.userId,
        ...cursorCondition,
      },
      include: {
        post: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profilePhoto: true,
              },
            },
            restaurant: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            _count: {
              select: {
                likes: true,
                comments: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    // Check which posts user has liked
    const postIds = savedPosts.map((sp) => sp.post.id);
    const userLikes = await prisma.like.findMany({
      where: {
        userId: req.user.userId,
        postId: { in: postIds },
      },
      select: { postId: true },
    });
    const likedPostIds = new Set(userLikes.map((l) => l.postId));

    const nextCursor = savedPosts.length === limit
      ? savedPosts[savedPosts.length - 1]?.createdAt.toISOString()
      : null;

    res.status(200).json({
      success: true,
      data: {
        posts: savedPosts.map((sp) => ({
          id: sp.post.id,
          content: sp.post.content,
          mediaUrls: sp.post.mediaUrls,
          rating: sp.post.rating,
          dishTags: sp.post.dishTags,
          privacy: sp.post.privacy,
          viewCount: sp.post.viewCount,
          createdAt: sp.post.createdAt,
          user: sp.post.user,
          restaurant: sp.post.restaurant,
          likeCount: sp.post._count.likes,
          commentCount: sp.post._count.comments,
          isLiked: likedPostIds.has(sp.post.id),
        })),
        nextCursor,
      },
    });
  } catch (error) {
    console.error('Get saved posts error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch saved posts', code: 'SAVED_POSTS_FETCH_FAILED' },
    });
  }
}
