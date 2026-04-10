import React, {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';

import {useAppDispatch, useAppSelector} from '../store';
import {setOnlineStatus} from '../store/slices/appSlice';
import {
  removeQueuedWalletAction,
  syncRestaurantWallet,
  connectRestaurant,
  addManualEntry,
} from '../store/slices/walletSlice';
import {initializeNotificationListeners} from '../services/notificationService';
import {configureBackgroundSync} from '../services/backgroundSync';

export function AppListeners(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const isOnline = useAppSelector(state => state.app.isOnline);
  const pendingActions = useAppSelector(state => state.wallet.pendingActions);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setOnlineStatus(Boolean(state.isConnected)));
    });
    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    initializeNotificationListeners();
  }, []);

  useEffect(() => {
    configureBackgroundSync();
  }, []);

  useEffect(() => {
    if (!isOnline || pendingActions.length === 0) {
      return;
    }

    pendingActions.forEach(async action => {
      try {
        if (action.type === 'syncRestaurant') {
          await dispatch(syncRestaurantWallet(action.payload.restaurantId)).unwrap();
        } else if (action.type === 'connectRestaurant') {
          await dispatch(connectRestaurant(action.payload)).unwrap();
        } else if (action.type === 'manualEntry') {
          await dispatch(addManualEntry(action.payload)).unwrap();
        }
        dispatch(removeQueuedWalletAction(action.id));
      } catch {
        // Keep the action queued if it fails so it can retry later.
      }
    });
  }, [dispatch, isOnline, pendingActions]);

  return null;
}
