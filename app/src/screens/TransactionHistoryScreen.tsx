import React, {useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {Text, Chip, ActivityIndicator, Surface} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchTransactionHistory} from '../store/slices/walletSlice';
import {Transaction} from '../services/walletService';

interface TransactionHistoryScreenProps {
  route: {
    params?: {
      restaurantId?: string;
      restaurantName?: string;
    };
  };
  navigation: {
    goBack: () => void;
  };
}

const TRANSACTION_TYPES = [
  {key: 'all', label: 'All'},
  {key: 'EARN', label: 'Earned'},
  {key: 'REDEEM', label: 'Redeemed'},
  {key: 'BONUS', label: 'Bonus'},
  {key: 'GIFT_RECEIVED', label: 'Gifts'},
  {key: 'EXPIRE', label: 'Expired'},
];

const getTransactionIcon = (type: string): string => {
  switch (type) {
    case 'EARN':
      return '🎯';
    case 'REDEEM':
      return '🛒';
    case 'EXPIRE':
      return '⏰';
    case 'GIFT_SENT':
      return '🎁';
    case 'GIFT_RECEIVED':
      return '🎁';
    case 'BONUS':
      return '⭐';
    case 'ADJUSTMENT':
      return '⚙️';
    default:
      return '📝';
  }
};

const getTransactionColor = (type: string): string => {
  switch (type) {
    case 'EARN':
    case 'GIFT_RECEIVED':
    case 'BONUS':
      return colors.status.success;
    case 'REDEEM':
    case 'GIFT_SENT':
      return colors.primary.freshAvocadoGreen;
    case 'EXPIRE':
      return colors.status.error;
    default:
      return colors.text.secondary;
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

export function TransactionHistoryScreen({
  route,
  navigation: _navigation,
}: TransactionHistoryScreenProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {transactions, transactionsPagination, isLoading} = useAppSelector(state => state.wallet);

  const [selectedType, setSelectedType] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const restaurantId = route.params?.restaurantId;
  const restaurantName = route.params?.restaurantName;

  const loadTransactions = useCallback(() => {
    dispatch(
      fetchTransactionHistory({
        restaurantId,
        type: selectedType === 'all' ? undefined : selectedType,
        limit: 50,
        offset: 0,
      }),
    );
  }, [dispatch, restaurantId, selectedType]);

  // Fetch transactions on mount and when filter changes
  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await dispatch(
      fetchTransactionHistory({
        restaurantId,
        type: selectedType === 'all' ? undefined : selectedType,
        limit: 50,
        offset: 0,
      }),
    );
    setIsRefreshing(false);
  }, [dispatch, restaurantId, selectedType]);

  const handleLoadMore = useCallback(() => {
    if (transactions.length >= transactionsPagination.total) {
      return;
    }

    dispatch(
      fetchTransactionHistory({
        restaurantId,
        type: selectedType === 'all' ? undefined : selectedType,
        limit: 50,
        offset: transactions.length,
      }),
    );
  }, [dispatch, restaurantId, selectedType, transactions.length, transactionsPagination.total]);

  const renderTypeFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={TRANSACTION_TYPES}
        keyExtractor={item => item.key}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterList}
        renderItem={({item}) => (
          <Chip
            selected={selectedType === item.key}
            onPress={() => setSelectedType(item.key)}
            style={[styles.filterChip, selectedType === item.key && styles.filterChipSelected]}
            textStyle={[
              styles.filterChipText,
              selectedType === item.key && styles.filterChipTextSelected,
            ]}>
            {item.label}
          </Chip>
        )}
      />
    </View>
  );

  const renderTransactionItem = ({item}: {item: Transaction}) => {
    const isPositive = item.amount > 0;

    return (
      <Surface style={styles.transactionCard} elevation={1}>
        <View style={styles.transactionIcon}>
          <Text style={styles.iconText}>{getTransactionIcon(item.type)}</Text>
        </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionType}>
            {item.type
              .replace('_', ' ')
              .toLowerCase()
              .replace(/^\w/, c => c.toUpperCase())}
          </Text>
          <Text style={styles.transactionSource}>{item.source}</Text>
          {!restaurantId && <Text style={styles.restaurantName}>{item.restaurant.name}</Text>}
        </View>

        <View style={styles.transactionAmount}>
          <Text style={[styles.amount, {color: getTransactionColor(item.type)}]}>
            {isPositive ? '+' : ''}
            {item.amount.toLocaleString()}
          </Text>
          <Text style={styles.transactionDate}>{formatDate(item.createdAt)}</Text>
        </View>
      </Surface>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>📋</Text>
      <Text style={styles.emptyTitle}>No Transactions</Text>
      <Text style={styles.emptyDescription}>
        {selectedType === 'all'
          ? 'Your transaction history will appear here once you start earning or redeeming points.'
          : `No ${selectedType.toLowerCase()} transactions found.`}
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (transactions.length >= transactionsPagination.total) {
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
        <Text style={styles.title}>
          {restaurantName ? `${restaurantName} History` : 'Transaction History'}
        </Text>
        <Text style={styles.subtitle}>
          {transactionsPagination.total} transaction{transactionsPagination.total !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Type Filter */}
      {renderTypeFilter()}

      {/* Transaction List */}
      {isLoading && transactions.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
        </View>
      ) : (
        <FlatList
          data={transactions}
          renderItem={renderTransactionItem}
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
  filterContainer: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  filterList: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  filterChip: {
    backgroundColor: colors.background.white,
    marginRight: spacing.xs,
  },
  filterChipSelected: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
  filterChipText: {
    color: colors.text.secondary,
  },
  filterChipTextSelected: {
    color: colors.text.inverse,
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
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  iconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  transactionSource: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  restaurantName: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: 2,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    ...textStyles.h4,
    fontWeight: '700',
  },
  transactionDate: {
    ...textStyles.caption,
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
