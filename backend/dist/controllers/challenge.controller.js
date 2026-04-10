"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChallenges = getChallenges;
exports.getChallenge = getChallenge;
exports.acceptChallenge = acceptChallenge;
exports.getChallengeProgress = getChallengeProgress;
exports.getLeaderboard = getLeaderboard;
exports.createChallenge = createChallenge;
exports.getUserAchievements = getUserAchievements;
exports.getFoodiePoints = getFoodiePoints;
const zod_1 = require("zod");
const database_service_1 = require("../services/database.service");
const leaderboard_service_1 = require("../services/leaderboard.service");
// Validation schemas
const acceptChallengeSchema = zod_1.z.object({
    challengeId: zod_1.z.string().min(1),
});
const leaderboardQuerySchema = zod_1.z.object({
    scope: zod_1.z.enum(['local', 'national', 'friends']).default('national'),
    limit: zod_1.z.string().optional().default('50'),
    offset: zod_1.z.string().optional().default('0'),
    page: zod_1.z.string().optional(),
});
const createChallengeSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(120),
    description: zod_1.z.string().min(10).max(500),
    type: zod_1.z.enum([
        'UNIQUE_RESTAURANTS',
        'DIVERSE_DISHES',
        'CUISINE_EXPLORATION',
        'SPONSORED',
        'SOCIAL_ENGAGEMENT',
        'STREAK',
    ]),
    requirements: zod_1.z.object({
        count: zod_1.z.number().int().min(1),
        specificItems: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    rewardFoodiePoints: zod_1.z.number().int().min(0).default(0),
    rewardGiftCardValue: zod_1.z.number().min(0).optional().nullable(),
    sponsorRestaurantId: zod_1.z.string().optional().nullable(),
    startDate: zod_1.z.string().datetime(),
    endDate: zod_1.z.string().datetime(),
    isActive: zod_1.z.boolean().optional().default(true),
});
/**
 * GET /api/v1/challenges
 * Get all active challenges with user's participation status
 */
