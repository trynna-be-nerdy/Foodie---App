import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig} from 'redux-persist';
import {RootState} from './index';

/**
 * Redux Persist Configuration
 * Whitelist critical slices that should persist across app restarts
 */
export const persistConfig: PersistConfig<RootState> = {
  key: 'foodie-root',
  version: 1,
  storage: AsyncStorage,
  // Only persist these slices
  whitelist: ['app', 'user', 'wallet', 'notifications', 'feed'],
  // These slices will NOT be persisted
  blacklist: [],
  // Migration strategy for version updates
  migrate: state => {
    // Add migration logic here when schema changes
    return Promise.resolve(state);
  },
};

export default persistConfig;
