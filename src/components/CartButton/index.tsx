import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateCartAmount } from '@/store/cartSlice';
import { CART_ROUTE } from '@/routePaths';
import { RootState } from '@/store';

import styles from './cart.module.css';

const CartButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { amount: cartAmount } = useSelector(({ cart }: RootState) => cart);

  useEffect(() => {
    const storedCartAmount = localStorage.getItem('cartAmount');

    if (storedCartAmount) {
      dispatch(updateCartAmount(Number(storedCartAmount)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('cartAmount', String(cartAmount));
  }, [cartAmount]);

  return (
    <div className={styles.cart}>
      <button className={styles.cartButton} onClick={() => navigate(CART_ROUTE)}>
        <ShoppingCartIcon />
        <span className={styles.cartCount}>{cartAmount}</span>
      </button>
    </div>
  );
};

export default CartButton;
