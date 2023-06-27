import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '@/store';
import {
  replaceCartItems,
  increaseAmount,
  decreaseAmount,
  removeFromCart,
} from '@/store/cartSlice';
import CartItem from '@/components/CartItem';
import CartTable from '@/components/CartTable';

import global from '../../components/global.css';
import styles from './cart.module.css';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

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
      <h2 className={global.title}>Cart</h2>

      {cartItems.length === 0 ? (
        <div>Not Items in cart</div>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.list}>
            <CartTable>
              {cartItems.map((product) => {
                return (
                  <CartItem
                    id={product.id}
                    key={product.id}
                    src={product.src}
                    title={product.title}
                    price={product.price}
                    amount={product.amount}
                    increaseAmount={() => dispatch(increaseAmount(product.id))}
                    decreaseAmount={() => dispatch(decreaseAmount(product.id))}
                    removeFromCart={() => dispatch(removeFromCart(product.id))}
                  />
                );
              })}
            </CartTable>
          </div>

          <div className={styles.total}>
            <h2 className={styles.totalTitle}>Cart total:</h2>
            <div className={styles.totalInner}>
              <p className={styles.totalPrice}>
                Total: $ {cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)}
              </p>
            </div>
            <button
              type="button"
              className={styles.checkoutButton}
              onClick={() => navigate('/order')}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
