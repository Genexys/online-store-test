import products, { Product } from './../data';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: products,
};

const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state: ProductState, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    sortProducts: (state, action) => {
      const sortType = action.payload;
      console.log('🚀 ~ file: productsSlice.ts:21 ~ sortType:', sortType);

      switch (sortType) {
        case 'price-asc':
          return {
            ...state,
            products: [...state.products].sort((a, b) => a.price - b.price),
          };
        case 'price-desc':
          return {
            ...state,
            products: [...state.products].sort((a, b) => b.price - a.price),
          };
        default:
          return state;
      }
    },
  },
});

export const { addProduct, sortProducts } = productsSlice.actions;

export default productsSlice.reducer;
