import React, {useMemo, useRef, useState} from 'react';
import {Animated, Image, Pressable, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Card, IconButton, Text} from 'react-native-paper';
import * as Haptics from 'expo-haptics';

import {FeedRestaurant} from '../../types/feed';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface RestaurantCardProps {
  restaurant: FeedRestaurant;
  onPress?: () => void;
  onSaveToggle?: (restaurantId: string, nextSaved: boolean) => void;
  onShare?: () => void;
  onViewMenu?: () => void;
  onOrder?: () => void;
  initialSaved?: boolean;
}

export const RestaurantCard = React.memo(function RestaurantCard({
  restaurant,
  onPress,
  onSaveToggle,
  onShare,
  onViewMenu,
  onOrder,
  initialSaved = false,
}: RestaurantCardProps): React.JSX.Element {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const distanceLabel = useMemo(() => {
    if (restaurant.distanceKm === null || restaurant.distanceKm === undefined) {
      return null;
    }
    const miles = restaurant.distanceKm * 0.621371;
    return `${miles.toFixed(1)} mi`;
  }, [restaurant.distanceKm]);

  const handleSaveToggle = () => {
    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    onSaveToggle?.(restaurant.id, nextSaved);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => undefined);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Card style={styles.card} mode="elevated">
      <Pressable onPress={onPress} android_ripple={{color: colors.neutral.gray200}}>
        <View style={styles.imageWrapper}>
          {restaurant.imageUrl ? (
            <Image source={{uri: restaurant.imageUrl}} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]} />
          )}
          <LinearGradient
            colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.75)']}
            style={styles.gradient}
          />
          <View style={styles.imageTopRow}>
            {restaurant.isLocalBusiness && (
              <View style={styles.localBadge}>
                <Text style={styles.localBadgeText}>Local</Text>
              </View>
            )}
            {distanceLabel && (
              <View style={styles.distanceBadge}>
                <Text style={styles.distanceText}>{distanceLabel}</Text>
              </View>
            )}
          </View>
          <View style={styles.imageBottom}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Text style={styles.cuisine}>{restaurant.cuisineTypes.slice(0, 2).join(' - ')}</Text>
          </View>
        </View>
      </Pressable>
      <View style={styles.content}>
        <View style={styles.metaRow}>
          <Text style={styles.rating}>
            {restaurant.rating.toFixed(1)} / 5 ({restaurant.reviewCount})
          </Text>
          <Text style={styles.price}>{'$'.repeat(Math.max(1, restaurant.priceRange))}</Text>
        </View>
        {restaurant.recommendationReason && (
          <Text style={styles.recommendation}>{restaurant.recommendationReason}</Text>
        )}
        <View style={styles.actionsRow}>
          <Animated.View style={{transform: [{scale: scaleAnim}]}}>
            <IconButton
              icon={isSaved ? 'heart' : 'heart-outline'}
              iconColor={isSaved ? colors.status.error : colors.text.secondary}
              size={20}
              onPress={handleSaveToggle}
              accessibilityLabel={isSaved ? 'Unsave restaurant' : 'Save restaurant'}
            />
          </Animated.View>
          <IconButton
            icon="share-variant-outline"
            iconColor={colors.text.secondary}
            size={20}
            onPress={onShare}
            accessibilityLabel="Share restaurant"
          />
          <IconButton
            icon="silverware-fork-knife"
            iconColor={colors.text.secondary}
            size={20}
            onPress={onViewMenu}
            accessibilityLabel="View menu"
          />
          <View style={styles.orderButton}>
            <Text style={styles.orderText} onPress={onOrder}>
              Order Now
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
});

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.base,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.background.white,
  },
  imageWrapper: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imagePlaceholder: {
    backgroundColor: colors.neutral.gray200,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  imageTopRow: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  localBadge: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  localBadgeText: {
    ...textStyles.caption,
    color: colors.text.inverse,
  },
  distanceBadge: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  distanceText: {
    ...textStyles.caption,
    color: colors.text.primary,
  },
  imageBottom: {
    position: 'absolute',
    bottom: spacing.md,
    left: spacing.base,
    right: spacing.base,
  },
  name: {
    ...textStyles.h3,
    color: colors.text.inverse,
  },
  cuisine: {
    ...textStyles.bodySmall,
    color: colors.neutral.gray100,
  },
  content: {
    padding: spacing.base,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  rating: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
  },
  price: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  recommendation: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  orderButton: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  orderText: {
    ...textStyles.bodySmall,
    color: colors.text.inverse,
  },
});
