import React from 'react';
import global from '../global.css';
import styles from './quantity.module.css';

type TProps = {
  id: number;
  amount: number;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
};

const Quantity: React.FC<TProps> = ({ id, amount, increaseAmount, decreaseAmount }) => {
  return (
    <div className={styles.quantity}>
      <label className={global.screenReaderText} htmlFor="minus_qty">
        Minus Quantity
      </label>
      <button
        id="minus_qty"
        className={`${styles.button} ${styles.minus}`}
        onClick={() => decreaseAmount(id)}
      >
        -
      </button>
      <label className={global.screenReaderText} htmlFor="quantity_6497fd3562ff6">
        75-Inch className Neo QLED QN90A Series 4K UHD Quantum HDR 32x Smart TV quantity
      </label>
      <input
        type="number"
        id="quantity"
        className={styles.input}
        name="input-quantity"
        value={amount}
        title="Qty"
        size={4}
        min="0"
        max=""
        step="1"
        inputMode="numeric"
        autoComplete="off"
      />
      <label className={global.screenReaderText} htmlFor="plus_qty">
        Plus Quantity
      </label>
      <button
        id="plus_qty"
        className={`${styles.button} ${styles.plus}`}
        onClick={() => increaseAmount(id)}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
