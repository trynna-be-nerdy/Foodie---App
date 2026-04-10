import React, {useEffect, useMemo, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Button,
  SegmentedButtons,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {useStripeCompat} from '../utils/stripeCompat';
import {isExpoGo} from '../utils/expoGo';

import {colors} from '../theme/colors';
import {textStyles} from '../theme/typography';
import {borderRadius, spacing} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {
  clearCart,
  calculateCartSubtotal,
  setDeliveryAddress,
  setFulfillmentType,
  setPointsToUse,
  setTip,
} from '../store/slices/cartSlice';
import {createOrder, confirmOrder} from '../services/orderService';
import {CreateOrderPayload, DeliveryAddress} from '../types/order';

interface CheckoutScreenProps {
  route: {
    params: {
      restaurantId: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
    goBack: () => void;
  };
}

const TAX_RATE = 0.0875;
const SERVICE_FEE_RATE = 0.05;
const DELIVERY_FEE_BASE = 2.99;
const POINTS_VALUE = 0.01;
const MAX_POINTS_DISCOUNT_PERCENT = 0.5;

export function CheckoutScreen({route, navigation}: CheckoutScreenProps): React.JSX.Element {
  const {restaurantId} = route.params;
  const dispatch = useAppDispatch();
  const {initPaymentSheet, presentPaymentSheet} = useStripeCompat();
  const cart = useAppSelector(state => state.cart);
  const wallets = useAppSelector(state => state.wallet.wallets);

  const [address, setAddress] = useState<DeliveryAddress>(
    cart.deliveryAddress || {street: '', city: '', state: '', zipCode: '', instructions: ''},
  );
  const [usePoints, setUsePoints] = useState(cart.pointsToUse > 0);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const subtotal = useMemo(() => calculateCartSubtotal(cart.items), [cart.items]);
  const serviceFee = subtotal * SERVICE_FEE_RATE;
  const deliveryFee = cart.fulfillmentType === 'DELIVERY' ? DELIVERY_FEE_BASE : 0;
  const tax = (subtotal + deliveryFee) * TAX_RATE;
  const availablePoints =
    wallets.find(wallet => wallet.restaurantId === restaurantId)?.balance ?? 0;
  const maxPointsAllowed = Math.floor(
    Math.min(availablePoints, subtotal * MAX_POINTS_DISCOUNT_PERCENT * 100),
  );
  const pointsDiscount = usePoints
    ? Math.min(cart.pointsToUse, maxPointsAllowed) * POINTS_VALUE
    : 0;
  const total = Math.max(subtotal + serviceFee + deliveryFee + tax + cart.tip - pointsDiscount, 0);

  useEffect(() => {
    if (cart.pointsToUse > maxPointsAllowed) {
      dispatch(setPointsToUse(maxPointsAllowed));
    }
  }, [cart.pointsToUse, dispatch, maxPointsAllowed]);

  const updateAddress = (field: keyof DeliveryAddress, value: string) => {
    setAddress(prev => ({...prev, [field]: value}));
  };

  const toggleUsePoints = (enabled: boolean) => {
    setUsePoints(enabled);
    if (!enabled) {
      dispatch(setPointsToUse(0));
    }
  };

  const handlePlaceOrder = async () => {
    if (isExpoGo()) {
      Alert.alert(
        'Stripe unavailable',
        'Checkout requires a development build. Expo Go does not support Stripe.',
      );
      return;
    }
    if (!cart.restaurantId || cart.items.length === 0) {
      Alert.alert('Cart is empty', 'Add items to your cart before checking out.');
      return;
    }

    if (cart.fulfillmentType === 'DELIVERY') {
      if (!address.street || !address.city || !address.state || !address.zipCode) {
        Alert.alert('Missing address', 'Please complete the delivery address.');
        return;
      }
      dispatch(setDeliveryAddress(address));
    }

    const payload: CreateOrderPayload = {
      restaurantId: cart.restaurantId,
      items: cart.items.map(item => ({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        customizations: item.customizations ?? null,
        specialInstructions: item.specialInstructions ?? undefined,
      })),
      fulfillmentType: cart.fulfillmentType,
      deliveryAddress: cart.fulfillmentType === 'DELIVERY' ? address : undefined,
      tip: cart.tip,
      pointsToUse: usePoints ? cart.pointsToUse : 0,
    };

    setIsPlacingOrder(true);
    const response = await createOrder(payload);
    if (!response.success || !response.data) {
      setIsPlacingOrder(false);
      Alert.alert('Checkout failed', response.error?.message || 'Unable to place order.');
      return;
    }

    const payment = response.data.payment;
    const initResult = await initPaymentSheet({
      merchantDisplayName: 'Foodie',
      customerId: payment.customerId,
      customerEphemeralKeySecret: payment.ephemeralKey,
      paymentIntentClientSecret: payment.clientSecret,
      allowsDelayedPaymentMethods: true,
    });

    if (initResult.error) {
      setIsPlacingOrder(false);
      Alert.alert('Payment setup failed', initResult.error.message);
      return;
    }

    const paymentResult = await presentPaymentSheet();
    if (paymentResult.error) {
      setIsPlacingOrder(false);
      Alert.alert('Payment failed', paymentResult.error.message);
      return;
    }

    await confirmOrder(response.data.order.id);
    dispatch(clearCart());
    setIsPlacingOrder(false);
    navigation.navigate('OrderConfirmation', {orderId: response.data.order.id});
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Button mode="contained" onPress={navigation.goBack} style={styles.primaryButton}>
            Browse menu
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Checkout</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fulfillment</Text>
          <SegmentedButtons
            value={cart.fulfillmentType}
            onValueChange={value => dispatch(setFulfillmentType(value as 'PICKUP' | 'DELIVERY'))}
            buttons={[
              {value: 'PICKUP', label: 'Pickup'},
              {value: 'DELIVERY', label: 'Delivery'},
            ]}
          />
        </View>

        {cart.fulfillmentType === 'DELIVERY' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
            <TextInput
              mode="outlined"
              label="Street"
              value={address.street}
              onChangeText={value => updateAddress('street', value)}
              style={styles.input}
            />
            <TextInput
              mode="outlined"
              label="City"
              value={address.city}
              onChangeText={value => updateAddress('city', value)}
              style={styles.input}
            />
            <View style={styles.row}>
              <TextInput
                mode="outlined"
                label="State"
                value={address.state}
                onChangeText={value => updateAddress('state', value)}
                style={[styles.input, styles.rowItem]}
              />
              <TextInput
                mode="outlined"
                label="ZIP"
                value={address.zipCode}
                onChangeText={value => updateAddress('zipCode', value)}
                style={[styles.input, styles.rowItem]}
              />
            </View>
            <TextInput
              mode="outlined"
              label="Delivery instructions (optional)"
              value={address.instructions}
              onChangeText={value => updateAddress('instructions', value)}
              style={styles.input}
            />
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tip</Text>
          <TextInput
            mode="outlined"
            keyboardType="decimal-pad"
            value={cart.tip ? String(cart.tip) : ''}
            onChangeText={value => dispatch(setTip(Number(value) || 0))}
            placeholder="0.00"
            style={styles.input}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <Text style={styles.sectionTitle}>Use points</Text>
            <Switch value={usePoints} onValueChange={toggleUsePoints} />
          </View>
          {usePoints && (
            <TextInput
              mode="outlined"
              keyboardType="number-pad"
              value={cart.pointsToUse ? String(cart.pointsToUse) : ''}
              onChangeText={value =>
                dispatch(setPointsToUse(Math.min(Number(value) || 0, maxPointsAllowed)))
              }
              placeholder={`Up to ${maxPointsAllowed} pts`}
              style={styles.input}
            />
          )}
          <Text style={styles.helperText}>
            Available points: {availablePoints} (max discount {maxPointsAllowed} pts)
          </Text>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service fee</Text>
            <Text style={styles.summaryValue}>${serviceFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax</Text>
            <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
          </View>
          {cart.tip > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tip</Text>
              <Text style={styles.summaryValue}>${cart.tip.toFixed(2)}</Text>
            </View>
          )}
          {pointsDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Points discount</Text>
              <Text style={styles.summaryValue}>-${pointsDiscount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="contained"
          buttonColor={colors.primary.freshAvocadoGreen}
          onPress={handlePlaceOrder}
          disabled={isPlacingOrder}>
          {isPlacingOrder ? 'Processing...' : 'Place Order'}
        </Button>
        {isPlacingOrder && <ActivityIndicator style={styles.spinner} />}
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
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  title: {
    ...textStyles.h2,
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
  input: {
    marginBottom: spacing.sm,
    backgroundColor: colors.background.white,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  rowItem: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helperText: {
    ...textStyles.caption,
    color: colors.text.secondary,
  },
  summaryCard: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    ...textStyles.body,
    color: colors.text.secondary,
  },
  summaryValue: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    paddingTop: spacing.sm,
  },
  summaryTotalLabel: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  summaryTotalValue: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    backgroundColor: colors.background.white,
  },
  spinner: {
    marginTop: spacing.sm,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  primaryButton: {
    backgroundColor: colors.primary.freshAvocadoGreen,
  },
});
