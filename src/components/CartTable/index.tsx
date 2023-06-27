import React from 'react';
import styles from './cartTable.module.css';
import global from '../global.css';

type TProps = {
  children: React.ReactNode;
};

const CartTable: React.FC<TProps> = ({ children }) => {
  return (
    <table className={styles.table} cellSpacing="0">
      <thead>
        <tr>
          <th className={styles.cartRemove}></th>
          <th className={styles.thumbnail}>
            <span className={global.screenReaderText}>Thumbnail image</span>
          </th>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th className={styles.subtotal}>Subtotal</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default CartTable;
