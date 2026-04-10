import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Button, Card, Chip, ProgressBar, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {PromotionCampaign} from '../../types/monetization';
import {CAMPAIGN_TYPE_CONFIG} from '../../types/monetization';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface CampaignListProps {
  campaigns: PromotionCampaign[];
  onEnroll?: (campaignId: string) => void;
  onViewDetails?: (campaignId: string) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
}

function getDaysRemaining(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  const diff = end.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function CampaignList({
  campaigns,
  onEnroll,
  onViewDetails,
}: CampaignListProps): React.JSX.Element {
  // Separate active and upcoming campaigns
  const activeCampaigns = campaigns.filter(c => c.isActive);
  const upcomingCampaigns = campaigns.filter(c => !c.isActive);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Active Campaigns</Text>
      <Text style={styles.sectionSubtitle}>
        Enroll your posts in campaigns to earn bonus payouts
      </Text>

      {activeCampaigns.length === 0 && upcomingCampaigns.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="bullhorn-outline" size={48} color={colors.text.light} />
          <Text style={styles.emptyText}>No campaigns available</Text>
          <Text style={styles.emptySubtext}>
            Check back soon for new opportunities
          </Text>
        </View>
      )}

      {/* Active Campaigns */}
      {activeCampaigns.map(campaign => {
        const config = CAMPAIGN_TYPE_CONFIG[campaign.type];
        const daysRemaining = getDaysRemaining(campaign.endDate);
        const budgetProgress = campaign.budgetUsed / campaign.budget;
        const spotsRemaining = campaign.maxEnrollments
          ? campaign.maxEnrollments - campaign.enrolledPostCount
          : null;

        return (
          <Card
            key={campaign.id}
            style={styles.campaignCard}
            mode="elevated"
            onPress={() => onViewDetails?.(campaign.id)}>
            <View style={styles.campaignHeader}>
              {campaign.restaurantLogo ? (
                <Image
                  source={{uri: campaign.restaurantLogo}}
                  style={styles.restaurantLogo}
                />
              ) : (
                <View style={[styles.restaurantLogo, styles.logoPlaceholder]}>
                  <Icon name="store" size={20} color={colors.text.light} />
                </View>
              )}
              <View style={styles.campaignInfo}>
                <Text style={styles.restaurantName}>{campaign.restaurantName}</Text>
                <View style={styles.typeRow}>
                  <Chip
                    style={[styles.typeChip, {backgroundColor: config.color + '20'}]}
                    textStyle={[styles.typeChipText, {color: config.color}]}
                    icon={() => <Icon name={config.icon} size={14} color={config.color} />}
                    compact>
                    {config.label}
                  </Chip>
                  <View style={styles.multiplierBadge}>
                    <Text style={styles.multiplierText}>{campaign.payoutRateMultiplier}x</Text>
                  </View>
                </View>
              </View>
            </View>

            <Text style={styles.campaignTitle}>{campaign.title}</Text>
            <Text style={styles.campaignDescription} numberOfLines={2}>
              {campaign.description}
            </Text>

            {/* Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsLabel}>Requirements:</Text>
              {campaign.requirements.slice(0, 2).map((req, index) => (
                <View key={index} style={styles.requirementItem}>
                  <Icon name="check-circle" size={14} color={colors.primary.freshAvocadoGreen} />
                  <Text style={styles.requirementText}>{req}</Text>
                </View>
              ))}
              {campaign.requirements.length > 2 && (
                <Text style={styles.moreRequirements}>
                  +{campaign.requirements.length - 2} more
                </Text>
              )}
            </View>

            {/* Campaign Stats */}
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Icon name="clock-outline" size={16} color={colors.text.secondary} />
                <Text style={styles.statText}>
                  {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ending soon'}
                </Text>
              </View>
              {spotsRemaining !== null && (
                <View style={styles.statItem}>
                  <Icon name="account-multiple" size={16} color={colors.text.secondary} />
                  <Text style={styles.statText}>
                    {spotsRemaining > 0 ? `${spotsRemaining} spots left` : 'Full'}
                  </Text>
                </View>
              )}
            </View>

            {/* Budget Progress */}
            <View style={styles.budgetContainer}>
              <View style={styles.budgetHeader}>
                <Text style={styles.budgetLabel}>Campaign Budget</Text>
                <Text style={styles.budgetValue}>
                  ${campaign.budgetUsed.toFixed(0)} / ${campaign.budget.toFixed(0)}
                </Text>
              </View>
              <ProgressBar
                progress={budgetProgress}
                color={colors.primary.freshAvocadoGreen}
                style={styles.budgetBar}
              />
            </View>

            <Button
              mode="contained"
              onPress={() => onEnroll?.(campaign.id)}
              buttonColor={colors.primary.freshAvocadoGreen}
              icon="plus"
              style={styles.enrollButton}
              disabled={spotsRemaining === 0}>
              Enroll Post
            </Button>
          </Card>
        );
      })}

      {/* Upcoming Campaigns */}
      {upcomingCampaigns.length > 0 && (
        <>
          <Text style={[styles.sectionTitle, styles.upcomingTitle]}>Coming Soon</Text>
          {upcomingCampaigns.map(campaign => {
            const config = CAMPAIGN_TYPE_CONFIG[campaign.type];
            const startDate = new Date(campaign.startDate);
            const daysUntilStart = Math.ceil(
              (startDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
            );

            return (
              <Card
                key={campaign.id}
                style={[styles.campaignCard, styles.upcomingCard]}
                mode="elevated">
                <View style={styles.campaignHeader}>
                  {campaign.restaurantLogo ? (
                    <Image
                      source={{uri: campaign.restaurantLogo}}
                      style={styles.restaurantLogo}
                    />
                  ) : (
                    <View style={[styles.restaurantLogo, styles.logoPlaceholder]}>
                      <Icon name="store" size={20} color={colors.text.light} />
                    </View>
                  )}
                  <View style={styles.campaignInfo}>
                    <Text style={styles.restaurantName}>{campaign.restaurantName}</Text>
                    <View style={styles.typeRow}>
                      <Chip
                        style={[styles.typeChip, {backgroundColor: config.color + '20'}]}
                        textStyle={[styles.typeChipText, {color: config.color}]}
                        compact>
                        {config.label}
                      </Chip>
                      <View style={styles.multiplierBadge}>
                        <Text style={styles.multiplierText}>{campaign.payoutRateMultiplier}x</Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <View style={styles.upcomingBadge}>
                  <Icon name="calendar-clock" size={16} color={colors.accent.sunriseOrange} />
                  <Text style={styles.upcomingText}>
                    Starts {formatDate(campaign.startDate)} ({daysUntilStart} days)
                  </Text>
                </View>
              </Card>
            );
          })}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  sectionSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  upcomingTitle: {
    marginTop: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    ...textStyles.h4,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  emptySubtext: {
    ...textStyles.body,
    color: colors.text.light,
    marginTop: spacing.xs,
  },
  campaignCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  upcomingCard: {
    opacity: 0.85,
  },
  campaignHeader: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  restaurantLogo: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    marginRight: spacing.sm,
  },
  logoPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  campaignInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  restaurantName: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  typeChip: {
    height: 24,
  },
  typeChipText: {
    ...textStyles.caption,
    fontWeight: '600',
    marginLeft: 0,
    marginRight: 0,
  },
  multiplierBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  multiplierText: {
    ...textStyles.labelSmall,
    color: colors.background.white,
    fontWeight: '700',
  },
  campaignTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  campaignDescription: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  requirementsContainer: {
    backgroundColor: colors.background.cream,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  requirementsLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  requirementText: {
    ...textStyles.caption,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  moreRequirements: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  budgetContainer: {
    marginBottom: spacing.md,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  budgetLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  budgetValue: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  budgetBar: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.neutral.gray200,
  },
  enrollButton: {
    borderRadius: borderRadius.md,
  },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.sunriseOrange + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  upcomingText: {
    ...textStyles.caption,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
});
