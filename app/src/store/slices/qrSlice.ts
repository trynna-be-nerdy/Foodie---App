import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  scanQRCode as scanQRCodeApi,
  getScanStatus as getScanStatusApi,
  getQRScanHistory as getQRScanHistoryApi,
  QRCodePayload,
  QRScanResult,
  ScanStatus,
  QRScanHistoryItem,
} from '../../services/qrService';

interface QRState {
  // Current scan
  lastScanResult: QRScanResult | null;
  isScanning: boolean;
  scanError: string | null;

  // Scan status
  scanStatus: ScanStatus | null;
  isLoadingStatus: boolean;

  // Scan history
  scanHistory: QRScanHistoryItem[];
  historyPagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
  isLoadingHistory: boolean;
}

const initialState: QRState = {
  lastScanResult: null,
  isScanning: false,
  scanError: null,

  scanStatus: null,
  isLoadingStatus: false,

  scanHistory: [],
  historyPagination: {
    total: 0,
    limit: 20,
    offset: 0,
    hasMore: false,
  },
  isLoadingHistory: false,
};

// Async thunks
export const scanQRCode = createAsyncThunk(
  'qr/scan',
  async (payload: QRCodePayload, {rejectWithValue}) => {
    const result = await scanQRCodeApi(payload);
    if (!result.success) {
      return rejectWithValue(result.error || 'Scan failed');
    }
    return result;
  },
);

export const fetchScanStatus = createAsyncThunk('qr/fetchStatus', async (_, {rejectWithValue}) => {
  try {
    const result = await getScanStatusApi();
    return result;
  } catch (error: any) {
    return rejectWithValue(error.message || 'Failed to fetch status');
  }
});

export const fetchQRScanHistory = createAsyncThunk(
  'qr/fetchHistory',
  async ({limit = 20, offset = 0}: {limit?: number; offset?: number}, {rejectWithValue}) => {
    try {
      const result = await getQRScanHistoryApi(limit, offset);
      return {
        scans: result.scans,
        pagination: result.pagination,
        append: offset > 0,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch history');
    }
  },
);

const qrSlice = createSlice({
  name: 'qr',
  initialState,
  reducers: {
    clearScanResult: state => {
      state.lastScanResult = null;
      state.scanError = null;
    },
    clearScanError: state => {
      state.scanError = null;
    },
  },
  extraReducers: builder => {
    // Scan QR code
    builder
      .addCase(scanQRCode.pending, state => {
        state.isScanning = true;
        state.scanError = null;
        state.lastScanResult = null;
      })
      .addCase(scanQRCode.fulfilled, (state, action) => {
        state.isScanning = false;
        state.lastScanResult = action.payload;
        // Decrement remaining scans
        if (state.scanStatus) {
          state.scanStatus.remaining = Math.max(0, state.scanStatus.remaining - 1);
          state.scanStatus.todayScans += 1;
          state.scanStatus.canScan = state.scanStatus.remaining > 0;
        }
      })
      .addCase(scanQRCode.rejected, (state, action) => {
        state.isScanning = false;
        state.scanError = action.payload as string;
      });

    // Fetch status
    builder
      .addCase(fetchScanStatus.pending, state => {
        state.isLoadingStatus = true;
      })
      .addCase(fetchScanStatus.fulfilled, (state, action) => {
        state.isLoadingStatus = false;
        state.scanStatus = action.payload;
      })
      .addCase(fetchScanStatus.rejected, state => {
        state.isLoadingStatus = false;
      });

    // Fetch history
    builder
      .addCase(fetchQRScanHistory.pending, state => {
        state.isLoadingHistory = true;
      })
      .addCase(fetchQRScanHistory.fulfilled, (state, action) => {
        state.isLoadingHistory = false;
        if (action.payload.append) {
          state.scanHistory = [...state.scanHistory, ...action.payload.scans];
        } else {
          state.scanHistory = action.payload.scans;
        }
        state.historyPagination = action.payload.pagination;
      })
      .addCase(fetchQRScanHistory.rejected, state => {
        state.isLoadingHistory = false;
      });
  },
});

export const {clearScanResult, clearScanError} = qrSlice.actions;
export default qrSlice.reducer;
