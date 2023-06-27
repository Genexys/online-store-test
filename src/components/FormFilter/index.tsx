import React, { useState, useEffect } from 'react';
import type { Product } from '@/data';
import { filterByCharacteristic, resetFilters } from '@/store/productsSlice';
import { useDispatch } from 'react-redux';

import styles from './formFilter.css';

type TProps = {
  products: Product[];
};

const FormFilter: React.FC<TProps> = ({ products }): JSX.Element => {
  const [filters, setFilters] = useState<{ color: string | null; coolness: boolean | null }>({
    color: null,
    coolness: null,
  });
  const dispatch = useDispatch();

  const colors = Array.from(
    new Set(products.map((product: Product) => product.characteristic.color))
  );
  const coolnessLevels = Array.from(
    new Set(products.map((product: Product) => product.characteristic.coolness))
  );

  const resetFilter = (): void => {
    dispatch(resetFilters());
    setFilters({
      color: null,
      coolness: null,
    });
  };

  useEffect(() => {
    dispatch(filterByCharacteristic(filters));
  }, [filters, dispatch]);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setFilters((prevFilters) => ({ ...prevFilters, color: event.target.value }));
  };

  const handleCoolnessChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const coolness = event.target.value === 'true';
    setFilters((prevFilters) => ({ ...prevFilters, coolness }));
  };

  return (
    <div>
      <div className={styles.filterItem}>
        <h4 className={styles.title}>Color</h4>
        <fieldset className={styles.fieldset}>
          {colors.map((color: string) => (
            <div key={color}>
              <input
                type="radio"
                id={color}
                name="color"
                value={color}
                checked={filters.color === color}
                onChange={handleColorChange}
              />
              <label htmlFor={color}>{color}</label>
            </div>
          ))}
        </fieldset>
      </div>
      <div className={styles.filterItem}>
        <h4 className={styles.title}>Coolness</h4>
        <fieldset className={styles.fieldset}>
          {coolnessLevels.map((level: boolean) => (
            <div key={`${level}`}>
              <input
                type="radio"
                id={`${level}`}
                name="coolness"
                value={`${level}`}
                checked={filters.coolness === level}
                onChange={handleCoolnessChange}
              />
              <label htmlFor={`${level}`}>{level ? 'Cool' : 'Not Cool'}</label>
            </div>
          ))}
        </fieldset>
      </div>

      <button className={styles.button} onClick={() => resetFilter()}>
        reset
      </button>
    </div>
  );
};

export default FormFilter;
