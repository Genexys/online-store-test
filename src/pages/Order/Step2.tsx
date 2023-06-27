import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/CreditCard';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ORDER_STEP3_ROUTE } from '@/routePaths';

import styles from './order.module.css';

type Inputs = {
  number: string;
  name: string;
  expiry: string;
  cvc: string;
  focus: string;
};

type Focused = 'name' | 'number' | 'expiry' | 'cvc' | '';

const Step2 = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [focus, setFocus] = useState<Focused>('');
  const watchAllFields = watch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (event.target.name === 'expiry' && value.length === 2 && !value.includes('/')) {
      value = value + '/';
    }
    const regex = event.target.name === 'name' ? /^[a-zA-Z\s]*$/ : /^[0-9/]*$/;
    if (regex.test(value)) setValue(event.target.name as keyof Inputs, value);
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    navigate(ORDER_STEP3_ROUTE);
  };

  return (
    <>
      <div className={styles.card}>
        <Card
          number={watchAllFields.number || ''}
          name={watchAllFields.name || ''}
          expiry={watchAllFields.expiry || ''}
          cvc={watchAllFields.cvc || ''}
          focus={focus}
        />
      </div>

      <br />
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.inputField}
          type="tel"
          placeholder="Card Number"
          minLength={16}
          maxLength={16}
          {...register('number', {
            required: 'This field is required',
            minLength: 16,
            maxLength: 16,
          })}
          name="number"
          onFocus={() => setFocus('number')}
          onBlur={() => setFocus('')}
          onChange={handleInputChange}
        />
        {errors.number && <p className={styles.errorMsg}>{errors.number.message}</p>}
        <input
          className={styles.inputField}
          type="text"
          placeholder="Name"
          minLength={2}
          {...register('name', { required: 'This field is required', minLength: 2 })}
          name="name"
          onFocus={() => setFocus('name')}
          onBlur={() => setFocus('')}
          onChange={handleInputChange}
        />
        {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
        <input
          className={styles.inputField}
          type="text"
          placeholder="MM/YY"
          {...register('expiry', {
            required: 'This field is required',
            pattern: /^(0[1-9]|1[0-2])\/\d{2}$/,
          })}
          maxLength={5}
          name="expiry"
          onFocus={() => setFocus('expiry')}
          onBlur={() => setFocus('')}
          onChange={handleInputChange}
        />
        {errors.expiry && <p className={styles.errorMsg}>{errors.expiry.message}</p>}
        <input
          className={styles.inputField}
          type="tel"
          placeholder="CVC"
          {...register('cvc', { required: 'This field is required', minLength: 3, maxLength: 3 })}
          maxLength={3}
          name="cvc"
          onFocus={() => setFocus('cvc')}
          onBlur={() => setFocus('')}
          onChange={handleInputChange}
        />
        {errors.cvc && <p className={styles.errorMsg}>This field is required</p>}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Step2;
