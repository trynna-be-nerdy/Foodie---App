import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Surface, IconButton, ActivityIndicator} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';
import {Wallet} from '../../services/walletService';
import {ShimmerOverlay} from './ShimmerOverlay';

interface RestaurantCardProps {
  wallet: Wallet;
  isSyncing: boolean;
  onSync: () => void;
  onPress: () => void;
}

export function RestaurantCard({
  wallet,
  isSyncing,
  onSync,
  onPress,
}: RestaurantCardProps): React.JSX.Element {
  const isExpiringSoon =
    wallet.expirationDate &&
    new Date(wallet.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  const formatDate = (dateString: string | null) => {
    if (!dateString) {
      return null;
    }
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
  };

  const getTimeSinceSync = (dateString: string | null) => {
    if (!dateString) {
      return 'Never synced';
    }
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) {
      return 'Just now';
    }
    if (diffMins < 60) {
      return `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    return `${diffDays}d ago`;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Surface style={styles.container} elevation={1}>
        <View style={styles.header}>
          <View style={styles.restaurantInfo}>
            {wallet.restaurant.imageUrl ? (
              <Image source={{uri: wallet.restaurant.imageUrl}} style={styles.logo} />
            ) : (
              <View style={styles.logoPlaceholder}>
                <Text style={styles.logoText}>{wallet.restaurant.name.charAt(0)}</Text>
              </View>
            )}
            <View style={styles.nameContainer}>
              <Text style={styles.name} numberOfLines={1}>
                {wallet.restaurant.name}
              </Text>
              <Text style={styles.cuisineType}>
                {wallet.restaurant.cuisineTypes.slice(0, 2).join(' • ')}
              </Text>
            </View>
          </View>

          {isSyncing ? (
            <ActivityIndicator size="small" color={colors.primary.freshAvocadoGreen} />
          ) : (
            <IconButton
              icon="refresh"
              size={20}
              onPress={onSync}
              iconColor={colors.text.secondary}
            />
          )}
        </View>

        <View style={styles.balanceRow}>
          <View>
            <Text style={styles.balanceLabel}>Points Balance</Text>
            <Text style={styles.balance}>{wallet.balance.toLocaleString()}</Text>
            <Text style={styles.dollarValue}>~${wallet.dollarValue} value</Text>
          </View>

          <View style={styles.statusContainer}>
            {wallet.isConnected && (
              <View style={styles.connectedBadge}>
                <Text style={styles.connectedText}>Connected</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.syncText}>Synced {getTimeSinceSync(wallet.lastSyncedAt)}</Text>

          {isExpiringSoon && wallet.expirationDate && (
            <View style={styles.expiringBadge}>
              <Text style={styles.expiringText}>Expires {formatDate(wallet.expirationDate)}</Text>
            </View>
          )}
        </View>
        {isSyncing && <ShimmerOverlay />}
      </Surface>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  restaurantInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.background.lightGray,
  },
  logoPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary.freshAvocadoGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...textStyles.h3,
    color: colors.text.inverse,
  },
  nameContainer: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  name: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  cuisineType: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.sm,
  },
  balanceLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  balance: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
  },
  dollarValue: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  connectedBadge: {
    backgroundColor: colors.status.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  connectedText: {
    ...textStyles.bodySmall,
    color: colors.status.success,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray,
  },
  syncText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  expiringBadge: {
    backgroundColor: colors.status.warningLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  expiringText: {
    ...textStyles.bodySmall,
    color: colors.status.warning,
    fontWeight: '600',
  },
});
