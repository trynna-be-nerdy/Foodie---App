/**
 * Mock data for Content Monetization and Creator Payouts
 * Used for Expo Go testing without backend
 */

import type {
  CreatorProfile,
  PostEarnings,
  PromotionCampaign,
  Payout,
  EarningsSummary,
  PayoutMethodConfig,
  CampaignEnrollment,
  EnrollPostRequest,
  EnrollPostResponse,
  RequestPayoutRequest,
  RequestPayoutResponse,
} from '../types/monetization';
import {calculatePostEarnings, EARNINGS_RATES} from '../types/monetization';

// Mock Creator Profile
export const mockCreatorProfile: CreatorProfile = {
  userId: 'user-1',
  status: 'standard',
  totalEarnings: 127.45,
  pendingBalance: 23.67,
  paidOutTotal: 103.78,
  monthlyEarnings: 45.23,
  monthlyEarningsCap: EARNINGS_RATES.standardUserCap,
  lastPayoutDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  followerCount: 847,
  totalViews30Days: 8234,
  engagementRate: 0.78,
  violationCount: 0,
  verifiedAt: null,
  stripeConnectAccountId: null,
  payoutMethod: 'paypal',
};

// Mock Payout Methods
export const mockPayoutMethods: PayoutMethodConfig[] = [
  {
    type: 'bank_transfer',
    label: 'Direct Deposit',
    icon: 'bank',
    description: 'Transfer directly to your bank account',
    isConnected: false,
  },
  {
    type: 'paypal',
    label: 'PayPal',
    icon: 'alpha-p-circle',
    description: 'Send to your PayPal account',
    isConnected: true,
    accountInfo: 'user@email.com',
  },
  {
    type: 'gift_card',
    label: 'Gift Card',
    icon: 'gift',
    description: 'Redeem as restaurant gift cards',
    isConnected: true,
  },
];

// Mock Post Earnings
export const mockPostEarnings: PostEarnings[] = [
  {
    postId: 'post-1',
    postTitle: 'Amazing sushi at Sakura Restaurant!',
    postImageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    views: 4523,
    likes: 234,
    comments: 45,
    shares: 12,
    baseEarnings: 0.45,
    engagementBonus: 1.86,
    campaignBonus: 2.31,
    totalEarnings: 4.62,
    isEnrolledInCampaign: true,
    campaignId: 'campaign-1',
  },
  {
    postId: 'post-2',
    postTitle: 'Best tacos in town!',
    postImageUrl: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    views: 3210,
    likes: 189,
    comments: 32,
    shares: 8,
    baseEarnings: 0.32,
    engagementBonus: 1.43,
    campaignBonus: 0,
    totalEarnings: 1.75,
    isEnrolledInCampaign: false,
    campaignId: null,
  },
  {
    postId: 'post-3',
    postTitle: 'Hidden gem Italian place',
    postImageUrl: 'https://images.unsplash.com/photo-1498579150354-977475b7ea0b?w=400',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    views: 5678,
    likes: 312,
    comments: 67,
    shares: 23,
    baseEarnings: 0.57,
    engagementBonus: 2.69,
    campaignBonus: 0,
    totalEarnings: 3.26,
    isEnrolledInCampaign: false,
    campaignId: null,
  },
  {
    postId: 'post-4',
    postTitle: 'Brunch vibes at The Garden Cafe',
    postImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    views: 2134,
    likes: 145,
    comments: 21,
    shares: 5,
    baseEarnings: 0.21,
    engagementBonus: 1.04,
    campaignBonus: 1.25,
    totalEarnings: 2.50,
    isEnrolledInCampaign: true,
    campaignId: 'campaign-2',
  },
  {
    postId: 'post-5',
    postTitle: 'Trying the new vegan menu',
    postImageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    views: 1876,
    likes: 98,
    comments: 15,
    shares: 3,
    baseEarnings: 0.19,
    engagementBonus: 0.70,
    campaignBonus: 0,
    totalEarnings: 0.89,
    isEnrolledInCampaign: false,
    campaignId: null,
  },
];

