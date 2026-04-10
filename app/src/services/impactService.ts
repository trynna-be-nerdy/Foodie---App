/**
 * Impact Service
 * Handles charitable donations, food drives, and impact tracking
 */

import {USE_MOCKS} from '../config';
import {api} from './api';
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
  getMockCharities,
  getMockCharityById,
  getMockDonationHistory,
  getMockImpactStats,
  getMockLeaderboard,
  getMockFoodDrives,
  getMockMatchingCampaign,
  getMockCommunityStats,
  processMockDonation,
  participateInFoodDrive as mockParticipateInFoodDrive,
} from '../mocks/impactMocks';

// Simulate network delay for mock data
const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get list of partnered charities
 */
export async function getCharities(): Promise<Charity[]> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockCharities();
  }

  const response = await api.get<{charities: Charity[]}>('/impact/charities');
  return response.data?.charities ?? [];
}

/**
 * Get charity by ID
 */
export async function getCharityById(id: string): Promise<Charity | null> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return getMockCharityById(id);
  }

  try {
    const response = await api.get<Charity>(`/impact/charities/${id}`);
    return response.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Make a donation (points or cash)
 */
export async function makeDonation(
  request: DonationRequest,
): Promise<DonationResponse> {
  if (USE_MOCKS) {
    await simulateDelay(1000); // Simulate payment processing
    return processMockDonation(request);
  }

  const response = await api.post<DonationResponse>('/impact/donations', request);
  return response.data ?? {success: false, error: 'Unknown error'};
}

/**
 * Get user's donation history
 */
export async function getDonationHistory(): Promise<Donation[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockDonationHistory();
  }

  const response = await api.get<{donations: Donation[]}>('/impact/donations/history');
  return response.data?.donations ?? [];
}

/**
 * Get user's impact stats
 */
export async function getImpactStats(): Promise<ImpactStats> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockImpactStats();
  }

  const response = await api.get<ImpactStats>('/impact/dashboard');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load impact stats');
  }
  return response.data;
}

/**
 * Get donation leaderboard
 */
export async function getLeaderboard(
  scope: 'local' | 'national' | 'friends' = 'national',
): Promise<LeaderboardEntry[]> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockLeaderboard();
  }

  const response = await api.get<{entries: LeaderboardEntry[]}>(
    '/impact/leaderboard',
    {params: {scope}},
  );
  return response.data?.entries ?? [];
}

/**
 * Get active food drives
 */
export async function getFoodDrives(): Promise<FoodDrive[]> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockFoodDrives();
  }

  const response = await api.get<{drives: FoodDrive[]}>('/impact/food-drives');
  return response.data?.drives ?? [];
}

/**
 * Participate in a food drive
 */
export async function participateInFoodDrive(
  driveId: string,
): Promise<{success: boolean}> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    const success = mockParticipateInFoodDrive(driveId);
    return {success};
  }

  const response = await api.post<{success: boolean}>(
    `/impact/food-drives/${driveId}/participate`,
  );
  return response.data ?? {success: false};
}

/**
 * Check in at a food drive (QR code scan)
 */
export async function checkInToFoodDrive(
  driveId: string,
  qrCode: string,
): Promise<{success: boolean; itemsLogged?: number}> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    return {success: true, itemsLogged: 5};
  }

  const response = await api.post<{success: boolean; itemsLogged?: number}>(
    `/impact/food-drives/${driveId}/checkin`,
    {qrCode},
  );
  return response.data ?? {success: false};
}

/**
 * Get active matching campaign
 */
export async function getMatchingCampaign(): Promise<MatchingCampaign | null> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return getMockMatchingCampaign();
  }

  try {
    const response = await api.get<MatchingCampaign>('/impact/matching-campaign');
    return response.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Get community-wide stats
 */
export async function getCommunityStats(): Promise<CommunityStats> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockCommunityStats();
  }

  const response = await api.get<CommunityStats>('/impact/community-stats');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load community stats');
  }
  return response.data;
}

/**
 * Download tax receipt
 */
export async function downloadTaxReceipt(donationId: string): Promise<string> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    return `https://receipts.foodie.app/${donationId}.pdf`;
  }

  const response = await api.get<{url: string}>(
    `/impact/donations/${donationId}/receipt`,
  );
  return response.data?.url ?? '';
}
