import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {CreatorProfile, EarningsSummary} from '../../types/monetization';
import {formatEarnings, canRequestPayout, EARNINGS_RATES} from '../../types/monetization';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface EarningsDashboardProps {
  profile: CreatorProfile;
  summary: EarningsSummary;
  onRequestPayout: () => void;
  onViewHistory: () => void;
}

export function EarningsDashboard({
  profile,
  summary,
  onRequestPayout,
  onViewHistory,
}: EarningsDashboardProps): React.JSX.Element {
  const canPayout = canRequestPayout(profile.pendingBalance);
  const monthlyProgress = profile.monthlyEarnings / profile.monthlyEarningsCap;
  const isNearCap = monthlyProgress >= 0.8;

  return (
    <View style={styles.container}>
      {/* Main Balance Card */}
      <Card style={styles.balanceCard} mode="elevated">
        <View style={styles.balanceHeader}>
          <View style={styles.balanceInfo}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>
              {formatEarnings(profile.pendingBalance)}
            </Text>
            <Text style={styles.balanceSubtext}>
              {canPayout
                ? 'Ready to withdraw'
                : `$${(EARNINGS_RATES.minPayoutAmount - profile.pendingBalance).toFixed(2)} more to withdraw`}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            {profile.status === 'verified' ? (
              <>
                <Icon name="check-decagram" size={20} color={colors.primary.freshAvocadoGreen} />
                <Text style={styles.statusText}>Verified</Text>
              </>
            ) : (
              <>
                <Icon name="account" size={20} color={colors.text.secondary} />
                <Text style={[styles.statusText, {color: colors.text.secondary}]}>Standard</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button
            mode="contained"
            onPress={onRequestPayout}
            disabled={!canPayout}
            buttonColor={colors.primary.freshAvocadoGreen}
            icon="cash-fast"
            style={styles.payoutButton}>
            Request Payout
          </Button>
          <Button
            mode="outlined"
            onPress={onViewHistory}
            textColor={colors.primary.freshAvocadoGreen}
            icon="history"
            style={styles.historyButton}>
            History
          </Button>
        </View>
      </Card>

      {/* Monthly Earnings Progress */}
      <Card style={styles.progressCard} mode="elevated">
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>Monthly Earnings</Text>
          <Text style={styles.progressAmount}>
            {formatEarnings(profile.monthlyEarnings)} / {formatEarnings(profile.monthlyEarningsCap)}
          </Text>
        </View>
        <ProgressBar
          progress={Math.min(1, monthlyProgress)}
          color={isNearCap ? colors.accent.sunriseOrange : colors.primary.freshAvocadoGreen}
          style={styles.progressBar}
        />
        {isNearCap && profile.status !== 'verified' && (
          <View style={styles.capWarning}>
            <Icon name="alert" size={16} color={colors.accent.sunriseOrange} />
            <Text style={styles.capWarningText}>
              Approaching monthly cap. Become verified for unlimited earnings!
            </Text>
          </View>
        )}
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard} mode="elevated">
          <Icon name="cash" size={24} color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.statValue}>{formatEarnings(summary.lifetimeEarnings)}</Text>
          <Text style={styles.statLabel}>Lifetime Earnings</Text>
        </Card>

        <Card style={styles.statCard} mode="elevated">
          <Icon name="calendar-month" size={24} color={colors.accent.sunriseOrange} />
          <Text style={styles.statValue}>{formatEarnings(summary.thisMonthEarnings)}</Text>
          <Text style={styles.statLabel}>This Month</Text>
        </Card>

        <Card style={styles.statCard} mode="elevated">
          <Icon name="calendar-week" size={24} color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.statValue}>{formatEarnings(summary.thisWeekEarnings)}</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </Card>

        <Card style={styles.statCard} mode="elevated">
          <Icon name="chart-line" size={24} color={colors.accent.sunriseOrange} />
          <Text style={styles.statValue}>{formatEarnings(summary.averageEarningsPerPost)}</Text>
          <Text style={styles.statLabel}>Avg per Post</Text>
        </Card>
      </View>

      {/* Engagement Stats */}
      <Card style={styles.engagementCard} mode="elevated">
        <Text style={styles.sectionTitle}>Performance Overview</Text>
        <View style={styles.engagementStats}>
          <View style={styles.engagementItem}>
            <Icon name="file-document-multiple" size={20} color={colors.text.secondary} />
            <Text style={styles.engagementValue}>{summary.totalPosts}</Text>
            <Text style={styles.engagementLabel}>Posts</Text>
          </View>
          <View style={styles.engagementDivider} />
          <View style={styles.engagementItem}>
            <Icon name="eye" size={20} color={colors.text.secondary} />
            <Text style={styles.engagementValue}>
              {summary.totalViews >= 1000
                ? `${(summary.totalViews / 1000).toFixed(1)}K`
                : summary.totalViews}
            </Text>
            <Text style={styles.engagementLabel}>Views</Text>
          </View>
          <View style={styles.engagementDivider} />
          <View style={styles.engagementItem}>
            <Icon name="heart" size={20} color={colors.text.secondary} />
            <Text style={styles.engagementValue}>
              {summary.totalEngagements >= 1000
                ? `${(summary.totalEngagements / 1000).toFixed(1)}K`
                : summary.totalEngagements}
            </Text>
            <Text style={styles.engagementLabel}>Engagements</Text>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  balanceCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  balanceInfo: {},
  balanceLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  balanceAmount: {
    ...textStyles.h1,
    color: colors.primary.freshAvocadoGreen,
  },
  balanceSubtext: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.cream,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    ...textStyles.labelSmall,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
    marginLeft: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  payoutButton: {
    flex: 1,
    borderRadius: borderRadius.md,
  },
  historyButton: {
    borderRadius: borderRadius.md,
    borderColor: colors.primary.freshAvocadoGreen,
  },
  progressCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  progressTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  progressAmount: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  capWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: colors.accent.sunriseOrange + '15',
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  capWarningText: {
    ...textStyles.caption,
    color: colors.accent.sunriseOrange,
    marginLeft: spacing.xs,
    flex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  statLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  engagementCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  sectionTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  engagementStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  engagementItem: {
    alignItems: 'center',
    flex: 1,
  },
  engagementValue: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  engagementLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  engagementDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.neutral.gray200,
  },
});
