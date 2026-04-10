import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type {
  CreatorProfile,
  EarningsSummary,
  PostEarnings,
  PromotionCampaign,
  Payout,
  PayoutMethodConfig,
  EnrollPostRequest,
  RequestPayoutRequest,
  PayoutMethod,
} from '../../types/monetization';
import * as monetizationService from '../../services/monetizationService';

interface MonetizationState {
  profile: CreatorProfile | null;
  summary: EarningsSummary | null;
  postEarnings: PostEarnings[];
  campaigns: PromotionCampaign[];
  payoutHistory: Payout[];
  payoutMethods: PayoutMethodConfig[];
  loading: boolean;
  payoutLoading: boolean;
  error: string | null;
}

const initialState: MonetizationState = {
  profile: null,
  summary: null,
  postEarnings: [],
  campaigns: [],
  payoutHistory: [],
  payoutMethods: [],
  loading: false,
  payoutLoading: false,
  error: null,
};

// Async thunks
export const fetchCreatorProfile = createAsyncThunk(
  'monetization/fetchProfile',
  async () => {
    return await monetizationService.getCreatorProfile();
  },
);

export const fetchEarningsSummary = createAsyncThunk(
  'monetization/fetchSummary',
  async () => {
    return await monetizationService.getEarningsSummary();
  },
);

export const fetchPostEarnings = createAsyncThunk(
  'monetization/fetchPostEarnings',
  async () => {
    return await monetizationService.getPostEarnings();
  },
);

export const fetchCampaigns = createAsyncThunk(
  'monetization/fetchCampaigns',
  async (activeOnly: boolean = false) => {
    return await monetizationService.getCampaigns(activeOnly);
  },
);

export const fetchPayoutHistory = createAsyncThunk(
  'monetization/fetchPayoutHistory',
  async () => {
    return await monetizationService.getPayoutHistory();
  },
);

export const fetchPayoutMethods = createAsyncThunk(
  'monetization/fetchPayoutMethods',
  async () => {
    return await monetizationService.getPayoutMethods();
  },
);

export const enrollInCampaign = createAsyncThunk(
  'monetization/enrollInCampaign',
  async (request: EnrollPostRequest, {rejectWithValue}) => {
    const response = await monetizationService.enrollPostInCampaign(request);
    if (!response.success) {
      return rejectWithValue(response.error ?? 'Enrollment failed');
    }
    return response;
  },
);

export const submitPayoutRequest = createAsyncThunk(
  'monetization/submitPayout',
  async (request: RequestPayoutRequest, {rejectWithValue}) => {
    const response = await monetizationService.requestPayout(request);
    if (!response.success) {
      return rejectWithValue(response.error ?? 'Payout request failed');
    }
    return response;
  },
);

export const connectMethod = createAsyncThunk(
  'monetization/connectMethod',
  async (method: PayoutMethod, {rejectWithValue}) => {
    const response = await monetizationService.connectPayoutMethod({method});
    if (!response.success) {
      return rejectWithValue(response.error ?? 'Failed to connect payout method');
    }
    return method;
  },
);

// Slice
const monetizationSlice = createSlice({
  name: 'monetization',
  initialState,
  reducers: {
    clearMonetizationError: state => {
      state.error = null;
    },
    resetMonetization: () => initialState,
  },
  extraReducers: builder => {
    builder
      // Fetch Creator Profile
      .addCase(fetchCreatorProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCreatorProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchCreatorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load profile';
      })

      // Fetch Earnings Summary
      .addCase(fetchEarningsSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })

      // Fetch Post Earnings
      .addCase(fetchPostEarnings.fulfilled, (state, action) => {
        state.postEarnings = action.payload;
      })

      // Fetch Campaigns
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.campaigns = action.payload;
      })

      // Fetch Payout History
      .addCase(fetchPayoutHistory.fulfilled, (state, action) => {
        state.payoutHistory = action.payload;
      })

      // Fetch Payout Methods
      .addCase(fetchPayoutMethods.fulfilled, (state, action) => {
        state.payoutMethods = action.payload;
      })

      // Enroll in Campaign
      .addCase(enrollInCampaign.fulfilled, (state, action) => {
        if (action.payload.enrollment) {
          const postIndex = state.postEarnings.findIndex(
            p => p.postId === action.payload.enrollment?.postId,
          );
          if (postIndex !== -1) {
            state.postEarnings[postIndex].isEnrolledInCampaign = true;
            state.postEarnings[postIndex].campaignId =
              action.payload.enrollment.campaignId;
          }
        }
      })
      .addCase(enrollInCampaign.rejected, (state, action) => {
        state.error = (action.payload as string) ?? 'Enrollment failed';
      })

      // Submit Payout
      .addCase(submitPayoutRequest.pending, state => {
        state.payoutLoading = true;
        state.error = null;
      })
      .addCase(submitPayoutRequest.fulfilled, (state, action) => {
        state.payoutLoading = false;
        if (action.payload.payout) {
          state.payoutHistory.unshift(action.payload.payout);
          if (state.profile) {
            state.profile.pendingBalance -= action.payload.payout.amount;
          }
        }
      })
      .addCase(submitPayoutRequest.rejected, (state, action) => {
        state.payoutLoading = false;
        state.error = (action.payload as string) ?? 'Payout failed';
      })

      // Connect Method
      .addCase(connectMethod.fulfilled, (state, action) => {
        const methodIndex = state.payoutMethods.findIndex(
          m => m.type === action.payload,
        );
        if (methodIndex !== -1) {
          state.payoutMethods[methodIndex].isConnected = true;
        }
        if (state.profile) {
          state.profile.payoutMethod = action.payload;
        }
      });
  },
});

export const {clearMonetizationError, resetMonetization} = monetizationSlice.actions;
export default monetizationSlice.reducer;
