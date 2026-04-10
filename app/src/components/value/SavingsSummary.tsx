import React, {useMemo} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {SavingsSummary as SavingsSummaryType} from '../../types/value';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - spacing.lg * 2 - spacing.md * 2;
const CHART_HEIGHT = 100;

interface SavingsSummaryProps {
  data: SavingsSummaryType;
}

export function SavingsSummary({data}: SavingsSummaryProps): React.JSX.Element {
  const percentChange = useMemo(() => {
    if (data.lastMonth === 0) return 0;
    return ((data.thisMonth - data.lastMonth) / data.lastMonth) * 100;
  }, [data.thisMonth, data.lastMonth]);

  const isUp = percentChange > 0;

  // Calculate chart bar heights
  const maxSavings = useMemo(() => {
    return Math.max(...data.monthlyTrend.map(m => m.savings), 1);
  }, [data.monthlyTrend]);

  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Icon name="piggy-bank" size={24} color={colors.primary.freshAvocadoGreen} />
        </View>
        <Text style={styles.headerTitle}>Your Savings</Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${data.thisMonth.toFixed(2)}</Text>
          <Text style={styles.statLabel}>This Month</Text>
          <View style={styles.changeIndicator}>
            <Icon
              name={isUp ? 'arrow-up' : 'arrow-down'}
              size={12}
              color={isUp ? colors.status.success : colors.status.error}
            />
            <Text
              style={[
                styles.changeText,
                {color: isUp ? colors.status.success : colors.status.error},
              ]}>
              {Math.abs(percentChange).toFixed(1)}%
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.statItem}>
          <Text style={styles.statValueLarge}>${data.lifetime.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Lifetime Savings</Text>
        </View>
      </View>

      {/* Monthly Trend Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>6-Month Trend</Text>
        <View style={styles.chart}>
          {data.monthlyTrend.map((month, index) => {
            const barHeight = (month.savings / maxSavings) * (CHART_HEIGHT - 20);
            const isCurrentMonth = index === data.monthlyTrend.length - 1;

            return (
              <View key={`${month.month}-${month.year}`} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: Math.max(barHeight, 4),
                      backgroundColor: isCurrentMonth
                        ? colors.primary.freshAvocadoGreen
                        : colors.primary.mintGreen,
                    },
                  ]}
                />
                <Text style={styles.barLabel}>{month.month}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Breakdown by Type */}
      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>Savings Breakdown</Text>
        <View style={styles.breakdownRow}>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, {backgroundColor: colors.primary.freshAvocadoGreen}]} />
            <Text style={styles.breakdownLabel}>Points</Text>
            <Text style={styles.breakdownValue}>
              ${data.breakdownByType.pointsDiscounts.toFixed(2)}
            </Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, {backgroundColor: colors.accent.sunriseOrange}]} />
            <Text style={styles.breakdownLabel}>Promos</Text>
            <Text style={styles.breakdownValue}>
              ${data.breakdownByType.promotionalDiscounts.toFixed(2)}
            </Text>
          </View>
          <View style={styles.breakdownItem}>
            <View style={[styles.breakdownDot, {backgroundColor: colors.accent.goldenYellow}]} />
            <Text style={styles.breakdownLabel}>Referrals</Text>
            <Text style={styles.breakdownValue}>
              ${data.breakdownByType.referralCredits.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.mintGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  headerTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.h3,
    color: colors.primary.freshAvocadoGreen,
  },
  statValueLarge: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  statLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  changeText: {
    ...textStyles.labelSmall,
    marginLeft: 2,
  },
  divider: {
    width: 1,
    backgroundColor: colors.neutral.gray200,
    marginHorizontal: spacing.md,
  },
  chartContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chartTitle: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: CHART_HEIGHT,
    width: CHART_WIDTH,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: borderRadius.sm,
    minHeight: 4,
  },
  barLabel: {
    ...textStyles.labelSmall,
    color: colors.text.light,
    marginTop: 4,
  },
  breakdown: {
    backgroundColor: colors.background.cream,
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  breakdownTitle: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  breakdownLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginRight: 4,
  },
  breakdownValue: {
    ...textStyles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
});
