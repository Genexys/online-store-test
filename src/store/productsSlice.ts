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
    filterByCharacteristic: (state, action: PayloadAction<{ [key: string]: any }>) => {
      const filters = action.payload;

      state.filteredProducts = state.products.filter((product) =>
        Object.keys(filters).every(
          (key) => filters[key] === null || product.characteristic[key] === filters[key]
        )
      );
    },

    resetFilters: (state) => {
      state.filteredProducts = state.products;
    },
  },
});

export const { addProduct, sortProducts, filterByCharacteristic, resetFilters } =
  productsSlice.actions;

export default productsSlice.reducer;
