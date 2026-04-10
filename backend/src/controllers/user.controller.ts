import { Response } from 'express';
import { z } from 'zod';
import { prisma } from '../services/database.service';
import { invalidateRefreshToken } from '../services/auth.service';
import { registerPushToken, unregisterPushToken } from '../services/notification.service';
import { AuthenticatedRequest } from '../types';

// Validation schemas
const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional().nullable(),
  profilePhoto: z.string().url('Invalid URL').optional().nullable(),
});

/**
 * GET /api/v1/users/me
 * Get current user profile
 */
export async function getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'AUTH_REQUIRED',
        },
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profilePhoto: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
        // Include related data counts
        _count: {
          select: {
            orders: true,
            socialPosts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: {
          message: 'User not found',
          code: 'USER_NOT_FOUND',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to fetch profile',
        code: 'GET_PROFILE_FAILED',
      },
    });
  }
}

/**
 * PUT /api/v1/users/me
 * Update current user profile
 */
export async function updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'AUTH_REQUIRED',
        },
      });
      return;
    }

    const validation = updateProfileSchema.safeParse(req.body);

    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          code: 'VALIDATION_ERROR',
          details: validation.error.issues,
        },
      });
      return;
    }

    const { name, phone, profilePhoto } = validation.data;

    // Build update data (only include defined fields)
    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (profilePhoto !== undefined) updateData.profilePhoto = profilePhoto;

    if (Object.keys(updateData).length === 0) {
      res.status(400).json({
        success: false,
        error: {
          message: 'No valid fields to update',
          code: 'NO_UPDATE_DATA',
        },
      });
      return;
    }

    const user = await prisma.user.update({
      where: { id: req.user.userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        profilePhoto: true,
        role: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to update profile',
        code: 'UPDATE_PROFILE_FAILED',
      },
    });
  }
}

/**
 * GET /api/v1/users/:id
 * Get another user's public profile
 */
export async function getUserProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        profilePhoto: true,
        createdAt: true,
        _count: {
          select: {
            socialPosts: true,
            followers: true,
            following: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found', code: 'USER_NOT_FOUND' },
      });
      return;
    }

    // Check if current user is following this user
    let isFollowing = false;
    if (req.user?.userId && req.user.userId !== id) {
      const follow = await prisma.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: req.user.userId,
            followingId: id,
          },
        },
      });
      isFollowing = !!follow;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          profilePhoto: user.profilePhoto,
          createdAt: user.createdAt,
          postCount: user._count.socialPosts,
          followerCount: user._count.followers,
          followingCount: user._count.following,
          isFollowing,
        },
      },
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch user profile', code: 'GET_USER_FAILED' },
    });
  }
}

/**
 * POST /api/v1/users/:id/follow
 * Follow or unfollow a user
 */
export async function toggleFollow(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const { id: targetUserId } = req.params;

    // Prevent self-follow
    if (req.user.userId === targetUserId) {
      res.status(400).json({
        success: false,
        error: { message: 'You cannot follow yourself', code: 'SELF_FOLLOW' },
      });
      return;
    }

    // Check if target user exists
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true },
    });

    if (!targetUser) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found', code: 'USER_NOT_FOUND' },
      });
      return;
    }

    // Check if already following
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: req.user.userId,
          followingId: targetUserId,
        },
      },
    });

    let isFollowing: boolean;

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: { id: existingFollow.id },
      });
      isFollowing = false;
    } else {
      // Follow
      await prisma.follow.create({
        data: {
          followerId: req.user.userId,
          followingId: targetUserId,
        },
      });
      isFollowing = true;
    }

    // Get updated counts
    const [followerCount, followingCount] = await Promise.all([
      prisma.follow.count({ where: { followingId: targetUserId } }),
      prisma.follow.count({ where: { followerId: targetUserId } }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        isFollowing,
        followerCount,
        followingCount,
      },
    });
  } catch (error) {
    console.error('Toggle follow error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update follow status', code: 'FOLLOW_UPDATE_FAILED' },
    });
  }
}

