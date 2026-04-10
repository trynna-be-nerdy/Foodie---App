import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import type {
  Charity,
  CommunityStats,
  Donation,
  DonationRequest,
  FoodDrive,
  ImpactStats,
  LeaderboardEntry,
  MatchingCampaign,
} from '../../types/impact';
import * as impactService from '../../services/impactService';

interface ImpactState {
  // Data
  stats: ImpactStats | null;
  communityStats: CommunityStats | null;
  charities: Charity[];
  donations: Donation[];
  leaderboard: LeaderboardEntry[];
  foodDrives: FoodDrive[];
  matchingCampaign: MatchingCampaign | null;

  // UI State
  loading: boolean;
  donationLoading: boolean;
  error: string | null;
  leaderboardScope: 'local' | 'national' | 'friends';
}

const initialState: ImpactState = {
  stats: null,
  communityStats: null,
  charities: [],
  donations: [],
  leaderboard: [],
  foodDrives: [],
  matchingCampaign: null,
  loading: false,
  donationLoading: false,
  error: null,
  leaderboardScope: 'national',
};

// Async thunks
export const fetchImpactStats = createAsyncThunk(
  'impact/fetchStats',
  async () => {
    return await impactService.getImpactStats();
  },
);

export const fetchCommunityStats = createAsyncThunk(
  'impact/fetchCommunityStats',
  async () => {
    return await impactService.getCommunityStats();
  },
);

export const fetchCharities = createAsyncThunk(
  'impact/fetchCharities',
  async () => {
    return await impactService.getCharities();
  },
);

export const fetchDonationHistory = createAsyncThunk(
  'impact/fetchDonationHistory',
  async () => {
    return await impactService.getDonationHistory();
  },
);

export const fetchLeaderboard = createAsyncThunk(
  'impact/fetchLeaderboard',
  async (scope: 'local' | 'national' | 'friends') => {
    return await impactService.getLeaderboard(scope);
  },
);

export const fetchFoodDrives = createAsyncThunk(
  'impact/fetchFoodDrives',
  async () => {
    return await impactService.getFoodDrives();
  },
);

export const fetchMatchingCampaign = createAsyncThunk(
  'impact/fetchMatchingCampaign',
  async () => {
    return await impactService.getMatchingCampaign();
  },
);

export const makeDonation = createAsyncThunk(
  'impact/makeDonation',
  async (request: DonationRequest, {rejectWithValue}) => {
    const response = await impactService.makeDonation(request);
    if (!response.success) {
      return rejectWithValue(response.error ?? 'Donation failed');
    }
    return response;
  },
);

export const participateInFoodDrive = createAsyncThunk(
  'impact/participateInFoodDrive',
  async (driveId: string, {rejectWithValue}) => {
    const response = await impactService.participateInFoodDrive(driveId);
    if (!response.success) {
      return rejectWithValue('Failed to join food drive');
    }
    return driveId;
  },
);

// Slice
const impactSlice = createSlice({
  name: 'impact',
  initialState,
  reducers: {
    setLeaderboardScope: (
      state,
      action: PayloadAction<'local' | 'national' | 'friends'>,
    ) => {
      state.leaderboardScope = action.payload;
    },
    clearImpactError: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Impact Stats
      .addCase(fetchImpactStats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImpactStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchImpactStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load impact stats';
      })

      // Fetch Community Stats
      .addCase(fetchCommunityStats.fulfilled, (state, action) => {
        state.communityStats = action.payload;
      })

      // Fetch Charities
      .addCase(fetchCharities.fulfilled, (state, action) => {
        state.charities = action.payload;
      })

      // Fetch Donation History
      .addCase(fetchDonationHistory.fulfilled, (state, action) => {
        state.donations = action.payload;
      })

      // Fetch Leaderboard
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
      })

      // Fetch Food Drives
      .addCase(fetchFoodDrives.fulfilled, (state, action) => {
        state.foodDrives = action.payload;
      })

      // Fetch Matching Campaign
      .addCase(fetchMatchingCampaign.fulfilled, (state, action) => {
        state.matchingCampaign = action.payload;
      })

      // Make Donation
      .addCase(makeDonation.pending, state => {
        state.donationLoading = true;
        state.error = null;
      })
      .addCase(makeDonation.fulfilled, (state, action) => {
        state.donationLoading = false;
        if (action.payload.donation) {
          state.donations.unshift(action.payload.donation);
        }
      })
      .addCase(makeDonation.rejected, (state, action) => {
        state.donationLoading = false;
        state.error = (action.payload as string) ?? 'Donation failed';
      })

      // Participate in Food Drive
      .addCase(participateInFoodDrive.fulfilled, (state, action) => {
        const driveIndex = state.foodDrives.findIndex(
          d => d.id === action.payload,
        );
        if (driveIndex !== -1) {
          state.foodDrives[driveIndex].isUserParticipating = true;
          state.foodDrives[driveIndex].participantCount += 1;
        }
        if (state.stats) {
          state.stats.foodDrivesParticipated += 1;
        }
      });
  },
});

export const {setLeaderboardScope, clearImpactError} = impactSlice.actions;
export default impactSlice.reducer;
