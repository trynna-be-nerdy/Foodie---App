import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {
  ValueDashboardData,
  Budget,
  ValueAlert,
} from '../../types/value';

interface ValueState {
  dashboardData: ValueDashboardData | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastFetchedAt: number | null;
  unreadAlertsCount: number;
}

const initialState: ValueState = {
  dashboardData: null,
  isLoading: false,
  isRefreshing: false,
  error: null,
  lastFetchedAt: null,
  unreadAlertsCount: 0,
};

const valueSlice = createSlice({
  name: 'value',
  initialState,
  reducers: {
    setValueLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setValueRefreshing(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload;
    },
    setValueError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setDashboardData(
      state,
      action: PayloadAction<{data: ValueDashboardData; fetchedAt: number}>,
    ) {
      state.dashboardData = action.payload.data;
      state.lastFetchedAt = action.payload.fetchedAt;
      state.isLoading = false;
      state.isRefreshing = false;
      state.unreadAlertsCount = action.payload.data.alerts.filter(
        a => !a.isRead,
      ).length;
    },
    updateBudget(state, action: PayloadAction<Budget>) {
      if (state.dashboardData) {
        state.dashboardData.budget = action.payload;
      }
    },
    markAlertRead(state, action: PayloadAction<string>) {
      if (state.dashboardData) {
        const alert = state.dashboardData.alerts.find(
          a => a.id === action.payload,
        );
        if (alert && !alert.isRead) {
          alert.isRead = true;
          state.unreadAlertsCount = Math.max(0, state.unreadAlertsCount - 1);
        }
      }
    },
    addAlert(state, action: PayloadAction<ValueAlert>) {
      if (state.dashboardData) {
        state.dashboardData.alerts.unshift(action.payload);
        if (!action.payload.isRead) {
          state.unreadAlertsCount += 1;
        }
      }
    },
    clearAlerts(state) {
      if (state.dashboardData) {
        state.dashboardData.alerts = [];
        state.unreadAlertsCount = 0;
      }
    },
    resetValue(state) {
      state.dashboardData = null;
      state.lastFetchedAt = null;
      state.error = null;
      state.unreadAlertsCount = 0;
    },
  },
});

export const {
  setValueLoading,
  setValueRefreshing,
  setValueError,
  setDashboardData,
  updateBudget,
  markAlertRead,
  addAlert,
  clearAlerts,
  resetValue,
} = valueSlice.actions;

export default valueSlice.reducer;
