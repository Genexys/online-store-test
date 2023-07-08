import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import ButtonLogin from './ButtonLogin';
import ButtonLogout from './ButtonLogout';
import ButtonSignup from './ButtonSignup';

export const ButtonActionsLogin = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
          <ButtonSignup />
          <ButtonLogin />
        </>
      )}
      {isAuthenticated && (
        <>
          <ButtonLogout />
        </>
      )}
    </div>
  );
};

export default ButtonActionsLogin;
