import products, { Product } from './../data';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: products,
  filteredProducts: products,
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

      switch (sortType) {
        case 'price-asc':
          return {
            ...state,
            filteredProducts: [...state.filteredProducts].sort((a, b) => a.price - b.price),
          };
        case 'price-desc':
          return {
            ...state,
            filteredProducts: [...state.filteredProducts].sort((a, b) => b.price - a.price),
          };
        default:
          return state;
      }
    },
    filterByCharacteristic: (
      state,
      action: PayloadAction<{ characteristic: string; value: string | number | boolean }>
    ) => {
      const { characteristic, value } = action.payload;

      if (state.filteredProducts.length < state.products.length) {
        state.filteredProducts = state.filteredProducts.filter(
          (product) => product.characteristic[characteristic] === value
        );
      } else {
        state.filteredProducts = state.products.filter(
          (product) => product.characteristic[characteristic] === value
        );
      }
    },
    resetFilters: (state) => {
      state.filteredProducts = state.products;
    },
  },
});

export const { addProduct, sortProducts, filterByCharacteristic, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
