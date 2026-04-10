import { prisma } from './database.service';
import { awardMilestoneReward, checkAndAwardChallengeCompletion } from './milestoneRewards.service';

/**
 * Track progress for all active challenges after a transaction
 * Called after points are earned from orders, receipt scans, QR scans, etc.
 */
export async function trackChallengeProgress(
  userId: string,
  restaurantId: string,
  transactionMetadata?: {
    dishNames?: string[];
    cuisineTypes?: string[];
    amount?: number;
  }
): Promise<void> {
  try {
    // Get all active challenges the user is participating in
    const now = new Date();
    const participations = await prisma.challengeParticipant.findMany({
      where: {
        userId,
        isCompleted: false,
        challenge: {
          isActive: true,
          startDate: { lte: now },
          endDate: { gte: now },
        },
      },
      include: {
        challenge: true,
      },
    });

    for (const participation of participations) {
      const challenge = participation.challenge;
      let newProgress = participation.progress;

      switch (challenge.type) {
        case 'UNIQUE_RESTAURANTS':
          newProgress = await trackUniqueRestaurants(userId, participation.createdAt);
          break;

        case 'DIVERSE_DISHES':
          newProgress = await trackDiverseDishes(userId, participation.createdAt);
          break;

        case 'CUISINE_EXPLORATION':
          newProgress = await trackCuisineExploration(userId, participation.createdAt);
          break;

        case 'SPONSORED':
          // For sponsored challenges, only count visits to the sponsor restaurant
          if (challenge.sponsorRestaurantId === restaurantId) {
            newProgress = participation.progress + 1;
          }
          break;

        case 'STREAK':
          newProgress = await trackStreak(userId, participation.createdAt);
          break;

        default:
          continue;
      }

      // Update progress if changed
      if (newProgress !== participation.progress) {
        await prisma.challengeParticipant.update({
          where: { id: participation.id },
          data: { progress: newProgress },
        });

        // Check if challenge is completed
        await checkAndAwardChallengeCompletion(userId, challenge, newProgress);
      }
    }

    // Also check for milestone achievements (even if not in a specific challenge)
    await checkMilestoneAchievements(userId, restaurantId, transactionMetadata);
  } catch (error) {
    console.error('Error tracking challenge progress:', error);
    // Don't throw - challenge tracking shouldn't block the main transaction
  }
}

/**
 * Track unique restaurants visited by user
 */
async function trackUniqueRestaurants(userId: string, sinceDate: Date): Promise<number> {
  const uniqueRestaurants = await prisma.pointsTransaction.findMany({
    where: {
      userId,
      type: 'EARN',
      createdAt: { gte: sinceDate },
    },
    distinct: ['restaurantId'],
    select: { restaurantId: true },
  });

  return uniqueRestaurants.length;
}

/**
 * Track diverse dishes ordered by user
 */
async function trackDiverseDishes(userId: string, sinceDate: Date): Promise<number> {
  // Get all orders since the challenge started
  const orders = await prisma.order.findMany({
    where: {
      userId,
      status: 'COMPLETED',
      createdAt: { gte: sinceDate },
    },
    include: {
      items: {
        include: {
          menuItem: {
            select: { name: true },
          },
        },
      },
    },
  });

  // Count unique dish names
  const uniqueDishes = new Set<string>();
  for (const order of orders) {
    for (const item of order.items) {
      uniqueDishes.add(item.menuItem.name.toLowerCase());
    }
  }

  return uniqueDishes.size;
}

/**
 * Track cuisine types explored by user
 */
async function trackCuisineExploration(userId: string, sinceDate: Date): Promise<number> {
  // Get unique cuisine types from visited restaurants
  const transactions = await prisma.pointsTransaction.findMany({
    where: {
      userId,
      type: 'EARN',
      createdAt: { gte: sinceDate },
    },
    include: {
      restaurant: {
        select: { cuisineTypes: true },
      },
    },
    distinct: ['restaurantId'],
  });

  const uniqueCuisines = new Set<string>();
  for (const transaction of transactions) {
    for (const cuisine of transaction.restaurant.cuisineTypes) {
      uniqueCuisines.add(cuisine.toLowerCase());
    }
  }

  return uniqueCuisines.size;
}

