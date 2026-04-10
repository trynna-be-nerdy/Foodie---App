import React, {useState} from 'react';
import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  IconButton,
  SegmentedButtons,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

import type {DecisionHelperInput, Recommendation} from '../../types/value';
import {getValueScoreColor} from '../../types/value';
import {getRecommendations} from '../../services/valueService';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface DecisionHelperProps {
  visible: boolean;
  onClose: () => void;
  onSelectRestaurant?: (restaurantId: string) => void;
}

const CUISINE_OPTIONS = [
  'Any',
  'Japanese',
  'Italian',
  'Mexican',
  'American',
  'Chinese',
  'Thai',
  'Indian',
  'Healthy',
];

const PRIORITY_OPTIONS = [
  {value: 'value', label: 'Best Value', icon: 'star-circle'},
  {value: 'quality', label: 'Quality', icon: 'thumb-up'},
  {value: 'points', label: 'Points', icon: 'gift'},
];

export function DecisionHelper({
  visible,
  onClose,
  onSelectRestaurant,
}: DecisionHelperProps): React.JSX.Element {
  const [step, setStep] = useState<'input' | 'loading' | 'results'>('input');
  const [cuisine, setCuisine] = useState<string>('Any');
  const [priceRange, setPriceRange] = useState<[number, number]>([1, 4]);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [priority, setPriority] = useState<'value' | 'speed' | 'quality' | 'points'>('value');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const handleSubmit = async () => {
    setStep('loading');

    const input: DecisionHelperInput = {
      craving: cuisine === 'Any' ? null : cuisine,
      priceRange: {min: priceRange[0], max: priceRange[1]},
      maxDistance,
      priority,
    };

    try {
      const results = await getRecommendations(input);
      setRecommendations(results);
      setStep('results');
    } catch (error) {
      console.error('Error getting recommendations:', error);
      setStep('input');
    }
  };

  const handleReset = () => {
    setStep('input');
    setCuisine('Any');
    setPriceRange([1, 4]);
    setMaxDistance(5);
    setPriority('value');
    setRecommendations([]);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  const renderInputStep = () => (
    <ScrollView style={styles.scrollContent}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What are you craving?</Text>
        <View style={styles.cuisineGrid}>
          {CUISINE_OPTIONS.map(c => (
            <Chip
              key={c}
              selected={cuisine === c}
              onPress={() => setCuisine(c)}
              style={styles.cuisineChip}
              selectedColor={colors.primary.freshAvocadoGreen}>
              {c}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Price Range</Text>
        <View style={styles.priceIndicator}>
          <Text style={styles.priceText}>
            {'$'.repeat(priceRange[0])} - {'$'.repeat(priceRange[1])}
          </Text>
        </View>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderLabel}>$</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={4}
            step={1}
            value={priceRange[1]}
            onValueChange={value => setPriceRange([1, value])}
            minimumTrackTintColor={colors.primary.freshAvocadoGreen}
            maximumTrackTintColor={colors.neutral.gray300}
            thumbTintColor={colors.primary.freshAvocadoGreen}
          />
          <Text style={styles.sliderLabel}>$$$$</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maximum Distance</Text>
        <View style={styles.distanceIndicator}>
          <Icon name="map-marker-distance" size={20} color={colors.text.secondary} />
          <Text style={styles.distanceText}>{maxDistance} miles</Text>
        </View>
        <Slider
          style={styles.fullSlider}
          minimumValue={1}
          maximumValue={15}
          step={1}
          value={maxDistance}
          onValueChange={setMaxDistance}
          minimumTrackTintColor={colors.primary.freshAvocadoGreen}
          maximumTrackTintColor={colors.neutral.gray300}
          thumbTintColor={colors.primary.freshAvocadoGreen}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What's most important?</Text>
        <SegmentedButtons
          value={priority}
          onValueChange={value => setPriority(value as typeof priority)}
          buttons={PRIORITY_OPTIONS.map(opt => ({
            value: opt.value,
            label: opt.label,
            icon: opt.icon,
          }))}
        />
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        buttonColor={colors.primary.freshAvocadoGreen}
        icon="magic-staff">
        Find My Perfect Meal
      </Button>
    </ScrollView>
  );

  const renderLoadingStep = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
      <Text style={styles.loadingText}>Finding the best options for you...</Text>
      <Text style={styles.loadingSubtext}>Analyzing value, quality, and points</Text>
    </View>
  );

  const renderResultsStep = () => (
    <ScrollView style={styles.scrollContent}>
      <Text style={styles.resultsTitle}>Top Recommendations</Text>
      <Text style={styles.resultsSubtitle}>
        Based on your preferences for {cuisine !== 'Any' ? cuisine : 'any cuisine'},{' '}
        up to {'$'.repeat(priceRange[1])}, within {maxDistance} miles
      </Text>

      {recommendations.map((rec, index) => (
        <Card key={rec.restaurant.id} style={styles.resultCard} mode="elevated">
          <View style={styles.resultHeader}>
            <View style={styles.resultRank}>
              <Text style={styles.resultRankText}>#{index + 1}</Text>
            </View>
            <View style={styles.resultMatchScore}>
              <Text style={styles.matchScoreText}>{rec.matchScore}% match</Text>
            </View>
          </View>

          <View style={styles.resultContent}>
            {rec.restaurant.logoUrl ? (
              <Image
                source={{uri: rec.restaurant.logoUrl}}
                style={styles.resultLogo}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.resultLogo, styles.resultLogoPlaceholder]}>
                <Icon name="store" size={24} color={colors.neutral.gray400} />
              </View>
            )}

            <View style={styles.resultInfo}>
              <Text style={styles.resultName}>{rec.restaurant.name}</Text>
              <Text style={styles.resultMeta}>
                {rec.restaurant.cuisineType} • {'$'.repeat(rec.restaurant.priceLevel)} •{' '}
                {rec.restaurant.rating}★
              </Text>

              <View style={styles.resultEstimates}>
                <View style={styles.estimateItem}>
                  <Icon name="cash" size={14} color={colors.text.secondary} />
                  <Text style={styles.estimateText}>
                    ~${rec.estimatedCost.toFixed(0)}
                  </Text>
                </View>
                <View style={styles.estimateItem}>
                  <Icon name="star" size={14} color={colors.accent.goldenYellow} />
                  <Text style={styles.estimateText}>
                    +{rec.estimatedPoints} pts
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={[
                styles.resultScore,
                {borderColor: getValueScoreColor(rec.restaurant.valueScore)},
              ]}>
              <Text
                style={[
                  styles.resultScoreText,
                  {color: getValueScoreColor(rec.restaurant.valueScore)},
                ]}>
                {rec.restaurant.valueScore.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Reasoning */}
          <View style={styles.reasoningSection}>
            {rec.reasoning.map((reason, i) => (
              <View key={i} style={styles.reasonItem}>
                <Icon
                  name="check-circle"
                  size={14}
                  color={colors.primary.freshAvocadoGreen}
                />
                <Text style={styles.reasonText}>{reason}</Text>
              </View>
            ))}
          </View>

          {/* Active Promotions */}
          {rec.activePromotions.length > 0 && (
            <View style={styles.promotionBanner}>
              <Icon name="fire" size={16} color={colors.accent.sunriseOrange} />
              <Text style={styles.promotionText}>
                {rec.activePromotions.join(' • ')}
              </Text>
            </View>
          )}

          <Button
            mode="contained"
            onPress={() => onSelectRestaurant?.(rec.restaurant.id)}
            style={styles.orderButton}
            buttonColor={colors.primary.freshAvocadoGreen}>
            Order Now
          </Button>
        </Card>
      ))}

      <Button
        mode="outlined"
        onPress={handleReset}
        style={styles.tryAgainButton}
        textColor={colors.primary.freshAvocadoGreen}>
        Try Different Options
      </Button>
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="close"
            onPress={handleClose}
            iconColor={colors.text.secondary}
          />
          <Text style={styles.headerTitle}>
            {step === 'results' ? 'Your Recommendations' : 'Where Should I Eat?'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {step === 'input' && renderInputStep()}
        {step === 'loading' && renderLoadingStep()}
        {step === 'results' && renderResultsStep()}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
    backgroundColor: colors.background.white,
  },
  headerTitle: {
    ...textStyles.h4,
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 48,
  },
  scrollContent: {
    flex: 1,
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  cuisineGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  cuisineChip: {
    marginBottom: spacing.xs,
  },
  priceIndicator: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  priceText: {
    ...textStyles.h4,
    color: colors.primary.freshAvocadoGreen,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    width: 40,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
  },
  fullSlider: {
    width: '100%',
  },
  distanceIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  distanceText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginLeft: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  loadingSubtext: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  resultsTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  resultsSubtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  resultCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
    overflow: 'hidden',
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.sm,
    backgroundColor: colors.background.cream,
  },
  resultRank: {
    backgroundColor: colors.primary.freshAvocadoGreen,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  resultRankText: {
    ...textStyles.labelSmall,
    color: colors.text.inverse,
    fontWeight: '700',
  },
  resultMatchScore: {
    backgroundColor: colors.accent.softYellow,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  matchScoreText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
  },
  resultContent: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
  },
  resultLogo: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
  },
  resultLogoPlaceholder: {
    backgroundColor: colors.neutral.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  resultName: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
  },
  resultMeta: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginTop: 2,
  },
  resultEstimates: {
    flexDirection: 'row',
    marginTop: spacing.xs,
    gap: spacing.md,
  },
  estimateItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimateText: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
    marginLeft: 4,
  },
  resultScore: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.white,
  },
  resultScoreText: {
    ...textStyles.labelLarge,
    fontWeight: '700',
  },
  reasoningSection: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reasonText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  promotionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent.softYellow,
    paddingVertical: spacing.xs,
  },
  promotionText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  orderButton: {
    margin: spacing.md,
    marginTop: spacing.sm,
  },
  tryAgainButton: {
    marginBottom: spacing.xl,
  },
});
