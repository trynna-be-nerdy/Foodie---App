import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {PostEarnings} from '../../types/monetization';
import {formatEarnings} from '../../types/monetization';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface PostEarningsBreakdownProps {
  posts: PostEarnings[];
  onPostPress?: (postId: string) => void;
}

export function PostEarningsBreakdown({
  posts,
  onPostPress,
}: PostEarningsBreakdownProps): React.JSX.Element {
  // Sort by earnings descending
  const sortedPosts = [...posts].sort((a, b) => b.totalEarnings - a.totalEarnings);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Post Earnings</Text>
      <Text style={styles.sectionSubtitle}>
        See how each of your posts is performing
      </Text>

      {sortedPosts.map((post, index) => (
        <Card
          key={post.postId}
          style={styles.postCard}
          mode="elevated"
          onPress={() => onPostPress?.(post.postId)}>
          <View style={styles.postContent}>
            {/* Thumbnail */}
            <View style={styles.thumbnailContainer}>
              {post.postImageUrl ? (
                <Image source={{uri: post.postImageUrl}} style={styles.thumbnail} />
              ) : (
                <View style={[styles.thumbnail, styles.thumbnailPlaceholder]}>
                  <Icon name="image" size={24} color={colors.text.light} />
                </View>
              )}
              {index === 0 && (
                <View style={styles.topBadge}>
                  <Icon name="crown" size={12} color={colors.background.white} />
                </View>
              )}
            </View>

            {/* Post Info */}
            <View style={styles.postInfo}>
              <Text style={styles.postTitle} numberOfLines={1}>
                {post.postTitle}
              </Text>

              {/* Engagement Stats */}
              <View style={styles.engagementRow}>
                <View style={styles.engagementItem}>
                  <Icon name="eye" size={14} color={colors.text.secondary} />
                  <Text style={styles.engagementValue}>
                    {post.views >= 1000 ? `${(post.views / 1000).toFixed(1)}K` : post.views}
                  </Text>
                </View>
                <View style={styles.engagementItem}>
                  <Icon name="heart" size={14} color={colors.text.secondary} />
                  <Text style={styles.engagementValue}>{post.likes}</Text>
                </View>
                <View style={styles.engagementItem}>
                  <Icon name="comment" size={14} color={colors.text.secondary} />
                  <Text style={styles.engagementValue}>{post.comments}</Text>
                </View>
                <View style={styles.engagementItem}>
                  <Icon name="share" size={14} color={colors.text.secondary} />
                  <Text style={styles.engagementValue}>{post.shares}</Text>
                </View>
              </View>

              {/* Campaign Badge */}
              {post.isEnrolledInCampaign && (
                <Chip
                  style={styles.campaignChip}
                  textStyle={styles.campaignChipText}
                  icon={() => (
                    <Icon name="bullhorn" size={14} color={colors.accent.sunriseOrange} />
                  )}
                  compact>
                  Sponsored
                </Chip>
              )}
            </View>

            {/* Earnings */}
            <View style={styles.earningsContainer}>
              <Text style={styles.totalEarnings}>
                {formatEarnings(post.totalEarnings)}
              </Text>
              <View style={styles.earningsBreakdown}>
                <Text style={styles.breakdownItem}>
                  Base: {formatEarnings(post.baseEarnings)}
                </Text>
                <Text style={styles.breakdownItem}>
                  Engage: {formatEarnings(post.engagementBonus)}
                </Text>
                {post.campaignBonus > 0 && (
                  <Text style={[styles.breakdownItem, styles.campaignBonus]}>
                    Campaign: +{formatEarnings(post.campaignBonus)}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </Card>
      ))}

      {posts.length === 0 && (
        <View style={styles.emptyState}>
          <Icon name="file-document-outline" size={48} color={colors.text.light} />
          <Text style={styles.emptyText}>No posts yet</Text>
          <Text style={styles.emptySubtext}>
            Create content to start earning!
          </Text>
        </View>
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
  postCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  postContent: {
    flexDirection: 'row',
    padding: spacing.sm,
  },
  thumbnailContainer: {
    position: 'relative',
    marginRight: spacing.sm,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: borderRadius.sm,
  },
  thumbnailPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.accent.sunriseOrange,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  postTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  engagementRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  engagementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  engagementValue: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginLeft: 2,
  },
  campaignChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accent.sunriseOrange + '15',
    marginTop: spacing.xs,
  },
  campaignChipText: {
    ...textStyles.caption,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
  },
  earningsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },
  totalEarnings: {
    ...textStyles.h4,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '700',
  },
  earningsBreakdown: {
    alignItems: 'flex-end',
  },
  breakdownItem: {
    ...textStyles.caption,
    color: colors.text.secondary,
    fontSize: 10,
  },
  campaignBonus: {
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
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
});
