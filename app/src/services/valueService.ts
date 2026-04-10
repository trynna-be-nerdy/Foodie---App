/**
 * Value Service
 * Handles value dashboard data, budget tracking, and recommendations
 */

import {USE_MOCKS} from '../config';
import {api} from './api';
import type {
  ValueDashboardData,
  ValueRestaurant,
  SavingsSummary,
  Budget,
  CostPerMealData,
  MaxPointsRestaurant,
  UsePointsRestaurant,
  ValueAlert,
  DecisionHelperInput,
  Recommendation,
} from '../types/value';
import {
  getMockValueDashboard,
  getMockRecommendations,
  updateMockBudget,
  markAlertAsRead as mockMarkAlertAsRead,
  mockBestValueRestaurants,
  mockSavingsSummary,
  mockBudget,
  mockCostPerMeal,
  mockMaxPointsToday,
  mockUseYourPoints,
  mockValueAlerts,
} from '../mocks/valueMocks';

// Simulate network delay for mock data
const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get complete value dashboard data
 */
export async function getValueDashboard(): Promise<ValueDashboardData> {
  if (USE_MOCKS) {
    await simulateDelay();
    return getMockValueDashboard();
  }

  const response = await api.get<ValueDashboardData>('/value/dashboard');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load value dashboard');
  }
  return response.data;
}

/**
 * Get best value restaurants
 */
export async function getBestValueRestaurants(
  limit: number = 5,
): Promise<ValueRestaurant[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return mockBestValueRestaurants.slice(0, limit);
  }

  const response = await api.get<{restaurants: ValueRestaurant[]}>(
    '/value/best-value',
    {params: {limit}},
  );
  return response.data?.restaurants ?? [];
}

/**
 * Get savings summary
 */
export async function getSavingsSummary(): Promise<SavingsSummary> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return mockSavingsSummary;
  }

  const response = await api.get<SavingsSummary>('/value/savings');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load savings summary');
  }
  return response.data;
}

/**
 * Get budget tracking data
 */
export async function getBudget(): Promise<Budget> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return mockBudget;
  }

  const response = await api.get<Budget>('/value/budget');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load budget data');
  }
  return response.data;
}

/**
 * Set monthly budget
 */
export async function setMonthlyBudget(
  amount: number,
): Promise<{success: boolean; budget: Budget}> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    const updatedBudget = updateMockBudget(amount);
    return {success: true, budget: updatedBudget};
  }

  const response = await api.put<{success: boolean; budget: Budget}>(
    '/value/budget',
    {monthlyBudget: amount},
  );
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to update budget');
  }
  return response.data;
}

/**
 * Get cost per meal data
 */
export async function getCostPerMeal(): Promise<CostPerMealData[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return mockCostPerMeal;
  }

  const response = await api.get<{data: CostPerMealData[]}>('/value/cost-per-meal');
  return response.data?.data ?? [];
}

/**
 * Get max points restaurants for today
 */
export async function getMaxPointsToday(): Promise<MaxPointsRestaurant[]> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return mockMaxPointsToday;
  }

  const response = await api.get<{restaurants: MaxPointsRestaurant[]}>(
    '/value/max-points-today',
  );
  return response.data?.restaurants ?? [];
}

/**
 * Get restaurants where user can use points
 */
export async function getUseYourPoints(): Promise<UsePointsRestaurant[]> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return mockUseYourPoints;
  }

  const response = await api.get<{restaurants: UsePointsRestaurant[]}>(
    '/value/use-points',
  );
  return response.data?.restaurants ?? [];
}

/**
 * Get value alerts
 */
export async function getValueAlerts(
  unreadOnly: boolean = false,
): Promise<ValueAlert[]> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    if (unreadOnly) {
      return mockValueAlerts.filter(a => !a.isRead);
    }
    return mockValueAlerts;
  }

  const response = await api.get<{alerts: ValueAlert[]}>('/value/alerts', {
    params: {unreadOnly},
  });
  return response.data?.alerts ?? [];
}

/**
 * Mark alert as read
 */
export async function markAlertAsRead(
  alertId: string,
): Promise<{success: boolean}> {
  if (USE_MOCKS) {
    await simulateDelay(100);
    const alert = mockMarkAlertAsRead(alertId);
    return {success: alert !== null};
  }

  const response = await api.put<{success: boolean}>(
    `/value/alerts/${alertId}/read`,
  );
  return response.data ?? {success: false};
}

/**
 * Get recommendations based on user preferences
 */
export async function getRecommendations(
  input: DecisionHelperInput,
): Promise<Recommendation[]> {
  if (USE_MOCKS) {
    await simulateDelay(800); // Simulate AI processing time
    return getMockRecommendations(input);
  }

  const response = await api.post<{recommendations: Recommendation[]}>(
    '/value/recommendations',
    input,
  );
  return response.data?.recommendations ?? [];
}

/**
 * Get value score for a specific restaurant
 */
export async function getRestaurantValueScore(
  restaurantId: string,
): Promise<ValueRestaurant | null> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return mockBestValueRestaurants.find(r => r.id === restaurantId) || null;
  }

  try {
    const response = await api.get<ValueRestaurant>(
      `/value/restaurant/${restaurantId}`,
    );
    return response.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Calculate value score (client-side utility)
 * Formula: (pointsEarned / cost) + (availableDiscounts / cost) + qualityRating
 */
export function calculateValueScore(
  pointsEarned: number,
  cost: number,
  availableDiscounts: number,
  qualityRating: number,
): number {
  if (cost <= 0) return 0;

  const pointsComponent = (pointsEarned / cost) * 2; // Weight: 2x
  const discountComponent = (availableDiscounts / cost) * 1.5; // Weight: 1.5x
  const qualityComponent = qualityRating / 5 * 3; // Normalize to 0-3

  const rawScore = pointsComponent + discountComponent + qualityComponent;

  // Normalize to 0-10 scale
  return Math.min(10, Math.max(0, rawScore));
}
