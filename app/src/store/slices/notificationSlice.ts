import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Wallet} from '../../services/walletService';

export type NotificationType = 'EXPIRATION' | 'TRANSACTION' | 'PROMOTION' | 'SYSTEM';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string;
  scheduledFor: string | null;
  read: boolean;
  routeName?: string;
  routeParams?: Record<string, unknown>;
}

interface NotificationsState {
  notifications: AppNotification[];
}

const initialState: NotificationsState = {
  notifications: [],
};

const buildExpirationMessage = (walletName: string, daysBefore: number) =>
  `${walletName} points expire in ${daysBefore} day${daysBefore === 1 ? '' : 's'}.`;

const getExpirationNoticeId = (walletId: string, daysBefore: number) =>
  `exp-${walletId}-${daysBefore}`;

const getTargetDate = (expirationDate: string, daysBefore: number) => {
  const target = new Date(expirationDate);
  target.setDate(target.getDate() - daysBefore);
  return target.toISOString();
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<AppNotification>) => {
      const existingIndex = state.notifications.findIndex(
        notification => notification.id === action.payload.id,
      );
      if (existingIndex >= 0) {
        state.notifications[existingIndex] = action.payload;
        return;
      }
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(item => item.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    markAllRead: state => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
    },
    clearNotifications: state => {
      state.notifications = [];
    },
    syncExpirationNotifications: (state, action: PayloadAction<Wallet[]>) => {
      const now = new Date();
      const generated: AppNotification[] = [];

      action.payload.forEach(wallet => {
        if (!wallet.expirationDate) {
          return;
        }

        [7, 3, 1].forEach(daysBefore => {
          const scheduledFor = getTargetDate(wallet.expirationDate as string, daysBefore);
          const scheduledDate = new Date(scheduledFor);
          const id = getExpirationNoticeId(wallet.id, daysBefore);
          const existing = state.notifications.find(item => item.id === id);

          const notification: AppNotification = {
            id,
            type: 'EXPIRATION',
            title: `${wallet.restaurant.name} points expiring`,
            message: buildExpirationMessage(wallet.restaurant.name, daysBefore),
            createdAt: existing?.createdAt ?? new Date().toISOString(),
            scheduledFor,
            read: existing?.read ?? false,
            routeName: 'Wallet',
            routeParams: {restaurantId: wallet.restaurantId},
          };

          if (scheduledDate <= now && !existing?.read) {
            notification.read = false;
          }

          generated.push(notification);
        });
      });

      const existingNonExpiration = state.notifications.filter(
        notification => notification.type !== 'EXPIRATION',
      );
      state.notifications = [...generated, ...existingNonExpiration].sort((a, b) => {
        const dateA = new Date(a.scheduledFor ?? a.createdAt).getTime();
        const dateB = new Date(b.scheduledFor ?? b.createdAt).getTime();
        return dateB - dateA;
      });
    },
  },
});

export const {
  addNotification,
  markNotificationRead,
  markAllRead,
  clearNotifications,
  syncExpirationNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
