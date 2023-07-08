import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '@/components/Button';

const ButtonSignup = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return <Button onClick={handleSignUp}>Sign Up</Button>;
};

export default ButtonSignup;
