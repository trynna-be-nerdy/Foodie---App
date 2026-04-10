/**
 * Content Monetization and Creator Payouts Types
 * Types for earnings calculation, campaigns, payouts, and creator program
 */

// Earnings rates
export const EARNINGS_RATES = {
  baseRatePer100Views: 0.01, // $0.01 per 100 views
  likeBonus: 0.005, // $0.005 per like
  commentBonus: 0.01, // $0.01 per comment
  shareBonus: 0.02, // $0.02 per share
  standardUserCap: 500, // $500/month cap for standard users
  minPayoutAmount: 10, // Minimum $10 to request payout
  verifiedMultiplier: 1.5, // 50% bonus for verified creators
};

export type CreatorStatus = 'standard' | 'verified' | 'suspended';

export interface CreatorProfile {
  userId: string;
  status: CreatorStatus;
  totalEarnings: number;
  pendingBalance: number;
  paidOutTotal: number;
  monthlyEarnings: number;
  monthlyEarningsCap: number;
  lastPayoutDate: string | null;
  followerCount: number;
  totalViews30Days: number;
  engagementRate: number;
  violationCount: number;
  verifiedAt: string | null;
  stripeConnectAccountId: string | null;
  payoutMethod: PayoutMethod | null;
}

export type PayoutMethod = 'bank_transfer' | 'paypal' | 'gift_card';

export interface PayoutMethodConfig {
  type: PayoutMethod;
  label: string;
  icon: string;
  description: string;
  isConnected: boolean;
  accountInfo?: string; // Last 4 digits of bank, email for PayPal, etc.
}

export const PAYOUT_METHODS: Record<PayoutMethod, Omit<PayoutMethodConfig, 'isConnected' | 'accountInfo'>> = {
  bank_transfer: {
    type: 'bank_transfer',
    label: 'Direct Deposit',
    icon: 'bank',
    description: 'Transfer directly to your bank account',
  },
  paypal: {
    type: 'paypal',
    label: 'PayPal',
    icon: 'alpha-p-circle',
    description: 'Send to your PayPal account',
  },
  gift_card: {
    type: 'gift_card',
    label: 'Gift Card',
    icon: 'gift',
    description: 'Redeem as restaurant gift cards',
  },
};

export interface PostEarnings {
  postId: string;
  postTitle: string;
  postImageUrl: string | null;
  createdAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  baseEarnings: number;
  engagementBonus: number;
  campaignBonus: number;
  totalEarnings: number;
  isEnrolledInCampaign: boolean;
  campaignId: string | null;
}

export type CampaignType = 'dish' | 'brand' | 'event' | 'general';

export interface PromotionCampaign {
  id: string;
  restaurantId: string;
  restaurantName: string;
  restaurantLogo: string | null;
  type: CampaignType;
  title: string;
  description: string;
  targetItem?: string; // Specific dish or menu item if applicable
  payoutRateMultiplier: number; // e.g., 2.0 for 2x payout
  budget: number;
  budgetUsed: number;
  matchingTags: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  enrolledPostCount: number;
  maxEnrollments: number | null;
  requirements: string[];
}

export const CAMPAIGN_TYPE_CONFIG: Record<CampaignType, {label: string; icon: string; color: string}> = {
  dish: {label: 'Dish Feature', icon: 'food', color: '#FF9800'},
  brand: {label: 'Brand Promotion', icon: 'store', color: '#4CAF50'},
  event: {label: 'Event Promo', icon: 'calendar-star', color: '#9C27B0'},
  general: {label: 'General', icon: 'bullhorn', color: '#2196F3'},
};

export interface CampaignEnrollment {
  id: string;
  postId: string;
  campaignId: string;
  enrolledAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  earningsFromCampaign: number;
}

export interface Payout {
  id: string;
  userId: string;
  amount: number;
  method: PayoutMethod;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: string;
  processedAt: string | null;
  transactionId: string | null;
  failureReason: string | null;
}

export interface EarningsSummary {
  lifetimeEarnings: number;
  pendingBalance: number;
  thisMonthEarnings: number;
  lastMonthEarnings: number;
  thisWeekEarnings: number;
  averageEarningsPerPost: number;
  topEarningPostId: string | null;
  totalPosts: number;
  totalViews: number;
  totalEngagements: number;
}

