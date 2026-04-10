import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

import {persistConfig} from './persistConfig';
import appReducer from './slices/appSlice';
import userReducer from './slices/userSlice';
import walletReducer from './slices/walletSlice';
import notificationsReducer from './slices/notificationSlice';
import receiptReducer from './slices/receiptSlice';
import qrReducer from './slices/qrSlice';
import feedReducer from './slices/feedSlice';
import cartReducer from './slices/cartSlice';
import eventReducer from './slices/eventSlice';
import valueReducer from './slices/valueSlice';
import impactReducer from './slices/impactSlice';
import monetizationReducer from './slices/monetizationSlice';

// Combine all reducers
const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  wallet: walletReducer,
  notifications: notificationsReducer,
  receipt: receiptReducer,
  qr: qrReducer,
  feed: feedReducer,
  cart: cartReducer,
  events: eventReducer,
  value: valueReducer,
  impact: impactReducer,
  monetization: monetizationReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions for serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: __DEV__, // Enable Redux DevTools in development
});

// Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks for use throughout the app
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
