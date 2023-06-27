import React from 'react';
import styles from './header.module.css';
import Menu from '../Menu';
import MenuItem from '../MenuItem';
import Logo from '../Logo';
import logo from '../../../assets/images/logo-color.svg';
import Layout from '../Layout';
import Cart from '../CartButton';

import { HOME_ROUTE } from '@/routePaths';

const Header: React.FC = ({}) => {
  return (
    <div className={styles.header}>
      <Layout>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <Logo src={logo} title="logo" width={150} height={150} />
          </div>
          <Menu>
            <MenuItem path={HOME_ROUTE}>Home</MenuItem>
          </Menu>

          <div className={styles.cart}>
            <Cart />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Header;
