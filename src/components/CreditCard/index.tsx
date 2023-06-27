import React from 'react';
import styles from './Card.module.css';

type TProps = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: string;
};

const Card: React.FC<TProps> = ({ number, name, expiry, cvc, focus }): JSX.Element => {
  const isCvcFocused = focus === 'cvc';

  const cardNumber = number || '**** **** **** ****';
  const cardName = name || 'FULL NAME';
  const cardExpiry = expiry || 'MM/YY';

  return (
    <div className={`${styles.card} ${isCvcFocused ? styles.flipped : ''}`}>
      <div className={styles.front}>
        <div className={`${styles.number} ${focus === 'number' ? styles.selected : ''}`}>
          {cardNumber}
        </div>
        <div className={`${styles.expiry} ${focus === 'expiry' ? styles.selected : ''}`}>
          <div className={styles.date}>Expires</div>
          {cardExpiry}
        </div>
        <div className={`${styles.name} ${focus === 'name' ? styles.selected : ''}`}>
          <div className={styles.cardHolder}>card holder</div>
          {cardName}
        </div>
      </div>
      <div className={styles.back}>
        <div className={`${styles.cvc} ${focus === 'cvc' ? styles.selected : ''}`}>{cvc}</div>
      </div>
    </div>
  );
};

export default Card;
