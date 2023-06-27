import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './menuItem.module.css';

type TProps = {
  children: React.ReactNode;
  path: string;
};

const MenuItem: React.FC<TProps> = ({ children, path }) => {
  return (
    <li className={styles.menuItem}>
      <NavLink
        to={path}
        className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
      >
        {children}
      </NavLink>
    </li>
  );
};

export default MenuItem;