async function getChallenges(req, res) {
    try {
        const userId = req.user?.userId;
        const { type, status } = req.query;
        const now = new Date();
        // Build where clause for challenges
        const where = {
            isActive: true,
            startDate: { lte: now },
            endDate: { gte: now },
        };
        if (type && typeof type === 'string') {
            where.type = type;
        }
        const challenges = await database_service_1.prisma.challenge.findMany({
            where,
            include: {
                sponsorRestaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                    },
                },
                _count: {
                    select: {
                        participants: true,
                    },
                },
            },
            orderBy: [{ endDate: 'asc' }, { createdAt: 'desc' }],
        });
        // Get user's participation status for each challenge
        let userParticipations = new Map();
        if (userId) {
            const participations = await database_service_1.prisma.challengeParticipant.findMany({
                where: {
                    userId,
                    challengeId: { in: challenges.map((c) => c.id) },
                },
                select: {
                    challengeId: true,
                    progress: true,
                    isCompleted: true,
                    completedAt: true,
                },
            });
            userParticipations = new Map(participations.map((p) => [
                p.challengeId,
                { progress: p.progress, isCompleted: p.isCompleted, completedAt: p.completedAt },
            ]));
        }
        // Filter by status if provided
        let filteredChallenges = challenges;
        if (status === 'active' && userId) {
            filteredChallenges = challenges.filter((c) => {
                const participation = userParticipations.get(c.id);
                return participation && !participation.isCompleted;
            });
        }
        else if (status === 'completed' && userId) {
            filteredChallenges = challenges.filter((c) => {
                const participation = userParticipations.get(c.id);
                return participation?.isCompleted;
            });
        }
        else if (status === 'available' && userId) {
            filteredChallenges = challenges.filter((c) => !userParticipations.has(c.id));
        }
        const formattedChallenges = filteredChallenges.map((challenge) => {
            const participation = userParticipations.get(challenge.id);
            const requirements = challenge.requirements;
            return {
                id: challenge.id,
                title: challenge.title,
                description: challenge.description,
                type: challenge.type,
                requirements,
                rewardFoodiePoints: challenge.rewardFoodiePoints,
                rewardGiftCardValue: challenge.rewardGiftCardValue,
                sponsorRestaurant: challenge.sponsorRestaurant,
                startDate: challenge.startDate,
                endDate: challenge.endDate,
                participantCount: challenge._count.participants,
                userProgress: participation?.progress ?? null,
                isParticipating: !!participation,
                isCompleted: participation?.isCompleted ?? false,
                completedAt: participation?.isCompleted ? participation?.completedAt ?? null : null,
            };
        });
        res.status(200).json({
            success: true,
            data: { challenges: formattedChallenges },
        });
    }
    catch (error) {
        console.error('Get challenges error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch challenges', code: 'CHALLENGES_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/challenges/:id
 * Get a single challenge with detailed progress
 */
async function getChallenge(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        const challenge = await database_service_1.prisma.challenge.findUnique({
            where: { id },
            include: {
                sponsorRestaurant: {
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        address: true,
                    },
                },
                _count: {
                    select: {
                        participants: true,
                    },
                },
            },
        });
        if (!challenge) {
            res.status(404).json({
                success: false,
                error: { message: 'Challenge not found', code: 'CHALLENGE_NOT_FOUND' },
            });
            return;
        }
        // Get user's participation
        let participation = null;
        if (userId) {
            participation = await database_service_1.prisma.challengeParticipant.findUnique({
                where: {
                    challengeId_userId: {
                        challengeId: id,
                        userId,
                    },
                },
            });
        }
        const requirements = challenge.requirements;
        res.status(200).json({
            success: true,
            data: {
                challenge: {
                    id: challenge.id,
                    title: challenge.title,
                    description: challenge.description,
                    type: challenge.type,
                    requirements,
                    rewardFoodiePoints: challenge.rewardFoodiePoints,
                    rewardGiftCardValue: challenge.rewardGiftCardValue,
                    sponsorRestaurant: challenge.sponsorRestaurant,
                    startDate: challenge.startDate,
                    endDate: challenge.endDate,
                    participantCount: challenge._count.participants,
                    userProgress: participation?.progress ?? null,
                    isParticipating: !!participation,
                    isCompleted: participation?.isCompleted ?? false,
                    completedAt: participation?.completedAt,
                },
            },
        });
    }
    catch (error) {
        console.error('Get challenge error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch challenge', code: 'CHALLENGE_FETCH_FAILED' },
        });
    }
}
/**
 * POST /api/v1/challenges/:id/accept
 * Accept a challenge and create participant record
 */
async function acceptChallenge(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        // Check if challenge exists and is active
        const challenge = await database_service_1.prisma.challenge.findUnique({
            where: { id },
        });
        if (!challenge) {
            res.status(404).json({
                success: false,
                error: { message: 'Challenge not found', code: 'CHALLENGE_NOT_FOUND' },
            });
            return;
        }
        const now = new Date();
        if (!challenge.isActive || challenge.startDate > now || challenge.endDate < now) {
            res.status(400).json({
                success: false,
                error: { message: 'Challenge is not currently active', code: 'CHALLENGE_INACTIVE' },
            });
            return;
        }
        // Check if already participating
        const existingParticipation = await database_service_1.prisma.challengeParticipant.findUnique({
            where: {
                challengeId_userId: {
                    challengeId: id,
                    userId,
                },
            },
        });
        if (existingParticipation) {
            res.status(400).json({
                success: false,
                error: { message: 'Already participating in this challenge', code: 'ALREADY_PARTICIPATING' },
            });
            return;
        }
        // Create participant record
        const participation = await database_service_1.prisma.challengeParticipant.create({
            data: {
                challengeId: id,
                userId,
                progress: 0,
                isCompleted: false,
            },
        });
        res.status(201).json({
            success: true,
            data: {
                participation: {
                    challengeId: participation.challengeId,
                    progress: participation.progress,
                    isCompleted: participation.isCompleted,
                    createdAt: participation.createdAt,
                },
            },
        });
    }
    catch (error) {
        console.error('Accept challenge error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to accept challenge', code: 'CHALLENGE_ACCEPT_FAILED' },
        });
    }
}
/**
 * GET /api/v1/challenges/:id/progress
 * Get detailed progress for a specific challenge
 */
