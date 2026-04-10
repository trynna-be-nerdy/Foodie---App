import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Button, Card, Chip, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {Charity} from '../../types/impact';
import {CHARITY_CATEGORY_CONFIG} from '../../types/impact';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface CharityCardProps {
  charity: Charity;
  onPress?: () => void;
  onDonate?: () => void;
}

export function CharityCard({
  charity,
  onPress,
  onDonate,
}: CharityCardProps): React.JSX.Element {
  const categoryConfig = CHARITY_CATEGORY_CONFIG[charity.category];

  return (
    <Card style={styles.card} mode="elevated">
      <View style={styles.cardContent}>
        <Pressable onPress={onPress}>
          {/* Header with Logo and Category */}
          <View style={styles.header}>
          <View style={styles.logoContainer}>
            {charity.logoUrl ? (
              <Image
                source={{uri: charity.logoUrl}}
                style={styles.logo}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.logo, styles.logoPlaceholder]}>
                <Icon
                  name={categoryConfig.icon}
                  size={32}
                  color={categoryConfig.color}
                />
              </View>
            )}
          </View>

          <View style={styles.headerInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.name} numberOfLines={1}>
                {charity.name}
              </Text>
              {charity.verified && (
                <Icon
                  name="check-decagram"
                  size={18}
                  color={colors.primary.freshAvocadoGreen}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Chip
              style={[styles.categoryChip, {backgroundColor: categoryConfig.color + '20'}]}
              textStyle={[styles.categoryText, {color: categoryConfig.color}]}
              compact>
              {categoryConfig.label}
            </Chip>
          </View>
        </View>

          {/* Mission */}
          <View style={styles.missionContainer}>
            <Text style={styles.mission} numberOfLines={2}>
              {charity.mission}
            </Text>
          </View>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Icon name="cash-multiple" size={18} color={colors.primary.freshAvocadoGreen} />
              <Text style={styles.statValue}>
                ${charity.totalDonations.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>raised</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="food-apple" size={18} color={colors.accent.sunriseOrange} />
              <Text style={styles.statValue}>
                {charity.totalMeals.toLocaleString()}
              </Text>
              <Text style={styles.statLabel}>meals</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Icon name="map-marker" size={18} color={colors.text.secondary} />
              <Text style={styles.statValue}>{charity.location}</Text>
            </View>
          </View>

          {/* Donate Button */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={e => {
                e.stopPropagation();
                onDonate?.();
              }}
              buttonColor={colors.primary.freshAvocadoGreen}
              icon="heart"
              style={styles.donateButton}>
              Donate
            </Button>
          </View>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
  },
  cardContent: {
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    padding: spacing.md,
    paddingBottom: spacing.sm,
  },
  logoContainer: {
    marginRight: spacing.md,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
  },
  logoPlaceholder: {
    backgroundColor: colors.neutral.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    ...textStyles.h4,
    color: colors.text.primary,
    flex: 1,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
  },
  categoryChip: {
    alignSelf: 'flex-start',
  },
  categoryText: {
    ...textStyles.labelSmall,
    fontWeight: '600',
  },
  missionContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  mission: {
    ...textStyles.body,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.cream,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    ...textStyles.labelSmall,
    color: colors.text.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  statLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginLeft: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.neutral.gray300,
  },
  buttonContainer: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  donateButton: {
    borderRadius: borderRadius.md,
  },
});
