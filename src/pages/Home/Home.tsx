import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { replaceCartItems, addToCart, increaseAmount, decreaseAmount } from '@/store/cartSlice';
import { sortProducts } from '@/store/productsSlice';
import ProductCard from '@/components/ProductCard';
import ProductList from '@/components/ProductList';
import CustomSelect from '@/components/Select';
import type { Product } from '@/data';

import { sortingOptions } from '@/constants/sortingOptions';

import global from '../../components/global.css';
import styles from './home.module.css';

const Home = () => {
  const [sort, setSort] = useState(sortingOptions[0].value);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productItems = useSelector((state: RootState) => state.products.products);
  const productItemsCart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleSortChange = (value: string) => {
    setSort(value);
    dispatch(sortProducts(value));
  };

  const renderProducts = () => {
    return productItems.map((product) => {
      const amountInCart = productItemsCart.find((item) => item.id === product.id);
      const amount = amountInCart ? amountInCart.amount : 0;

      return (
        <ProductCard
          id={product.id}
          key={product.id}
          src={product.src}
          title={product.title}
          description={product.description}
          price={product.price}
          amount={amount}
          addToCart={() => handleAddToCartClick(product)}
          increaseAmount={() => dispatch(increaseAmount(product.id))}
          decreaseAmount={() => dispatch(decreaseAmount(product.id))}
        />
      );
    });
  };

  const handleAddToCartClick = useCallback((product: Product) => {
    const productToAdd = { ...product, amount: 1 };
    dispatch(addToCart(productToAdd));
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const savedItems = JSON.parse(savedCart);
      dispatch(replaceCartItems(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <h1 className={global.title}>Products</h1>
      <div className={styles.filters}>
        <div className={styles.sortPrice}>
          <span className={styles.filterTitle}>Sort</span>
          <CustomSelect
            options={sortingOptions}
            selectedOption={sort}
            handleSelect={handleSortChange}
          />
        </div>
      </div>
      <ProductList>{renderProducts()}</ProductList>
    </>
  );
};

export default Home;
