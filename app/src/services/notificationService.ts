import {isExpoGo} from '../utils/expoGo';
import {USE_MOCKS} from '../config';

const shouldUseMockPush = () => USE_MOCKS || isExpoGo();

export async function requestPushPermission(): Promise<boolean> {
  if (shouldUseMockPush()) {
    return true;
  }
  return false;
}

export async function initializeNotificationListeners(): Promise<void> {
  if (shouldUseMockPush()) {
    const {seedMockNotifications} = require('../mocks/notificationMocks');
    seedMockNotifications();
    return;
  }
}
