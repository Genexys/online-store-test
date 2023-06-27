import React, { useState } from 'react';
import type { Product } from '@/data';
import { filterByCharacteristic, resetFilters } from '@/store/productsSlice';
import { useDispatch } from 'react-redux';

import styles from './formFilter.css';

type TProps = {
  products: Product[];
};

const FormFilter: React.FC<TProps> = ({ products }): JSX.Element => {
  const [colorFilter, setColorFilter] = useState<string>('');
  const [coolnessFilter, setCoolnessFilter] = useState<boolean>(false);
  const dispatch = useDispatch();

  const colors = Array.from(
    new Set(products.map((product: Product) => product.characteristic.color))
  );
  const coolnessLevels = Array.from(
    new Set(products.map((product: Product) => product.characteristic.coolness))
  );

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setColorFilter(event.target.value);
    dispatch(filterByCharacteristic({ characteristic: 'color', value: event.target.value }));
  };

  const handleCoolnessChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const coolness = event.target.value === 'true';
    setCoolnessFilter(coolness);
    dispatch(filterByCharacteristic({ characteristic: 'coolness', value: coolness }));
  };

  const resetFilter = (): void => {
    dispatch(resetFilters());
    setCoolnessFilter(false);
    setColorFilter('');
  };

  return (
    <div>
      <div>
        <h4 className={styles.title}>Color</h4>
        {colors.map((color: string) => (
          <div key={color}>
            <input
              type="radio"
              id={color}
              name="color"
              value={color}
              checked={colorFilter === color}
              onChange={handleColorChange}
            />
            <label htmlFor={color}>{color}</label>
          </div>
        ))}
      </div>
      <div>
        <h4 className={styles.title}>Coolness</h4>
        {coolnessLevels.map((level: boolean) => (
          <div key={`${level}`}>
            <input
              type="radio"
              id={`${level}`}
              name="coolness"
              value={`${level}`}
              checked={coolnessFilter === level}
              onChange={handleCoolnessChange}
            />
            <label htmlFor={`${level}`}>{level ? 'Cool' : 'Not Cool'}</label>
          </div>
        ))}

        <button className={styles.button} onClick={() => resetFilter()}>
          reset
        </button>
      </div>
    </div>
  );
};

export default FormFilter;
