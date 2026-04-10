import React, {useEffect, useRef} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';
import {useAppDispatch} from '../store';
import {clearScanResult} from '../store/slices/qrSlice';

interface QRScanSuccessScreenProps {
  route: {
    params: {
      pointsEarned: number;
      restaurantName?: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    popToTop: () => void;
    goBack: () => void;
  };
}

export function QRScanSuccessScreen({
  route,
  navigation,
}: QRScanSuccessScreenProps): React.JSX.Element {
  const {pointsEarned, restaurantName} = route.params;
  const dispatch = useAppDispatch();

  // Animations
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pointsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // Pop in the checkmark
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      // Fade in the content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Animate points counter
    Animated.timing(pointsAnim, {
      toValue: pointsEarned,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [scaleAnim, fadeAnim, pointsAnim, pointsEarned]);

  const handleDone = () => {
    dispatch(clearScanResult());
    navigation.popToTop();
  };

  const handleScanAnother = () => {
    dispatch(clearScanResult());
    navigation.goBack();
  };

  const handleViewWallet = () => {
    dispatch(clearScanResult());
    navigation.navigate('Wallet');
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View
          style={[
            styles.successIcon,
            {
              transform: [{scale: scaleAnim}],
            },
          ]}>
          <Text style={styles.checkmark}>✓</Text>
        </Animated.View>

        {/* Success Message */}
        <Animated.View style={[styles.messageContainer, {opacity: fadeAnim}]}>
          <Text style={styles.title}>Points Earned!</Text>

          {restaurantName && <Text style={styles.restaurantName}>at {restaurantName}</Text>}

          {/* Points Display */}
          <View style={styles.pointsContainer}>
            <Text style={styles.pointsPrefix}>+</Text>
            <Text style={styles.pointsValue}>{pointsEarned}</Text>
            <Text style={styles.pointsSuffix}>points</Text>
          </View>

          <Text style={styles.subtitle}>Your points have been added to your wallet instantly!</Text>
        </Animated.View>

        {/* Actions */}
        <Animated.View style={[styles.actions, {opacity: fadeAnim}]}>
          <Button
            mode="contained"
            onPress={handleScanAnother}
            style={styles.primaryButton}
            contentStyle={styles.buttonContent}>
            Scan Another Code
          </Button>

          <Button
            mode="outlined"
            onPress={handleViewWallet}
            style={styles.secondaryButton}
            contentStyle={styles.buttonContent}>
            View Wallet
          </Button>

          <Button mode="text" onPress={handleDone} style={styles.textButton}>
            Done
          </Button>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.status.success,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.status.success,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  checkmark: {
    fontSize: 50,
    color: colors.text.inverse,
    fontWeight: '700',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...textStyles.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  restaurantName: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  pointsPrefix: {
    fontSize: 32,
    color: colors.status.success,
    fontWeight: '700',
  },
  pointsValue: {
    fontSize: 64,
    color: colors.status.success,
    fontWeight: '800',
  },
  pointsSuffix: {
    fontSize: 24,
    color: colors.status.success,
    fontWeight: '600',
    marginLeft: spacing.sm,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  actions: {
    width: '100%',
    gap: spacing.md,
  },
  primaryButton: {
    borderRadius: 8,
  },
  secondaryButton: {
    borderRadius: 8,
  },
  textButton: {
    marginTop: spacing.sm,
  },
  buttonContent: {
    paddingVertical: spacing.xs,
  },
});
