import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {ValueRestaurant} from '../../types/value';
import {getValueScoreColor, getValueScoreLabel} from '../../types/value';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface BestValueCardProps {
  restaurant: ValueRestaurant;
  rank?: number;
  onPress?: () => void;
}

export function BestValueCard({
  restaurant,
  rank,
  onPress,
}: BestValueCardProps): React.JSX.Element {
  const scoreColor = getValueScoreColor(restaurant.valueScore);
  const scoreLabel = getValueScoreLabel(restaurant.valueScore);

  const priceIndicator = '$'.repeat(restaurant.priceLevel);

  return (
    <Card style={styles.card} mode="elevated">
      <Pressable onPress={onPress} style={styles.content}>
        {/* Rank Badge */}
        {rank !== undefined && (
          <View style={[styles.rankBadge, rank === 1 && styles.rankBadgeFirst]}>
            <Text style={styles.rankText}>#{rank}</Text>
          </View>
        )}

        {/* Restaurant Logo */}
        <View style={styles.logoContainer}>
          {restaurant.logoUrl ? (
            <Image
              source={{uri: restaurant.logoUrl}}
              style={styles.logo}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.logo, styles.logoPlaceholder]}>
              <Icon name="store" size={24} color={colors.neutral.gray400} />
            </View>
          )}
        </View>

        {/* Restaurant Info */}
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <View style={styles.metaRow}>
            <Text style={styles.cuisine}>{restaurant.cuisineType}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.price}>{priceIndicator}</Text>
            <Text style={styles.dot}>•</Text>
            <Icon name="star" size={14} color={colors.accent.goldenYellow} />
            <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          </View>
          <Text style={styles.avgCost}>
            Avg meal: ${restaurant.averageCostPerMeal.toFixed(2)}
          </Text>
        </View>

        {/* Value Score */}
        <View style={styles.scoreContainer}>
          <View style={[styles.scoreCircle, {borderColor: scoreColor}]}>
            <Text style={[styles.scoreValue, {color: scoreColor}]}>
              {restaurant.valueScore.toFixed(1)}
            </Text>
          </View>
          <Text style={[styles.scoreLabel, {color: scoreColor}]}>
            {scoreLabel}
          </Text>
        </View>
      </Pressable>

      {/* Value Breakdown */}
      <View style={styles.breakdown}>
        <View style={styles.breakdownItem}>
          <Icon name="star-circle" size={16} color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.breakdownText}>
            {restaurant.valueBreakdown.pointsValue.toFixed(1)} pts/$
          </Text>
        </View>
        <View style={styles.breakdownItem}>
          <Icon name="tag" size={16} color={colors.accent.sunriseOrange} />
          <Text style={styles.breakdownText}>
            {(restaurant.valueBreakdown.discountValue * 10).toFixed(0)}% off
          </Text>
        </View>
        <View style={styles.breakdownItem}>
          <Icon name="thumb-up" size={16} color={colors.accent.goldenYellow} />
          <Text style={styles.breakdownText}>
            {restaurant.valueBreakdown.qualityValue.toFixed(1)}/3
          </Text>
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
  content: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  rankBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: colors.neutral.gray200,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  rankBadgeFirst: {
    backgroundColor: colors.accent.goldenYellow,
  },
  rankText: {
    ...textStyles.labelSmall,
    fontWeight: '700',
    color: colors.text.primary,
  },
  logoContainer: {
    marginRight: spacing.md,
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
  },
  logoPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  cuisine: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  dot: {
    ...textStyles.bodySmall,
    color: colors.text.light,
    marginHorizontal: 4,
  },
  price: {
    ...textStyles.bodySmall,
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '600',
  },
  rating: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginLeft: 2,
  },
  avgCost: {
    ...textStyles.bodySmall,
    color: colors.text.light,
  },
  scoreContainer: {
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  scoreCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  scoreValue: {
    ...textStyles.h4,
    fontWeight: '700',
  },
  scoreLabel: {
    ...textStyles.labelSmall,
    marginTop: 2,
    textAlign: 'center',
  },
  breakdown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.cream,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownText: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginLeft: 4,
  },
});
