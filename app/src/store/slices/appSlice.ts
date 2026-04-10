import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
  // Theme settings
  themeMode: ThemeMode;
  // Onboarding status
  hasCompletedOnboarding: boolean;
  onboardingStep: number;
  // App state
  isFirstLaunch: boolean;
  lastActiveTimestamp: number | null;
  // Notifications
  pushNotificationsEnabled: boolean;
  expirationAlertsEnabled: boolean;
  promotionsEnabled: boolean;
  // Network status
  isOnline: boolean;
}

const initialState: AppState = {
  themeMode: 'system',
  hasCompletedOnboarding: false,
  onboardingStep: 0,
  isFirstLaunch: true,
  lastActiveTimestamp: null,
  pushNotificationsEnabled: false,
  expirationAlertsEnabled: true,
  promotionsEnabled: true,
  isOnline: true,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
    },
    completeOnboarding: state => {
      state.hasCompletedOnboarding = true;
      state.isFirstLaunch = false;
    },
    setOnboardingStep: (state, action: PayloadAction<number>) => {
      state.onboardingStep = action.payload;
    },
    setFirstLaunch: (state, action: PayloadAction<boolean>) => {
      state.isFirstLaunch = action.payload;
    },
    updateLastActiveTimestamp: state => {
      state.lastActiveTimestamp = Date.now();
    },
    setPushNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.pushNotificationsEnabled = action.payload;
    },
    setExpirationAlertsEnabled: (state, action: PayloadAction<boolean>) => {
      state.expirationAlertsEnabled = action.payload;
    },
    setPromotionsEnabled: (state, action: PayloadAction<boolean>) => {
      state.promotionsEnabled = action.payload;
    },
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    resetAppState: () => initialState,
  },
});

export const {
  setThemeMode,
  completeOnboarding,
  setOnboardingStep,
  setFirstLaunch,
  updateLastActiveTimestamp,
  setPushNotificationsEnabled,
  setExpirationAlertsEnabled,
  setPromotionsEnabled,
  setOnlineStatus,
  resetAppState,
} = appSlice.actions;

export default appSlice.reducer;
