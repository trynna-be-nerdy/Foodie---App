import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Share, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FlashList, type FlashListRef} from '@shopify/flash-list';
import {Swipeable} from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import {Button, FAB, Snackbar, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RootStackParamList} from '../navigation/AppNavigator';

import {FilterModal} from '../components/feed/FilterModal';
import {RestaurantCard} from '../components/feed/RestaurantCard';
import {useFeedData} from '../hooks/useFeedData';
import {markNotInterested} from '../services/feedService';
import {useAppDispatch, useAppSelector} from '../store';
import {dismissRestaurant, restoreRestaurant} from '../store/slices/feedSlice';
import {FeedRestaurant} from '../types/feed';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';

const LOCATION_UPDATE_DISTANCE_MILES = 1;
const DEFAULT_FILTERS = {
  cuisineTypes: [],
  priceRange: {min: 1, max: 4},
  distanceMiles: 10,
  dietaryRestrictions: [],
};

type FeedNavigationProp = StackNavigationProp<RootStackParamList>;

export function FeedScreen(): React.JSX.Element {
  const navigation = useNavigation<FeedNavigationProp>();
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.feed.filters);
  const [location, setLocation] = useState<{lat: number; lng: number}>();
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Restaurant removed from your feed.');
  const [snackbarUndoEnabled, setSnackbarUndoEnabled] = useState(false);
  const undoRef = useRef<{restaurant: FeedRestaurant; timeoutId: NodeJS.Timeout} | null>(null);
  const watchSubscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const flashListRef = useRef<FlashListRef<FeedRestaurant>>(null);

  const {
    feedState,
    ensureFeedLoaded,
    refreshFeed,
    loadMore,
    isRefreshing,
    isFetchingMore,
    updateFilters,
  } = useFeedData({location});

  useEffect(() => {
    ensureFeedLoaded();
  }, [ensureFeedLoaded, location, filters]);

  const startLocationWatch = useCallback(async () => {
    try {
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });

      watchSubscriptionRef.current?.remove();
      watchSubscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          distanceInterval: 1600,
          timeInterval: 60000,
        },
        positionUpdate => {
          setLocation(prev => {
            if (!prev) {
              return {
                lat: positionUpdate.coords.latitude,
                lng: positionUpdate.coords.longitude,
              };
            }
            const distance = calculateDistanceMiles(
              prev.lat,
              prev.lng,
              positionUpdate.coords.latitude,
              positionUpdate.coords.longitude,
            );
            if (distance < LOCATION_UPDATE_DISTANCE_MILES) {
              return prev;
            }
            return {
              lat: positionUpdate.coords.latitude,
              lng: positionUpdate.coords.longitude,
            };
          });
        },
      );
    } catch {
      // Ignore location errors.
    }
  }, []);

  const requestLocationPermission = useCallback(async () => {
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      await startLocationWatch();
    }
  }, [startLocationWatch]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  useEffect(() => {
    return () => {
      watchSubscriptionRef.current?.remove();
      watchSubscriptionRef.current = null;
    };
  }, []);

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.cuisineTypes.length) {
      count += 1;
    }
    if (filters.dietaryRestrictions.length) {
      count += 1;
    }
    if (filters.priceRange.min !== 1 || filters.priceRange.max !== 4) {
      count += 1;
    }
    if (filters.distanceMiles !== 10) {
      count += 1;
    }
    return count;
  }, [filters]);

  const handleNotInterested = useCallback(
    (restaurant: FeedRestaurant) => {
      if (undoRef.current) {
        clearTimeout(undoRef.current.timeoutId);
        markNotInterested(undoRef.current.restaurant.id).catch(() => undefined);
      }

      dispatch(dismissRestaurant(restaurant.id));
      setSnackbarMessage('Restaurant removed from your feed.');
      setSnackbarUndoEnabled(true);

      const timeoutId = setTimeout(() => {
        markNotInterested(restaurant.id).catch(() => undefined);
        undoRef.current = null;
        setSnackbarUndoEnabled(false);
        setSnackbarVisible(false);
      }, 5000);

      undoRef.current = {restaurant, timeoutId};
      setSnackbarVisible(true);
    },
    [dispatch],
  );

  const handleUndo = useCallback(() => {
    if (!undoRef.current) {
      return;
    }
    clearTimeout(undoRef.current.timeoutId);
    dispatch(restoreRestaurant(undoRef.current.restaurant));
    undoRef.current = null;
    setSnackbarUndoEnabled(false);
    setSnackbarVisible(false);
  }, [dispatch]);

  const renderRightActions = () => (
    <View style={styles.notInterestedAction}>
      <Text style={styles.notInterestedText}>Not Interested</Text>
    </View>
  );

  const renderItem = ({item}: {item: FeedRestaurant}) => (
    <Swipeable
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => handleNotInterested(item)}>
      <RestaurantCard
        restaurant={item}
        onPress={() => navigation.navigate('RestaurantDetail', {restaurantId: item.id})}
        onSaveToggle={() => undefined}
        onShare={() =>
          Share.share({
            message: `Check out ${item.name} on Foodie`,
          }).catch(() => undefined)
        }
        onViewMenu={() => navigation.navigate('Menu', {restaurantId: item.id})}
        onOrder={() => {
          navigation.navigate('Menu', {restaurantId: item.id});
        }}
      />
    </Swipeable>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Discovery Feed</Text>
        <Text style={styles.subtitle}>Find your next favorite spot</Text>
      </View>
      <Button
        mode="contained"
        compact
        buttonColor={colors.primary.freshAvocadoGreen}
        onPress={() => setShowFilters(true)}>
        Filters{activeFiltersCount ? ` (${activeFiltersCount})` : ''}
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlashList
        ref={flashListRef}
        data={feedState.items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          feedState.isLoading ? (
            <View style={styles.loadingState}>
              <Text style={styles.loadingText}>Loading recommendations...</Text>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No restaurants found</Text>
              <Text style={styles.emptySubtitle}>Try adjusting your filters.</Text>
            </View>
          )
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
        refreshing={isRefreshing}
        onRefresh={refreshFeed}
        onScroll={event => setShowScrollTop(event.nativeEvent.contentOffset.y > 500)}
        ListFooterComponent={
          isFetchingMore ? (
            <View style={styles.loadingMore}>
              <Text style={styles.loadingText}>Loading more...</Text>
            </View>
          ) : null
        }
      />

      {showScrollTop && (
        <FAB
          icon="arrow-up"
          style={styles.scrollTop}
          onPress={() => flashListRef.current?.scrollToOffset({animated: true, offset: 0})}
        />
      )}

      <FilterModal
        visible={showFilters}
        filters={filters}
        onApply={nextFilters => {
          setShowFilters(false);
          updateFilters(nextFilters);
        }}
        onClear={() => {
          setShowFilters(false);
          updateFilters(DEFAULT_FILTERS);
        }}
        onClose={() => setShowFilters(false)}
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={5000}
        action={
          snackbarUndoEnabled && undoRef.current ? {label: 'Undo', onPress: handleUndo} : undefined
        }>
        {snackbarMessage}
      </Snackbar>
    </SafeAreaView>
  );
}

function calculateDistanceMiles(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3958.8;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.base,
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  loadingState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingMore: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  notInterestedAction: {
    backgroundColor: colors.status.error,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  notInterestedText: {
    ...textStyles.bodySmall,
    color: colors.text.inverse,
  },
  scrollTop: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing['3xl'],
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
});
