import React, {useEffect, useState} from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Button, Chip, Text} from 'react-native-paper';

import {FeedFilters} from '../../types/feed';
import {colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

const CUISINE_OPTIONS = [
  'Italian',
  'Mexican',
  'American',
  'Thai',
  'Japanese',
  'Indian',
  'Mediterranean',
  'Chinese',
];

const DIETARY_OPTIONS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher'];

interface FilterModalProps {
  visible: boolean;
  filters: FeedFilters;
  onApply: (filters: FeedFilters) => void;
  onClear: () => void;
  onClose: () => void;
}

export function FilterModal({
  visible,
  filters,
  onApply,
  onClear,
  onClose,
}: FilterModalProps): React.JSX.Element {
  const [localFilters, setLocalFilters] = useState<FeedFilters>(filters);

  useEffect(() => {
    if (visible) {
      setLocalFilters(filters);
    }
  }, [visible, filters]);

  const toggleCuisine = (cuisine: string) => {
    setLocalFilters(prev => {
      const next = prev.cuisineTypes.includes(cuisine)
        ? prev.cuisineTypes.filter(item => item !== cuisine)
        : [...prev.cuisineTypes, cuisine];
      return {...prev, cuisineTypes: next};
    });
  };

  const toggleDietary = (dietary: string) => {
    setLocalFilters(prev => {
      const next = prev.dietaryRestrictions.includes(dietary)
        ? prev.dietaryRestrictions.filter(item => item !== dietary)
        : [...prev.dietaryRestrictions, dietary];
      return {...prev, dietaryRestrictions: next};
    });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Filters</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuisine</Text>
          <View style={styles.chipsRow}>
            {CUISINE_OPTIONS.map(cuisine => (
              <Chip
                key={cuisine}
                selected={localFilters.cuisineTypes.includes(cuisine)}
                onPress={() => toggleCuisine(cuisine)}
                style={styles.chip}
                textColor="#000000"
                selectedColor={colors.text.inverse}
                showSelectedOverlay>
                {cuisine}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Range</Text>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>Min: {'$'.repeat(localFilters.priceRange.min)}</Text>
            <Slider
              minimumValue={1}
              maximumValue={4}
              step={1}
              value={localFilters.priceRange.min}
              minimumTrackTintColor={colors.primary.freshAvocadoGreen}
              maximumTrackTintColor={colors.neutral.gray300}
              onValueChange={value =>
                setLocalFilters(prev => ({
                  ...prev,
                  priceRange: {
                    min: Math.min(value, prev.priceRange.max),
                    max: prev.priceRange.max,
                  },
                }))
              }
            />
          </View>
          <View style={styles.sliderRow}>
            <Text style={styles.sliderLabel}>Max: {'$'.repeat(localFilters.priceRange.max)}</Text>
            <Slider
              minimumValue={1}
              maximumValue={4}
              step={1}
              value={localFilters.priceRange.max}
              minimumTrackTintColor={colors.primary.freshAvocadoGreen}
              maximumTrackTintColor={colors.neutral.gray300}
              onValueChange={value =>
                setLocalFilters(prev => ({
                  ...prev,
                  priceRange: {
                    min: prev.priceRange.min,
                    max: Math.max(value, prev.priceRange.min),
                  },
                }))
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distance</Text>
          <Text style={styles.sliderLabel}>{localFilters.distanceMiles} miles</Text>
          <Slider
            minimumValue={1}
            maximumValue={25}
            step={1}
            value={localFilters.distanceMiles}
            minimumTrackTintColor={colors.primary.freshAvocadoGreen}
            maximumTrackTintColor={colors.neutral.gray300}
            onValueChange={value => setLocalFilters(prev => ({...prev, distanceMiles: value}))}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary</Text>
          <View style={styles.chipsRow}>
            {DIETARY_OPTIONS.map(dietary => (
              <Chip
                key={dietary}
                selected={localFilters.dietaryRestrictions.includes(dietary)}
                onPress={() => toggleDietary(dietary)}
                style={styles.chip}
                textColor="#000000"
                selectedColor={colors.text.inverse}
                showSelectedOverlay>
                {dietary}
              </Chip>
            ))}
          </View>
        </View>

            <View style={styles.actions}>
              <Button mode="text" onPress={onClear} textColor="#000000">
                Clear All
              </Button>
              <Button
                mode="contained"
                buttonColor={colors.primary.freshAvocadoGreen}
                textColor="#000000"
                onPress={() => onApply(localFilters)}>
                Apply Filters
              </Button>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.transparent.black50,
  },
  modalContainer: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: spacing.lg,
    borderTopRightRadius: spacing.lg,
    paddingBottom: spacing.lg,
    maxHeight: '85%',
    width: '100%',
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.background.lightGray,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  sliderRow: {
    marginBottom: spacing.md,
  },
  sliderLabel: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
  },
});
