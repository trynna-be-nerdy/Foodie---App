import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CartItem, DeliveryAddress, FulfillmentType} from '../../types/order';

interface CartState {
  restaurantId: string | null;
  items: CartItem[];
  fulfillmentType: FulfillmentType;
  deliveryAddress: DeliveryAddress | null;
  tip: number;
  pointsToUse: number;
  specialInstructions: string;
}

const initialState: CartState = {
  restaurantId: null,
  items: [],
  fulfillmentType: 'PICKUP',
  deliveryAddress: null,
  tip: 0,
  pointsToUse: 0,
  specialInstructions: '',
};

function itemsMatch(a: CartItem, b: CartItem): boolean {
  return (
    a.menuItemId === b.menuItemId &&
    JSON.stringify(a.customizations ?? null) === JSON.stringify(b.customizations ?? null) &&
    (a.specialInstructions ?? '') === (b.specialInstructions ?? '')
  );
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    startCart(state, action: PayloadAction<string>) {
      if (state.restaurantId && state.restaurantId !== action.payload) {
        state.items = [];
        state.tip = 0;
        state.pointsToUse = 0;
        state.specialInstructions = '';
        state.deliveryAddress = null;
      }
      state.restaurantId = action.payload;
    },
    clearCart(state) {
      state.restaurantId = null;
      state.items = [];
      state.tip = 0;
      state.pointsToUse = 0;
      state.specialInstructions = '';
      state.deliveryAddress = null;
      state.fulfillmentType = 'PICKUP';
    },
    addItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(item => itemsMatch(item, action.payload));
      if (index >= 0) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItemQuantity(state, action: PayloadAction<{index: number; quantity: number}>) {
      const item = state.items[action.payload.index];
      if (!item) {
        return;
      }
      item.quantity = Math.max(1, action.payload.quantity);
    },
    removeItem(state, action: PayloadAction<number>) {
      state.items.splice(action.payload, 1);
    },
    setFulfillmentType(state, action: PayloadAction<FulfillmentType>) {
      state.fulfillmentType = action.payload;
      if (action.payload !== 'DELIVERY') {
        state.deliveryAddress = null;
      }
    },
    setDeliveryAddress(state, action: PayloadAction<DeliveryAddress | null>) {
      state.deliveryAddress = action.payload;
    },
    setTip(state, action: PayloadAction<number>) {
      state.tip = Math.max(0, action.payload);
    },
    setPointsToUse(state, action: PayloadAction<number>) {
      state.pointsToUse = Math.max(0, Math.floor(action.payload));
    },
    setSpecialInstructions(state, action: PayloadAction<string>) {
      state.specialInstructions = action.payload;
    },
  },
});

export const {
  startCart,
  clearCart,
  addItem,
  updateItemQuantity,
  removeItem,
  setFulfillmentType,
  setDeliveryAddress,
  setTip,
  setPointsToUse,
  setSpecialInstructions,
} = cartSlice.actions;

export function calculateCartSubtotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
}

export default cartSlice.reducer;
