import React from 'react';
import styles from './button.module.css';

type TProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<TProps> = ({ children, onClick }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <span className={styles.inner}>{children}</span>
    </div>
  );
};

export default Button;
