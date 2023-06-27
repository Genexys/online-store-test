import React from 'react';
import styles from './list.module.css';

type TProps = {
  children: React.ReactNode;
};

const ProductList: React.FC<TProps> = ({ children }) => {
  return <div className={styles.list}>{children}</div>;
};

export default ProductList;
