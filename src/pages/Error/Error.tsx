import React from 'react';
import styles from './error.module.css';

const Error = () => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.code} title="404">
        404
      </span>
    </div>
  );
};

export default Error;
