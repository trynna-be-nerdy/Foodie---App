import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, SectionList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, Button, IconButton, Text} from 'react-native-paper';

import {fetchRestaurantMenu} from '../services/orderService';
import {RestaurantMenuItem} from '../types/restaurant';
import {CartBottomSheet} from '../components/order/CartBottomSheet';
import {MenuItemDetailModal} from '../components/order/MenuItemDetailModal';
import {borderRadius, colors, spacing} from '../theme';
import {textStyles} from '../theme/typography';
import {useAppDispatch, useAppSelector} from '../store';
import {
  addItem,
  calculateCartSubtotal,
  removeItem,
  startCart,
  updateItemQuantity,
} from '../store/slices/cartSlice';

interface MenuScreenProps {
  route: {
    params: {
      restaurantId: string;
    };
  };
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export function MenuScreen({route, navigation}: MenuScreenProps): React.JSX.Element {
  const {restaurantId} = route.params;
  const dispatch = useAppDispatch();
  const cart = useAppSelector(state => state.cart);

  const [sections, setSections] = useState<{title: string; data: RestaurantMenuItem[]}[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<RestaurantMenuItem | null>(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(startCart(restaurantId));
  }, [dispatch, restaurantId]);

  useEffect(() => {
    const loadMenu = async () => {
      setIsLoading(true);
      const response = await fetchRestaurantMenu(restaurantId);
      if (response.success && response.data) {
        const formatted = response.data.categories.map(category => ({
          title: category.name,
          data: category.items,
        }));
        setSections(formatted);
        setError(null);
      } else {
        setError(response.error?.message || 'Failed to load menu');
      }
      setIsLoading(false);
    };

    loadMenu();
  }, [restaurantId]);

  const subtotal = useMemo(() => calculateCartSubtotal(cart.items), [cart.items]);

  const handleAddToCart = useCallback(
    (payload: {
      quantity: number;
      customizations: Record<string, unknown> | null;
      specialInstructions: string;
    }) => {
      if (!selectedItem) {
        return;
      }
      dispatch(
        addItem({
          menuItemId: selectedItem.id,
          name: selectedItem.name,
          imageUrl: selectedItem.imageUrl,
          unitPrice: selectedItem.price,
          quantity: payload.quantity,
          customizations: payload.customizations,
          specialInstructions: payload.specialInstructions,
        }),
      );
      setShowCart(true);
    },
    [dispatch, selectedItem],
  );

  const renderItem = ({item}: {item: RestaurantMenuItem}) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.description ? (
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        {item.dietaryTags?.length ? (
          <Text style={styles.itemTags}>{item.dietaryTags.slice(0, 3).join(', ')}</Text>
        ) : null}
      </View>
      {item.imageUrl ? (
        <Image source={{uri: item.imageUrl}} style={styles.itemImage} />
      ) : (
        <View style={styles.itemImagePlaceholder} />
      )}
      <IconButton
        icon="plus"
        iconColor={colors.primary.freshAvocadoGreen}
        onPress={() => setSelectedItem(item)}
        style={styles.addButton}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primary.freshAvocadoGreen} />
          <Text style={styles.loadingText}>Loading menu...</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      <MenuItemDetailModal
        visible={!!selectedItem}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onAdd={handleAddToCart}
      />

      <CartBottomSheet
        visible={showCart && cart.items.length > 0}
        items={cart.items}
        subtotal={subtotal}
        onClose={() => setShowCart(false)}
        onCheckout={() => {
          setShowCart(false);
          navigation.navigate('Checkout', {restaurantId});
        }}
        onUpdateQuantity={(index, quantity) => dispatch(updateItemQuantity({index, quantity}))}
        onRemoveItem={index => dispatch(removeItem(index))}
      />

      {cart.items.length > 0 && (
        <View style={styles.cartBar}>
          <Button
            mode="contained"
            buttonColor={colors.primary.freshAvocadoGreen}
            onPress={() => setShowCart(true)}>
            View Cart · ${subtotal.toFixed(2)}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.cream,
  },
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing['4xl'],
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    ...textStyles.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
  },
  errorText: {
    ...textStyles.body,
    color: colors.status.error,
  },
  sectionHeader: {
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  itemDescription: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  itemPrice: {
    ...textStyles.body,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  itemTags: {
    ...textStyles.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    marginLeft: spacing.sm,
  },
  itemImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.md,
    backgroundColor: colors.neutral.gray200,
    marginLeft: spacing.sm,
  },
  addButton: {
    marginLeft: spacing.xs,
  },
  cartBar: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
  },
});
