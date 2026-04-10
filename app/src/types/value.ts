/**
 * Value Dashboard Types
 * Types for value analysis, budget tracking, and dining recommendations
 */

export interface ValueRestaurant {
  id: string;
  name: string;
  logoUrl: string | null;
  cuisineType: string;
  priceLevel: number; // 1-4 ($-$$$$)
  rating: number;
  valueScore: number; // 0-10
  valueBreakdown: {
    pointsValue: number; // Points earned per dollar
    discountValue: number; // Available discounts as percentage
    qualityValue: number; // Rating contribution
  };
  averageCostPerMeal: number;
  totalPointsEarned: number;
  totalVisits: number;
  lastVisit: string | null;
}

export interface SavingsSummary {
  thisMonth: number;
  lastMonth: number;
  lifetime: number;
  monthlyTrend: MonthlyTrend[];
  breakdownByType: {
    pointsDiscounts: number;
    promotionalDiscounts: number;
    referralCredits: number;
  };
}

export interface MonthlyTrend {
  month: string; // e.g., "Jan", "Feb"
  year: number;
  savings: number;
  spending: number;
}

export interface Budget {
  monthlyBudget: number;
  spent: number;
  remaining: number;
  percentUsed: number;
  alertThreshold: number; // e.g., 80
  isAlertTriggered: boolean;
  categoryBreakdown: CategoryBreakdown[];
  dailyAverage: number;
  projectedMonthlySpend: number;
}

export interface CategoryBreakdown {
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'drinks';
  spent: number;
  percentage: number;
  count: number;
}

export interface CostPerMealData {
  restaurantId: string;
  restaurantName: string;
  logoUrl: string | null;
  averageCost: number;
  orderCount: number;
  lastOrderDate: string;
  costTrend: 'up' | 'down' | 'stable';
  percentChange: number;
}

export interface DecisionHelperInput {
  craving: string | null; // Cuisine type
  priceRange: {
    min: number;
    max: number;
  };
  maxDistance: number; // in miles
  priority: 'value' | 'speed' | 'quality' | 'points';
}

export interface Recommendation {
  restaurant: ValueRestaurant;
  reasoning: string[];
  matchScore: number; // 0-100
  estimatedCost: number;
  estimatedPoints: number;
  activePromotions: string[];
}

export interface ValueAlert {
  id: string;
  type: 'bonus_points' | 'expiring_points' | 'flash_sale' | 'budget_warning' | 'milestone';
  title: string;
  message: string;
  restaurantId?: string;
  restaurantName?: string;
  expiresAt?: string;
  pointsAmount?: number;
  discountPercentage?: number;
  createdAt: string;
  isRead: boolean;
}

export interface MaxPointsRestaurant {
  id: string;
  name: string;
  logoUrl: string | null;
  bonusMultiplier: number; // e.g., 2x, 3x
  bonusReason: string;
  validUntil: string;
  estimatedPoints: number; // Based on average order
}

export interface UsePointsRestaurant {
  id: string;
  name: string;
  logoUrl: string | null;
  availablePoints: number;
  pointsValue: number; // Dollar value of points
  minimumOrder: number;
  expiringPoints: number;
  expiresAt: string | null;
}

export interface ValueDashboardData {
  bestValueRestaurants: ValueRestaurant[];
  savingsSummary: SavingsSummary;
  budget: Budget;
  costPerMeal: CostPerMealData[];
  maxPointsToday: MaxPointsRestaurant[];
  useYourPoints: UsePointsRestaurant[];
  alerts: ValueAlert[];
}

// Category icons and colors
export const CATEGORY_CONFIG: Record<
  CategoryBreakdown['category'],
  {icon: string; color: string; label: string}
> = {
  breakfast: {icon: 'coffee', color: '#FF9800', label: 'Breakfast'},
  lunch: {icon: 'food', color: '#4CAF50', label: 'Lunch'},
  dinner: {icon: 'food-variant', color: '#2196F3', label: 'Dinner'},
  snacks: {icon: 'cookie', color: '#9C27B0', label: 'Snacks'},
  drinks: {icon: 'cup', color: '#00BCD4', label: 'Drinks'},
};

// Value score color thresholds
export const VALUE_SCORE_COLORS = {
  excellent: '#4CAF50', // 8-10
  good: '#8BC34A', // 6-8
  average: '#FFC107', // 4-6
  poor: '#FF5722', // 0-4
};

export function getValueScoreColor(score: number): string {
  if (score >= 8) return VALUE_SCORE_COLORS.excellent;
  if (score >= 6) return VALUE_SCORE_COLORS.good;
  if (score >= 4) return VALUE_SCORE_COLORS.average;
  return VALUE_SCORE_COLORS.poor;
}

export function getValueScoreLabel(score: number): string {
  if (score >= 8) return 'Excellent Value';
  if (score >= 6) return 'Good Value';
  if (score >= 4) return 'Average Value';
  return 'Below Average';
}