/**
 * Track consecutive day streak
 */
async function trackStreak(userId: string, sinceDate: Date): Promise<number> {
  // Get all transaction dates
  const transactions = await prisma.pointsTransaction.findMany({
    where: {
      userId,
      type: 'EARN',
      createdAt: { gte: sinceDate },
    },
    select: { createdAt: true },
    orderBy: { createdAt: 'desc' },
  });

  if (transactions.length === 0) return 0;

  // Count consecutive days
  let streak = 1;
  let lastDate = new Date(transactions[0].createdAt);
  lastDate.setHours(0, 0, 0, 0);

  for (let i = 1; i < transactions.length; i++) {
    const currentDate = new Date(transactions[i].createdAt);
    currentDate.setHours(0, 0, 0, 0);

    const dayDiff = Math.floor((lastDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff === 1) {
      streak++;
      lastDate = currentDate;
    } else if (dayDiff > 1) {
      break;
    }
  }

  return streak;
}

/**
 * Check and award milestone achievements
 */
async function checkMilestoneAchievements(
  userId: string,
  restaurantId: string,
  metadata?: {
    dishNames?: string[];
    cuisineTypes?: string[];
    amount?: number;
  }
): Promise<void> {
  // Get user's all-time stats
  const uniqueRestaurants = await prisma.pointsTransaction.findMany({
    where: { userId, type: 'EARN' },
    distinct: ['restaurantId'],
    select: { restaurantId: true },
  });

  const uniqueRestaurantCount = uniqueRestaurants.length;

  // Check for restaurant milestones
  await awardMilestoneReward(userId, 'UNIQUE_RESTAURANTS', uniqueRestaurantCount);

  // Check for cuisine exploration milestones
  const cuisines = await prisma.pointsTransaction.findMany({
    where: { userId, type: 'EARN' },
    include: {
      restaurant: { select: { cuisineTypes: true } },
    },
    distinct: ['restaurantId'],
  });

  const uniqueCuisines = new Set<string>();
  for (const t of cuisines) {
    for (const c of t.restaurant.cuisineTypes) {
      uniqueCuisines.add(c.toLowerCase());
    }
  }

  await awardMilestoneReward(userId, 'CUISINE_EXPLORATION', uniqueCuisines.size);

  // Check for diverse dishes milestones
  const orders = await prisma.order.findMany({
    where: { userId, status: 'COMPLETED' },
    include: {
      items: {
        include: {
          menuItem: { select: { name: true } },
        },
      },
    },
  });

  const uniqueDishes = new Set<string>();
  for (const order of orders) {
    for (const item of order.items) {
      uniqueDishes.add(item.menuItem.name.toLowerCase());
    }
  }

  await awardMilestoneReward(userId, 'DIVERSE_DISHES', uniqueDishes.size);
}

/**
 * Auto-enroll user in applicable challenges
 */
export async function autoEnrollInChallenges(userId: string): Promise<void> {
  try {
    const now = new Date();

    // Find active challenges user is not participating in
    const availableChallenges = await prisma.challenge.findMany({
      where: {
        isActive: true,
        startDate: { lte: now },
        endDate: { gte: now },
        participants: {
          none: { userId },
        },
      },
    });

    // Auto-enroll in non-sponsored challenges
    for (const challenge of availableChallenges) {
      if (!challenge.sponsorRestaurantId) {
        await prisma.challengeParticipant.create({
          data: {
            challengeId: challenge.id,
            userId,
            progress: 0,
            isCompleted: false,
          },
        });
      }
    }
  } catch (error) {
    console.error('Error auto-enrolling in challenges:', error);
  }
}
