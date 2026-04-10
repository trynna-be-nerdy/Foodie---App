import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Card, ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {Budget} from '../../types/value';
import {CATEGORY_CONFIG} from '../../types/value';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface BudgetTrackerProps {
  budget: Budget;
  onEditBudget?: () => void;
}

export function BudgetTracker({
  budget,
  onEditBudget,
}: BudgetTrackerProps): React.JSX.Element {
  const progressColor = useMemo(() => {
    if (budget.percentUsed >= 100) return colors.status.error;
    if (budget.percentUsed >= budget.alertThreshold) return colors.accent.sunriseOrange;
    if (budget.percentUsed >= 60) return colors.accent.goldenYellow;
    return colors.primary.freshAvocadoGreen;
  }, [budget.percentUsed, budget.alertThreshold]);

  const daysRemaining = useMemo(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return endOfMonth.getDate() - now.getDate();
  }, []);

  const dailyBudgetRemaining = useMemo(() => {
    if (daysRemaining <= 0) return 0;
    return budget.remaining / daysRemaining;
  }, [budget.remaining, daysRemaining]);

  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.headerIcon}>
            <Icon name="wallet" size={24} color={colors.primary.freshAvocadoGreen} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Monthly Budget</Text>
            <Text style={styles.headerSubtitle}>
              ${budget.monthlyBudget.toFixed(0)}/month
            </Text>
          </View>
        </View>
        {onEditBudget && (
          <Button
            mode="text"
            compact
            onPress={onEditBudget}
            textColor={colors.primary.basilLeaf}>
            Edit
          </Button>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressLabels}>
          <Text style={styles.spentLabel}>
            ${budget.spent.toFixed(2)} spent
          </Text>
          <Text style={styles.remainingLabel}>
            ${budget.remaining.toFixed(2)} left
          </Text>
        </View>
        <ProgressBar
          progress={Math.min(budget.percentUsed / 100, 1)}
          color={progressColor}
          style={styles.progressBar}
        />
        <View style={styles.progressLabels}>
          <Text style={styles.percentLabel}>
            {budget.percentUsed.toFixed(0)}% used
          </Text>
          <Text style={styles.daysLabel}>
            {daysRemaining} days left
          </Text>
        </View>
      </View>

      {/* Alert Warning */}
      {budget.isAlertTriggered && (
        <View style={styles.alertBanner}>
          <Icon name="alert-circle" size={20} color={colors.status.error} />
          <Text style={styles.alertText}>
            You've used {budget.percentUsed.toFixed(0)}% of your budget!
          </Text>
        </View>
      )}

      {/* Daily Budget Info */}
      <View style={styles.dailySection}>
        <View style={styles.dailyItem}>
          <Text style={styles.dailyValue}>
            ${budget.dailyAverage.toFixed(2)}
          </Text>
          <Text style={styles.dailyLabel}>Daily Avg</Text>
        </View>
        <View style={styles.dailyDivider} />
        <View style={styles.dailyItem}>
          <Text style={styles.dailyValue}>
            ${dailyBudgetRemaining.toFixed(2)}
          </Text>
          <Text style={styles.dailyLabel}>Per Day Left</Text>
        </View>
        <View style={styles.dailyDivider} />
        <View style={styles.dailyItem}>
          <Text
            style={[
              styles.dailyValue,
              budget.projectedMonthlySpend > budget.monthlyBudget && {
                color: colors.status.error,
              },
            ]}>
            ${budget.projectedMonthlySpend.toFixed(0)}
          </Text>
          <Text style={styles.dailyLabel}>Projected</Text>
        </View>
      </View>

      {/* Category Breakdown */}
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>Spending by Category</Text>
        <View style={styles.categoryList}>
          {budget.categoryBreakdown.map(cat => {
            const config = CATEGORY_CONFIG[cat.category];
            return (
              <View key={cat.category} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View
                    style={[
                      styles.categoryIcon,
                      {backgroundColor: config.color + '20'},
                    ]}>
                    <Icon name={config.icon} size={16} color={config.color} />
                  </View>
                  <Text style={styles.categoryLabel}>{config.label}</Text>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryAmount}>
                    ${cat.spent.toFixed(2)}
                  </Text>
                  <Text style={styles.categoryPercent}>
                    {cat.percentage.toFixed(0)}%
                  </Text>
                </View>
              </View>
            );
          })}
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
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
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
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  headerSubtitle: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  progressSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  spentLabel: {
    ...textStyles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  remainingLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  progressBar: {
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.neutral.gray200,
  },
  percentLabel: {
    ...textStyles.labelSmall,
    color: colors.text.light,
    marginTop: 4,
  },
  daysLabel: {
    ...textStyles.labelSmall,
    color: colors.text.light,
    marginTop: 4,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.status.errorLight,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
  },
  alertText: {
    ...textStyles.bodySmall,
    color: colors.status.error,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  dailySection: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.cream,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  dailyItem: {
    flex: 1,
    alignItems: 'center',
  },
  dailyDivider: {
    width: 1,
    backgroundColor: colors.neutral.gray200,
  },
  dailyValue: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  dailyLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  categorySection: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  categoryTitle: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  categoryList: {
    gap: spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryLabel: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  categoryRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmount: {
    ...textStyles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
    marginRight: spacing.sm,
  },
  categoryPercent: {
    ...textStyles.labelSmall,
    color: colors.text.light,
    width: 32,
    textAlign: 'right',
  },
});
