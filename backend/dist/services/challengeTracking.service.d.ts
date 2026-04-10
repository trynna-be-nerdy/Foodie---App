/**
 * Track progress for all active challenges after a transaction
 * Called after points are earned from orders, receipt scans, QR scans, etc.
 */
export declare function trackChallengeProgress(userId: string, restaurantId: string, transactionMetadata?: {
    dishNames?: string[];
    cuisineTypes?: string[];
    amount?: number;
}): Promise<void>;
/**
 * Auto-enroll user in applicable challenges
 */
export declare function autoEnrollInChallenges(userId: string): Promise<void>;
//# sourceMappingURL=challengeTracking.service.d.ts.map