// Mock Promotion Campaigns
export const mockCampaigns: PromotionCampaign[] = [
  {
    id: 'campaign-1',
    restaurantId: 'rest-1',
    restaurantName: 'Sakura Japanese Restaurant',
    restaurantLogo: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    type: 'dish',
    title: 'Feature our New Omakase Menu',
    description: 'Share your experience with our new 12-course omakase tasting menu and earn 2x on your post!',
    targetItem: 'Chef\'s Omakase Tasting Menu',
    payoutRateMultiplier: 2.0,
    budget: 1000,
    budgetUsed: 234,
    matchingTags: ['sushi', 'japanese', 'omakase', 'fine dining'],
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    enrolledPostCount: 15,
    maxEnrollments: 50,
    requirements: ['Must include photo of the dish', 'Tag @SakuraRestaurant', 'Use #SakuraOmakase'],
  },
  {
    id: 'campaign-2',
    restaurantId: 'rest-2',
    restaurantName: 'The Garden Cafe',
    restaurantLogo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200',
    type: 'brand',
    title: 'Share Your Brunch Experience',
    description: 'Post about your weekend brunch at The Garden Cafe and earn 1.5x payout!',
    payoutRateMultiplier: 1.5,
    budget: 500,
    budgetUsed: 178,
    matchingTags: ['brunch', 'breakfast', 'cafe', 'weekend'],
    startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    enrolledPostCount: 23,
    maxEnrollments: 100,
    requirements: ['Post on weekend', 'Include brunch items', 'Minimum 3 photos'],
  },
  {
    id: 'campaign-3',
    restaurantId: 'rest-3',
    restaurantName: 'Fire & Ice BBQ',
    restaurantLogo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=200',
    type: 'event',
    title: 'Grand Opening Week Celebration',
    description: 'Help us celebrate our grand opening! Post during opening week for 3x earnings!',
    payoutRateMultiplier: 3.0,
    budget: 2000,
    budgetUsed: 0,
    matchingTags: ['bbq', 'opening', 'celebration', 'new restaurant'],
    startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: false, // Starting soon
    enrolledPostCount: 0,
    maxEnrollments: 30,
    requirements: ['Visit during opening week', 'Share your first impression', 'Video content preferred'],
  },
  {
    id: 'campaign-4',
    restaurantId: 'rest-4',
    restaurantName: 'Green Bowl',
    restaurantLogo: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
    type: 'general',
    title: 'Healthy Eating Challenge',
    description: 'Share your healthy meals from Green Bowl and inspire others! 1.75x earnings.',
    payoutRateMultiplier: 1.75,
    budget: 750,
    budgetUsed: 312,
    matchingTags: ['healthy', 'vegan', 'salad', 'bowl', 'green'],
    startDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(),
    isActive: true,
    enrolledPostCount: 45,
    maxEnrollments: null, // Unlimited
    requirements: ['Mention nutritional benefits', 'Show the full bowl'],
  },
];

// Mock Payouts
export const mockPayouts: Payout[] = [
  {
    id: 'payout-1',
    userId: 'user-1',
    amount: 50.00,
    method: 'paypal',
    status: 'completed',
    requestedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    transactionId: 'TXN123456789',
    failureReason: null,
  },
  {
    id: 'payout-2',
    userId: 'user-1',
    amount: 35.50,
    method: 'paypal',
    status: 'completed',
    requestedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    transactionId: 'TXN987654321',
    failureReason: null,
  },
  {
    id: 'payout-3',
    userId: 'user-1',
    amount: 18.28,
    method: 'gift_card',
    status: 'completed',
    requestedAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    processedAt: new Date(Date.now() - 44 * 24 * 60 * 60 * 1000).toISOString(),
    transactionId: 'GC456789123',
    failureReason: null,
  },
];