export interface VerificationRequirements {
  minFollowers: number;
  minViewsIn30Days: number;
  minEngagementRate: number;
  maxViolations: number;
  currentFollowers: number;
  currentViews30Days: number;
  currentEngagementRate: number;
  currentViolations: number;
  isEligible: boolean;
  missingRequirements: string[];
}

export const VERIFICATION_REQUIREMENTS = {
  minFollowers: 1000,
  minViewsIn30Days: 10000,
  minEngagementRate: 0.9, // 90%
  maxViolations: 0,
};

// Request/Response types
export interface EnrollPostRequest {
  postId: string;
  campaignId: string;
}

export interface EnrollPostResponse {
  success: boolean;
  enrollment?: CampaignEnrollment;
  error?: string;
}

export interface RequestPayoutRequest {
  amount: number;
  method: PayoutMethod;
}

export interface RequestPayoutResponse {
  success: boolean;
  payout?: Payout;
  error?: string;
}

export interface ConnectPayoutMethodRequest {
  method: PayoutMethod;
  accountDetails?: {
    email?: string; // For PayPal
    routingNumber?: string; // For bank
    accountNumber?: string; // For bank
  };
}

export interface ConnectPayoutMethodResponse {
  success: boolean;
  redirectUrl?: string; // For Stripe Connect
  error?: string;
}

// Helper functions
export function calculatePostEarnings(
  views: number,
  likes: number,
  comments: number,
  shares: number,
  campaignMultiplier: number = 1,
  isVerified: boolean = false,
): {base: number; engagement: number; campaign: number; total: number} {
  const base = (views / 100) * EARNINGS_RATES.baseRatePer100Views;
  const engagement =
    likes * EARNINGS_RATES.likeBonus +
    comments * EARNINGS_RATES.commentBonus +
    shares * EARNINGS_RATES.shareBonus;

  const subtotal = base + engagement;
  const verifiedBonus = isVerified ? subtotal * (EARNINGS_RATES.verifiedMultiplier - 1) : 0;
  const campaignBonus = subtotal * (campaignMultiplier - 1);

  return {
    base: Number(base.toFixed(2)),
    engagement: Number((engagement + verifiedBonus).toFixed(2)),
    campaign: Number(campaignBonus.toFixed(2)),
    total: Number((subtotal + verifiedBonus + campaignBonus).toFixed(2)),
  };
}

export function formatEarnings(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function canRequestPayout(pendingBalance: number): boolean {
  return pendingBalance >= EARNINGS_RATES.minPayoutAmount;
}

export function checkVerificationEligibility(profile: CreatorProfile): VerificationRequirements {
  const missingRequirements: string[] = [];

  if (profile.followerCount < VERIFICATION_REQUIREMENTS.minFollowers) {
    missingRequirements.push(
      `Need ${VERIFICATION_REQUIREMENTS.minFollowers - profile.followerCount} more followers`,
    );
  }
  if (profile.totalViews30Days < VERIFICATION_REQUIREMENTS.minViewsIn30Days) {
    missingRequirements.push(
      `Need ${VERIFICATION_REQUIREMENTS.minViewsIn30Days - profile.totalViews30Days} more views in 30 days`,
    );
  }
  if (profile.engagementRate < VERIFICATION_REQUIREMENTS.minEngagementRate) {
    missingRequirements.push(
      `Engagement rate needs to be ${VERIFICATION_REQUIREMENTS.minEngagementRate * 100}% or higher`,
    );
  }
  if (profile.violationCount > VERIFICATION_REQUIREMENTS.maxViolations) {
    missingRequirements.push('Must have no content violations');
  }

  return {
    ...VERIFICATION_REQUIREMENTS,
    currentFollowers: profile.followerCount,
    currentViews30Days: profile.totalViews30Days,
    currentEngagementRate: profile.engagementRate,
    currentViolations: profile.violationCount,
    isEligible: missingRequirements.length === 0,
    missingRequirements,
  };
}
