import { Challenge } from '../generated/prisma';
import { prisma } from './database.service';
import { sendPushNotification } from './notification.service';
import { failRedemption, fulfillRedemption } from './redemption.service';

// Milestone definitions for different achievement types
interface Milestone {
  count: number;
  points: number;
  badge: string;
}

const MILESTONES: Record<string, Milestone[]> = {
  UNIQUE_RESTAURANTS: [
    { count: 1, points: 10, badge: 'first_restaurant' },
    { count: 5, points: 50, badge: 'explorer_5' },
    { count: 10, points: 100, badge: 'explorer_10' },
    { count: 25, points: 250, badge: 'explorer_25' },
    { count: 50, points: 500, badge: 'explorer_50' },
    { count: 100, points: 1000, badge: 'explorer_100' },
  ],
  DIVERSE_DISHES: [
    { count: 1, points: 5, badge: 'first_dish' },
    { count: 10, points: 25, badge: 'foodie_10' },
    { count: 25, points: 100, badge: 'foodie_25' },
    { count: 50, points: 250, badge: 'foodie_50' },
    { count: 100, points: 500, badge: 'foodie_100' },
  ],
  CUISINE_EXPLORATION: [
    { count: 1, points: 20, badge: 'first_cuisine' },
    { count: 5, points: 100, badge: 'adventurer_5' },
    { count: 10, points: 300, badge: 'adventurer_10' },
    { count: 15, points: 500, badge: 'world_traveler' },
  ],
  STREAK: [
    { count: 3, points: 30, badge: 'streak_3' },
    { count: 7, points: 100, badge: 'streak_7' },
    { count: 14, points: 250, badge: 'streak_14' },
    { count: 30, points: 500, badge: 'streak_30' },
  ],
  SOCIAL_ENGAGEMENT: [
    { count: 1, points: 10, badge: 'first_post' },
    { count: 10, points: 50, badge: 'content_creator' },
    { count: 50, points: 250, badge: 'influencer' },
    { count: 100, points: 500, badge: 'foodie_star' },
  ],
};

// Badge display names for notifications
const BADGE_NAMES: Record<string, string> = {
  first_restaurant: 'First Steps',
  explorer_5: 'Explorer',
  explorer_10: 'Adventurer',
  explorer_25: 'Trailblazer',
  explorer_50: 'Globe Trotter',
  explorer_100: 'Restaurant Legend',
  first_dish: 'First Bite',
  foodie_10: 'Food Enthusiast',
  foodie_25: 'Culinary Expert',
  foodie_50: 'Master Chef',
  foodie_100: 'Food Legend',
  first_cuisine: 'Taste Tester',
  adventurer_5: 'Cuisine Explorer',
  adventurer_10: 'World Palate',
  world_traveler: 'Global Gourmet',
  streak_3: '3 Day Streak',
  streak_7: 'Week Warrior',
  streak_14: '2 Week Champion',
  streak_30: 'Month Master',
  first_post: 'Social Butterfly',
  content_creator: 'Content Creator',
  influencer: 'Foodie Influencer',
  foodie_star: 'Foodie Superstar',
};

/**
 * Check and award milestone rewards based on current progress
 */
export async function awardMilestoneReward(
  userId: string,
  milestoneType: string,
  currentCount: number
): Promise<void> {
  const milestones = MILESTONES[milestoneType];
  if (!milestones) return;

  for (const milestone of milestones) {
    if (currentCount >= milestone.count) {
      // Check if user already has this badge
      const existingBadge = await prisma.achievement.findUnique({
        where: {
          userId_badgeType: {
            userId,
            badgeType: milestone.badge,
          },
        },
      });

      if (!existingBadge) {
        // Award the badge and points
        await awardBadgeAndPoints(userId, milestone.badge, milestone.points);
      }
    }
  }
}

/**
 * Award a badge and bonus points to user
 */
