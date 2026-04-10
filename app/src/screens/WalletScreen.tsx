import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert} from 'react-native';
import {Text, FAB, ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConfettiCannon from 'react-native-confetti-cannon';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {
  fetchWallet,
  refreshWallet,
  syncRestaurantWallet,
  addManualEntry,
  queueWalletAction,
} from '../store/slices/walletSlice';
import {syncExpirationNotifications} from '../store/slices/notificationSlice';
import {Wallet, RestaurantSearchResult} from '../services/walletService';
import {triggerHaptic} from '../services/haptics';
import {
  WalletHeader,
  RestaurantCard,
  AddRestaurantModal,
  ManualEntryModal,
  RestaurantCardSkeleton,
} from '../components/wallet';

interface WalletScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
    getParent?: () => {navigate: (screen: string, params?: object) => void} | undefined;
  };
}

export function WalletScreen({navigation}: WalletScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {
    totalPoints,
    expiringPoints,
    totalRestaurants,
    wallets,
    lastFetchedAt,
    isLoading,
    isRefreshing,
    isSyncing,
    error,
  } = useAppSelector(state => state.wallet);
  const isOnline = useAppSelector(state => state.app.isOnline);
  const expirationAlertsEnabled = useAppSelector(state => state.app.expirationAlertsEnabled);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<RestaurantSearchResult | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  const previousTotalPoints = useRef<number | null>(null);

  // Fetch wallet on mount
  useEffect(() => {
    dispatch(fetchWallet());
  }, [dispatch]);

  useEffect(() => {
    if (expirationAlertsEnabled) {
      dispatch(syncExpirationNotifications(wallets));
    }
  }, [dispatch, expirationAlertsEnabled, wallets]);

  useEffect(() => {
    if (previousTotalPoints.current !== null && totalPoints > previousTotalPoints.current) {
      setConfettiKey(current => current + 1);
    }
    previousTotalPoints.current = totalPoints;
  }, [totalPoints]);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(() => {
    if (!isOnline) {
      Alert.alert('Offline', 'Connect to the internet to refresh your wallet.');
      return;
    }
    triggerHaptic('impactLight');
    dispatch(refreshWallet());
  }, [dispatch, isOnline]);

  // Handle sync for a specific restaurant
  const handleSync = useCallback(
    (restaurantId: string) => {
      if (!isOnline) {
        dispatch(
          queueWalletAction({
            id: `sync-${restaurantId}-${Date.now()}`,
            type: 'syncRestaurant',
            payload: {restaurantId},
            createdAt: new Date().toISOString(),
          }),
        );
        Alert.alert('Sync queued', 'We will sync this restaurant once you are back online.');
        return;
      }
      triggerHaptic('impactLight');
      dispatch(syncRestaurantWallet(restaurantId));
    },
    [dispatch, isOnline],
  );

  // Handle restaurant card press
  const handleRestaurantPress = useCallback(
    (wallet: Wallet) => {
      const parentNavigation = navigation.getParent ? navigation.getParent() : undefined;
      const navigator = parentNavigation ?? navigation;
      navigator.navigate('TransactionHistory', {
        restaurantId: wallet.restaurantId,
        restaurantName: wallet.restaurant.name,
      });
    },
    [navigation],
  );

  // Handle restaurant selection from search
  const handleSelectRestaurant = useCallback((restaurant: RestaurantSearchResult) => {
    triggerHaptic('impactLight');
    setSelectedRestaurant(restaurant);
    setShowAddModal(false);
    setShowManualModal(true);
  }, []);

  // Handle manual entry
  const handleManualEntry = useCallback(() => {
    triggerHaptic('impactLight');
    setShowAddModal(false);
    // For manual entry without selecting a restaurant first,
    // we'd need a different flow - for now show alert
    Alert.alert('Manual Entry', 'Please select a restaurant first, then enter your points.', [
      {text: 'OK'},
    ]);
  }, []);

  // Handle submit manual entry
  const handleSubmitManualEntry = useCallback(
    async (data: {restaurantId: string; balance: number; accountNumber?: string}) => {
      try {
        if (!isOnline) {
          dispatch(
            queueWalletAction({
              id: `manual-${data.restaurantId}-${Date.now()}`,
              type: 'manualEntry',
              payload: data,
              createdAt: new Date().toISOString(),
            }),
          );
          setShowManualModal(false);
          setSelectedRestaurant(null);
          Alert.alert('Offline', 'We saved this entry and will sync it when you are back online.');
          return;
        }
        await dispatch(addManualEntry(data)).unwrap();
        setShowManualModal(false);
        setSelectedRestaurant(null);
        triggerHaptic('impactMedium');
        Alert.alert('Success', 'Points added to your wallet!');
      } catch (err) {
        Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add points');
      }
    },
    [dispatch, isOnline],
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>*</Text>
      <Text style={styles.emptyTitle}>No Restaurants Connected</Text>
      <Text style={styles.emptyDescription}>
        Connect your favorite restaurants to track your loyalty points in one place.
      </Text>
      <TouchableOpacity
        style={styles.emptyButton}
        onPress={() => {
          triggerHaptic('impactLight');
          setShowAddModal(true);
        }}
        activeOpacity={0.8}>
        <Text style={styles.emptyButtonText}>Add Your First Restaurant</Text>
      </TouchableOpacity>
    </View>
  );

  // Render expiring points banner
  const renderExpiringBanner = () => {
    if (!expirationAlertsEnabled || expiringPoints <= 0) {
      return null;
    }

    return (
      <TouchableOpacity
        style={styles.expiringBanner}
        activeOpacity={0.8}
        onPress={() => {
          const parentNavigation = navigation.getParent ? navigation.getParent() : undefined;
          const navigator = parentNavigation ?? navigation;
          navigator.navigate('NotificationCenter');
        }}>
        <View style={styles.expiringContent}>
          <Text style={styles.expiringTitle}>Points Expiring Soon</Text>
          <Text style={styles.expiringText}>
            {expiringPoints.toLocaleString()} points expire within 7 days
          </Text>
        </View>
        <Text style={styles.expiringAction}>View all</Text>
      </TouchableOpacity>
    );
  };

  const renderOfflineBanner = () =>
    !isOnline ? (
      <View style={styles.offlineBanner}>
        <Text style={styles.offlineText}>Offline mode: showing cached wallet data.</Text>
      </View>
    ) : null;

  // Render restaurant card
  const renderRestaurantCard = ({item}: {item: Wallet}) => (
    <RestaurantCard
      wallet={item}
      isSyncing={isSyncing === item.restaurantId}
      onSync={() => handleSync(item.restaurantId)}
      onPress={() => handleRestaurantPress(item)}
    />
  );

  // Show loading state on initial load
  if (isLoading && wallets.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading your wallet...</Text>
        </View>
        <View style={styles.loadingSkeletons}>
          {[0, 1, 2].map(item => (
            <RestaurantCardSkeleton key={`skeleton-${item}`} />
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={wallets}
        renderItem={renderRestaurantCard}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <WalletHeader
              totalPoints={totalPoints}
              expiringPoints={expiringPoints}
              totalRestaurants={totalRestaurants}
              lastUpdatedAt={lastFetchedAt}
            />
            {renderOfflineBanner()}
            {renderExpiringBanner()}
            {wallets.length > 0 && <Text style={styles.sectionTitle}>Your Restaurants</Text>}
          </>
        }
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary.freshAvocadoGreen]}
            tintColor={colors.primary.freshAvocadoGreen}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* FAB to add restaurant */}
      {wallets.length > 0 && (
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => {
            triggerHaptic('impactLight');
            setShowAddModal(true);
          }}
          color={colors.text.inverse}
        />
      )}

      {/* Add Restaurant Modal */}
      <AddRestaurantModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSelectRestaurant={handleSelectRestaurant}
        onManualEntry={handleManualEntry}
      />

      {/* Manual Entry Modal */}
      <ManualEntryModal
        visible={showManualModal}
        restaurant={selectedRestaurant}
        onClose={() => {
          setShowManualModal(false);
          setSelectedRestaurant(null);
        }}
        onSubmit={handleSubmitManualEntry}
        isLoading={isLoading}
      />

      {/* Error display */}
      {error && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {confettiKey > 0 && (
        <ConfettiCannon key={`confetti-${confettiKey}`} count={90} origin={{x: 0, y: 0}} fadeOut />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  loadingSkeletons: {
    paddingTop: spacing.md,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  expiringBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.status.warningLight,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 12,
  },
  expiringContent: {
    flex: 1,
  },
  expiringTitle: {
    ...textStyles.body,
    color: colors.status.warning,
    fontWeight: '600',
  },
  expiringText: {
    ...textStyles.bodySmall,
    color: colors.status.warning,
  },
  expiringAction: {
    ...textStyles.body,
    color: colors.status.warning,
    fontWeight: '600',
  },
  offlineBanner: {
    backgroundColor: colors.background.lightGray,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    padding: spacing.sm,
    borderRadius: 10,
  },
  offlineText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    marginTop: spacing.xl,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...textStyles.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  emptyButtonText: {
    ...textStyles.body,
    color: colors.text.inverse,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.lg,
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  errorBanner: {
    position: 'absolute',
    bottom: 80,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.status.errorLight,
    padding: spacing.md,
    borderRadius: 8,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
    textAlign: 'center',
  },
});
