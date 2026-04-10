import React, {useEffect, useMemo, useState} from 'react';
import {Image, Modal, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Chip, IconButton, Text, TextInput} from 'react-native-paper';

import {RestaurantMenuItem} from '../../types/restaurant';
import {borderRadius, colors, spacing} from '../../theme';
import {textStyles} from '../../theme/typography';

interface MenuItemDetailModalProps {
  visible: boolean;
  item: RestaurantMenuItem | null;
  onClose: () => void;
  onAdd: (payload: {
    quantity: number;
    customizations: Record<string, unknown> | null;
    specialInstructions: string;
  }) => void;
}

const SIZE_OPTIONS = ['Small', 'Medium', 'Large'];
const TOPPING_OPTIONS = ['Extra Cheese', 'Avocado', 'Bacon', 'Mushrooms', 'Jalapenos'];

export function MenuItemDetailModal({
  visible,
  item,
  onClose,
  onAdd,
}: MenuItemDetailModalProps): React.JSX.Element {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[1]);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (visible) {
      setQuantity(1);
      setSelectedSize(SIZE_OPTIONS[1]);
      setSelectedToppings([]);
      setSpecialInstructions('');
    }
  }, [visible]);

  const customizationPayload = useMemo(
    () => ({
      size: selectedSize,
      toppings: selectedToppings,
    }),
    [selectedSize, selectedToppings],
  );

  if (!item) {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.backdrop} />
      </Modal>
    );
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.content}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>{item.name}</Text>
              <IconButton icon="close" onPress={onClose} />
            </View>

            {item.imageUrl ? (
              <Image source={{uri: item.imageUrl}} style={styles.image} resizeMode="cover" />
            ) : (
              <View style={styles.imagePlaceholder} />
            )}

            {item.description ? <Text style={styles.description}>{item.description}</Text> : null}

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Choose size</Text>
              <View style={styles.chipRow}>
                {SIZE_OPTIONS.map(size => (
                  <Chip
                    key={size}
                    selected={selectedSize === size}
                    onPress={() => setSelectedSize(size)}
                    style={styles.chip}
                    selectedColor={colors.text.inverse}
                    showSelectedOverlay>
                    {size}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Toppings</Text>
              <View style={styles.chipRow}>
                {TOPPING_OPTIONS.map(topping => (
                  <Chip
                    key={topping}
                    selected={selectedToppings.includes(topping)}
                    onPress={() =>
                      setSelectedToppings(prev =>
                        prev.includes(topping)
                          ? prev.filter(entry => entry !== topping)
                          : [...prev, topping],
                      )
                    }
                    style={styles.chip}
                    selectedColor={colors.text.inverse}
                    showSelectedOverlay>
                    {topping}
                  </Chip>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special instructions</Text>
              <TextInput
                mode="outlined"
                placeholder="Add a note for the kitchen"
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
                multiline
                numberOfLines={3}
                style={styles.textInput}
                outlineColor={colors.neutral.gray300}
              />
            </View>

            <View style={styles.quantityRow}>
              <Text style={styles.sectionTitle}>Quantity</Text>
              <View style={styles.quantityControls}>
                <IconButton
                  icon="minus"
                  onPress={() => setQuantity(prev => Math.max(1, prev - 1))}
                />
                <Text style={styles.quantityValue}>{quantity}</Text>
                <IconButton
                  icon="plus"
                  onPress={() => setQuantity(prev => Math.min(10, prev + 1))}
                />
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Text style={styles.priceText}>${item.price.toFixed(2)}</Text>
            <Button
              mode="contained"
              buttonColor={colors.primary.freshAvocadoGreen}
              onPress={() => {
                onAdd({
                  quantity,
                  customizations: customizationPayload,
                  specialInstructions,
                });
                onClose();
              }}>
              Add to Cart
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '92%',
  },
  content: {
    padding: spacing.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    ...textStyles.h3,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
  },
  imagePlaceholder: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.neutral.gray200,
    marginBottom: spacing.md,
  },
  description: {
    ...textStyles.bodySmall,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...textStyles.body,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.background.lightGray,
  },
  textInput: {
    backgroundColor: colors.background.white,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityValue: {
    ...textStyles.bodyLarge,
    color: colors.text.primary,
    marginHorizontal: spacing.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral.gray200,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    ...textStyles.h3,
    color: colors.text.primary,
  },
});
