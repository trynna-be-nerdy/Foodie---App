/**
 * Mock data for Value Dashboard
 * Used for Expo Go testing without backend
 */

import type {
  ValueRestaurant,
  SavingsSummary,
  Budget,
  CostPerMealData,
  MaxPointsRestaurant,
  UsePointsRestaurant,
  ValueAlert,
  ValueDashboardData,
  DecisionHelperInput,
  Recommendation,
} from '../types/value';

// Mock Best Value Restaurants
export const mockBestValueRestaurants: ValueRestaurant[] = [
  {
    id: 'rest-1',
    name: 'Sakura Sushi',
    logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    cuisineType: 'Japanese',
    priceLevel: 2,
    rating: 4.7,
    valueScore: 9.2,
    valueBreakdown: {
      pointsValue: 3.5,
      discountValue: 2.8,
      qualityValue: 2.9,
    },
    averageCostPerMeal: 24.5,
    totalPointsEarned: 1250,
    totalVisits: 12,
    lastVisit: '2024-01-10T18:30:00Z',
  },
  {
    id: 'rest-2',
    name: 'Green Garden Cafe',
    logoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
    cuisineType: 'Healthy',
    priceLevel: 2,
    rating: 4.5,
    valueScore: 8.8,
    valueBreakdown: {
      pointsValue: 3.2,
      discountValue: 2.5,
      qualityValue: 3.1,
    },
    averageCostPerMeal: 18.75,
    totalPointsEarned: 890,
    totalVisits: 8,
    lastVisit: '2024-01-08T12:15:00Z',
  },
  {
    id: 'rest-3',
    name: 'Taco Fiesta',
    logoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200',
    cuisineType: 'Mexican',
    priceLevel: 1,
    rating: 4.3,
    valueScore: 8.5,
    valueBreakdown: {
      pointsValue: 3.8,
      discountValue: 2.0,
      qualityValue: 2.7,
    },
    averageCostPerMeal: 14.25,
    totalPointsEarned: 720,
    totalVisits: 15,
    lastVisit: '2024-01-12T13:00:00Z',
  },
  {
    id: 'rest-4',
    name: 'Pasta Paradise',
    logoUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200',
    cuisineType: 'Italian',
    priceLevel: 3,
    rating: 4.6,
    valueScore: 7.9,
    valueBreakdown: {
      pointsValue: 2.8,
      discountValue: 2.2,
      qualityValue: 2.9,
    },
    averageCostPerMeal: 32.0,
    totalPointsEarned: 650,
    totalVisits: 6,
    lastVisit: '2024-01-05T19:45:00Z',
  },
  {
    id: 'rest-5',
    name: 'Burger Barn',
    logoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
    cuisineType: 'American',
    priceLevel: 2,
    rating: 4.2,
    valueScore: 7.5,
    valueBreakdown: {
      pointsValue: 2.5,
      discountValue: 2.8,
      qualityValue: 2.2,
    },
    averageCostPerMeal: 16.5,
    totalPointsEarned: 540,
    totalVisits: 10,
    lastVisit: '2024-01-11T20:00:00Z',
  },
];

// Mock Savings Summary
export const mockSavingsSummary: SavingsSummary = {
  thisMonth: 47.5,
  lastMonth: 62.25,
  lifetime: 523.75,
  monthlyTrend: [
    {month: 'Aug', year: 2023, savings: 38.0, spending: 245.0},
    {month: 'Sep', year: 2023, savings: 42.5, spending: 280.0},
    {month: 'Oct', year: 2023, savings: 55.25, spending: 312.0},
    {month: 'Nov', year: 2023, savings: 48.0, spending: 295.0},
    {month: 'Dec', year: 2023, savings: 62.25, spending: 385.0},
    {month: 'Jan', year: 2024, savings: 47.5, spending: 198.0},
  ],
  breakdownByType: {
    pointsDiscounts: 325.5,
    promotionalDiscounts: 168.25,
    referralCredits: 30.0,
  },
};

