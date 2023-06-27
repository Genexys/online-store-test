import React from 'react';
import styles from './menu.module.css';

type TProps = {
  children: React.ReactNode;
};

const Menu: React.FC<TProps> = ({ children }) => {
  return (
    <nav className={styles.menu}>
      <ul className={styles.list}>{children}</ul>
    </nav>
  );
};

export default Menu;
