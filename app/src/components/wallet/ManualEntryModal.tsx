import React, {useState} from 'react';
import {View, StyleSheet, Modal, Image, KeyboardAvoidingView, Platform} from 'react-native';
import {Text, TextInput, Button, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import {textStyles} from '../../theme/typography';
import {spacing} from '../../theme';
import {RestaurantSearchResult} from '../../services/walletService';

interface ManualEntryModalProps {
  visible: boolean;
  restaurant: RestaurantSearchResult | null;
  onClose: () => void;
  onSubmit: (data: {restaurantId: string; balance: number; accountNumber?: string}) => void;
  isLoading: boolean;
}

export function ManualEntryModal({
  visible,
  restaurant,
  onClose,
  onSubmit,
  isLoading,
}: ManualEntryModalProps): React.JSX.Element {
  const [balance, setBalance] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!restaurant) {
      return;
    }

    const balanceNum = parseInt(balance, 10);
    if (isNaN(balanceNum) || balanceNum < 0) {
      setError('Please enter a valid point balance');
      return;
    }

    setError(null);
    onSubmit({
      restaurantId: restaurant.id,
      balance: balanceNum,
      accountNumber: accountNumber || undefined,
    });
  };

  const handleClose = () => {
    setBalance('');
    setAccountNumber('');
    setError(null);
    onClose();
  };

  if (!restaurant) {
    return <></>;
  }

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={handleClose}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}>
          {/* Header */}
          <View style={styles.header}>
            <IconButton icon="arrow-left" size={24} onPress={handleClose} />
            <Text style={styles.title}>Add Points</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.content}>
            {/* Restaurant Info */}
            <View style={styles.restaurantCard}>
              {restaurant.imageUrl ? (
                <Image source={{uri: restaurant.imageUrl}} style={styles.logo} />
              ) : (
                <View style={styles.logoPlaceholder}>
                  <Text style={styles.logoText}>{restaurant.name.charAt(0)}</Text>
                </View>
              )}
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.cuisineType}>
                {restaurant.cuisineTypes.slice(0, 2).join(' • ')}
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <TextInput
                mode="outlined"
                label="Current Point Balance"
                value={balance}
                onChangeText={setBalance}
                keyboardType="number-pad"
                placeholder="e.g., 500"
                style={styles.input}
                left={<TextInput.Icon icon="star" />}
              />

              <TextInput
                mode="outlined"
                label="Account Number (Optional)"
                value={accountNumber}
                onChangeText={setAccountNumber}
                placeholder="e.g., 1234567890"
                style={styles.input}
                left={<TextInput.Icon icon="card-account-details" />}
              />

              <Text style={styles.helpText}>
                Enter your current point balance from your {restaurant.name} rewards account. You
                can find this in their app or on your receipt.
              </Text>
            </View>
          </View>

          {/* Submit Button */}
          <View style={styles.footer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading || !balance}
              style={styles.submitButton}
              contentStyle={styles.submitButtonContent}>
              Add to Wallet
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.lightGray,
  },
  title: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  headerSpacer: {
    width: 48,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  restaurantCard: {
    backgroundColor: colors.background.white,
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: spacing.sm,
  },
  logoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary.freshAvocadoGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.inverse,
  },
  restaurantName: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  cuisineType: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  form: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: colors.status.errorLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.status.error,
    ...textStyles.bodySmall,
  },
  input: {
    backgroundColor: colors.background.white,
    marginBottom: spacing.md,
  },
  helpText: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.background.lightGray,
  },
  submitButton: {
    borderRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: spacing.xs,
  },
});
