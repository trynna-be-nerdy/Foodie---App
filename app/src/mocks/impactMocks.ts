/**
 * Mock data for Community Impact and Donations
 * Used for Expo Go testing without backend
 */

import type {
  Charity,
  Donation,
  FoodDrive,
  ImpactStats,
  LeaderboardEntry,
  MatchingCampaign,
  CommunityStats,
  DonationRequest,
  DonationResponse,
} from '../types/impact';
import {
  getBadgeForMeals,
  getNextBadge,
  BADGE_CONFIG,
  pointsToDollars,
  dollarsToMeals,
  calculateBonusPoints,
} from '../types/impact';

// Mock Charities
export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'City Food Bank',
    logoUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=200',
    mission: 'Fighting hunger in our community, one meal at a time.',
    description:
      'City Food Bank has been serving families in need for over 30 years. We distribute over 1 million pounds of food annually to those facing food insecurity.',
    totalDonations: 125000,
    totalMeals: 25000,
    verified: true,
    category: 'food_bank',
    location: 'Downtown',
    website: 'https://cityfoodbank.org',
    taxId: '12-3456789',
  },
  {
    id: 'charity-2',
    name: 'Neighborhood Pantry',
    logoUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200',
    mission: 'Providing groceries and hope to families in need.',
    description:
      'A grassroots organization that operates a weekly food distribution program for low-income families in the neighborhood.',
    totalDonations: 45000,
    totalMeals: 9000,
    verified: true,
    category: 'food_pantry',
    location: 'Eastside',
    website: 'https://neighborhoodpantry.org',
    taxId: '23-4567890',
  },
  {
    id: 'charity-3',
    name: 'Warm Meals Kitchen',
    logoUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200',
    mission: 'Hot meals and warm hearts for those without homes.',
    description:
      'We serve hot, nutritious meals to homeless individuals and families 365 days a year. No one should go hungry.',
    totalDonations: 78000,
    totalMeals: 15600,
    verified: true,
    category: 'soup_kitchen',
    location: 'Midtown',
    website: 'https://warmmealskitchen.org',
    taxId: '34-5678901',
  },
  {
    id: 'charity-4',
    name: 'Kids Lunch Program',
    logoUrl: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=200',
    mission: 'Ensuring no child goes hungry during the school year.',
    description:
      'We provide free lunches to underprivileged students at 15 local schools, serving over 2,000 children daily.',
    totalDonations: 92000,
    totalMeals: 18400,
    verified: true,
    category: 'school_meals',
    location: 'Citywide',
    website: 'https://kidslunchprogram.org',
    taxId: '45-6789012',
  },
  {
    id: 'charity-5',
    name: 'Senior Nutrition Services',
    logoUrl: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=200',
    mission: 'Nourishing our elders with dignity and care.',
    description:
      'Home-delivered meals and congregate dining programs for seniors who cannot shop or cook for themselves.',
    totalDonations: 56000,
    totalMeals: 11200,
    verified: true,
    category: 'senior_meals',
    location: 'Northside',
    website: 'https://seniornutrition.org',
    taxId: '56-7890123',
  },
];

