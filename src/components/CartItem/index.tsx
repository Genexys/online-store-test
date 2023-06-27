import React from 'react';
import styles from './cartItem.module.css';
import Quantity from '../Quantity';

type TProps = {
  id: number;
  title: string;
  src: string;
  price: number;
  amount: number;
  currency?: string;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  removeFromCart: (id: number) => void;
};

const CartItem: React.FC<TProps> = ({
  id,
  title,
  src,
  price,
  amount,
  currency = '$',
  increaseAmount,
  decreaseAmount,
  removeFromCart,
}) => {
  return (
    <tr className={styles.cartItem}>
      <td className={styles.cartRemove}>
        <button className={styles.buttonRemove} onClick={() => removeFromCart(id)}>
          <span className={styles.iconRemove}>
            <svg
              fill="currentColor"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M5.293 6.707l5.293 5.293-5.293 5.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5.293-5.293 5.293 5.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-5.293-5.293 5.293-5.293c0.391-0.391 0.391-1.024 0-1.414s-1.024-0.391-1.414 0l-5.293 5.293-5.293-5.293c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
            </svg>
          </span>
        </button>
      </td>

      <td className={styles.cartImage}>
        <img src={src} alt={title} />
      </td>

      <td className="product-name" data-title="Product">
        <div className="ast-product-image ast-disable-image">
          <div className="ast-product-name">{title}</div>
        </div>
      </td>

      <td className="product-price" data-title="Price">
        <span className={styles.amount}>
          <span className={styles.currency}>{currency}</span> {price}
        </span>{' '}
      </td>

      <td className="product-quantity" data-title="Quantity">
        <div className={styles.quantity}>
          <Quantity
            id={id}
            amount={amount}
            increaseAmount={increaseAmount}
            decreaseAmount={decreaseAmount}
          />
        </div>
      </td>

      <td className={styles.subtotal} data-title="Subtotal">
        <span className={styles.amount}>
          <span className={styles.currency}>{currency}</span> {price * amount}
        </span>{' '}
      </td>
    </tr>
  );
};

export default CartItem;