// Mock Earnings Summary
export const mockEarningsSummary: EarningsSummary = {
  lifetimeEarnings: 127.45,
  pendingBalance: 23.67,
  thisMonthEarnings: 45.23,
  lastMonthEarnings: 38.90,
  thisWeekEarnings: 12.15,
  averageEarningsPerPost: 2.56,
  topEarningPostId: 'post-1',
  totalPosts: 52,
  totalViews: 89432,
  totalEngagements: 4521,
};

// Helper functions for mock data manipulation
let payoutIdCounter = 4;
let enrollmentIdCounter = 1;

export function getMockCreatorProfile(): CreatorProfile {
  return {...mockCreatorProfile};
}

export function getMockPostEarnings(): PostEarnings[] {
  return [...mockPostEarnings];
}

export function getMockCampaigns(activeOnly: boolean = false): PromotionCampaign[] {
  if (activeOnly) {
    return mockCampaigns.filter(c => c.isActive);
  }
  return [...mockCampaigns];
}

export function getMockPayoutHistory(): Payout[] {
  return [...mockPayouts];
}

export function getMockEarningsSummary(): EarningsSummary {
  return {...mockEarningsSummary};
}

export function getMockPayoutMethods(): PayoutMethodConfig[] {
  return [...mockPayoutMethods];
}

export function processMockEnrollment(request: EnrollPostRequest): EnrollPostResponse {
  const campaign = mockCampaigns.find(c => c.id === request.campaignId);
  if (!campaign) {
    return {success: false, error: 'Campaign not found'};
  }

  if (!campaign.isActive) {
    return {success: false, error: 'Campaign is not active'};
  }

  if (campaign.maxEnrollments && campaign.enrolledPostCount >= campaign.maxEnrollments) {
    return {success: false, error: 'Campaign has reached maximum enrollments'};
  }

  const post = mockPostEarnings.find(p => p.postId === request.postId);
  if (post?.isEnrolledInCampaign) {
    return {success: false, error: 'Post is already enrolled in a campaign'};
  }

  const enrollment: CampaignEnrollment = {
    id: `enrollment-${enrollmentIdCounter++}`,
    postId: request.postId,
    campaignId: request.campaignId,
    enrolledAt: new Date().toISOString(),
    status: 'approved',
    earningsFromCampaign: 0,
  };

  // Update mock data
  campaign.enrolledPostCount += 1;
  if (post) {
    post.isEnrolledInCampaign = true;
    post.campaignId = campaign.id;
  }

  return {success: true, enrollment};
}

export function processMockPayout(request: RequestPayoutRequest): RequestPayoutResponse {
  if (request.amount < EARNINGS_RATES.minPayoutAmount) {
    return {success: false, error: `Minimum payout amount is $${EARNINGS_RATES.minPayoutAmount}`};
  }

  if (request.amount > mockCreatorProfile.pendingBalance) {
    return {success: false, error: 'Insufficient balance'};
  }

  const payout: Payout = {
    id: `payout-${payoutIdCounter++}`,
    userId: mockCreatorProfile.userId,
    amount: request.amount,
    method: request.method,
    status: 'processing',
    requestedAt: new Date().toISOString(),
    processedAt: null,
    transactionId: null,
    failureReason: null,
  };

  // Update mock profile
  mockCreatorProfile.pendingBalance -= request.amount;
  mockPayouts.unshift(payout);

  // Simulate processing completion after a delay
  setTimeout(() => {
    payout.status = 'completed';
    payout.processedAt = new Date().toISOString();
    payout.transactionId = `TXN${Date.now()}`;
    mockCreatorProfile.paidOutTotal += request.amount;
    mockCreatorProfile.lastPayoutDate = payout.processedAt;
  }, 2000);

  return {success: true, payout};
}

export function connectMockPayoutMethod(method: PayoutMethodConfig['type']): boolean {
  const methodConfig = mockPayoutMethods.find(m => m.type === method);
  if (methodConfig) {
    methodConfig.isConnected = true;
    mockCreatorProfile.payoutMethod = method;
    return true;
  }
  return false;
}
