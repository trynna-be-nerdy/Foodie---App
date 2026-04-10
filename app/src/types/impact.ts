/**
 * Community Impact and Donation Types
 * Types for charitable giving, food drives, and impact tracking
 */

export interface Charity {
  id: string;
  name: string;
  logoUrl: string | null;
  mission: string;
  description: string;
  totalDonations: number;
  totalMeals: number;
  verified: boolean;
  category: CharityCategory;
  location: string;
  website: string | null;
  taxId: string; // 501(c)(3) ID
}

export type CharityCategory =
  | 'food_bank'
  | 'food_pantry'
  | 'soup_kitchen'
  | 'school_meals'
  | 'senior_meals'
  | 'other';

export const CHARITY_CATEGORY_CONFIG: Record<
  CharityCategory,
  {label: string; icon: string; color: string}
> = {
  food_bank: {label: 'Food Bank', icon: 'warehouse', color: '#4CAF50'},
  food_pantry: {label: 'Food Pantry', icon: 'home-heart', color: '#2196F3'},
  soup_kitchen: {label: 'Soup Kitchen', icon: 'pot-steam', color: '#FF9800'},
  school_meals: {label: 'School Meals', icon: 'school', color: '#9C27B0'},
  senior_meals: {label: 'Senior Meals', icon: 'account-heart', color: '#E91E63'},
  other: {label: 'Other', icon: 'hand-heart', color: '#607D8B'},
};

export type DonationType = 'points' | 'cash';

export interface Donation {
  id: string;
  userId: string;
  charityId: string;
  charityName: string;
  charityLogo: string | null;
  amount: number;
  donationType: DonationType;
  mealsContributed: number;
  bonusPointsEarned: number;
  matchedAmount: number | null;
  matchingCampaignId: string | null;
  taxReceiptUrl: string | null;
  createdAt: string;
}

export interface FoodDrive {
  id: string;
  name: string;
  description: string;
  location: string;
  address: string;
  startDate: string;
  endDate: string;
  itemsNeeded: string[];
  participantCount: number;
  goalItems: number;
  collectedItems: number;
  isUserParticipating: boolean;
  charityId: string;
  charityName: string;
  imageUrl: string | null;
}

export interface ImpactStats {
  totalDonations: number; // in dollars
  totalPointsDonated: number;
  mealsContributed: number;
  donationCount: number;
  currentBadge: ImpactBadge;
  nextBadge: ImpactBadge | null;
  mealsToNextBadge: number;
  foodDrivesParticipated: number;
  rank: number | null;
}

export type ImpactBadge = 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';

export const BADGE_CONFIG: Record<
  ImpactBadge,
  {label: string; icon: string; color: string; mealsRequired: number}
> = {
  none: {label: 'Getting Started', icon: 'seed', color: '#9E9E9E', mealsRequired: 0},
  bronze: {label: 'Bronze Giver', icon: 'medal', color: '#CD7F32', mealsRequired: 10},
  silver: {label: 'Silver Giver', icon: 'medal', color: '#C0C0C0', mealsRequired: 50},
  gold: {label: 'Gold Giver', icon: 'medal', color: '#FFD700', mealsRequired: 100},
  platinum: {label: 'Platinum Giver', icon: 'crown', color: '#E5E4E2', mealsRequired: 500},
};

export function getBadgeForMeals(meals: number): ImpactBadge {
  if (meals >= 500) return 'platinum';
  if (meals >= 100) return 'gold';
  if (meals >= 50) return 'silver';
  if (meals >= 10) return 'bronze';
  return 'none';
}

export function getNextBadge(currentBadge: ImpactBadge): ImpactBadge | null {
  const order: ImpactBadge[] = ['none', 'bronze', 'silver', 'gold', 'platinum'];
  const currentIndex = order.indexOf(currentBadge);
  if (currentIndex < order.length - 1) {
    return order[currentIndex + 1];
  }
  return null;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatarUrl: string | null;
  mealsContributed: number;
  badge: ImpactBadge;
  isCurrentUser: boolean;
}

export interface MatchingCampaign {
  id: string;
  name: string;
  description: string;
  sponsorName: string;
  sponsorLogo: string | null;
  multiplier: number; // e.g., 2 for 2x, 3 for 3x
  startDate: string;
  endDate: string;
  maxMatchAmount: number;
  currentMatchedAmount: number;
  isActive: boolean;
}

export interface CommunityStats {
  totalMealsDonated: number;
  totalDonors: number;
  totalCharities: number;
  recentMilestone: string | null;
  featuredStory: FeaturedStory | null;
}

export interface FeaturedStory {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  charityName: string;
  url: string;
}

export interface DonationRequest {
  charityId: string;
  amount: number;
  donationType: DonationType;
}

export interface DonationResponse {
  success: boolean;
  donation?: Donation;
  error?: string;
  taxReceiptUrl?: string;
}

// Constants
export const POINTS_TO_DOLLAR_RATE = 100; // 100 points = $1
export const DOLLARS_PER_MEAL = 5; // $5 = 1 meal
export const BONUS_POINTS_PERCENTAGE = 0.1; // 10% bonus

export function pointsToDollars(points: number): number {
  return points / POINTS_TO_DOLLAR_RATE;
}

export function dollarsToPoints(dollars: number): number {
  return dollars * POINTS_TO_DOLLAR_RATE;
}

export function dollarsToMeals(dollars: number): number {
  return Math.floor(dollars / DOLLARS_PER_MEAL);
}

export function calculateBonusPoints(donationDollars: number): number {
  return Math.floor(dollarsToPoints(donationDollars) * BONUS_POINTS_PERCENTAGE);
}
