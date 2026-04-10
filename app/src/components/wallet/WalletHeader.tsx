import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Surface} from 'react-native-paper';
import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';

interface WalletHeaderProps {
  totalPoints: number;
  expiringPoints: number;
  totalRestaurants: number;
  lastUpdatedAt?: string | null;
}

export function WalletHeader({
  totalPoints,
  expiringPoints,
  totalRestaurants,
  lastUpdatedAt,
}: WalletHeaderProps): React.JSX.Element {
  const dollarValue = (totalPoints / 100).toFixed(2);
  const lastUpdatedLabel = lastUpdatedAt ? formatLastUpdated(lastUpdatedAt) : null;

  return (
    <Surface style={styles.container} elevation={2}>
      <View style={styles.mainBalance}>
        <Text style={styles.label}>Total Points</Text>
        <Text style={styles.points}>{totalPoints.toLocaleString()}</Text>
        <Text style={styles.dollarValue}>~${dollarValue} value</Text>
        {lastUpdatedLabel && <Text style={styles.lastUpdated}>Updated {lastUpdatedLabel}</Text>}
      </View>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalRestaurants}</Text>
          <Text style={styles.statLabel}>Restaurants</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.stat}>
          {expiringPoints > 0 ? (
            <>
              <Text style={[styles.statValue, styles.expiringValue]}>
                {expiringPoints.toLocaleString()}
              </Text>
              <Text style={[styles.statLabel, styles.expiringLabel]}>Expiring Soon</Text>
            </>
          ) : (
            <>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Expiring</Text>
            </>
          )}
        </View>
      </View>
    </Surface>
  );
}

const formatLastUpdated = (dateString: string) => {
  const updatedAt = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - updatedAt.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) {
    return 'just now';
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  if (diffDays < 7) {
    return `${diffDays}d ago`;
  }
  return updatedAt.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    borderRadius: 16,
    padding: spacing.lg,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  mainBalance: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  label: {
    ...textStyles.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
  },
  points: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.text.inverse,
    lineHeight: 56,
  },
  dollarValue: {
    ...textStyles.body,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.xs,
  },
  lastUpdated: {
    ...textStyles.caption,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.h3,
    color: colors.text.inverse,
  },
  statLabel: {
    ...textStyles.bodySmall,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  expiringValue: {
    color: colors.accent.sunriseOrange,
  },
  expiringLabel: {
    color: colors.accent.sunriseOrange,
  },
});
