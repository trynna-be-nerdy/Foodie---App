/**
 * Mock data for Wallet functionality
 */

import type {
  Wallet,
  WalletData,
  Transaction,
  TransactionHistoryData,
  RestaurantSearchResult,
} from '../services/walletService';

// Mock restaurants
const mockRestaurants: RestaurantSearchResult[] = [
  {
    id: 'rest-1',
    name: 'Chipotle Mexican Grill',
    description: 'Fresh Mexican-inspired food',
    imageUrl: 'https://picsum.photos/seed/chipotle/200',
    cuisineTypes: ['Mexican', 'Fast Casual'],
    priceRange: 2,
    rating: 4.5,
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
  },
  {
    id: 'rest-2',
    name: 'Starbucks',
    description: 'Premium coffee and beverages',
    imageUrl: 'https://picsum.photos/seed/starbucks/200',
    cuisineTypes: ['Coffee', 'Cafe'],
    priceRange: 2,
    rating: 4.3,
    loyaltyProgramEnabled: true,
    pointsPerDollar: 2,
  },
  {
    id: 'rest-3',
    name: 'Sweetgreen',
    description: 'Healthy salads and bowls',
    imageUrl: 'https://picsum.photos/seed/sweetgreen/200',
    cuisineTypes: ['Salads', 'Healthy'],
    priceRange: 2,
    rating: 4.6,
    loyaltyProgramEnabled: true,
    pointsPerDollar: 8,
  },
  {
    id: 'rest-4',
    name: 'Panera Bread',
    description: 'Fresh bakery and soups',
    imageUrl: 'https://picsum.photos/seed/panera/200',
    cuisineTypes: ['Bakery', 'American'],
    priceRange: 2,
    rating: 4.2,
    loyaltyProgramEnabled: true,
    pointsPerDollar: 5,
  },
  {
    id: 'rest-5',
    name: 'Shake Shack',
    description: 'Premium burgers and shakes',
    imageUrl: 'https://picsum.photos/seed/shakeshack/200',
    cuisineTypes: ['Burgers', 'American'],
    priceRange: 2,
    rating: 4.4,
    loyaltyProgramEnabled: true,
    pointsPerDollar: 10,
  },
];

// Mock wallets
const mockWallets: Wallet[] = [
  {
    id: 'wallet-1',
    restaurantId: 'rest-1',
    restaurant: {
      id: 'rest-1',
      name: 'Chipotle Mexican Grill',
      imageUrl: 'https://picsum.photos/seed/chipotle/200',
      cuisineTypes: ['Mexican', 'Fast Casual'],
      pointsPerDollar: 10,
      loyaltyProgramEnabled: true,
    },
    balance: 2450,
    expirationDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    lastSyncedAt: new Date().toISOString(),
    isConnected: true,
    accountNumber: '****1234',
    dollarValue: '$24.50',
  },
  {
    id: 'wallet-2',
    restaurantId: 'rest-2',
    restaurant: {
      id: 'rest-2',
      name: 'Starbucks',
      imageUrl: 'https://picsum.photos/seed/starbucks/200',
      cuisineTypes: ['Coffee', 'Cafe'],
      pointsPerDollar: 2,
      loyaltyProgramEnabled: true,
    },
    balance: 850,
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
    lastSyncedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    isConnected: true,
    accountNumber: '****5678',
    dollarValue: '$8.50',
  },
  {
    id: 'wallet-3',
    restaurantId: 'rest-3',
    restaurant: {
      id: 'rest-3',
      name: 'Sweetgreen',
      imageUrl: 'https://picsum.photos/seed/sweetgreen/200',
      cuisineTypes: ['Salads', 'Healthy'],
      pointsPerDollar: 8,
      loyaltyProgramEnabled: true,
    },
    balance: 1200,
    expirationDate: null,
    lastSyncedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    isConnected: true,
    accountNumber: null,
    dollarValue: '$12.00',
  },
];

// Mock transactions
const mockTransactions: Transaction[] = [
  {
    id: 'txn-1',
    userId: 'user-1',
    restaurantId: 'rest-1',
    amount: 150,
    type: 'EARN',
    source: 'Order #12345',
    orderId: 'order-12345',
    metadata: null,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: {
      id: 'rest-1',
      name: 'Chipotle Mexican Grill',
      imageUrl: 'https://picsum.photos/seed/chipotle/200',
    },
  },
  {
    id: 'txn-2',
    userId: 'user-1',
    restaurantId: 'rest-2',
    amount: -50,
    type: 'REDEEM',
    source: 'Redeemed for $5 off',
    orderId: 'order-12346',
    metadata: null,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: {
      id: 'rest-2',
      name: 'Starbucks',
      imageUrl: 'https://picsum.photos/seed/starbucks/200',
    },
  },
  {
    id: 'txn-3',
    userId: 'user-1',
    restaurantId: 'rest-1',
    amount: 200,
    type: 'BONUS',
    source: 'Welcome bonus',
    orderId: null,
    metadata: null,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: {
      id: 'rest-1',
      name: 'Chipotle Mexican Grill',
      imageUrl: 'https://picsum.photos/seed/chipotle/200',
    },
  },
  {
    id: 'txn-4',
    userId: 'user-1',
    restaurantId: 'rest-3',
    amount: 100,
    type: 'EARN',
    source: 'Order #12347',
    orderId: 'order-12347',
    metadata: null,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: {
      id: 'rest-3',
      name: 'Sweetgreen',
      imageUrl: 'https://picsum.photos/seed/sweetgreen/200',
    },
  },
  {
    id: 'txn-5',
    userId: 'user-1',
    restaurantId: 'rest-2',
    amount: 80,
    type: 'EARN',
    source: 'Order #12348',
    orderId: 'order-12348',
    metadata: null,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    restaurant: {
      id: 'rest-2',
      name: 'Starbucks',
      imageUrl: 'https://picsum.photos/seed/starbucks/200',
    },
  },
];

