import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClientProvider} from '@tanstack/react-query';

import {store, persistor} from './src/store';
import {AppNavigator} from './src/navigation/AppNavigator';
import {navigationRef} from './src/navigation/navigationRef';
import {paperTheme} from './src/theme/paperTheme';
import {colors} from './src/theme/colors';
import {useCachedResources} from './src/hooks/useCachedResources';
import {LoadingScreen} from './src/components/LoadingScreen';
import {AppListeners} from './src/components/AppListeners';
import {queryClient} from './src/services/queryClient';

function App(): React.JSX.Element {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <LoadingScreen />;
  }

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={styles.root}>
            <SafeAreaProvider>
              <PaperProvider theme={paperTheme}>
                <AppListeners />
                <NavigationContainer ref={navigationRef}>
                  <StatusBar barStyle="dark-content" backgroundColor={colors.background.cream} />
                  <AppNavigator />
                </NavigationContainer>
              </PaperProvider>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