// Mock User Donations
export const mockUserDonations: Donation[] = [
  {
    id: 'don-1',
    userId: 'user-1',
    charityId: 'charity-1',
    charityName: 'City Food Bank',
    charityLogo: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=200',
    amount: 25,
    donationType: 'cash',
    mealsContributed: 5,
    bonusPointsEarned: 250,
    matchedAmount: 25,
    matchingCampaignId: 'match-1',
    taxReceiptUrl: 'https://receipts.foodie.app/don-1.pdf',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'don-2',
    userId: 'user-1',
    charityId: 'charity-3',
    charityName: 'Warm Meals Kitchen',
    charityLogo: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=200',
    amount: 1500,
    donationType: 'points',
    mealsContributed: 3,
    bonusPointsEarned: 150,
    matchedAmount: null,
    matchingCampaignId: null,
    taxReceiptUrl: 'https://receipts.foodie.app/don-2.pdf',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'don-3',
    userId: 'user-1',
    charityId: 'charity-2',
    charityName: 'Neighborhood Pantry',
    charityLogo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=200',
    amount: 50,
    donationType: 'cash',
    mealsContributed: 10,
    bonusPointsEarned: 500,
    matchedAmount: null,
    matchingCampaignId: null,
    taxReceiptUrl: 'https://receipts.foodie.app/don-3.pdf',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Food Drives
export const mockFoodDrives: FoodDrive[] = [
  {
    id: 'drive-1',
    name: 'Holiday Food Drive 2024',
    description:
      'Help us stock the shelves for families in need this holiday season. Every can counts!',
    location: 'Downtown Community Center',
    address: '123 Main St, Downtown',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    itemsNeeded: [
      'Canned vegetables',
      'Canned soup',
      'Pasta',
      'Rice',
      'Peanut butter',
      'Cereal',
    ],
    participantCount: 156,
    goalItems: 5000,
    collectedItems: 3250,
    isUserParticipating: true,
    charityId: 'charity-1',
    charityName: 'City Food Bank',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400',
  },
  {
    id: 'drive-2',
    name: 'Back to School Food Collection',
    description:
      'Help students start the school year with full bellies. Collecting breakfast items and snacks.',
    location: 'Lincoln Elementary School',
    address: '456 Oak Ave, Eastside',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000).toISOString(),
    itemsNeeded: [
      'Breakfast bars',
      'Juice boxes',
      'Crackers',
      'Fruit cups',
      'Granola',
    ],
    participantCount: 42,
    goalItems: 2000,
    collectedItems: 450,
    isUserParticipating: false,
    charityId: 'charity-4',
    charityName: 'Kids Lunch Program',
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
  },
];

// Mock Impact Stats
export const mockImpactStats: ImpactStats = {
  totalDonations: 90, // $90 total
  totalPointsDonated: 1500,
  mealsContributed: 23, // 18 meals from cash + 3 from points + matched
  donationCount: 3,
  currentBadge: 'silver',
  nextBadge: 'gold',
  mealsToNextBadge: 77, // 100 - 23 = 77
  foodDrivesParticipated: 1,
  rank: 127,
};

// Mock Leaderboard
export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: 'user-top-1',
    username: 'GenerousGiver',
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    mealsContributed: 1250,
    badge: 'platinum',
    isCurrentUser: false,
  },
  {
    rank: 2,
    userId: 'user-top-2',
    username: 'FoodHero',
    avatarUrl: 'https://i.pravatar.cc/150?img=2',
    mealsContributed: 890,
    badge: 'platinum',
    isCurrentUser: false,
  },
  {
    rank: 3,
    userId: 'user-top-3',
    username: 'MealMaker',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    mealsContributed: 654,
    badge: 'platinum',
    isCurrentUser: false,
  },
  {
    rank: 4,
    userId: 'user-top-4',
    username: 'KindnessKing',
    avatarUrl: 'https://i.pravatar.cc/150?img=4',
    mealsContributed: 423,
    badge: 'gold',
    isCurrentUser: false,
  },
  {
    rank: 5,
    userId: 'user-top-5',
    username: 'HungerFighter',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    mealsContributed: 312,
    badge: 'gold',
    isCurrentUser: false,
  },
  {
    rank: 127,
    userId: 'user-1',
    username: 'You',
    avatarUrl: null,
    mealsContributed: 23,
    badge: 'silver',
    isCurrentUser: true,
  },
];

// Mock Matching Campaign
export const mockMatchingCampaign: MatchingCampaign = {
  id: 'match-1',
  name: 'Double Your Impact',
  description:
    'For a limited time, every dollar you donate will be matched 2x by our corporate sponsors!',
  sponsorName: 'FreshMart Groceries',
  sponsorLogo: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200',
  multiplier: 2,
  startDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  endDate: new Date(Date.now() + 11 * 24 * 60 * 60 * 1000).toISOString(),
  maxMatchAmount: 50000,
  currentMatchedAmount: 18500,
  isActive: true,
};

