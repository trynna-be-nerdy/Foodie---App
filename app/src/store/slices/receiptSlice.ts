import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  scanReceipt as scanReceiptApi,
  updateReceipt as updateReceiptApi,
  getReceiptHistory as getReceiptHistoryApi,
  getRestaurantsForReceipt as getRestaurantsApi,
  ReceiptScanResult,
  Receipt,
  RestaurantOption,
} from '../../services/receiptService';

interface ReceiptState {
  // Current scan
  currentScan: ReceiptScanResult | null;
  isScanning: boolean;
  scanError: string | null;

  // Receipt history
  receipts: Receipt[];
  receiptsPagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  isLoadingHistory: boolean;

  // Restaurant options for dropdown
  restaurantOptions: RestaurantOption[];
  isLoadingRestaurants: boolean;

  // UI state
  isUpdating: boolean;
}

const initialState: ReceiptState = {
  currentScan: null,
  isScanning: false,
  scanError: null,

  receipts: [],
  receiptsPagination: {
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false,
  },
  isLoadingHistory: false,

  restaurantOptions: [],
  isLoadingRestaurants: false,

  isUpdating: false,
};

// Async thunks
export const scanReceipt = createAsyncThunk(
  'receipt/scan',
  async (
    {
      imageUri,
      restaurantId,
      totalAmount,
    }: {
      imageUri: string;
      restaurantId?: string;
      totalAmount?: number;
    },
    {rejectWithValue},
  ) => {
    try {
      const result = await scanReceiptApi(imageUri, restaurantId, totalAmount);
      return result;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.response?.data?.message || 'Failed to scan receipt';
      return rejectWithValue(message);
    }
  },
);

export const updateReceiptWithCorrections = createAsyncThunk(
  'receipt/update',
  async (
    {
      receiptId,
      restaurantId,
      totalAmount,
    }: {
      receiptId: string;
      restaurantId: string;
      totalAmount: number;
    },
    {rejectWithValue},
  ) => {
    try {
      const result = await updateReceiptApi(receiptId, restaurantId, totalAmount);
      return result;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.response?.data?.message || 'Failed to update receipt';
      return rejectWithValue(message);
    }
  },
);

export const fetchReceiptHistory = createAsyncThunk(
  'receipt/fetchHistory',
  async ({limit = 20, offset = 0}: {limit?: number; offset?: number}, {rejectWithValue}) => {
    try {
      const result = await getReceiptHistoryApi(limit, offset);
      return {
        receipts: result.receipts,
        pagination: result.pagination,
        append: offset > 0,
      };
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch receipt history';
      return rejectWithValue(message);
    }
  },
);

export const fetchRestaurantOptions = createAsyncThunk(
  'receipt/fetchRestaurants',
  async (_, {rejectWithValue}) => {
    try {
      const result = await getRestaurantsApi();
      return result;
    } catch (error: any) {
      const message = error.response?.data?.error || 'Failed to fetch restaurants';
      return rejectWithValue(message);
    }
  },
);

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    clearCurrentScan: state => {
      state.currentScan = null;
      state.scanError = null;
    },
    clearReceiptScanError: state => {
      state.scanError = null;
    },
  },
  extraReducers: builder => {
    // Scan receipt
    builder
      .addCase(scanReceipt.pending, state => {
        state.isScanning = true;
        state.scanError = null;
        state.currentScan = null;
      })
      .addCase(scanReceipt.fulfilled, (state, action) => {
        state.isScanning = false;
        state.currentScan = action.payload;
      })
      .addCase(scanReceipt.rejected, (state, action) => {
        state.isScanning = false;
        state.scanError = action.payload as string;
      });

    // Update receipt
    builder
      .addCase(updateReceiptWithCorrections.pending, state => {
        state.isUpdating = true;
      })
      .addCase(updateReceiptWithCorrections.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.currentScan = action.payload;
      })
      .addCase(updateReceiptWithCorrections.rejected, (state, action) => {
        state.isUpdating = false;
        state.scanError = action.payload as string;
      });

    // Fetch history
    builder
      .addCase(fetchReceiptHistory.pending, state => {
        state.isLoadingHistory = true;
      })
      .addCase(fetchReceiptHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false;
        if (action.payload.append) {
          state.receipts = [...state.receipts, ...action.payload.receipts];
        } else {
          state.receipts = action.payload.receipts;
        }
        state.receiptsPagination = action.payload.pagination;
      })
      .addCase(fetchReceiptHistory.rejected, state => {
        state.isLoadingHistory = false;
      });

    // Fetch restaurants
    builder
      .addCase(fetchRestaurantOptions.pending, state => {
        state.isLoadingRestaurants = true;
      })
      .addCase(fetchRestaurantOptions.fulfilled, (state, action) => {
        state.isLoadingRestaurants = false;
        state.restaurantOptions = action.payload;
      })
      .addCase(fetchRestaurantOptions.rejected, state => {
        state.isLoadingRestaurants = false;
      });
  },
});

export const {clearCurrentScan, clearReceiptScanError} = receiptSlice.actions;
export default receiptSlice.reducer;
