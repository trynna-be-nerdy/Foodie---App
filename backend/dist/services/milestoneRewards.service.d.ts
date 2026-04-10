import { Challenge } from '../generated/prisma';
interface Milestone {
    count: number;
    points: number;
    badge: string;
}
/**
 * Check and award milestone rewards based on current progress
 */
export declare function awardMilestoneReward(userId: string, milestoneType: string, currentCount: number): Promise<void>;
/**
 * Check if challenge is completed and award rewards
 */
export declare function checkAndAwardChallengeCompletion(userId: string, challenge: Challenge, currentProgress: number): Promise<void>;
/**
 * Get milestone progress for a specific type
 */
export declare function getMilestoneProgress(milestoneType: string, currentCount: number): {
    currentMilestone: Milestone | null;
    nextMilestone: Milestone | null;
    progress: number;
};
export {};
//# sourceMappingURL=milestoneRewards.service.d.ts.map