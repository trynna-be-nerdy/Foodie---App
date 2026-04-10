import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import {
  WalletData,
  Wallet,
  Transaction,
  getWallet as getWalletApi,
  connectRestaurant as connectRestaurantApi,
  manualEntry as manualEntryApi,
  syncWallet as syncWalletApi,
  getTransactionHistory as getHistoryApi,
  disconnectRestaurant as disconnectApi,
  ConnectRestaurantData,
  ManualEntryData,
} from '../../services/walletService';

interface WalletState {
  totalPoints: number;
  expiringPoints: number;
  totalRestaurants: number;
  wallets: Wallet[];
  transactions: Transaction[];
  transactionsPagination: {
    total: number;
    limit: number;
    offset: number;
  };
  isLoading: boolean;
  isRefreshing: boolean;
  isSyncing: string | null; // restaurantId being synced
  error: string | null;
  lastFetchedAt: string | null;
  pendingActions: {
    id: string;
    type: 'syncRestaurant' | 'connectRestaurant' | 'manualEntry';
    payload: any;
    createdAt: string;
  }[];
}

const initialState: WalletState = {
  totalPoints: 0,
  expiringPoints: 0,
  totalRestaurants: 0,
  wallets: [],
  transactions: [],
  transactionsPagination: {
    total: 0,
    limit: 50,
    offset: 0,
  },
  isLoading: false,
  isRefreshing: false,
  isSyncing: null,
  error: null,
  lastFetchedAt: null,
  pendingActions: [],
};

// Async thunks
export const fetchWallet = createAsyncThunk('wallet/fetchWallet', async (_, {rejectWithValue}) => {
  try {
    const data = await getWalletApi();
    return data;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch wallet');
  }
});

export const refreshWallet = createAsyncThunk(
  'wallet/refreshWallet',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getWalletApi();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to refresh wallet');
    }
  },
);

export const connectRestaurant = createAsyncThunk(
  'wallet/connectRestaurant',
  async (data: ConnectRestaurantData, {rejectWithValue}) => {
    try {
      const wallet = await connectRestaurantApi(data);
      return wallet;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Failed to connect restaurant',
      );
    }
  },
);

export const addManualEntry = createAsyncThunk(
  'wallet/addManualEntry',
  async (data: ManualEntryData, {rejectWithValue}) => {
    try {
      const wallet = await manualEntryApi(data);
      return wallet;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add points');
    }
  },
);

export const syncRestaurantWallet = createAsyncThunk(
  'wallet/syncRestaurant',
  async (restaurantId: string, {rejectWithValue}) => {
    try {
      const wallet = await syncWalletApi(restaurantId);
      return wallet;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to sync');
    }
  },
);

export const fetchTransactionHistory = createAsyncThunk(
  'wallet/fetchHistory',
  async (
    params: {restaurantId?: string; type?: string; limit?: number; offset?: number} | undefined,
    {rejectWithValue},
  ) => {
    try {
      const data = await getHistoryApi(params);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch history');
    }
  },
);

export const disconnectRestaurant = createAsyncThunk(
  'wallet/disconnectRestaurant',
  async (restaurantId: string, {rejectWithValue}) => {
    try {
      await disconnectApi(restaurantId);
      return restaurantId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to disconnect');
    }
  },
);

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    clearWalletError: state => {
      state.error = null;
    },
    clearWallet: () => initialState,
    queueWalletAction: (
      state,
      action: PayloadAction<{
        id: string;
        type: 'syncRestaurant' | 'connectRestaurant' | 'manualEntry';
        payload: any;
        createdAt: string;
      }>,
    ) => {
      state.pendingActions.push(action.payload);
    },
    removeQueuedWalletAction: (state, action: PayloadAction<string>) => {
      state.pendingActions = state.pendingActions.filter(item => item.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      // Fetch wallet
      .addCase(fetchWallet.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWallet.fulfilled, (state, action: PayloadAction<WalletData>) => {
        state.isLoading = false;
        state.totalPoints = action.payload.totalPoints;
        state.expiringPoints = action.payload.expiringPoints;
        state.totalRestaurants = action.payload.totalRestaurants;
        state.wallets = action.payload.wallets;
        state.lastFetchedAt = new Date().toISOString();
      })
      .addCase(fetchWallet.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Refresh wallet (pull-to-refresh)
      .addCase(refreshWallet.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshWallet.fulfilled, (state, action: PayloadAction<WalletData>) => {
        state.isRefreshing = false;
        state.totalPoints = action.payload.totalPoints;
        state.expiringPoints = action.payload.expiringPoints;
        state.totalRestaurants = action.payload.totalRestaurants;
        state.wallets = action.payload.wallets;
        state.lastFetchedAt = new Date().toISOString();
      })
      .addCase(refreshWallet.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error = action.payload as string;
      })
      // Connect restaurant
      .addCase(connectRestaurant.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(connectRestaurant.fulfilled, (state, action: PayloadAction<Wallet>) => {
        state.isLoading = false;
        state.wallets.unshift(action.payload);
        state.totalRestaurants += 1;
        state.totalPoints += action.payload.balance;
      })
      .addCase(connectRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Manual entry
      .addCase(addManualEntry.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addManualEntry.fulfilled, (state, action: PayloadAction<Wallet>) => {
        state.isLoading = false;
        const index = state.wallets.findIndex(w => w.restaurantId === action.payload.restaurantId);
        if (index >= 0) {
          const oldBalance = state.wallets[index].balance;
          state.wallets[index] = action.payload;
          state.totalPoints += action.payload.balance - oldBalance;
        } else {
          state.wallets.unshift(action.payload);
          state.totalRestaurants += 1;
          state.totalPoints += action.payload.balance;
        }
      })
      .addCase(addManualEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Sync restaurant
      .addCase(syncRestaurantWallet.pending, (state, action) => {
        state.isSyncing = action.meta.arg;
        state.error = null;
      })
      .addCase(syncRestaurantWallet.fulfilled, (state, action: PayloadAction<Wallet>) => {
        state.isSyncing = null;
        const index = state.wallets.findIndex(w => w.id === action.payload.id);
        if (index >= 0) {
          const oldBalance = state.wallets[index].balance;
          state.wallets[index] = action.payload;
          state.totalPoints += action.payload.balance - oldBalance;
        }
      })
      .addCase(syncRestaurantWallet.rejected, (state, action) => {
        state.isSyncing = null;
        state.error = action.payload as string;
      })
      // Fetch history
      .addCase(fetchTransactionHistory.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactionHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.transactionsPagination = action.payload.pagination;
      })
      .addCase(fetchTransactionHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Disconnect restaurant
      .addCase(disconnectRestaurant.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(disconnectRestaurant.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        const wallet = state.wallets.find(w => w.restaurantId === action.payload);
        if (wallet) {
          state.totalPoints -= wallet.balance;
          state.totalRestaurants -= 1;
        }
        state.wallets = state.wallets.filter(w => w.restaurantId !== action.payload);
      })
      .addCase(disconnectRestaurant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {clearWalletError, clearWallet, queueWalletAction, removeQueuedWalletAction} =
  walletSlice.actions;

export default walletSlice.reducer;
