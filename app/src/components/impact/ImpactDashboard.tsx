import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {CommunityStats, ImpactStats, MatchingCampaign} from '../../types/impact';
import {BADGE_CONFIG} from '../../types/impact';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface ImpactDashboardProps {
  stats: ImpactStats;
  communityStats?: CommunityStats;
  matchingCampaign?: MatchingCampaign | null;
}

export function ImpactDashboard({
  stats,
  communityStats,
  matchingCampaign,
}: ImpactDashboardProps): React.JSX.Element {
  const currentBadgeConfig = BADGE_CONFIG[stats.currentBadge];
  const nextBadgeConfig = stats.nextBadge ? BADGE_CONFIG[stats.nextBadge] : null;

  const badgeProgress = nextBadgeConfig
    ? (stats.mealsContributed - currentBadgeConfig.mealsRequired) /
      (nextBadgeConfig.mealsRequired - currentBadgeConfig.mealsRequired)
    : 1;

  return (
    <View style={styles.container}>
      {/* Personal Impact Card */}
      <Card style={styles.impactCard} mode="elevated">
        <View style={styles.impactHeader}>
          <View style={styles.badgeContainer}>
            <View style={[styles.badgeCircle, {backgroundColor: currentBadgeConfig.color + '30'}]}>
              <Icon
                name={currentBadgeConfig.icon}
                size={40}
                color={currentBadgeConfig.color}
              />
            </View>
            <Text style={styles.badgeLabel}>{currentBadgeConfig.label}</Text>
          </View>
          <View style={styles.impactStats}>
            <View style={styles.impactStatItem}>
              <Text style={styles.impactStatValue}>{stats.mealsContributed}</Text>
              <Text style={styles.impactStatLabel}>Meals Given</Text>
            </View>
            <View style={styles.impactStatItem}>
              <Text style={styles.impactStatValue}>${stats.totalDonations}</Text>
              <Text style={styles.impactStatLabel}>Total Donated</Text>
            </View>
          </View>
        </View>

        {/* Progress to next badge */}
        {nextBadgeConfig && (
          <View style={styles.progressSection}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>
                Progress to {nextBadgeConfig.label}
              </Text>
              <Text style={styles.progressValue}>
                {stats.mealsToNextBadge} meals to go
              </Text>
            </View>
            <ProgressBar
              progress={Math.max(0, Math.min(1, badgeProgress))}
              color={nextBadgeConfig.color}
              style={styles.progressBar}
            />
          </View>
        )}

        {/* Quick stats */}
        <View style={styles.quickStats}>
          <View style={styles.quickStatItem}>
            <Icon name="gift" size={20} color={colors.primary.freshAvocadoGreen} />
            <Text style={styles.quickStatValue}>{stats.donationCount}</Text>
            <Text style={styles.quickStatLabel}>Donations</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Icon name="star" size={20} color={colors.accent.sunriseOrange} />
            <Text style={styles.quickStatValue}>
              {stats.totalPointsDonated.toLocaleString()}
            </Text>
            <Text style={styles.quickStatLabel}>Points Donated</Text>
          </View>
          <View style={styles.quickStatDivider} />
          <View style={styles.quickStatItem}>
            <Icon name="calendar-check" size={20} color={colors.primary.freshAvocadoGreen} />
            <Text style={styles.quickStatValue}>{stats.foodDrivesParticipated}</Text>
            <Text style={styles.quickStatLabel}>Food Drives</Text>
          </View>
        </View>
      </Card>

      {/* Matching Campaign Banner */}
      {matchingCampaign?.isActive && (
        <Card style={styles.matchingCard} mode="elevated">
          <View style={styles.matchingContent}>
            <View style={styles.matchingBadge}>
              <Icon name="fire" size={24} color={colors.background.white} />
              <Text style={styles.matchingMultiplier}>{matchingCampaign.multiplier}X</Text>
            </View>
            <View style={styles.matchingInfo}>
              <Text style={styles.matchingTitle}>{matchingCampaign.name}</Text>
              <Text style={styles.matchingDescription} numberOfLines={2}>
                {matchingCampaign.description}
              </Text>
              <Text style={styles.matchingSponsor}>
                Sponsored by {matchingCampaign.sponsorName}
              </Text>
            </View>
          </View>
          <View style={styles.matchingProgress}>
            <ProgressBar
              progress={matchingCampaign.currentMatchedAmount / matchingCampaign.maxMatchAmount}
              color={colors.accent.sunriseOrange}
              style={styles.matchingProgressBar}
            />
            <Text style={styles.matchingProgressText}>
              ${matchingCampaign.currentMatchedAmount.toLocaleString()} of $
              {matchingCampaign.maxMatchAmount.toLocaleString()} matched
            </Text>
          </View>
        </Card>
      )}

      {/* Community Stats */}
      {communityStats && (
        <Card style={styles.communityCard} mode="elevated">
          <Text style={styles.sectionTitle}>Community Impact</Text>
          <View style={styles.communityStats}>
            <View style={styles.communityStatItem}>
              <Icon name="food" size={28} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.communityStatValue}>
                {communityStats.totalMealsDonated.toLocaleString()}
              </Text>
              <Text style={styles.communityStatLabel}>Meals Donated</Text>
            </View>
            <View style={styles.communityStatItem}>
              <Icon name="account-group" size={28} color={colors.accent.sunriseOrange} />
              <Text style={styles.communityStatValue}>
                {communityStats.totalDonors.toLocaleString()}
              </Text>
              <Text style={styles.communityStatLabel}>Donors</Text>
            </View>
            <View style={styles.communityStatItem}>
              <Icon name="heart-multiple" size={28} color={colors.status.error} />
              <Text style={styles.communityStatValue}>
                {communityStats.totalCharities}
              </Text>
              <Text style={styles.communityStatLabel}>Charities</Text>
            </View>
          </View>
          {communityStats.recentMilestone && (
            <View style={styles.milestoneContainer}>
              <Icon name="party-popper" size={18} color={colors.accent.sunriseOrange} />
              <Text style={styles.milestoneText}>{communityStats.recentMilestone}</Text>
            </View>
          )}
        </Card>
      )}

      {/* Rank display */}
      {stats.rank && (
        <View style={styles.rankBanner}>
          <Icon name="trophy" size={20} color={colors.accent.sunriseOrange} />
          <Text style={styles.rankText}>
            You're ranked #{stats.rank} in your community!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  impactCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
  },
  impactHeader: {
    flexDirection: 'row',
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  badgeContainer: {
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  badgeCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    fontWeight: '600',
    textAlign: 'center',
  },
  impactStats: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.sm,
  },
  impactStatItem: {},
  impactStatValue: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  impactStatLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  progressSection: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  progressValue: {
    ...textStyles.labelSmall,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background.cream,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  quickStatItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickStatValue: {
    ...textStyles.body,
    fontWeight: '700',
    color: colors.text.primary,
    marginTop: 4,
  },
  quickStatLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  quickStatDivider: {
    width: 1,
    backgroundColor: colors.neutral.gray300,
    marginVertical: spacing.xs,
  },
  matchingCard: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    borderRadius: borderRadius.lg,
  },
  matchingContent: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  matchingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.sunriseOrange,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
    marginRight: spacing.md,
  },
  matchingMultiplier: {
    ...textStyles.h4,
    color: colors.background.white,
    fontWeight: '700',
    marginLeft: 4,
  },
  matchingInfo: {
    flex: 1,
  },
  matchingTitle: {
    ...textStyles.body,
    color: colors.background.white,
    fontWeight: '700',
  },
  matchingDescription: {
    ...textStyles.caption,
    color: colors.background.white,
    opacity: 0.9,
    marginTop: 2,
  },
  matchingSponsor: {
    ...textStyles.caption,
    color: colors.background.white,
    opacity: 0.7,
    marginTop: 4,
  },
  matchingProgress: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  matchingProgressBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  matchingProgressText: {
    ...textStyles.caption,
    color: colors.background.white,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  communityCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  communityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  communityStatItem: {
    alignItems: 'center',
  },
  communityStatValue: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  communityStatLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  milestoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.sunriseOrange + '15',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginTop: spacing.md,
  },
  milestoneText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
    marginLeft: spacing.xs,
    flex: 1,
  },
  rankBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent.sunriseOrange + '15',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
  },
  rankText: {
    ...textStyles.body,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});
