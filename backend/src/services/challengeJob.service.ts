import { trackChallengeProgress } from './challengeTracking.service';

interface ChallengeTrackingMetadata {
  dishNames?: string[];
  cuisineTypes?: string[];
  amount?: number;
}

export function enqueueChallengeTracking(
  userId: string,
  restaurantId: string,
  metadata?: ChallengeTrackingMetadata
): void {
  setImmediate(() => {
    trackChallengeProgress(userId, restaurantId, metadata).catch((error) => {
      console.error('Challenge tracking job failed:', error);
    });
  });
}
