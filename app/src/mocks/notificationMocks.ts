import type {AppNotification} from '../store/slices/notificationSlice';

let seeded = false;

export const seedMockNotifications = () => {
  if (seeded) {
    return;
  }
  seeded = true;

  const {store} = require('../store');
  const {addNotification} = require('../store/slices/notificationSlice');

  const now = new Date().toISOString();
  const notifications: AppNotification[] = [
    {
      id: 'mock-welcome',
      type: 'SYSTEM',
      title: 'Welcome to Foodie',
      message: 'Mock notifications are enabled for Expo Go testing.',
      createdAt: now,
      scheduledFor: null,
      read: false,
      routeName: 'NotificationCenter',
    },
    {
      id: 'mock-promo',
      type: 'PROMOTION',
      title: 'Bonus points available',
      message: 'Try a new spot today and earn double points.',
      createdAt: now,
      scheduledFor: null,
      read: false,
      routeName: 'Challenges',
    },
  ];

  notifications.forEach((notification, index) => {
    setTimeout(() => {
      store.dispatch(addNotification(notification));
    }, 300 * (index + 1));
  });
};