async function getChallengeProgress(req, res) {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const participation = await database_service_1.prisma.challengeParticipant.findUnique({
            where: {
                challengeId_userId: {
                    challengeId: id,
                    userId,
                },
            },
            include: {
                challenge: {
                    select: {
                        title: true,
                        type: true,
                        requirements: true,
                        rewardFoodiePoints: true,
                        endDate: true,
                    },
                },
            },
        });
        if (!participation) {
            res.status(404).json({
                success: false,
                error: { message: 'Not participating in this challenge', code: 'NOT_PARTICIPATING' },
            });
            return;
        }
        const requirements = participation.challenge.requirements;
        const progressPercent = Math.min(100, Math.round((participation.progress / requirements.count) * 100));
        res.status(200).json({
            success: true,
            data: {
                progress: {
                    challengeId: id,
                    challengeTitle: participation.challenge.title,
                    challengeType: participation.challenge.type,
                    currentProgress: participation.progress,
                    requiredCount: requirements.count,
                    progressPercent,
                    isCompleted: participation.isCompleted,
                    completedAt: participation.completedAt,
                    rewardFoodiePoints: participation.challenge.rewardFoodiePoints,
                    endsAt: participation.challenge.endDate,
                },
            },
        });
    }
    catch (error) {
        console.error('Get challenge progress error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch progress', code: 'PROGRESS_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/challenges/leaderboard
 * Get leaderboard rankings (local, national, friends)
 */
async function getLeaderboard(req, res) {
    try {
        const userId = req.user?.userId;
        const validation = leaderboardQuerySchema.safeParse(req.query);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid leaderboard query', details: validation.error.issues },
            });
            return;
        }
        const { scope, limit, offset, page } = validation.data;
        const limitNum = Math.min(100, Math.max(1, parseInt(limit)));
        const offsetNum = page && !isNaN(parseInt(page))
            ? Math.max(0, (Math.max(1, parseInt(page)) - 1) * limitNum)
            : Math.max(0, parseInt(offset));
        const { leaderboard, currentUserRank, totalCount } = await (0, leaderboard_service_1.getLeaderboardForScope)({
            userId,
            scope,
            limit: limitNum,
            offset: offsetNum,
        });
        res.status(200).json({
            success: true,
            data: {
                leaderboard,
                currentUserRank,
                pagination: {
                    total: totalCount,
                    limit: limitNum,
                    offset: offsetNum,
                    hasMore: offsetNum + leaderboard.length < totalCount,
                },
            },
        });
    }
    catch (error) {
        console.error('Get leaderboard error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch leaderboard', code: 'LEADERBOARD_FETCH_FAILED' },
        });
    }
}
/**
 * POST /api/v1/challenges
 * Create a challenge (admin or restaurant owner)
 */