/**
 * Get mock wallet data
 */
export function getMockWalletData(): WalletData {
  const totalPoints = mockWallets.reduce((sum, w) => sum + w.balance, 0);
  const expiringPoints = mockWallets
    .filter(w => {
      if (!w.expirationDate) return false;
      const expDate = new Date(w.expirationDate);
      const sevenDaysFromNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      return expDate < sevenDaysFromNow;
    })
    .reduce((sum, w) => sum + w.balance, 0);

  return {
    totalPoints,
    expiringPoints,
    totalRestaurants: mockWallets.length,
    wallets: mockWallets,
  };
}

/**
 * Get mock wallet list
 */
export function getMockWallets(): Wallet[] {
  return mockWallets;
}

/**
 * Get mock restaurants for search
 */
export function getMockRestaurants(query?: string): RestaurantSearchResult[] {
  if (!query) return mockRestaurants;
  const lowerQuery = query.toLowerCase();
  return mockRestaurants.filter(
    r =>
      r.name.toLowerCase().includes(lowerQuery) ||
      r.cuisineTypes.some(c => c.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get mock loyalty restaurants
 */
export function getMockLoyaltyRestaurants(): RestaurantSearchResult[] {
  return mockRestaurants.filter(r => r.loyaltyProgramEnabled);
}

/**
 * Get mock transaction history
 */
export function getMockTransactionHistory(params?: {
  restaurantId?: string;
  type?: string;
  limit?: number;
  offset?: number;
}): TransactionHistoryData {
  let filtered = [...mockTransactions];

  if (params?.restaurantId) {
    filtered = filtered.filter(t => t.restaurantId === params.restaurantId);
  }

  if (params?.type) {
    filtered = filtered.filter(t => t.type === params.type);
  }

  const offset = params?.offset ?? 0;
  const limit = params?.limit ?? 20;
  const paged = filtered.slice(offset, offset + limit);

  return {
    transactions: paged,
    pagination: {
      total: filtered.length,
      limit,
      offset,
    },
  };
}

/**
 * Mock connect restaurant
 */
export function mockConnectRestaurant(data: {
  restaurantId: string;
  accountNumber?: string;
  initialBalance?: number;
}): Wallet {
  const restaurant = mockRestaurants.find(r => r.id === data.restaurantId);
  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  const newWallet: Wallet = {
    id: `wallet-${Date.now()}`,
    restaurantId: data.restaurantId,
    restaurant: {
      id: restaurant.id,
      name: restaurant.name,
      imageUrl: restaurant.imageUrl,
      cuisineTypes: restaurant.cuisineTypes,
      pointsPerDollar: restaurant.pointsPerDollar,
      loyaltyProgramEnabled: restaurant.loyaltyProgramEnabled,
    },
    balance: data.initialBalance ?? 0,
    expirationDate: null,
    lastSyncedAt: new Date().toISOString(),
    isConnected: true,
    accountNumber: data.accountNumber ? `****${data.accountNumber.slice(-4)}` : null,
    dollarValue: `$${((data.initialBalance ?? 0) / 100).toFixed(2)}`,
  };

  mockWallets.push(newWallet);
  return newWallet;
}

/**
 * Mock manual entry
 */
export function mockManualEntry(data: {
  restaurantId: string;
  balance: number;
  accountNumber?: string;
}): Wallet {
  // Check if wallet already exists
  const existingWallet = mockWallets.find(w => w.restaurantId === data.restaurantId);
  if (existingWallet) {
    existingWallet.balance += data.balance;
    existingWallet.lastSyncedAt = new Date().toISOString();
    existingWallet.dollarValue = `$${(existingWallet.balance / 100).toFixed(2)}`;
    return existingWallet;
  }

  // Create new wallet
  return mockConnectRestaurant({
    restaurantId: data.restaurantId,
    accountNumber: data.accountNumber,
    initialBalance: data.balance,
  });
}

/**
 * Mock sync wallet
 */
export function mockSyncWallet(restaurantId: string): Wallet {
  const wallet = mockWallets.find(w => w.restaurantId === restaurantId);
  if (!wallet) {
    throw new Error('Wallet not found');
  }

  // Simulate getting updated balance (random small increase)
  const bonus = Math.floor(Math.random() * 50);
  wallet.balance += bonus;
  wallet.lastSyncedAt = new Date().toISOString();
  wallet.dollarValue = `$${(wallet.balance / 100).toFixed(2)}`;

  return wallet;
}

/**
 * Mock disconnect restaurant
 */
export function mockDisconnectRestaurant(restaurantId: string): void {
  const index = mockWallets.findIndex(w => w.restaurantId === restaurantId);
  if (index !== -1) {
    mockWallets.splice(index, 1);
  }
}
