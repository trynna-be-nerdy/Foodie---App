import Constants from 'expo-constants';

export const isExpoGo = (): boolean => Constants.appOwnership === 'expo';