// Mock Budget
export const mockBudget: Budget = {
  monthlyBudget: 400,
  spent: 198.0,
  remaining: 202.0,
  percentUsed: 49.5,
  alertThreshold: 80,
  isAlertTriggered: false,
  categoryBreakdown: [
    {category: 'breakfast', spent: 32.5, percentage: 16.4, count: 4},
    {category: 'lunch', spent: 78.25, percentage: 39.5, count: 8},
    {category: 'dinner', spent: 72.5, percentage: 36.6, count: 5},
    {category: 'snacks', spent: 8.75, percentage: 4.4, count: 3},
    {category: 'drinks', spent: 6.0, percentage: 3.0, count: 2},
  ],
  dailyAverage: 15.85,
  projectedMonthlySpend: 348.0,
};

// Mock Cost Per Meal Data
export const mockCostPerMeal: CostPerMealData[] = [
  {
    restaurantId: 'rest-3',
    restaurantName: 'Taco Fiesta',
    logoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200',
    averageCost: 14.25,
    orderCount: 15,
    lastOrderDate: '2024-01-12T13:00:00Z',
    costTrend: 'stable',
    percentChange: 0,
  },
  {
    restaurantId: 'rest-5',
    restaurantName: 'Burger Barn',
    logoUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200',
    averageCost: 16.5,
    orderCount: 10,
    lastOrderDate: '2024-01-11T20:00:00Z',
    costTrend: 'up',
    percentChange: 5.2,
  },
  {
    restaurantId: 'rest-2',
    restaurantName: 'Green Garden Cafe',
    logoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
    averageCost: 18.75,
    orderCount: 8,
    lastOrderDate: '2024-01-08T12:15:00Z',
    costTrend: 'down',
    percentChange: -3.8,
  },
  {
    restaurantId: 'rest-1',
    restaurantName: 'Sakura Sushi',
    logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    averageCost: 24.5,
    orderCount: 12,
    lastOrderDate: '2024-01-10T18:30:00Z',
    costTrend: 'stable',
    percentChange: 1.2,
  },
  {
    restaurantId: 'rest-4',
    restaurantName: 'Pasta Paradise',
    logoUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=200',
    averageCost: 32.0,
    orderCount: 6,
    lastOrderDate: '2024-01-05T19:45:00Z',
    costTrend: 'up',
    percentChange: 8.5,
  },
];

// Mock Max Points Today
export const mockMaxPointsToday: MaxPointsRestaurant[] = [
  {
    id: 'rest-1',
    name: 'Sakura Sushi',
    logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    bonusMultiplier: 3,
    bonusReason: 'Triple Points Tuesday!',
    validUntil: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    estimatedPoints: 225,
  },
  {
    id: 'rest-6',
    name: 'Thai Spice Kitchen',
    logoUrl: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=200',
    bonusMultiplier: 2,
    bonusReason: 'New Partner Bonus',
    validUntil: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
    estimatedPoints: 120,
  },
  {
    id: 'rest-3',
    name: 'Taco Fiesta',
    logoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200',
    bonusMultiplier: 2,
    bonusReason: 'Happy Hour Special',
    validUntil: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    estimatedPoints: 85,
  },
];

