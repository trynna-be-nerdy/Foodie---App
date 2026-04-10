import {useEffect, useState} from 'react';
import * as Font from 'expo-font';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
} from '@expo-google-fonts/quicksand';

/**
 * Load all required fonts and resources before rendering the app
 */
export function useCachedResources(): boolean {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          // Poppins font family
          'Poppins-Regular': Poppins_400Regular,
          'Poppins-Medium': Poppins_500Medium,
          'Poppins-SemiBold': Poppins_600SemiBold,
          'Poppins-Bold': Poppins_700Bold,
          // Quicksand font family
          'Quicksand-Regular': Quicksand_400Regular,
          'Quicksand-Medium': Quicksand_500Medium,
          'Quicksand-SemiBold': Quicksand_600SemiBold,
          'Quicksand-Bold': Quicksand_700Bold,
        });
      } catch (e) {
        // We might want to report this error to an error reporting service
        console.warn('Error loading fonts:', e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}

export default useCachedResources;
