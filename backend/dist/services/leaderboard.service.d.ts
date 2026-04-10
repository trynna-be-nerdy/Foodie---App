interface LeaderboardScopeParams {
    userId?: string;
    scope: 'local' | 'national' | 'friends';
    limit: number;
    offset: number;
}
export declare function getLeaderboardForScope({ userId, scope, limit, offset, }: LeaderboardScopeParams): Promise<{
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
}>;
export {};
//# sourceMappingURL=leaderboard.service.d.ts.map