import {api} from './api';
import {USE_MOCKS} from '../config';
import {
  getMockWalletData,
  getMockRestaurants,
  getMockLoyaltyRestaurants,
  getMockTransactionHistory,
  mockConnectRestaurant,
  mockManualEntry,
  mockSyncWallet,
  mockDisconnectRestaurant,
} from '../mocks/walletMocks';

// Simulate network delay for mock data
const simulateDelay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Types
export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string | null;
  cuisineTypes: string[];
  pointsPerDollar: number;
  loyaltyProgramEnabled: boolean;
}

export interface Wallet {
  id: string;
  restaurantId: string;
  restaurant: Restaurant;
  balance: number;
  expirationDate: string | null;
  lastSyncedAt: string | null;
  isConnected: boolean;
  accountNumber: string | null;
  dollarValue: string;
}

export interface WalletData {
  totalPoints: number;
  expiringPoints: number;
  totalRestaurants: number;
  wallets: Wallet[];
}

export interface Transaction {
  id: string;
  userId: string;
  restaurantId: string;
  amount: number;
  type: 'EARN' | 'REDEEM' | 'EXPIRE' | 'GIFT_SENT' | 'GIFT_RECEIVED' | 'BONUS' | 'ADJUSTMENT';
  source: string;
  orderId: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  restaurant: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
}

export interface TransactionHistoryData {
  transactions: Transaction[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface RestaurantSearchResult {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  cuisineTypes: string[];
  priceRange: number;
  rating: number;
  loyaltyProgramEnabled: boolean;
  pointsPerDollar: number;
}

export interface ConnectRestaurantData {
  restaurantId: string;
  accountNumber?: string;
  initialBalance?: number;
}

export interface ManualEntryData {
  restaurantId: string;
  balance: number;
  accountNumber?: string;
}

// API calls
export async function getWallet(): Promise<WalletData> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    return getMockWalletData();
  }

  const response = await api.get<WalletData>('/wallet');

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.error?.message || 'Failed to fetch wallet');
}

export async function connectRestaurant(data: ConnectRestaurantData): Promise<Wallet> {
  if (USE_MOCKS) {
    await simulateDelay(600);
    return mockConnectRestaurant(data);
  }

  const response = await api.post<{wallet: Wallet}>('/wallet/connect', data);

  if (response.success && response.data) {
    return response.data.wallet;
  }

  throw new Error(response.error?.message || 'Failed to connect restaurant');
}

export async function manualEntry(data: ManualEntryData): Promise<Wallet> {
  if (USE_MOCKS) {
    await simulateDelay(500);
    return mockManualEntry(data);
  }

  const response = await api.post<{wallet: Wallet}>('/wallet/manual-entry', data);

  if (response.success && response.data) {
    return response.data.wallet;
  }

  throw new Error(response.error?.message || 'Failed to add points');
}

export async function syncWallet(restaurantId: string): Promise<Wallet> {
  if (USE_MOCKS) {
    await simulateDelay(800);
    return mockSyncWallet(restaurantId);
  }

  const response = await api.post<{wallet: Wallet; message: string}>(
    `/wallet/sync/${restaurantId}`,
  );

  if (response.success && response.data) {
    return response.data.wallet;
  }

  throw new Error(response.error?.message || 'Failed to sync wallet');
}

export async function getTransactionHistory(params?: {
  restaurantId?: string;
  type?: string;
  limit?: number;
  offset?: number;
}): Promise<TransactionHistoryData> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockTransactionHistory(params);
  }

  const queryParams = new URLSearchParams();
  if (params?.restaurantId) {
    queryParams.append('restaurantId', params.restaurantId);
  }
  if (params?.type) {
    queryParams.append('type', params.type);
  }
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  if (params?.offset) {
    queryParams.append('offset', params.offset.toString());
  }

  const query = queryParams.toString();
  const endpoint = query ? `/wallet/history?${query}` : '/wallet/history';

  const response = await api.get<TransactionHistoryData>(endpoint);

  if (response.success && response.data) {
    return response.data;
  }

  throw new Error(response.error?.message || 'Failed to fetch history');
}

export async function disconnectRestaurant(restaurantId: string): Promise<void> {
  if (USE_MOCKS) {
    await simulateDelay(400);
    mockDisconnectRestaurant(restaurantId);
    return;
  }

  const response = await api.delete(`/wallet/disconnect/${restaurantId}`);

  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to disconnect restaurant');
  }
}

// Restaurant search
export async function searchRestaurants(query?: string): Promise<RestaurantSearchResult[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockRestaurants(query);
  }

  const params = query ? `?query=${encodeURIComponent(query)}` : '';
  const response = await api.get<{
    restaurants: RestaurantSearchResult[];
    pagination: {total: number};
  }>(`/restaurants${params}`);

  if (response.success && response.data) {
    return response.data.restaurants;
  }

  throw new Error(response.error?.message || 'Failed to search restaurants');
}

export async function getLoyaltyRestaurants(): Promise<RestaurantSearchResult[]> {
  if (USE_MOCKS) {
    await simulateDelay(300);
    return getMockLoyaltyRestaurants();
  }

  const response = await api.get<{
    restaurants: RestaurantSearchResult[];
    pagination: {total: number};
  }>('/restaurants/loyalty');

  if (response.success && response.data) {
    return response.data.restaurants;
  }

  throw new Error(response.error?.message || 'Failed to fetch restaurants');
}
