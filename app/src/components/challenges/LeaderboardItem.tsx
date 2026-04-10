import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  profilePhoto: string | null;
  totalPoints: number;
  achievementCount: number;
  isCurrentUser: boolean;
}

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
}

const badgeIcons = ['trophy', 'medal', 'star'];

export function LeaderboardItem({entry}: LeaderboardItemProps): React.JSX.Element {
  const initial = entry.username ? entry.username.charAt(0).toUpperCase() : '?';
  const badgeCount = Math.min(entry.achievementCount, badgeIcons.length);

  return (
    <Surface
      style={[styles.container, entry.isCurrentUser && styles.currentUser]}
      elevation={1}>
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>#{entry.rank}</Text>
      </View>

      {entry.profilePhoto ? (
        <Image source={{uri: entry.profilePhoto}} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.username} numberOfLines={1}>
          {entry.username}
        </Text>
        <View style={styles.badges}>
          {badgeIcons.slice(0, badgeCount).map(icon => (
            <Icon key={`${entry.userId}-${icon}`} name={icon} size={16} color={colors.accent.lemon} />
          ))}
          {entry.achievementCount > badgeIcons.length && (
            <Text style={styles.badgeCount}>+{entry.achievementCount - badgeIcons.length}</Text>
          )}
        </View>
      </View>

      <View style={styles.points}>
        <Text style={styles.pointsValue}>{entry.totalPoints.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>pts</Text>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  currentUser: {
    borderWidth: 1,
    borderColor: colors.primary.freshAvocadoGreen,
    backgroundColor: colors.primary.freshAvocadoGreen + '0F',
  },
  rankBadge: {
    minWidth: 42,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.neutral.gray200,
    alignItems: 'center',
  },
  rankText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
    fontWeight: '600',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.lightGray,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.limeZest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...textStyles.label,
    color: colors.text.inverse,
  },
  info: {
    flex: 1,
  },
  username: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  badges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  badgeCount: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  points: {
    alignItems: 'flex-end',
  },
  pointsValue: {
    ...textStyles.h4,
    color: colors.primary.basilLeaf,
  },
  pointsLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
});