async function awardBadgeAndPoints(userId: string, badgeType: string, points: number): Promise<void> {
  try {
    // Create achievement record
    await prisma.achievement.create({
      data: {
        userId,
        badgeType,
      },
    });

    // Award Foodie Points
    await prisma.foodiePoints.upsert({
      where: { userId },
      update: {
        balance: { increment: points },
        totalEarned: { increment: points },
        lastActivity: new Date(),
      },
      create: {
        userId,
        balance: points,
        totalEarned: points,
        totalRedeemed: 0,
      },
    });

    // Send push notification
    const badgeName = BADGE_NAMES[badgeType] || badgeType;
    await sendPushNotification(userId, 'Achievement Unlocked!', `You earned the "${badgeName}" badge and ${points} Foodie Points!`, {
      type: 'ACHIEVEMENT',
      badge: badgeType,
      points: points.toString(),
    });

    console.log(`Awarded ${badgeName} badge and ${points} points to user ${userId}`);
  } catch (error) {
    console.error('Error awarding badge and points:', error);
  }
}

/**
 * Check if challenge is completed and award rewards
 */
export async function checkAndAwardChallengeCompletion(
  userId: string,
  challenge: Challenge,
  currentProgress: number
): Promise<void> {
  const requirements = challenge.requirements as { count: number };

  if (currentProgress >= requirements.count) {
    // Check if already completed
    const participation = await prisma.challengeParticipant.findUnique({
      where: {
        challengeId_userId: {
          challengeId: challenge.id,
          userId,
        },
      },
    });

    if (participation && !participation.isCompleted) {
      // Mark as completed
      await prisma.challengeParticipant.update({
        where: { id: participation.id },
        data: {
          isCompleted: true,
          completedAt: new Date(),
        },
      });

      // Award Foodie Points
      if (challenge.rewardFoodiePoints > 0) {
        await prisma.foodiePoints.upsert({
          where: { userId },
          update: {
            balance: { increment: challenge.rewardFoodiePoints },
            totalEarned: { increment: challenge.rewardFoodiePoints },
            lastActivity: new Date(),
          },
          create: {
            userId,
            balance: challenge.rewardFoodiePoints,
            totalEarned: challenge.rewardFoodiePoints,
            totalRedeemed: 0,
          },
        });
      }

      // Create gift card redemption if applicable
      if (challenge.rewardGiftCardValue && challenge.rewardGiftCardValue > 0) {
        const redemption = await prisma.redemption.create({
          data: {
            userId,
            pointsSpent: 0, // Gift card from challenge, not points redemption
            dollarValue: challenge.rewardGiftCardValue,
            rewardType: 'GIFT_CARD',
            catalogItemId: process.env.TANGO_DEFAULT_REWARD_ID || null,
            catalogItemName: `${challenge.title} Reward`,
            status: 'PENDING',
          },
        });

        try {
          await fulfillRedemption(redemption.id);
        } catch (error) {
          console.error('Gift card fulfillment failed:', error);
          if (
            !(error instanceof Error) ||
            !error.message.toLowerCase().includes('not configured')
          ) {
            await failRedemption(redemption.id);
          }
        }
      }

      // Create challenge completion achievement
      const badgeType = `challenge_${challenge.id}`;
      const existingBadge = await prisma.achievement.findUnique({
        where: {
          userId_badgeType: {
            userId,
            badgeType,
          },
        },
      });

      if (!existingBadge) {
        await prisma.achievement.create({
          data: {
            userId,
            badgeType,
          },
        });
      }

      // Send push notification
      await sendPushNotification(
        userId,
        'Challenge Completed!',
        `You completed "${challenge.title}" and earned ${challenge.rewardFoodiePoints} Foodie Points!`,
        {
          type: 'CHALLENGE_COMPLETE',
          challengeId: challenge.id,
          points: challenge.rewardFoodiePoints.toString(),
        }
      );

      console.log(`User ${userId} completed challenge ${challenge.id}`);
    }
  }
}

/**
 * Get milestone progress for a specific type
 */
export function getMilestoneProgress(milestoneType: string, currentCount: number): {
  currentMilestone: Milestone | null;
  nextMilestone: Milestone | null;
  progress: number;
} {
  const milestones = MILESTONES[milestoneType];
  if (!milestones) {
    return { currentMilestone: null, nextMilestone: null, progress: 0 };
  }

  let currentMilestone: Milestone | null = null;
  let nextMilestone: Milestone | null = null;

  for (const milestone of milestones) {
    if (currentCount >= milestone.count) {
      currentMilestone = milestone;
    } else {
      nextMilestone = milestone;
      break;
    }
  }

  const progress = nextMilestone
    ? Math.round(((currentCount - (currentMilestone?.count || 0)) / (nextMilestone.count - (currentMilestone?.count || 0))) * 100)
    : 100;

  return { currentMilestone, nextMilestone, progress };
}
