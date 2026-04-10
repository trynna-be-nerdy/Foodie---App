import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Button, Card, Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {FoodieEvent} from '../../types/event';
import {EVENT_TYPE_COLORS, EVENT_TYPE_ICONS, EVENT_TYPE_LABELS} from '../../types/event';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface EventCardProps {
  event: FoodieEvent;
  onPress?: () => void;
  onRegister?: () => void;
  isRegistering?: boolean;
  compact?: boolean;
}

export function EventCard({
  event,
  onPress,
  onRegister,
  isRegistering = false,
  compact = false,
}: EventCardProps): React.JSX.Element {
  const formattedDate = useMemo(() => {
    const startDate = new Date(event.startTime);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
    return startDate.toLocaleDateString('en-US', options);
  }, [event.startTime]);

  const formattedTime = useMemo(() => {
    const startDate = new Date(event.startTime);
    const endDate = new Date(event.endTime);
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
    };
    const startTime = startDate.toLocaleTimeString('en-US', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-US', timeOptions);
    return `${startTime} - ${endTime}`;
  }, [event.startTime, event.endTime]);

  const distanceText = useMemo(() => {
    if (!event.distanceKm) return null;
    const miles = event.distanceKm * 0.621371;
    return `${miles.toFixed(1)} mi`;
  }, [event.distanceKm]);

  const spotsLeft = useMemo(() => {
    if (!event.maxAttendees) return null;
    const remaining = event.maxAttendees - event.registrationCount;
    if (remaining <= 0) return 'Full';
    if (remaining <= 5) return `Only ${remaining} spots left!`;
    return `${remaining} spots left`;
  }, [event.maxAttendees, event.registrationCount]);

  const typeColor = EVENT_TYPE_COLORS[event.type];
  const typeIcon = EVENT_TYPE_ICONS[event.type];
  const typeLabel = EVENT_TYPE_LABELS[event.type];

  if (compact) {
    return (
      <Card style={styles.compactCard} mode="elevated">
        <Pressable onPress={onPress} style={styles.compactContent}>
          <View style={[styles.typeIndicator, {backgroundColor: typeColor}]} />
          <View style={styles.compactInfo}>
            <Text style={styles.compactTitle} numberOfLines={1}>
              {event.title}
            </Text>
            <Text style={styles.compactSubtitle} numberOfLines={1}>
              {event.restaurant.name} • {formattedDate}
            </Text>
          </View>
          <Icon name="chevron-right" size={24} color={colors.neutral.gray400} />
        </Pressable>
      </Card>
    );
  }

  return (
    <Card style={styles.card} mode="elevated">
      <Pressable onPress={onPress}>
        {/* Image */}
        <View style={styles.imageContainer}>
          {event.imageUrl ? (
            <Image source={{uri: event.imageUrl}} style={styles.image} resizeMode="cover" />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Icon name={typeIcon} size={48} color={colors.neutral.gray300} />
            </View>
          )}

          {/* Type Badge */}
          <Chip
            style={[styles.typeBadge, {backgroundColor: typeColor}]}
            textStyle={styles.typeBadgeText}
            icon={() => <Icon name={typeIcon} size={14} color="#fff" />}>
            {typeLabel}
          </Chip>

          {/* Points Reward */}
          {event.pointsReward > 0 && (
            <View style={styles.pointsBadge}>
              <Icon name="star" size={14} color={colors.accent.goldenYellow} />
              <Text style={styles.pointsText}>+{event.pointsReward} pts</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title} numberOfLines={2}>
            {event.title}
          </Text>

          {/* Restaurant */}
          <View style={styles.restaurantRow}>
            <Icon name="store" size={16} color={colors.text.secondary} />
            <Text style={styles.restaurantName} numberOfLines={1}>
              {event.restaurant.name}
            </Text>
          </View>

          {/* Date & Time */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Icon name="calendar" size={16} color={colors.text.secondary} />
              <Text style={styles.infoText}>{formattedDate}</Text>
            </View>
            <View style={styles.infoItem}>
              <Icon name="clock-outline" size={16} color={colors.text.secondary} />
              <Text style={styles.infoText}>{formattedTime}</Text>
            </View>
          </View>

          {/* Distance & Spots */}
          <View style={styles.infoRow}>
            {distanceText && (
              <View style={styles.infoItem}>
                <Icon name="map-marker" size={16} color={colors.text.secondary} />
                <Text style={styles.infoText}>{distanceText}</Text>
              </View>
            )}
            <View style={styles.infoItem}>
              <Icon name="account-group" size={16} color={colors.text.secondary} />
              <Text style={styles.infoText}>
                {event.registrationCount} registered
              </Text>
            </View>
          </View>

          {/* Spots Left Warning */}
          {spotsLeft && (
            <View
              style={[
                styles.spotsWarning,
                spotsLeft === 'Full' && styles.spotsWarningFull,
              ]}>
              <Text
                style={[
                  styles.spotsWarningText,
                  spotsLeft === 'Full' && styles.spotsWarningTextFull,
                ]}>
                {spotsLeft}
              </Text>
            </View>
          )}

          {/* Action Button */}
          <Button
            mode={event.isRegistered ? 'outlined' : 'contained'}
            buttonColor={event.isRegistered ? undefined : colors.primary.freshAvocadoGreen}
            textColor={event.isRegistered ? colors.primary.freshAvocadoGreen : '#fff'}
            style={styles.actionButton}
            icon={event.isRegistered ? 'check' : 'calendar-plus'}
            loading={isRegistering}
            disabled={isRegistering || spotsLeft === 'Full'}
            onPress={e => {
              e.stopPropagation();
              onRegister?.();
            }}>
            {event.isRegistered ? 'Registered' : 'Register'}
          </Button>
        </View>
      </Pressable>
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
  compactCard: {
    marginBottom: spacing.sm,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.white,
  },
  compactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: spacing.md,
  },
  compactInfo: {
    flex: 1,
  },
  compactTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  compactSubtitle: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 160,
  },
  imagePlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  typeBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  pointsBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  pointsText: {
    ...textStyles.labelSmall,
    color: '#fff',
    marginLeft: 4,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  restaurantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  restaurantName: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  infoText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  spotsWarning: {
    backgroundColor: colors.accent.softYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  spotsWarningFull: {
    backgroundColor: colors.status.errorLight,
  },
  spotsWarningText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
  },
  spotsWarningTextFull: {
    color: colors.status.error,
  },
  actionButton: {
    marginTop: spacing.sm,
  },
});
