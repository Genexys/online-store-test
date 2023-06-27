import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { replaceCartItems, addToCart, increaseAmount, decreaseAmount } from '@/store/cartSlice';
import ProductCard from '@/components/ProductCard';
import ProductList from '@/components/ProductList';
import { Product } from '@/data';

import styles from '../../components/global.css';

const Home = () => {
  const [cartItemsStorage, setCartItemsStorage] = useState<Product[]>([]);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const productItems = useSelector((state: RootState) => state.products.products);
  const productItemsCart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

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
      setCartItemsStorage(savedItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <>
      <h1 className={styles.title}>Products</h1>
      <ProductList>{renderProducts()}</ProductList>
    </>
  );
};

export default Home;