// Mock Community Stats
export const mockCommunityStats: CommunityStats = {
  totalMealsDonated: 89432,
  totalDonors: 12567,
  totalCharities: 5,
  recentMilestone: 'We just passed 89,000 meals donated!',
  featuredStory: {
    id: 'story-1',
    title: 'How Your Donations Changed the Martinez Family\'s Life',
    excerpt:
      'When Maria lost her job, she didn\'t know how she would feed her three children. Thanks to donations from Foodie users...',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400',
    charityName: 'City Food Bank',
    url: 'https://foodie.app/stories/martinez-family',
  },
};

// Helper functions
let donationIdCounter = 4;

export function getMockCharities(): Charity[] {
  return mockCharities;
}

export function getMockCharityById(id: string): Charity | null {
  return mockCharities.find(c => c.id === id) || null;
}

export function getMockDonationHistory(): Donation[] {
  return mockUserDonations;
}

export function getMockImpactStats(): ImpactStats {
  return mockImpactStats;
}

export function getMockLeaderboard(): LeaderboardEntry[] {
  return mockLeaderboard;
}

export function getMockFoodDrives(): FoodDrive[] {
  return mockFoodDrives;
}

export function getMockMatchingCampaign(): MatchingCampaign | null {
  return mockMatchingCampaign;
}

export function getMockCommunityStats(): CommunityStats {
  return mockCommunityStats;
}

export function processMockDonation(request: DonationRequest): DonationResponse {
  const charity = getMockCharityById(request.charityId);
  if (!charity) {
    return {success: false, error: 'Charity not found'};
  }

  const dollarAmount =
    request.donationType === 'points'
      ? pointsToDollars(request.amount)
      : request.amount;

  const meals = dollarsToMeals(dollarAmount);
  const bonusPoints = calculateBonusPoints(dollarAmount);

  // Check for matching campaign
  let matchedAmount: number | null = null;
  if (mockMatchingCampaign.isActive && request.donationType === 'cash') {
    matchedAmount = dollarAmount * (mockMatchingCampaign.multiplier - 1);
  }

  const donationId = `don-${donationIdCounter++}`;
  const donation: Donation = {
    id: donationId,
    userId: 'user-1',
    charityId: charity.id,
    charityName: charity.name,
    charityLogo: charity.logoUrl,
    amount: request.amount,
    donationType: request.donationType,
    mealsContributed: meals + (matchedAmount ? dollarsToMeals(matchedAmount) : 0),
    bonusPointsEarned: bonusPoints,
    matchedAmount,
    matchingCampaignId: matchedAmount ? mockMatchingCampaign.id : null,
    taxReceiptUrl: `https://receipts.foodie.app/${donationId}.pdf`,
    createdAt: new Date().toISOString(),
  };

  // Update mock stats
  mockImpactStats.totalDonations += dollarAmount;
  if (request.donationType === 'points') {
    mockImpactStats.totalPointsDonated += request.amount;
  }
  mockImpactStats.mealsContributed += donation.mealsContributed;
  mockImpactStats.donationCount += 1;
  mockImpactStats.currentBadge = getBadgeForMeals(mockImpactStats.mealsContributed);
  mockImpactStats.nextBadge = getNextBadge(mockImpactStats.currentBadge);
  if (mockImpactStats.nextBadge) {
    mockImpactStats.mealsToNextBadge =
      BADGE_CONFIG[mockImpactStats.nextBadge].mealsRequired -
      mockImpactStats.mealsContributed;
  }

  mockUserDonations.unshift(donation);

  return {
    success: true,
    donation,
    taxReceiptUrl: donation.taxReceiptUrl ?? undefined,
  };
}

export function participateInFoodDrive(driveId: string): boolean {
  const drive = mockFoodDrives.find(d => d.id === driveId);
  if (drive && !drive.isUserParticipating) {
    drive.isUserParticipating = true;
    drive.participantCount += 1;
    mockImpactStats.foodDrivesParticipated += 1;
    return true;
  }
  return false;
}
