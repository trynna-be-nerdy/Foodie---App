import {QueryClient} from '@tanstack/react-query';

/**
 * Configure QueryClient with appropriate defaults for mobile
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data considered fresh for 5 minutes
      staleTime: 5 * 60 * 1000,
      // Cache data for 10 minutes
      gcTime: 10 * 60 * 1000, // Previously cacheTime in v4
      // Retry failed queries 3 times with exponential backoff
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Don't refetch on window focus (mobile doesn't have window focus events)
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect automatically (handle manually)
      refetchOnReconnect: true,
      // Network mode for offline support
      networkMode: 'offlineFirst',
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
      retryDelay: 1000,
      // Network mode for offline support
      networkMode: 'offlineFirst',
    },
  },
});

export default queryClient;
