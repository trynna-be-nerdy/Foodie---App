/**
 * Monetization Service
 * Handles creator earnings, campaigns, and payouts
 */

import {USE_MOCKS} from '../config';
import {api} from './api';
import type {
  CreatorProfile,
  PostEarnings,
  PromotionCampaign,
  Payout,
  EarningsSummary,
  PayoutMethodConfig,
  EnrollPostRequest,
  EnrollPostResponse,
  RequestPayoutRequest,
  RequestPayoutResponse,
  ConnectPayoutMethodRequest,
  ConnectPayoutMethodResponse,
  VerificationRequirements,
} from '../types/monetization';
import {checkVerificationEligibility} from '../types/monetization';
import {
  getMockCreatorProfile,
  getMockPostEarnings,
  getMockCampaigns,
  getMockPayoutHistory,
  getMockEarningsSummary,
  getMockPayoutMethods,
  processMockEnrollment,
  processMockPayout,
  connectMockPayoutMethod,
} from '../mocks/monetizationMocks';

// Simulate network delay for mock data
const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get creator profile with earnings info
 */
export async function getCreatorProfile(): Promise<CreatorProfile> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockCreatorProfile();
  }

  const response = await api.get<CreatorProfile>('/monetization/profile');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load creator profile');
  }
  return response.data;
}

/**
 * Get earnings summary
 */
export async function getEarningsSummary(): Promise<EarningsSummary> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockEarningsSummary();
  }

  const response = await api.get<EarningsSummary>('/monetization/earnings');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to load earnings summary');
  }
  return response.data;
}

/**
 * Get post earnings breakdown
 */
export async function getPostEarnings(): Promise<PostEarnings[]> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockPostEarnings();
  }

  const response = await api.get<{posts: PostEarnings[]}>('/monetization/posts');
  return response.data?.posts ?? [];
}

/**
 * Get available promotion campaigns
 */
export async function getCampaigns(activeOnly: boolean = false): Promise<PromotionCampaign[]> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockCampaigns(activeOnly);
  }

  const response = await api.get<{campaigns: PromotionCampaign[]}>(
    '/monetization/campaigns',
    {params: {activeOnly}},
  );
  return response.data?.campaigns ?? [];
}

/**
 * Get campaign by ID
 */
export async function getCampaignById(campaignId: string): Promise<PromotionCampaign | null> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    const campaigns = getMockCampaigns();
    return campaigns.find(c => c.id === campaignId) ?? null;
  }

  try {
    const response = await api.get<PromotionCampaign>(`/monetization/campaigns/${campaignId}`);
    return response.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Enroll a post in a campaign
 */
export async function enrollPostInCampaign(
  request: EnrollPostRequest,
): Promise<EnrollPostResponse> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    return processMockEnrollment(request);
  }

  const response = await api.post<EnrollPostResponse>('/monetization/enroll', request);
  return response.data ?? {success: false, error: 'Unknown error'};
}

/**
 * Get payout history
 */
export async function getPayoutHistory(): Promise<Payout[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockPayoutHistory();
  }

  const response = await api.get<{payouts: Payout[]}>('/monetization/payouts');
  return response.data?.payouts ?? [];
}

/**
 * Request a payout
 */
export async function requestPayout(
  request: RequestPayoutRequest,
): Promise<RequestPayoutResponse> {
  if (USE_MOCKS) {
    await simulateDelay(1000);
    return processMockPayout(request);
  }

  const response = await api.post<RequestPayoutResponse>('/monetization/payout', request);
  return response.data ?? {success: false, error: 'Unknown error'};
}

/**
 * Get configured payout methods
 */
export async function getPayoutMethods(): Promise<PayoutMethodConfig[]> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    return getMockPayoutMethods();
  }

  const response = await api.get<{methods: PayoutMethodConfig[]}>('/monetization/payout-methods');
  return response.data?.methods ?? [];
}

/**
 * Connect a payout method (Stripe Connect flow)
 */
export async function connectPayoutMethod(
  request: ConnectPayoutMethodRequest,
): Promise<ConnectPayoutMethodResponse> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    const success = connectMockPayoutMethod(request.method);
    if (success) {
      return {success: true};
    }
    return {success: false, error: 'Failed to connect payout method'};
  }

  const response = await api.post<ConnectPayoutMethodResponse>(
    '/monetization/payout-methods/connect',
    request,
  );
  return response.data ?? {success: false, error: 'Unknown error'};
}

/**
 * Disconnect a payout method
 */
export async function disconnectPayoutMethod(method: PayoutMethodConfig['type']): Promise<boolean> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return true;
  }

  const response = await api.delete(`/monetization/payout-methods/${method}`);
  return response.success;
}

/**
 * Check verification eligibility
 */
export async function getVerificationStatus(): Promise<VerificationRequirements> {
  if (USE_MOCKS) {
    await simulateDelay(200);
    const profile = getMockCreatorProfile();
    return checkVerificationEligibility(profile);
  }

  const response = await api.get<VerificationRequirements>('/monetization/verification');
  if (!response.success || !response.data) {
    throw new Error(response.error?.message ?? 'Failed to check verification status');
  }
  return response.data;
}

/**
 * Apply for verified creator status
 */
export async function applyForVerification(): Promise<{success: boolean; error?: string}> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    const profile = getMockCreatorProfile();
    const eligibility = checkVerificationEligibility(profile);

    if (!eligibility.isEligible) {
      return {
        success: false,
        error: `Not eligible: ${eligibility.missingRequirements.join(', ')}`,
      };
    }

    return {success: true};
  }

  const response = await api.post<{success: boolean; error?: string}>(
    '/monetization/verification/apply',
  );
  return response.data ?? {success: false, error: 'Unknown error'};
}

/**
 * Get earnings for a specific date range
 */
export async function getEarningsByDateRange(
  startDate: string,
  endDate: string,
): Promise<{total: number; breakdown: {date: string; amount: number}[]}> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    // Generate mock daily earnings
    const start = new Date(startDate);
    const end = new Date(endDate);
    const breakdown: {date: string; amount: number}[] = [];
    let total = 0;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const amount = Math.random() * 3; // Random $0-3 per day
      breakdown.push({
        date: new Date(d).toISOString().split('T')[0],
        amount: Number(amount.toFixed(2)),
      });
      total += amount;
    }

    return {total: Number(total.toFixed(2)), breakdown};
  }

  const response = await api.get<{total: number; breakdown: {date: string; amount: number}[]}>(
    '/monetization/earnings/range',
    {params: {startDate, endDate}},
  );
  return response.data ?? {total: 0, breakdown: []};
}
