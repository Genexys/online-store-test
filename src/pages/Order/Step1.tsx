import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ORDER_STEP2_ROUTE } from '@/routePaths';

import styles from './order.module.css';

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const Step1 = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    navigate(ORDER_STEP2_ROUTE);
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            id="firstName"
            type="text"
            placeholder="First name"
            className={styles.inputField}
            {...register('firstName', { required: 'This field is required' })}
          />
          {errors.firstName && <p className={styles.errorMsg}>{errors.firstName.message}</p>}
          <input
            id="lastName"
            type="text"
            placeholder="Last name"
            className={styles.inputField}
            {...register('lastName', { required: 'This field is required' })}
          />
          {errors.lastName && <p className={styles.errorMsg}>{errors.lastName.message}</p>}
          <input
            id="email"
            type="email"
            placeholder="Email"
            className={styles.inputField}
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: 'Not valid email address',
              },
            })}
          />
          {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
          <button type="submit" className={styles.submitButton}>
            Next step
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step1;
