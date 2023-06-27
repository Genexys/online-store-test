import React from 'react';
import styles from './logo.module.css';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '@/routePaths';

type TProps = {
  src: string;
  title: string;
  width?: number;
  height?: number;
};

const Logo: React.FC<TProps> = ({ src, title, width, height }) => {
  return (
    <div className={styles.logo}>
      <Link to={HOME_ROUTE}>
        <img src={src} alt={title} width={width} height={height} />
      </Link>
    </div>
  );
};

export default Logo;
