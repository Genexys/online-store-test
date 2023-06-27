import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import { updateCartAmount } from '@/store/cartSlice';
import { CART_ROUTE } from '@/routePaths';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import styles from './cart.module.css';

const Cart: React.FC = () => {
  const { amount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const cartAmountFromStorage = localStorage.getItem('cartAmount');

    if (cartAmountFromStorage) {
      dispatch(updateCartAmount(Number(cartAmountFromStorage)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartAmount', String(amount));
  }, [amount]);

  return (
    <div className={styles.cart}>
      <button className={styles.cartButton} onClick={() => navigate(CART_ROUTE)}>
        <ShoppingCartIcon />
        <span className={styles.cartCount}>{amount}</span>
      </button>
    </div>
  );
};

export default Cart;