// Mock Use Your Points
export const mockUseYourPoints: UsePointsRestaurant[] = [
  {
    id: 'rest-1',
    name: 'Sakura Sushi',
    logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200',
    availablePoints: 1250,
    pointsValue: 12.5,
    minimumOrder: 15,
    expiringPoints: 200,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'rest-2',
    name: 'Green Garden Cafe',
    logoUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200',
    availablePoints: 890,
    pointsValue: 8.9,
    minimumOrder: 12,
    expiringPoints: 0,
    expiresAt: null,
  },
  {
    id: 'rest-3',
    name: 'Taco Fiesta',
    logoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200',
    availablePoints: 720,
    pointsValue: 7.2,
    minimumOrder: 10,
    expiringPoints: 100,
    expiresAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock Value Alerts
export const mockValueAlerts: ValueAlert[] = [
  {
    id: 'alert-1',
    type: 'bonus_points',
    title: 'Triple Points at Sakura Sushi!',
    message: 'Earn 3x points on all orders today. Don\'t miss out!',
    restaurantId: 'rest-1',
    restaurantName: 'Sakura Sushi',
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'alert-2',
    type: 'expiring_points',
    title: '200 Points Expiring Soon',
    message: 'You have 200 points at Sakura Sushi expiring in 7 days. Use them before they\'re gone!',
    restaurantId: 'rest-1',
    restaurantName: 'Sakura Sushi',
    pointsAmount: 200,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  },
  {
    id: 'alert-3',
    type: 'flash_sale',
    title: '25% Off at Green Garden Cafe',
    message: 'Flash sale! Get 25% off your next order. Valid for the next 4 hours.',
    restaurantId: 'rest-2',
    restaurantName: 'Green Garden Cafe',
    discountPercentage: 25,
    expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: 'alert-4',
    type: 'milestone',
    title: 'You\'ve Saved $500!',
    message: 'Congratulations! You\'ve reached $500 in lifetime savings. Keep it up!',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
];

// Helper functions
export function getMockValueDashboard(): ValueDashboardData {
  return {
    bestValueRestaurants: mockBestValueRestaurants,
    savingsSummary: mockSavingsSummary,
    budget: mockBudget,
    costPerMeal: mockCostPerMeal,
    maxPointsToday: mockMaxPointsToday,
    useYourPoints: mockUseYourPoints,
    alerts: mockValueAlerts,
  };
}

export function getMockRecommendations(
  input: DecisionHelperInput,
): Recommendation[] {
  // Simple mock recommendation logic
  let restaurants = [...mockBestValueRestaurants];

  // Filter by price range
  restaurants = restaurants.filter(
    r => r.priceLevel >= input.priceRange.min && r.priceLevel <= input.priceRange.max,
  );

  // Filter by cuisine if specified
  if (input.craving) {
    const cravingLower = input.craving.toLowerCase();
    restaurants = restaurants.filter(r =>
      r.cuisineType.toLowerCase().includes(cravingLower),
    );
  }

  // Sort by priority
  if (input.priority === 'value') {
    restaurants.sort((a, b) => b.valueScore - a.valueScore);
  } else if (input.priority === 'quality') {
    restaurants.sort((a, b) => b.rating - a.rating);
  } else if (input.priority === 'points') {
    restaurants.sort(
      (a, b) => b.valueBreakdown.pointsValue - a.valueBreakdown.pointsValue,
    );
  }

  // Take top 3 and create recommendations
  return restaurants.slice(0, 3).map((restaurant, index) => ({
    restaurant,
    reasoning: generateReasoning(restaurant, input, index),
    matchScore: 90 - index * 10,
    estimatedCost: restaurant.averageCostPerMeal,
    estimatedPoints: Math.round(restaurant.averageCostPerMeal * 5),
    activePromotions:
      mockMaxPointsToday.find(m => m.id === restaurant.id)
        ? [`${mockMaxPointsToday.find(m => m.id === restaurant.id)?.bonusMultiplier}x Points!`]
        : [],
  }));
}

function generateReasoning(
  restaurant: ValueRestaurant,
  input: DecisionHelperInput,
  rank: number,
): string[] {
  const reasons: string[] = [];

  if (rank === 0) {
    reasons.push('Best match for your preferences');
  }

  if (restaurant.valueScore >= 8) {
    reasons.push(`Excellent value score: ${restaurant.valueScore.toFixed(1)}/10`);
  }

  if (restaurant.rating >= 4.5) {
    reasons.push(`Highly rated: ${restaurant.rating} stars`);
  }

  if (input.priority === 'points' && restaurant.valueBreakdown.pointsValue >= 3) {
    reasons.push('Great points earning potential');
  }

  if (restaurant.priceLevel <= 2) {
    reasons.push('Budget-friendly option');
  }

  const hasBonus = mockMaxPointsToday.find(m => m.id === restaurant.id);
  if (hasBonus) {
    reasons.push(`${hasBonus.bonusMultiplier}x bonus points active!`);
  }

  return reasons;
}

export function updateMockBudget(newBudget: number): Budget {
  return {
    ...mockBudget,
    monthlyBudget: newBudget,
    remaining: newBudget - mockBudget.spent,
    percentUsed: (mockBudget.spent / newBudget) * 100,
    isAlertTriggered: (mockBudget.spent / newBudget) * 100 >= mockBudget.alertThreshold,
  };
}

export function markAlertAsRead(alertId: string): ValueAlert | null {
  const alert = mockValueAlerts.find(a => a.id === alertId);
  if (alert) {
    alert.isRead = true;
    return alert;
  }
  return null;
}
