import React, {useState} from 'react';
import {Alert, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {
  ActivityIndicator,
  Button,
  Card,
  Divider,
  IconButton,
  RadioButton,
  Text,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type {
  PayoutMethodConfig,
  Payout,
  CreatorProfile,
  PayoutMethod,
} from '../../types/monetization';
import {formatEarnings, canRequestPayout, EARNINGS_RATES} from '../../types/monetization';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface PayoutSettingsProps {
  profile: CreatorProfile;
  payoutMethods: PayoutMethodConfig[];
  payoutHistory: Payout[];
  onConnectMethod: (method: PayoutMethod) => Promise<void>;
  onRequestPayout: (amount: number, method: PayoutMethod) => Promise<void>;
  isLoading?: boolean;
}

function formatPayoutDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getStatusColor(status: Payout['status']): string {
  switch (status) {
    case 'completed':
      return colors.primary.freshAvocadoGreen;
    case 'processing':
    case 'pending':
      return colors.accent.sunriseOrange;
    case 'failed':
      return colors.status.error;
    default:
      return colors.text.secondary;
  }
}

export function PayoutSettings({
  profile,
  payoutMethods,
  payoutHistory,
  onConnectMethod,
  onRequestPayout,
  isLoading = false,
}: PayoutSettingsProps): React.JSX.Element {
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PayoutMethod | null>(
    profile.payoutMethod,
  );
  const [payoutAmount, setPayoutAmount] = useState(
    profile.pendingBalance.toFixed(2),
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const connectedMethods = payoutMethods.filter(m => m.isConnected);
  const canPayout = canRequestPayout(profile.pendingBalance) && connectedMethods.length > 0;

  const handleRequestPayout = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payout method');
      return;
    }

    const amount = parseFloat(payoutAmount);
    if (isNaN(amount) || amount < EARNINGS_RATES.minPayoutAmount) {
      Alert.alert('Error', `Minimum payout amount is ${formatEarnings(EARNINGS_RATES.minPayoutAmount)}`);
      return;
    }

    if (amount > profile.pendingBalance) {
      Alert.alert('Error', 'Amount exceeds available balance');
      return;
    }

    setIsProcessing(true);
    try {
      await onRequestPayout(amount, selectedMethod);
      setShowPayoutModal(false);
      Alert.alert('Success', 'Payout request submitted!');
    } catch (error) {
      Alert.alert('Error', 'Failed to process payout request');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Payout Methods */}
      <Text style={styles.sectionTitle}>Payout Methods</Text>
      <Text style={styles.sectionSubtitle}>
        Connect your preferred payment method to receive earnings
      </Text>

      {payoutMethods.map(method => (
        <Card
          key={method.type}
          style={[
            styles.methodCard,
            method.isConnected && styles.methodCardConnected,
          ]}
          mode="elevated">
          <View style={styles.methodContent}>
            <View style={styles.methodIcon}>
              <Icon
                name={method.icon}
                size={28}
                color={method.isConnected ? colors.primary.freshAvocadoGreen : colors.text.secondary}
              />
            </View>
            <View style={styles.methodInfo}>
              <Text style={styles.methodLabel}>{method.label}</Text>
              {method.isConnected ? (
                <View style={styles.connectedInfo}>
                  <Icon name="check-circle" size={14} color={colors.primary.freshAvocadoGreen} />
                  <Text style={styles.connectedText}>
                    {method.accountInfo ?? 'Connected'}
                  </Text>
                </View>
              ) : (
                <Text style={styles.methodDescription}>{method.description}</Text>
              )}
            </View>
            <Button
              mode={method.isConnected ? 'outlined' : 'contained'}
              onPress={() => onConnectMethod(method.type)}
              buttonColor={method.isConnected ? undefined : colors.primary.freshAvocadoGreen}
              textColor={method.isConnected ? colors.text.secondary : undefined}
              compact
              disabled={isLoading}>
              {method.isConnected ? 'Manage' : 'Connect'}
            </Button>
          </View>
        </Card>
      ))}

      {/* Request Payout Button */}
      <Button
        mode="contained"
        onPress={() => setShowPayoutModal(true)}
        buttonColor={colors.primary.freshAvocadoGreen}
        icon="cash-fast"
        style={styles.requestPayoutButton}
        disabled={!canPayout}>
        Request Payout ({formatEarnings(profile.pendingBalance)} available)
      </Button>

      {!canPayout && (
        <Text style={styles.payoutNote}>
          {connectedMethods.length === 0
            ? 'Connect a payout method to request withdrawals'
            : `Minimum ${formatEarnings(EARNINGS_RATES.minPayoutAmount)} required for payout`}
        </Text>
      )}

      {/* Payout History */}
      <View style={styles.historySection}>
        <Text style={styles.sectionTitle}>Payout History</Text>

        {payoutHistory.length === 0 ? (
          <View style={styles.emptyHistory}>
            <Icon name="history" size={32} color={colors.text.light} />
            <Text style={styles.emptyHistoryText}>No payouts yet</Text>
          </View>
        ) : (
          payoutHistory.map(payout => (
            <View key={payout.id} style={styles.historyItem}>
              <View style={styles.historyIcon}>
                <Icon
                  name={payout.method === 'bank_transfer' ? 'bank' : payout.method === 'paypal' ? 'alpha-p-circle' : 'gift'}
                  size={20}
                  color={colors.text.secondary}
                />
              </View>
              <View style={styles.historyInfo}>
                <Text style={styles.historyAmount}>{formatEarnings(payout.amount)}</Text>
                <Text style={styles.historyDate}>
                  {formatPayoutDate(payout.requestedAt)}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(payout.status) + '20'},
                ]}>
                <Text
                  style={[
                    styles.statusText,
                    {color: getStatusColor(payout.status)},
                  ]}>
                  {payout.status.charAt(0).toUpperCase() + payout.status.slice(1)}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>

      {/* Payout Modal */}
      <Modal
        visible={showPayoutModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowPayoutModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Request Payout</Text>
              <IconButton
                icon="close"
                onPress={() => setShowPayoutModal(false)}
                disabled={isProcessing}
              />
            </View>

            <ScrollView style={styles.modalBody}>
              {/* Amount Input */}
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                mode="outlined"
                value={payoutAmount}
                onChangeText={setPayoutAmount}
                keyboardType="decimal-pad"
                left={<TextInput.Affix text="$" />}
                style={styles.amountInput}
                outlineColor={colors.neutral.gray300}
                activeOutlineColor={colors.primary.freshAvocadoGreen}
              />
              <Text style={styles.balanceNote}>
                Available: {formatEarnings(profile.pendingBalance)}
              </Text>

              <Divider style={styles.divider} />

              {/* Method Selection */}
              <Text style={styles.inputLabel}>Payout Method</Text>
              <RadioButton.Group
                value={selectedMethod ?? ''}
                onValueChange={v => setSelectedMethod(v as PayoutMethod)}>
                {connectedMethods.map(method => (
                  <View key={method.type} style={styles.radioItem}>
                    <RadioButton.Android
                      value={method.type}
                      color={colors.primary.freshAvocadoGreen}
                    />
                    <Icon name={method.icon} size={20} color={colors.text.secondary} />
                    <Text style={styles.radioLabel}>{method.label}</Text>
                    {method.accountInfo && (
                      <Text style={styles.radioSubtext}>({method.accountInfo})</Text>
                    )}
                  </View>
                ))}
              </RadioButton.Group>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Button
                mode="outlined"
                onPress={() => setShowPayoutModal(false)}
                style={styles.cancelButton}
                disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleRequestPayout}
                buttonColor={colors.primary.freshAvocadoGreen}
                style={styles.confirmButton}
                disabled={isProcessing || !selectedMethod}>
                {isProcessing ? (
                  <ActivityIndicator size="small" color={colors.background.white} />
                ) : (
                  'Confirm Payout'
                )}
              </Button>
            </View>
          </View>
        </View>
      </Modal>
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
  methodCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
  },
  methodCardConnected: {
    borderWidth: 1,
    borderColor: colors.primary.freshAvocadoGreen,
  },
  methodContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  methodIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  methodInfo: {
    flex: 1,
  },
  methodLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  methodDescription: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  connectedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  connectedText: {
    ...textStyles.caption,
    color: colors.primary.freshAvocadoGreen,
    marginLeft: 4,
  },
  requestPayoutButton: {
    marginTop: spacing.md,
    borderRadius: borderRadius.md,
  },
  payoutNote: {
    ...textStyles.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  historySection: {
    marginTop: spacing.lg,
  },
  emptyHistory: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
  },
  emptyHistoryText: {
    ...textStyles.body,
    color: colors.text.light,
    marginTop: spacing.sm,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.cream,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  historyInfo: {
    flex: 1,
  },
  historyAmount: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  historyDate: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  statusText: {
    ...textStyles.labelSmall,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  modalTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  modalBody: {
    padding: spacing.lg,
  },
  inputLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  amountInput: {
    backgroundColor: colors.background.white,
  },
  balanceNote: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  radioLabel: {
    ...textStyles.body,
    color: colors.text.primary,
    marginLeft: spacing.sm,
  },
  radioSubtext: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  modalFooter: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    borderRadius: borderRadius.md,
  },
  confirmButton: {
    flex: 1,
    borderRadius: borderRadius.md,
  },
});
