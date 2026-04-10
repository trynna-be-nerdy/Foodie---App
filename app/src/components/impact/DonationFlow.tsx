import React, {useState, useMemo} from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  RadioButton,
  SegmentedButtons,
  Text,
  TextInput,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';

import type {Charity, DonationType, MatchingCampaign} from '../../types/impact';
import {
  pointsToDollars,
  dollarsToMeals,
  calculateBonusPoints,
  POINTS_TO_DOLLAR_RATE,
} from '../../types/impact';
import {makeDonation} from '../../services/impactService';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface DonationFlowProps {
  visible: boolean;
  charity: Charity | null;
  matchingCampaign: MatchingCampaign | null;
  userPoints: number;
  onClose: () => void;
  onSuccess: (mealsContributed: number, bonusPoints: number) => void;
}

type Step = 'amount' | 'confirm' | 'processing' | 'success';

const QUICK_AMOUNTS = [10, 25, 50, 100];
const QUICK_POINTS = [500, 1000, 2500, 5000];

export function DonationFlow({
  visible,
  charity,
  matchingCampaign,
  userPoints,
  onClose,
  onSuccess,
}: DonationFlowProps): React.JSX.Element {
  const [step, setStep] = useState<Step>('amount');
  const [donationType, setDonationType] = useState<DonationType>('cash');
  const [amount, setAmount] = useState<number>(25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [resultData, setResultData] = useState<{
    meals: number;
    bonus: number;
    matched: number;
    receiptUrl: string;
  } | null>(null);

  const effectiveAmount = useMemo(() => {
    if (useCustomAmount && customAmount) {
      return parseInt(customAmount, 10) || 0;
    }
    return amount;
  }, [amount, customAmount, useCustomAmount]);

  const dollarValue = useMemo(() => {
    return donationType === 'points'
      ? pointsToDollars(effectiveAmount)
      : effectiveAmount;
  }, [donationType, effectiveAmount]);

  const mealsEstimate = useMemo(() => {
    let totalDollars = dollarValue;
    if (matchingCampaign?.isActive && donationType === 'cash') {
      totalDollars *= matchingCampaign.multiplier;
    }
    return dollarsToMeals(totalDollars);
  }, [dollarValue, matchingCampaign, donationType]);

  const bonusPointsEstimate = useMemo(() => {
    return calculateBonusPoints(dollarValue);
  }, [dollarValue]);

  const canDonate = useMemo(() => {
    if (effectiveAmount <= 0) return false;
    if (donationType === 'points' && effectiveAmount > userPoints) return false;
    return true;
  }, [effectiveAmount, donationType, userPoints]);

  const handleAmountSelect = (value: number) => {
    setAmount(value);
    setUseCustomAmount(false);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setCustomAmount(numericText);
    setUseCustomAmount(true);
  };

  const handleConfirm = async () => {
    if (!charity) return;

    setStep('processing');

    try {
      const response = await makeDonation({
        charityId: charity.id,
        amount: effectiveAmount,
        donationType,
      });

      if (response.success && response.donation) {
        setResultData({
          meals: response.donation.mealsContributed,
          bonus: response.donation.bonusPointsEarned,
          matched: response.donation.matchedAmount || 0,
          receiptUrl: response.taxReceiptUrl || '',
        });
        setStep('success');
        onSuccess(response.donation.mealsContributed, response.donation.bonusPointsEarned);
      } else {
        Alert.alert('Error', response.error || 'Failed to process donation');
        setStep('confirm');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to process donation. Please try again.');
      setStep('confirm');
    }
  };

  const handleClose = () => {
    setStep('amount');
    setDonationType('cash');
    setAmount(25);
    setCustomAmount('');
    setUseCustomAmount(false);
    setResultData(null);
    onClose();
  };

  if (!charity) return <></>;

  const renderAmountStep = () => (
    <ScrollView style={styles.scrollContent}>
      {/* Charity Info */}
      <View style={styles.charityInfo}>
        {charity.logoUrl ? (
          <Image source={{uri: charity.logoUrl}} style={styles.charityLogo} resizeMode="cover" />
        ) : (
          <View style={[styles.charityLogo, styles.logoPlaceholder]}>
            <Icon name="hand-heart" size={32} color={colors.primary.freshAvocadoGreen} />
          </View>
        )}
        <Text style={styles.charityName}>{charity.name}</Text>
      </View>

      {/* Matching Campaign Banner */}
      {matchingCampaign?.isActive && donationType === 'cash' && (
        <View style={styles.matchingBanner}>
          <Icon name="flash" size={20} color={colors.accent.sunriseOrange} />
          <View style={styles.matchingInfo}>
            <Text style={styles.matchingTitle}>
              {matchingCampaign.multiplier}x Matching Active!
            </Text>
            <Text style={styles.matchingText}>
              Your ${effectiveAmount} becomes ${effectiveAmount * matchingCampaign.multiplier}!
            </Text>
          </View>
        </View>
      )}

      {/* Donation Type Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donate With</Text>
        <SegmentedButtons
          value={donationType}
          onValueChange={value => {
            setDonationType(value as DonationType);
            setAmount(value === 'cash' ? 25 : 1000);
            setCustomAmount('');
            setUseCustomAmount(false);
          }}
          buttons={[
            {value: 'cash', label: 'Cash', icon: 'cash'},
            {value: 'points', label: `Points (${userPoints.toLocaleString()})`, icon: 'star'},
          ]}
        />
      </View>

      {/* Amount Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Select Amount {donationType === 'points' ? '(Points)' : '($)'}
        </Text>
        <View style={styles.amountGrid}>
          {(donationType === 'cash' ? QUICK_AMOUNTS : QUICK_POINTS).map(value => (
            <Button
              key={value}
              mode={amount === value && !useCustomAmount ? 'contained' : 'outlined'}
              onPress={() => handleAmountSelect(value)}
              style={styles.amountButton}
              buttonColor={
                amount === value && !useCustomAmount
                  ? colors.primary.freshAvocadoGreen
                  : undefined
              }>
              {donationType === 'cash' ? `$${value}` : value.toLocaleString()}
            </Button>
          ))}
        </View>

        <TextInput
          mode="outlined"
          label={`Custom ${donationType === 'cash' ? 'Amount ($)' : 'Points'}`}
          value={customAmount}
          onChangeText={handleCustomAmountChange}
          keyboardType="numeric"
          style={styles.customInput}
          outlineColor={colors.neutral.gray300}
          activeOutlineColor={colors.primary.freshAvocadoGreen}
        />
      </View>

      {/* Impact Preview */}
      <View style={styles.impactPreview}>
        <Text style={styles.impactTitle}>Your Impact</Text>
        <View style={styles.impactRow}>
          <View style={styles.impactItem}>
            <Icon name="food-apple" size={24} color={colors.accent.sunriseOrange} />
            <Text style={styles.impactValue}>{mealsEstimate}</Text>
            <Text style={styles.impactLabel}>Meals</Text>
          </View>
          <View style={styles.impactItem}>
            <Icon name="star-circle" size={24} color={colors.accent.goldenYellow} />
            <Text style={styles.impactValue}>+{bonusPointsEstimate}</Text>
            <Text style={styles.impactLabel}>Bonus Pts</Text>
          </View>
        </View>
      </View>

      <Button
        mode="contained"
        onPress={() => setStep('confirm')}
        disabled={!canDonate}
        style={styles.continueButton}
        buttonColor={colors.primary.freshAvocadoGreen}>
        Continue
      </Button>

      {donationType === 'points' && effectiveAmount > userPoints && (
        <Text style={styles.errorText}>
          You don't have enough points. Available: {userPoints.toLocaleString()}
        </Text>
      )}
    </ScrollView>
  );

  const renderConfirmStep = () => (
    <View style={styles.confirmContent}>
      <Icon name="heart-outline" size={64} color={colors.primary.freshAvocadoGreen} />
      <Text style={styles.confirmTitle}>Confirm Your Donation</Text>

      <View style={styles.confirmDetails}>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Charity</Text>
          <Text style={styles.confirmValue}>{charity.name}</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Amount</Text>
          <Text style={styles.confirmValue}>
            {donationType === 'cash'
              ? `$${effectiveAmount}`
              : `${effectiveAmount.toLocaleString()} points ($${dollarValue.toFixed(2)})`}
          </Text>
        </View>
        {matchingCampaign?.isActive && donationType === 'cash' && (
          <View style={styles.confirmRow}>
            <Text style={styles.confirmLabel}>Matched Amount</Text>
            <Text style={[styles.confirmValue, styles.matchedValue]}>
              +${effectiveAmount * (matchingCampaign.multiplier - 1)}
            </Text>
          </View>
        )}
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Meals Provided</Text>
          <Text style={styles.confirmValue}>{mealsEstimate} meals</Text>
        </View>
        <View style={styles.confirmRow}>
          <Text style={styles.confirmLabel}>Bonus Points</Text>
          <Text style={[styles.confirmValue, styles.bonusValue]}>
            +{bonusPointsEstimate} pts
          </Text>
        </View>
      </View>

      <View style={styles.confirmButtons}>
        <Button
          mode="outlined"
          onPress={() => setStep('amount')}
          style={styles.confirmButton}
          textColor={colors.text.secondary}>
          Back
        </Button>
        <Button
          mode="contained"
          onPress={handleConfirm}
          style={styles.confirmButton}
          buttonColor={colors.primary.freshAvocadoGreen}
          icon="heart">
          Donate Now
        </Button>
      </View>
    </View>
  );

  const renderProcessingStep = () => (
    <View style={styles.processingContent}>
      <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
      <Text style={styles.processingText}>Processing your donation...</Text>
      <Text style={styles.processingSubtext}>Please wait</Text>
    </View>
  );

  const renderSuccessStep = () => (
    <View style={styles.successContent}>
      <View style={styles.successIcon}>
        <Icon name="check-circle" size={80} color={colors.primary.freshAvocadoGreen} />
      </View>
      <Text style={styles.successTitle}>Thank You!</Text>
      <Text style={styles.successMessage}>
        Your generous donation will provide {resultData?.meals} meals to those in need.
      </Text>

      <View style={styles.successStats}>
        <View style={styles.successStatItem}>
          <Icon name="food-apple" size={32} color={colors.accent.sunriseOrange} />
          <Text style={styles.successStatValue}>{resultData?.meals}</Text>
          <Text style={styles.successStatLabel}>Meals Provided</Text>
        </View>
        <View style={styles.successStatItem}>
          <Icon name="star-circle" size={32} color={colors.accent.goldenYellow} />
          <Text style={styles.successStatValue}>+{resultData?.bonus}</Text>
          <Text style={styles.successStatLabel}>Bonus Points</Text>
        </View>
      </View>

      {resultData?.matched && resultData.matched > 0 && (
        <View style={styles.matchedBanner}>
          <Icon name="flash" size={20} color={colors.accent.sunriseOrange} />
          <Text style={styles.matchedBannerText}>
            ${resultData.matched} was matched by our sponsors!
          </Text>
        </View>
      )}

      <Text style={styles.receiptNote}>
        A tax receipt has been sent to your email.
      </Text>

      <Button
        mode="contained"
        onPress={handleClose}
        style={styles.doneButton}
        buttonColor={colors.primary.freshAvocadoGreen}>
        Done
      </Button>
    </View>
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
            {step === 'success' ? 'Donation Complete' : 'Make a Donation'}
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        {step === 'amount' && renderAmountStep()}
        {step === 'confirm' && renderConfirmStep()}
        {step === 'processing' && renderProcessingStep()}
        {step === 'success' && renderSuccessStep()}
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
  charityInfo: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  charityLogo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.sm,
  },
  logoPlaceholder: {
    backgroundColor: colors.primary.mintGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  charityName: {
    ...textStyles.h4,
    color: colors.text.primary,
    textAlign: 'center',
  },
  matchingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.softYellow,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  matchingInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  matchingTitle: {
    ...textStyles.labelLarge,
    color: colors.accent.sunriseOrange,
    fontWeight: '700',
  },
  matchingText: {
    ...textStyles.bodySmall,
    color: colors.text.primary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  amountButton: {
    flex: 1,
    minWidth: '45%',
  },
  customInput: {
    backgroundColor: colors.background.white,
  },
  impactPreview: {
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.lg,
  },
  impactTitle: {
    ...textStyles.labelLarge,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  impactItem: {
    alignItems: 'center',
  },
  impactValue: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  impactLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  continueButton: {
    marginBottom: spacing.md,
  },
  errorText: {
    ...textStyles.bodySmall,
    color: colors.status.error,
    textAlign: 'center',
  },
  confirmContent: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  confirmTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  confirmDetails: {
    width: '100%',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  confirmRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  confirmLabel: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  confirmValue: {
    ...textStyles.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  matchedValue: {
    color: colors.accent.sunriseOrange,
  },
  bonusValue: {
    color: colors.primary.freshAvocadoGreen,
  },
  confirmButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  confirmButton: {
    flex: 1,
  },
  processingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    ...textStyles.h4,
    color: colors.text.primary,
    marginTop: spacing.lg,
  },
  processingSubtext: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  successContent: {
    flex: 1,
    padding: spacing.lg,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: spacing.md,
  },
  successTitle: {
    ...textStyles.h2,
    color: colors.primary.freshAvocadoGreen,
    marginBottom: spacing.sm,
  },
  successMessage: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  successStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  successStatItem: {
    alignItems: 'center',
  },
  successStatValue: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  successStatLabel: {
    ...textStyles.labelSmall,
    color: colors.text.secondary,
  },
  matchedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent.softYellow,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  matchedBannerText: {
    ...textStyles.labelSmall,
    color: colors.accent.sunriseOrange,
    fontWeight: '600',
    marginLeft: spacing.xs,
  },
  receiptNote: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  doneButton: {
    width: '100%',
  },
});
