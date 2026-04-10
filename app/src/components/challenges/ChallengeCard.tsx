import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, ProgressBar, Surface, Text} from 'react-native-paper';

import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  requirements: {count: number; specificItems?: string[]};
  rewardFoodiePoints: number;
  rewardGiftCardValue: number | null;
  sponsorRestaurant: {id: string; name: string; imageUrl: string | null} | null;
  startDate: string;
  endDate: string;
  participantCount: number;
  userProgress: number | null;
  isParticipating: boolean;
  isCompleted: boolean;
  completedAt?: string | null;
}

interface ChallengeCardProps {
  challenge: Challenge;
  actionLabel?: string;
  onAction?: () => void;
  actionLoading?: boolean;
  actionDisabled?: boolean;
  onPress?: () => void;
  showCompletedDetails?: boolean;
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) {
    return 'Unknown date';
  }
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
};

const getRewardSummary = (challenge: Challenge) => {
  const rewards: string[] = [];
  if (challenge.rewardFoodiePoints > 0) {
    rewards.push(`+${challenge.rewardFoodiePoints} pts`);
  }
  if (challenge.rewardGiftCardValue) {
    rewards.push(`$${challenge.rewardGiftCardValue} gift card`);
  }
  return rewards.length ? rewards.join(' • ') : 'Rewards pending';
};

export function ChallengeCard({
  challenge,
  actionLabel,
  onAction,
  actionLoading,
  actionDisabled,
  onPress,
  showCompletedDetails,
}: ChallengeCardProps): React.JSX.Element {
  const progressTarget = challenge.requirements?.count ?? 0;
  const progressValue =
    progressTarget > 0 && challenge.userProgress !== null
      ? Math.min(challenge.userProgress / progressTarget, 1)
      : null;

  const content = (
    <Surface style={styles.card} elevation={1}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {challenge.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {challenge.description}
          </Text>
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>{challenge.type}</Text>
        </View>
      </View>

      {challenge.sponsorRestaurant && (
        <View style={styles.sponsorRow}>
          {challenge.sponsorRestaurant.imageUrl ? (
            <Image source={{uri: challenge.sponsorRestaurant.imageUrl}} style={styles.sponsorImage} />
          ) : (
            <View style={styles.sponsorPlaceholder}>
              <Text style={styles.sponsorInitial}>
                {challenge.sponsorRestaurant.name.charAt(0)}
              </Text>
            </View>
          )}
          <Text style={styles.sponsorName} numberOfLines={1}>
            Sponsored by {challenge.sponsorRestaurant.name}
          </Text>
        </View>
      )}

      {progressValue !== null && (
        <View style={styles.progressRow}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Progress</Text>
            <Text style={styles.progressValue}>
              {challenge.userProgress}/{progressTarget}
            </Text>
          </View>
          <ProgressBar progress={progressValue} color={colors.primary.freshAvocadoGreen} />
        </View>
      )}

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Ends {formatDate(challenge.endDate)}</Text>
        <Text style={styles.metaText}>{challenge.participantCount} participants</Text>
      </View>

      {showCompletedDetails && (
        <View style={styles.completedRow}>
          <View>
            <Text style={styles.completedLabel}>Rewards earned</Text>
            <Text style={styles.completedValue}>{getRewardSummary(challenge)}</Text>
          </View>
          <View>
            <Text style={styles.completedLabel}>Completed</Text>
            <Text style={styles.completedValue}>
              {formatDate(challenge.completedAt ?? challenge.endDate)}
            </Text>
          </View>
        </View>
      )}

      {actionLabel && onAction && (
        <Button
          mode="contained"
          loading={actionLoading}
          disabled={actionDisabled}
          onPress={onAction}
          buttonColor={colors.primary.freshAvocadoGreen}
          style={styles.actionButton}>
          {actionLabel}
        </Button>
      )}
    </Surface>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  description: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  typeBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen + '1A',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  typeText: {
    ...textStyles.caption,
    color: colors.primary.basilLeaf,
  },
  sponsorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  sponsorImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background.lightGray,
  },
  sponsorPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.limeZest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sponsorInitial: {
    ...textStyles.label,
    color: colors.text.inverse,
  },
  sponsorName: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    flex: 1,
  },
  progressRow: {
    marginTop: spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  progressLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  progressValue: {
    ...textStyles.caption,
    color: colors.text.primary,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  metaText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  completedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  completedLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  completedValue: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    marginTop: 2,
  },
  actionButton: {
    marginTop: spacing.md,
  },
});
