import {useCallback, useMemo, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {fetchFeedRestaurants, FeedQueryParams} from '../services/feedService';
import {
  appendFeedData,
  resetFeed,
  setFeedData,
  setFeedError,
  setFeedLoading,
  updateFilters as setFilters,
} from '../store/slices/feedSlice';
import {useAppDispatch, useAppSelector} from '../store';
import {FeedFilters} from '../types/feed';

const FEED_TTL_MS = 10 * 60 * 1000;
const FEED_PAGE_SIZE = 20;

interface UseFeedDataArgs {
  location?: {lat: number; lng: number};
}

export function useFeedData({location}: UseFeedDataArgs) {
  const dispatch = useAppDispatch();
  const feedState = useAppSelector(state => state.feed);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const lastRequest = useRef<number>(0);

  const filters = feedState.filters;

  const queryParams = useMemo<FeedQueryParams>(() => {
    return {
      page: feedState.page,
      limit: FEED_PAGE_SIZE,
      lat: location?.lat,
      lng: location?.lng,
      maxDistanceKm: filters.distanceMiles * 1.60934,
      filters,
    };
  }, [feedState.page, filters, location]);

  const shouldUseCache = useMemo(() => {
    if (!feedState.lastFetchedAt) {
      return false;
    }
    const isFresh = Date.now() - feedState.lastFetchedAt < FEED_TTL_MS;
    return isFresh && feedState.lastFiltersHash === JSON.stringify(filters);
  }, [feedState.lastFetchedAt, feedState.lastFiltersHash, filters]);

  const loadFeed = useCallback(
    async (override?: Partial<FeedQueryParams>, append = false) => {
      const now = Date.now();
      if (now - lastRequest.current < 500) {
        return;
      }
      lastRequest.current = now;

      try {
        dispatch(setFeedLoading(true));
        dispatch(setFeedError(null));

        const nextFilters = override?.filters ?? queryParams.filters;
        const params = {
          ...queryParams,
          ...override,
          filters: nextFilters,
          maxDistanceKm: nextFilters.distanceMiles * 1.60934,
        };
        const data = await fetchFeedRestaurants(params);

        const payload = {
          items: data.restaurants,
          page: params.page,
          hasMore: data.pagination.page < data.pagination.totalPages,
          fetchedAt: Date.now(),
        };

        if (append) {
          dispatch(appendFeedData(payload));
        } else {
          dispatch(setFeedData(payload));
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load feed';
        dispatch(setFeedError(message));
        Alert.alert('Feed unavailable', message);
      } finally {
        dispatch(setFeedLoading(false));
      }
    },
    [dispatch, queryParams],
  );

  const refreshFeed = useCallback(async () => {
    setIsRefreshing(true);
    dispatch(resetFeed());
    await loadFeed({page: 1}, false);
    setIsRefreshing(false);
  }, [dispatch, loadFeed]);

  const loadMore = useCallback(async () => {
    if (feedState.isLoading || isFetchingMore || !feedState.hasMore) {
      return;
    }
    setIsFetchingMore(true);
    await loadFeed({page: feedState.page + 1}, true);
    setIsFetchingMore(false);
  }, [feedState, isFetchingMore, loadFeed]);

  const ensureFeedLoaded = useCallback(async () => {
    if (feedState.items.length > 0 && shouldUseCache) {
      return;
    }
    await loadFeed({page: 1}, false);
  }, [feedState.items.length, loadFeed, shouldUseCache]);

  const updateFilters = useCallback(
    async (nextFilters: FeedFilters) => {
      dispatch(setFilters(nextFilters));
      dispatch(resetFeed());
      await loadFeed({page: 1, filters: nextFilters}, false);
    },
    [dispatch, loadFeed],
  );

  return {
    feedState,
    isRefreshing,
    isFetchingMore,
    ensureFeedLoaded,
    refreshFeed,
    loadMore,
    updateFilters,
    shouldUseCache,
  };
}
