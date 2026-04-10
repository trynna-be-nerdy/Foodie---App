import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {FeedFilters, FeedRestaurant} from '../../types/feed';

const defaultFilters: FeedFilters = {
  cuisineTypes: [],
  priceRange: {min: 1, max: 4},
  distanceMiles: 10,
  dietaryRestrictions: [],
};

interface FeedState {
  items: FeedRestaurant[];
  page: number;
  hasMore: boolean;
  lastFetchedAt: number | null;
  lastFiltersHash: string;
  filters: FeedFilters;
  dismissedIds: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  items: [],
  page: 1,
  hasMore: true,
  lastFetchedAt: null,
  lastFiltersHash: JSON.stringify(defaultFilters),
  filters: defaultFilters,
  dismissedIds: [],
  isLoading: false,
  error: null,
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setFeedLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setFeedError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setFeedData(
      state,
      action: PayloadAction<{
        items: FeedRestaurant[];
        page: number;
        hasMore: boolean;
        fetchedAt: number;
      }>,
    ) {
      state.items = action.payload.items;
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.lastFetchedAt = action.payload.fetchedAt;
    },
    appendFeedData(
      state,
      action: PayloadAction<{
        items: FeedRestaurant[];
        page: number;
        hasMore: boolean;
        fetchedAt: number;
      }>,
    ) {
      state.items = [...state.items, ...action.payload.items];
      state.page = action.payload.page;
      state.hasMore = action.payload.hasMore;
      state.lastFetchedAt = action.payload.fetchedAt;
    },
    resetFeed(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.lastFetchedAt = null;
      state.error = null;
    },
    updateFilters(state, action: PayloadAction<FeedFilters>) {
      state.filters = action.payload;
      state.lastFiltersHash = JSON.stringify(action.payload);
    },
    clearFilters(state) {
      state.filters = defaultFilters;
      state.lastFiltersHash = JSON.stringify(defaultFilters);
    },
    dismissRestaurant(state, action: PayloadAction<string>) {
      const restaurantId = action.payload;
      state.items = state.items.filter(item => item.id !== restaurantId);
      if (!state.dismissedIds.includes(restaurantId)) {
        state.dismissedIds.push(restaurantId);
      }
    },
    restoreRestaurant(state, action: PayloadAction<FeedRestaurant>) {
      state.items = [action.payload, ...state.items];
      state.dismissedIds = state.dismissedIds.filter(id => id !== action.payload.id);
    },
  },
});

export const {
  setFeedLoading,
  setFeedError,
  setFeedData,
  appendFeedData,
  resetFeed,
  updateFilters,
  clearFilters,
  dismissRestaurant,
  restoreRestaurant,
} = feedSlice.actions;

export default feedSlice.reducer;
