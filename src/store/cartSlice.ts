import { Product } from '@/data';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface CartState {
  items: Product[];
  amount: number;
}

const initialState: CartState = {
  items: [],
  amount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      state.items = [...state.items, action.payload];
      state.amount = state.items.reduce((acc, item) => acc + item.amount, 0);
    },
    updateCartAmount: (state: CartState, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
    increaseAmount: (state: CartState, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.amount += 1;
        state.amount = state.items.reduce((acc, item) => acc + item.amount, 0);
      }
    },
    decreaseAmount: (state: CartState, action: PayloadAction<number>) => {
      const product = state.items.find((item) => item.id === action.payload);

      if (product) {
        product.amount -= 1;
        state.amount = state.items.reduce((acc, item) => acc + item.amount, 0);

        if (product.amount <= 0) {
          state.items = state.items.filter((item) => item.id !== action.payload);
        }
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.amount = state.items.reduce((acc, item) => acc + item.amount, 0);
    },
    replaceCartItems: (state: CartState, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
      state.amount = action.payload.reduce((acc, item) => acc + item.amount, 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseAmount,
  decreaseAmount,
  updateCartAmount,
  replaceCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
