import React, {useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Text, ActivityIndicator, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchReceiptHistory} from '../store/slices/receiptSlice';
import {Receipt} from '../services/receiptService';

interface ReceiptHistoryScreenProps {
  navigation: {
    goBack: () => void;
  };
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'COMPLETED':
      return colors.status.success;
    case 'PENDING':
      return colors.status.warning;
    case 'FAILED':
    case 'DUPLICATE':
      return colors.status.error;
    default:
      return colors.text.secondary;
  }
};

const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'COMPLETED':
      return '✓';
    case 'PENDING':
      return '⏳';
    case 'PROCESSING':
      return '⚙️';
    case 'FAILED':
      return '✗';
    case 'DUPLICATE':
      return '🔄';
    default:
      return '📄';
  }
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', {weekday: 'long'});
  } else {
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  }
};

export function ReceiptHistoryScreen({
  navigation: _navigation,
}: ReceiptHistoryScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {receipts, receiptsPagination, isLoadingHistory} = useAppSelector(state => state.receipt);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Fetch receipts on mount
  useEffect(() => {
    dispatch(fetchReceiptHistory({limit: 20, offset: 0}));
  }, [dispatch]);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(fetchReceiptHistory({limit: 20, offset: 0}));
    setIsRefreshing(false);
  }, [dispatch]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!receiptsPagination.hasMore || isLoadingHistory) {
      return;
    }

    dispatch(
      fetchReceiptHistory({
        limit: 20,
        offset: receipts.length,
      }),
    );
  }, [dispatch, receipts.length, receiptsPagination.hasMore, isLoadingHistory]);

  // Render receipt item
  const renderReceiptItem = ({item}: {item: Receipt}) => (
    <Surface style={styles.receiptCard} elevation={1}>
      <View style={styles.receiptIcon}>
        <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
      </View>

      <View style={styles.receiptInfo}>
        <Text style={styles.receiptAmount}>
          {item.totalAmount ? `$${item.totalAmount.toFixed(2)}` : 'Amount pending'}
        </Text>
        <Text style={styles.receiptDate}>{formatDate(item.createdAt)}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusBadge, {backgroundColor: getStatusColor(item.status) + '20'}]}>
            <Text style={[styles.statusText, {color: getStatusColor(item.status)}]}>
              {item.status.replace('_', ' ')}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.pointsContainer}>
        {item.pointsAwarded > 0 ? (
          <>
            <Text style={styles.pointsEarned}>+{item.pointsAwarded}</Text>
            <Text style={styles.pointsLabel}>points</Text>
          </>
        ) : (
          <Text style={styles.noPoints}>-</Text>
        )}
      </View>
    </Surface>
  );

  // Render empty state
  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No Receipts Yet</Text>
      <Text style={styles.emptyDescription}>
        Your scanned receipts will appear here. Start scanning to earn points!
      </Text>
    </View>
  );

  // Render footer loader
  const renderFooter = () => {
    if (!receiptsPagination.hasMore) {
      return null;
    }

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={colors.primary.freshAvocadoGreen} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Scan History</Text>
        <Text style={styles.subtitle}>
          {receiptsPagination.total} receipt{receiptsPagination.total !== 1 ? 's' : ''} scanned
        </Text>
      </View>

      {/* Receipt List */}
      {isLoadingHistory && receipts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      ) : (
        <FlatList
          data={receipts}
          renderItem={renderReceiptItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
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
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  receiptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  receiptIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  statusIcon: {
    fontSize: 20,
  },
  receiptInfo: {
    flex: 1,
  },
  receiptAmount: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  receiptDate: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  statusContainer: {
    marginTop: spacing.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    ...textStyles.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  pointsContainer: {
    alignItems: 'flex-end',
  },
  pointsEarned: {
    ...textStyles.h4,
    color: colors.status.success,
    fontWeight: '700',
  },
  pointsLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  noPoints: {
    ...textStyles.body,
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
  },
  emptyDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  footerLoader: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
});
