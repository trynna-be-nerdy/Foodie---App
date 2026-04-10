import { prisma } from './database.service';

interface LeaderboardScopeParams {
  userId?: string;
  scope: 'local' | 'national' | 'friends';
  limit: number;
  offset: number;
}

export async function getLeaderboardForScope({
  userId,
  scope,
  limit,
  offset,
}: LeaderboardScopeParams): Promise<{
  leaderboard: Array<{
    rank: number;
    userId: string;
    username: string;
    profilePhoto: string | null;
    totalPoints: number;
    achievementCount: number;
    isCurrentUser: boolean;
  }>;
  currentUserRank: number | null;
  totalCount: number;
}> {
  const userIds = await resolveScopeUserIds(userId, scope);

  const where: Record<string, unknown> = {};
  if (userIds) {
    where.userId = { in: userIds };
  }

  const [foodiePointsRecords, totalCount] = await Promise.all([
    prisma.foodiePoints.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            profilePhoto: true,
            _count: { select: { achievements: true } },
          },
        },
      },
      orderBy: { totalEarned: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.foodiePoints.count({ where }),
  ]);

  const leaderboard = foodiePointsRecords.map((record, index) => ({
    rank: offset + index + 1,
    userId: record.userId,
    username: record.user.name,
    profilePhoto: record.user.profilePhoto,
    totalPoints: record.totalEarned,
    achievementCount: record.user._count.achievements,
    isCurrentUser: record.userId === userId,
  }));

  const currentUserRank = await resolveCurrentUserRank(userId, where, leaderboard);

  return { leaderboard, currentUserRank, totalCount };
}

async function resolveScopeUserIds(
  userId: string | undefined,
  scope: LeaderboardScopeParams['scope']
): Promise<string[] | null> {
  if (scope === 'friends' && userId) {
    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followingId: true },
    });
    return [userId, ...following.map((f) => f.followingId)];
  }

  if (scope === 'local' && userId) {
    const lastTransaction = await prisma.pointsTransaction.findFirst({
      where: { userId, type: 'EARN' },
      orderBy: { createdAt: 'desc' },
      include: {
        restaurant: { select: { city: true, state: true } },
      },
    });

    const city = lastTransaction?.restaurant?.city;
    const state = lastTransaction?.restaurant?.state;

    if (!city || !state) {
      return null;
    }

    const localUsers = await prisma.pointsTransaction.findMany({
      where: {
        type: 'EARN',
        restaurant: { city, state },
      },
      distinct: ['userId'],
      select: { userId: true },
    });

    const localIds = localUsers.map((u) => u.userId);
    if (!localIds.includes(userId)) {
      localIds.push(userId);
    }

    return localIds;
  }

  return null;
}

async function resolveCurrentUserRank(
  userId: string | undefined,
  where: Record<string, unknown>,
  leaderboard: Array<{ userId: string; isCurrentUser: boolean; rank: number }>
): Promise<number | null> {
  if (!userId) {
    return null;
  }

  const currentUserInList = leaderboard.find((entry) => entry.isCurrentUser);
  if (currentUserInList) {
    return currentUserInList.rank;
  }

  const userFoodiePoints = await prisma.foodiePoints.findUnique({
    where: { userId },
  });

  if (!userFoodiePoints) {
    return null;
  }

  const higherRanked = await prisma.foodiePoints.count({
    where: {
      ...where,
      totalEarned: { gt: userFoodiePoints.totalEarned },
    },
  });

  return higherRanked + 1;
}