async function createChallenge(req, res) {
    try {
        const validation = createChallengeSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({
                success: false,
                error: { message: 'Invalid challenge payload', details: validation.error.issues },
            });
            return;
        }
        const { title, description, type, requirements, rewardFoodiePoints, rewardGiftCardValue, sponsorRestaurantId, startDate, endDate, isActive, } = validation.data;
        if (rewardGiftCardValue && rewardGiftCardValue < 0) {
            res.status(400).json({
                success: false,
                error: { message: 'Gift card value must be positive', code: 'INVALID_GIFT_VALUE' },
            });
            return;
        }
        if (type === 'SPONSORED' && !sponsorRestaurantId) {
            res.status(400).json({
                success: false,
                error: { message: 'Sponsored challenges require sponsorRestaurantId', code: 'SPONSOR_REQUIRED' },
            });
            return;
        }
        if (sponsorRestaurantId) {
            const sponsor = await database_service_1.prisma.restaurant.findUnique({
                where: { id: sponsorRestaurantId },
                select: { id: true },
            });
            if (!sponsor) {
                res.status(404).json({
                    success: false,
                    error: { message: 'Sponsor restaurant not found', code: 'SPONSOR_NOT_FOUND' },
                });
                return;
            }
        }
        const challenge = await database_service_1.prisma.challenge.create({
            data: {
                title,
                description,
                type,
                requirements: requirements,
                rewardFoodiePoints,
                rewardGiftCardValue: rewardGiftCardValue ?? null,
                sponsorRestaurantId: sponsorRestaurantId ?? null,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                isActive,
            },
        });
        res.status(201).json({
            success: true,
            data: { challenge },
        });
    }
    catch (error) {
        console.error('Create challenge error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to create challenge', code: 'CHALLENGE_CREATE_FAILED' },
        });
    }
}
/**
 * GET /api/v1/challenges/user/achievements
 * Get user's achievements and badges
 */
async function getUserAchievements(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        const achievements = await database_service_1.prisma.achievement.findMany({
            where: { userId },
            orderBy: { earnedAt: 'desc' },
        });
        // Get foodie points summary
        const foodiePoints = await database_service_1.prisma.foodiePoints.findUnique({
            where: { userId },
        });
        // Get completed challenges count
        const completedChallenges = await database_service_1.prisma.challengeParticipant.count({
            where: {
                userId,
                isCompleted: true,
            },
        });
        res.status(200).json({
            success: true,
            data: {
                achievements: achievements.map((a) => ({
                    id: a.id,
                    badgeType: a.badgeType,
                    earnedAt: a.earnedAt,
                })),
                stats: {
                    totalPoints: foodiePoints?.totalEarned ?? 0,
                    currentBalance: foodiePoints?.balance ?? 0,
                    completedChallenges,
                    achievementCount: achievements.length,
                },
            },
        });
    }
    catch (error) {
        console.error('Get achievements error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch achievements', code: 'ACHIEVEMENTS_FETCH_FAILED' },
        });
    }
}
/**
 * GET /api/v1/challenges/user/foodie-points
 * Get user's Foodie Points balance and history
 */
async function getFoodiePoints(req, res) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({
                success: false,
                error: { message: 'Authentication required', code: 'AUTH_REQUIRED' },
            });
            return;
        }
        // Get or create foodie points record
        let foodiePoints = await database_service_1.prisma.foodiePoints.findUnique({
            where: { userId },
        });
        if (!foodiePoints) {
            foodiePoints = await database_service_1.prisma.foodiePoints.create({
                data: {
                    userId,
                    balance: 0,
                    totalEarned: 0,
                    totalRedeemed: 0,
                },
            });
        }
        // Check for expiration (12 months of inactivity)
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        const isExpired = foodiePoints.lastActivity < twelveMonthsAgo && foodiePoints.balance > 0;
        const expiresAt = new Date(foodiePoints.lastActivity);
        expiresAt.setMonth(expiresAt.getMonth() + 12);
        res.status(200).json({
            success: true,
            data: {
                foodiePoints: {
                    balance: isExpired ? 0 : foodiePoints.balance,
                    totalEarned: foodiePoints.totalEarned,
                    totalRedeemed: foodiePoints.totalRedeemed,
                    lastActivity: foodiePoints.lastActivity,
                    expiresAt: isExpired ? null : expiresAt,
                    isExpired,
                },
                redemptionTiers: [
                    { points: 1000, dollarValue: 10 },
                    { points: 2500, dollarValue: 25 },
                    { points: 5000, dollarValue: 50 },
                ],
            },
        });
    }
    catch (error) {
        console.error('Get foodie points error:', error);
        res.status(500).json({
            success: false,
            error: { message: 'Failed to fetch foodie points', code: 'FOODIE_POINTS_FETCH_FAILED' },
        });
    }
}
//# sourceMappingURL=challenge.controller.js.map