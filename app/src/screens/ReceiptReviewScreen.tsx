import React, {useState, useEffect, useCallback} from 'react';
import {Alert, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Button, Menu, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {updateReceiptWithCorrections, fetchRestaurantOptions} from '../store/slices/receiptSlice';
import {ExtractedReceiptData, MatchedRestaurant} from '../services/receiptService';

interface ReceiptReviewScreenProps {
  route: {
    params: {
      receiptId: string;
      extractedData: ExtractedReceiptData | null;
      matchedRestaurant: MatchedRestaurant | null;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

export function ReceiptReviewScreen({
  route,
  navigation,
}: ReceiptReviewScreenProps): React.JSX.Element {
  const {receiptId, extractedData, matchedRestaurant} = route.params;
  const dispatch = useAppDispatch();
  const {restaurantOptions, isLoadingRestaurants, isUpdating} = useAppSelector(
    state => state.receipt,
  );

  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string>(
    matchedRestaurant?.id || '',
  );
  const [restaurantMenuVisible, setRestaurantMenuVisible] = useState(false);
  const [totalAmount, setTotalAmount] = useState<string>(
    extractedData?.totalAmount?.toString() || '',
  );

  // Load restaurant options
  useEffect(() => {
    if (restaurantOptions.length === 0) {
      dispatch(fetchRestaurantOptions());
    }
  }, [dispatch, restaurantOptions.length]);

  // Handle submit
  const handleSubmit = useCallback(async () => {
    if (!selectedRestaurantId) {
      Alert.alert('Error', 'Please select a restaurant');
      return;
    }

    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    try {
      const result = await dispatch(
        updateReceiptWithCorrections({
          receiptId,
          restaurantId: selectedRestaurantId,
          totalAmount: amount,
        }),
      ).unwrap();

      // Navigate to confirmation
      navigation.navigate('ReceiptConfirmation', {
        receiptId: result.receiptId,
        pointsEarned: result.pointsEarned,
        restaurantName: result.matchedRestaurant?.name,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to process receipt. Please try again.');
    }
  }, [receiptId, selectedRestaurantId, totalAmount, dispatch, navigation]);

  const selectedRestaurant = restaurantOptions.find(r => r.id === selectedRestaurantId);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Review Receipt</Text>
          <Text style={styles.subtitle}>Please verify or correct the extracted information</Text>
        </View>

        {/* Extracted Text Preview */}
        {extractedData?.restaurantName && (
          <View style={styles.extractedSection}>
            <Text style={styles.sectionTitle}>Detected Information</Text>
            <View style={styles.extractedCard}>
              <Text style={styles.extractedLabel}>Restaurant Name:</Text>
              <Text style={styles.extractedValue}>{extractedData.restaurantName}</Text>
              {matchedRestaurant && (
                <Text style={styles.confidenceText}>
                  Matched: {matchedRestaurant.name} (
                  {Math.round(matchedRestaurant.confidence * 100)}% confidence)
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Restaurant Selection */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Restaurant *</Text>
          {isLoadingRestaurants ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={colors.primary.freshAvocadoGreen} />
            </View>
          ) : (
            <View style={styles.pickerContainer}>
              <Menu
                visible={restaurantMenuVisible}
                onDismiss={() => setRestaurantMenuVisible(false)}
                anchor={
                  <Pressable
                    style={styles.menuAnchor}
                    onPress={() => setRestaurantMenuVisible(true)}>
                    <Text style={styles.menuAnchorText}>
                      {selectedRestaurant?.name || 'Select a restaurant...'}
                    </Text>
                  </Pressable>
                }>
                {restaurantOptions.map(restaurant => (
                  <Menu.Item
                    key={restaurant.id}
                    onPress={() => {
                      setSelectedRestaurantId(restaurant.id);
                      setRestaurantMenuVisible(false);
                    }}
                    title={restaurant.name}
                  />
                ))}
              </Menu>
            </View>
          )}
          {selectedRestaurant && (
            <Text style={styles.pointsInfo}>
              Earn {selectedRestaurant.pointsPerDollar} points per dollar
            </Text>
          )}
        </View>

        {/* Total Amount */}
        <View style={styles.formSection}>
          <Text style={styles.fieldLabel}>Total Amount *</Text>
          <TextInput
            mode="outlined"
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="decimal-pad"
            placeholder="0.00"
            left={<TextInput.Affix text="$" />}
            style={styles.input}
          />
          {selectedRestaurant && totalAmount && !isNaN(parseFloat(totalAmount)) && (
            <Text style={styles.pointsPreview}>
              You will earn{' '}
              <Text style={styles.pointsHighlight}>
                {Math.floor(
                  parseFloat(totalAmount) * selectedRestaurant.pointsPerDollar,
                ).toLocaleString()}{' '}
                points
              </Text>
            </Text>
          )}
        </View>

        {/* Line Items (Read-only) */}
        {extractedData?.lineItems && extractedData.lineItems.length > 0 && (
          <View style={styles.formSection}>
            <Text style={styles.sectionTitle}>Items Detected</Text>
            <View style={styles.lineItemsCard}>
              {extractedData.lineItems.slice(0, 5).map((item, index) => (
                <View key={index} style={styles.lineItem}>
                  <Text style={styles.lineItemName}>{item.name}</Text>
                  <Text style={styles.lineItemPrice}>${item.price.toFixed(2)}</Text>
                </View>
              ))}
              {extractedData.lineItems.length > 5 && (
                <Text style={styles.moreItems}>
                  +{extractedData.lineItems.length - 5} more items
                </Text>
              )}
            </View>
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={styles.actionButton}
            disabled={isUpdating}>
            Cancel
          </Button>
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.actionButton}
            loading={isUpdating}
            disabled={isUpdating || !selectedRestaurantId || !totalAmount}>
            Confirm & Earn Points
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  scrollContent: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  extractedSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  extractedCard: {
    backgroundColor: colors.background.lightGray,
    borderRadius: 12,
    padding: spacing.md,
  },
  extractedLabel: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  extractedValue: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  confidenceText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
  },
  formSection: {
    marginBottom: spacing.lg,
  },
  fieldLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  loadingContainer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: colors.background.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.background.lightGray,
    overflow: 'hidden',
  },
  menuAnchor: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  menuAnchorText: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  pointsInfo: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
    marginTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.background.white,
  },
  pointsPreview: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  pointsHighlight: {
    color: colors.primary.freshAvocadoGreen,
    fontWeight: '700',
  },
  lineItemsCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.md,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  lineItemName: {
    ...textStyles.body,
    color: colors.text.primary,
    flex: 1,
  },
  lineItemPrice: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  moreItems: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
});
