import React from 'react';
import styles from './card.module.css';

type TProps = {
  id: number;
  src: string;
  title: string;
  description: string;
  price: number;
  currency?: string;
  amount: number;
  increaseAmount: (id: number) => void;
  decreaseAmount: (id: number) => void;
  addToCart?: () => void;
};

const ProductCard: React.FC<TProps> = ({
  id,
  src,
  title,
  description,
  price,
  currency = '$',
  amount,
  addToCart,
  increaseAmount,
  decreaseAmount,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <img src={src} alt={title} />
      </div>
      <div className={styles.body}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>
          {price} {currency}
        </div>
      </div>
      <div className={styles.footer}>
        {amount ? (
          <div className={styles.actionCart}>
            <button className={styles.buttonCount} onClick={() => decreaseAmount(id)}>
              -
            </button>
            <div className={styles.cartCount}> {amount}</div>
            <button className={styles.buttonCount} onClick={() => increaseAmount(id)}>
              +
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={addToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
