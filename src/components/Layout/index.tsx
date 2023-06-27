import React from 'react';
import styles from './layout.module.css';

type TProps = {
  children: React.ReactNode;
};

const Layout: React.FC<TProps> = ({ children }) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
