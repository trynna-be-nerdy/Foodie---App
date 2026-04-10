import React from 'react';
import {Modal, Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text} from 'react-native-paper';

import {CartItem} from '../../types/order';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface CartBottomSheetProps {
  visible: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onCheckout: () => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
}

export function CartBottomSheet({
  visible,
  items,
  subtotal,
  onClose,
  onCheckout,
  onUpdateQuantity,
  onRemoveItem,
}: CartBottomSheetProps): React.JSX.Element {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>Your Cart</Text>

        {items.map((item, index) => (
          <View key={`${item.menuItemId}-${index}`} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.unitPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.itemControls}>
              <IconButton
                icon="minus"
                size={18}
                onPress={() => onUpdateQuantity(index, item.quantity - 1)}
              />
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <IconButton
                icon="plus"
                size={18}
                onPress={() => onUpdateQuantity(index, item.quantity + 1)}
              />
              <IconButton icon="trash-can-outline" size={18} onPress={() => onRemoveItem(index)} />
            </View>
          </View>
        ))}

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

            <Button
              mode="contained"
              buttonColor={colors.primary.freshAvocadoGreen}
              onPress={onCheckout}
              disabled={items.length === 0}
              style={styles.checkoutButton}>
              Checkout
            </Button>
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
    maxHeight: '45%',
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
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral.gray200,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  itemPrice: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
  },
  itemControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    ...textStyles.body,
    color: colors.text.primary,
    minWidth: 20,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  summaryLabel: {
    ...textStyles.body,
    color: colors.text.primary,
  },
  summaryValue: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
  },
  checkoutButton: {
    marginTop: spacing.lg,
    borderRadius: borderRadius.full,
  },
});
