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
  },
});

export const { addProduct } = productsSlice.actions;

export default productsSlice.reducer;
