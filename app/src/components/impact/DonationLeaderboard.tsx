import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {LeaderboardEntry} from '../../types/impact';
import {BADGE_CONFIG} from '../../types/impact';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface DonationLeaderboardProps {
  entries: LeaderboardEntry[];
  scope: 'local' | 'national' | 'friends';
  onScopeChange?: (scope: 'local' | 'national' | 'friends') => void;
}

const SCOPE_OPTIONS: {value: 'local' | 'national' | 'friends'; label: string; icon: string}[] = [
  {value: 'national', label: 'National', icon: 'earth'},
  {value: 'local', label: 'Local', icon: 'map-marker'},
  {value: 'friends', label: 'Friends', icon: 'account-group'},
];

function getRankColor(rank: number): string {
  switch (rank) {
    case 1:
      return '#FFD700'; // Gold
    case 2:
      return '#C0C0C0'; // Silver
    case 3:
      return '#CD7F32'; // Bronze
    default:
      return colors.text.secondary;
  }
}

function getRankIcon(rank: number): string {
  switch (rank) {
    case 1:
      return 'trophy';
    case 2:
      return 'medal';
    case 3:
      return 'medal-outline';
    default:
      return '';
  }
}

export function DonationLeaderboard({
  entries,
  scope,
  onScopeChange,
}: DonationLeaderboardProps): React.JSX.Element {
  // Separate top 3 and the rest
  const topThree = entries.filter(e => e.rank <= 3 && !e.isCurrentUser);
  const otherEntries = entries.filter(e => e.rank > 3 || e.isCurrentUser);

  return (
    <Card style={styles.container} mode="elevated">
      <View style={styles.header}>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.scopeSelector}>
          {SCOPE_OPTIONS.map(option => (
            <Chip
              key={option.value}
              selected={scope === option.value}
              onPress={() => onScopeChange?.(option.value)}
              style={[
                styles.scopeChip,
                scope === option.value && styles.scopeChipSelected,
              ]}
              textStyle={[
                styles.scopeChipText,
                scope === option.value && styles.scopeChipTextSelected,
              ]}
              compact>
              {option.label}
            </Chip>
          ))}
        </View>
      </View>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <View style={styles.podium}>
          {/* Second place */}
          <View style={styles.podiumItem}>
            <View style={[styles.podiumAvatar, styles.podiumSecond]}>
              {topThree[1]?.avatarUrl ? (
                <Image source={{uri: topThree[1].avatarUrl}} style={styles.podiumAvatarImage} />
              ) : (
                <Icon name="account" size={24} color={colors.text.secondary} />
              )}
            </View>
            <Icon name="medal" size={20} color="#C0C0C0" />
            <Text style={styles.podiumName} numberOfLines={1}>
              {topThree[1]?.username}
            </Text>
            <Text style={styles.podiumMeals}>{topThree[1]?.mealsContributed} meals</Text>
          </View>

          {/* First place */}
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <View style={[styles.podiumAvatar, styles.podiumAvatarFirst]}>
              {topThree[0]?.avatarUrl ? (
                <Image source={{uri: topThree[0].avatarUrl}} style={styles.podiumAvatarImage} />
              ) : (
                <Icon name="account" size={32} color={colors.text.secondary} />
              )}
            </View>
            <Icon name="trophy" size={24} color="#FFD700" />
            <Text style={[styles.podiumName, styles.podiumNameFirst]} numberOfLines={1}>
              {topThree[0]?.username}
            </Text>
            <Text style={styles.podiumMeals}>{topThree[0]?.mealsContributed} meals</Text>
          </View>

          {/* Third place */}
          <View style={styles.podiumItem}>
            <View style={[styles.podiumAvatar, styles.podiumThird]}>
              {topThree[2]?.avatarUrl ? (
                <Image source={{uri: topThree[2].avatarUrl}} style={styles.podiumAvatarImage} />
              ) : (
                <Icon name="account" size={24} color={colors.text.secondary} />
              )}
            </View>
            <Icon name="medal-outline" size={20} color="#CD7F32" />
            <Text style={styles.podiumName} numberOfLines={1}>
              {topThree[2]?.username}
            </Text>
            <Text style={styles.podiumMeals}>{topThree[2]?.mealsContributed} meals</Text>
          </View>
        </View>
      )}

      {/* Other entries list */}
      <View style={styles.list}>
        {otherEntries.map(entry => {
          const badgeConfig = BADGE_CONFIG[entry.badge];
          const rankIcon = getRankIcon(entry.rank);
          const rankColor = getRankColor(entry.rank);

          return (
            <View
              key={entry.userId}
              style={[
                styles.listItem,
                entry.isCurrentUser && styles.listItemCurrentUser,
              ]}>
              <View style={styles.rankContainer}>
                {rankIcon ? (
                  <Icon name={rankIcon} size={20} color={rankColor} />
                ) : (
                  <Text style={styles.rankNumber}>{entry.rank}</Text>
                )}
              </View>

              <View style={styles.avatarContainer}>
                {entry.avatarUrl ? (
                  <Image source={{uri: entry.avatarUrl}} style={styles.avatar} />
                ) : (
                  <View style={[styles.avatar, styles.avatarPlaceholder]}>
                    <Icon
                      name={entry.isCurrentUser ? 'account-circle' : 'account'}
                      size={20}
                      color={entry.isCurrentUser ? colors.primary.freshAvocadoGreen : colors.text.secondary}
                    />
                  </View>
                )}
              </View>

              <View style={styles.userInfo}>
                <Text
                  style={[
                    styles.username,
                    entry.isCurrentUser && styles.usernameCurrentUser,
                  ]}
                  numberOfLines={1}>
                  {entry.username}
                  {entry.isCurrentUser && ' (You)'}
                </Text>
                <View style={styles.badgeRow}>
                  <Icon name={badgeConfig.icon} size={14} color={badgeConfig.color} />
                  <Text style={[styles.badgeLabel, {color: badgeConfig.color}]}>
                    {badgeConfig.label}
                  </Text>
                </View>
              </View>

              <View style={styles.mealsContainer}>
                <Text style={styles.mealsValue}>{entry.mealsContributed}</Text>
                <Text style={styles.mealsLabel}>meals</Text>
              </View>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  header: {
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  scopeSelector: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  scopeChip: {
    backgroundColor: colors.neutral.gray100,
  },
  scopeChipSelected: {
    backgroundColor: '#2D5016',
  },
  scopeChipText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  scopeChipTextSelected: {
    color: '#000000',
    fontWeight: '700',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: colors.background.cream,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.xs,
  },
  podiumFirst: {
    marginBottom: spacing.md,
  },
  podiumAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
    borderWidth: 3,
  },
  podiumAvatarFirst: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  podiumSecond: {
    borderColor: '#C0C0C0',
  },
  podiumThird: {
    borderColor: '#CD7F32',
  },
  podiumAvatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  podiumName: {
    ...textStyles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
    marginTop: spacing.xs,
    textAlign: 'center',
    maxWidth: 80,
  },
  podiumNameFirst: {
    ...textStyles.body,
    fontWeight: '700',
  },
  podiumMeals: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray100,
  },
  listItemCurrentUser: {
    backgroundColor: colors.primary.freshAvocadoGreen + '10',
    borderRadius: borderRadius.md,
    marginHorizontal: -spacing.sm,
    paddingHorizontal: spacing.sm,
    borderBottomWidth: 0,
  },
  rankContainer: {
    width: 32,
    alignItems: 'center',
  },
  rankNumber: {
    ...textStyles.body,
    color: colors.text.secondary,
    fontWeight: '600',
  },
  avatarContainer: {
    marginRight: spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  avatarPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  username: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '500',
  },
  usernameCurrentUser: {
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  badgeLabel: {
    ...textStyles.caption,
    marginLeft: 4,
    fontWeight: '500',
  },
  mealsContainer: {
    alignItems: 'flex-end',
  },
  mealsValue: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '700',
  },
  mealsLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
});