/**
 * GET /api/v1/users/:id/posts
 * Get posts by a specific user
 */
export async function getUserPosts(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { cursor, limit: limitStr = '20' } = req.query;

    const limit = Math.min(50, Math.max(1, parseInt(limitStr as string, 10)));

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        error: { message: 'User not found', code: 'USER_NOT_FOUND' },
      });
      return;
    }

    // Determine privacy filter based on relationship
    let privacyFilter: string[] = ['PUBLIC'];
    if (req.user?.userId) {
      if (req.user.userId === id) {
        // Own profile - show all posts
        privacyFilter = ['PUBLIC', 'FRIENDS_ONLY', 'PRIVATE'];
      } else {
        // Check if following
        const isFollowing = await prisma.follow.findUnique({
          where: {
            followerId_followingId: {
              followerId: req.user.userId,
              followingId: id,
            },
          },
        });
        if (isFollowing) {
          privacyFilter = ['PUBLIC', 'FRIENDS_ONLY'];
        }
      }
    }

    const posts = await prisma.socialPost.findMany({
      where: {
        userId: id,
        privacy: { in: privacyFilter as ('PUBLIC' | 'FRIENDS_ONLY' | 'PRIVATE')[] },
        ...(cursor ? { createdAt: { lt: new Date(cursor as string) } } : {}),
      },
      include: {
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

    // Check which posts user has liked
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
      error: { message: 'Failed to fetch user posts', code: 'GET_USER_POSTS_FAILED' },
    });
  }
}

/**
 * DELETE /api/v1/users/me
 * Delete (soft delete) current user account
 */
export async function deleteAccount(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'AUTH_REQUIRED',
        },
      });
      return;
    }

    // Soft delete: we could add a deletedAt field, but for now we'll hard delete
    // In production, you might want to implement soft delete with a deletedAt timestamp

    // Invalidate all refresh tokens first
    await invalidateRefreshToken(req.user.userId);

    // Delete all refresh tokens from database
    await prisma.refreshToken.deleteMany({
      where: { userId: req.user.userId },
    });

    // Delete the user (this will cascade to related records based on schema)
    await prisma.user.delete({
      where: { id: req.user.userId },
    });

    // Clear the refresh token cookie
    res.clearCookie('refreshToken', { path: '/' });

    res.status(200).json({
      success: true,
      data: {
        message: 'Account deleted successfully',
      },
    });
  } catch (error) {
    console.error('Delete account error:', error);
    res.status(500).json({
      success: false,
      error: {
        message: 'Failed to delete account',
        code: 'DELETE_ACCOUNT_FAILED',
      },
    });
  }
}

// Push token validation schema
const pushTokenSchema = z.object({
  token: z.string().min(1, 'Push token is required'),
});

/**
 * POST /api/v1/users/push-token
 * Register a push notification token for the current user
 */
export async function registerUserPushToken(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const validation = pushTokenSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid request body', details: validation.error.issues },
      });
      return;
    }

    const { token } = validation.data;

    await registerPushToken(req.user.userId, token);

    res.status(200).json({
      success: true,
      data: { message: 'Push token registered successfully' },
    });
  } catch (error) {
    console.error('Register push token error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to register push token', code: 'PUSH_TOKEN_REGISTER_FAILED' },
    });
  }
}

/**
 * DELETE /api/v1/users/push-token
 * Unregister a push notification token for the current user
 */
export async function unregisterUserPushToken(req: AuthenticatedRequest, res: Response): Promise<void> {
  try {
    if (!req.user?.userId) {
      res.status(401).json({
        success: false,
        error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
      });
      return;
    }

    const validation = pushTokenSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({
        success: false,
        error: { message: 'Invalid request body', details: validation.error.issues },
      });
      return;
    }

    const { token } = validation.data;

    await unregisterPushToken(req.user.userId, token);

    res.status(200).json({
      success: true,
      data: { message: 'Push token unregistered successfully' },
    });
  } catch (error) {
    console.error('Unregister push token error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to unregister push token', code: 'PUSH_TOKEN_UNREGISTER_FAILED' },
    });
  }
}
