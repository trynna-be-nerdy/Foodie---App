import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native-paper';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {spacing} from '../theme';

interface OrderConfirmationScreenProps {
  route: {
    params: {
      orderId: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export function OrderConfirmationScreen({
  route,
  navigation,
}: OrderConfirmationScreenProps): React.JSX.Element {
  const {orderId} = route.params;
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, [scaleAnim]);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>
        <Animated.View style={{transform: [{scale: scaleAnim}]}}>
          <Text style={styles.checkmark}>OK</Text>
        </Animated.View>
        <Text style={styles.title}>Order Confirmed</Text>
        <Text style={styles.subtitle}>Your order #{orderId} is on its way.</Text>
        <Button
          mode="contained"
          buttonColor={colors.primary.freshAvocadoGreen}
          onPress={() => navigation.navigate('OrderTracking', {orderId})}
          style={styles.primaryButton}>
          Track Order
        </Button>
        <Button mode="text" onPress={() => navigation.navigate('Tabs', {screen: 'Feed'})}>
          Back to Feed
        </Button>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  checkmark: {
    ...textStyles.h1,
    fontSize: 64,
    color: colors.primary.freshAvocadoGreen,
  },
  title: {
    ...textStyles.h2,
    color: colors.text.primary,
  },
  subtitle: {
    ...textStyles.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  primaryButton: {
    marginTop: spacing.md,
  },
});
