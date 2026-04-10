import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Button, Chip, Text, ProgressBar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {completeOnboarding, setOnboardingStep} from '../store/slices/appSlice';
import {updateUserProfile} from '../store/slices/userSlice';

const CUISINE_OPTIONS = [
  'American',
  'Asian',
  'BBQ',
  'Breakfast',
  'Burgers',
  'Chinese',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Pizza',
  'Seafood',
  'Thai',
  'Vegan',
  'Vegetarian',
];

const DIETARY_OPTIONS = [
  'Gluten-Free',
  'Dairy-Free',
  'Halal',
  'Keto',
  'Kosher',
  'Low-Carb',
  'Nut-Free',
  'Pescatarian',
  'Vegan',
  'Vegetarian',
];

export function OnboardingScreen(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const onboardingStep = useAppSelector(state => state.app.onboardingStep);

  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const totalSteps = 2;
  const progressValue = useMemo(
    () => Math.min(1, (onboardingStep + 1) / totalSteps),
    [onboardingStep],
  );

  const toggleSelection = (item: string, list: string[], setList: (value: string[]) => void) => {
    if (list.includes(item)) {
      setList(list.filter(entry => entry !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleNext = async () => {
    if (onboardingStep < totalSteps - 1) {
      dispatch(setOnboardingStep(onboardingStep + 1));
      return;
    }

    setIsSaving(true);
    try {
      await dispatch(
        updateUserProfile({
          cuisinePreferences: selectedCuisines,
          dietaryRestrictions: selectedDietary,
        }),
      ).unwrap();
      dispatch(completeOnboarding());
      dispatch(setOnboardingStep(0));
    } catch {
      // Keep user on screen to retry; allow skip if needed.
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) {
      dispatch(setOnboardingStep(onboardingStep - 1));
    }
  };

  const handleSkip = () => {
    dispatch(completeOnboarding());
    dispatch(setOnboardingStep(0));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tell us what you like</Text>
        <Text style={styles.subtitle}>We use this to personalize your discovery feed.</Text>
        <ProgressBar
          progress={progressValue}
          color={colors.primary.freshAvocadoGreen}
          style={styles.progress}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {onboardingStep === 0 && (
          <>
            <Text style={styles.sectionTitle}>Favorite cuisines</Text>
            <View style={styles.chipGrid}>
              {CUISINE_OPTIONS.map(option => (
                <Chip
                  key={option}
                  selected={selectedCuisines.includes(option)}
                  onPress={() => toggleSelection(option, selectedCuisines, setSelectedCuisines)}
                  style={styles.chip}
                  selectedColor={colors.primary.freshAvocadoGreen}>
                  {option}
                </Chip>
              ))}
            </View>
          </>
        )}

        {onboardingStep === 1 && (
          <>
            <Text style={styles.sectionTitle}>Dietary preferences</Text>
            <View style={styles.chipGrid}>
              {DIETARY_OPTIONS.map(option => (
                <Chip
                  key={option}
                  selected={selectedDietary.includes(option)}
                  onPress={() => toggleSelection(option, selectedDietary, setSelectedDietary)}
                  style={styles.chip}
                  selectedColor={colors.primary.freshAvocadoGreen}>
                  {option}
                </Chip>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button mode="text" onPress={handleSkip}>
          Skip
        </Button>
        <View style={styles.footerActions}>
          {onboardingStep > 0 && (
            <Button mode="outlined" onPress={handleBack} style={styles.backButton}>
              Back
            </Button>
          )}
          <Button mode="contained" onPress={handleNext} loading={isSaving} disabled={isSaving}>
            {onboardingStep === totalSteps - 1 ? 'Finish' : 'Next'}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  progress: {
    marginTop: spacing.md,
    height: 6,
    borderRadius: 4,
    backgroundColor: colors.neutral.gray200,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginVertical: spacing.md,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    backgroundColor: colors.background.white,
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    backgroundColor: colors.background.cream,
  },
  footerActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  backButton: {
    marginRight: spacing.sm,
  },
});
