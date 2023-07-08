import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '@/components/Button';

const ButtonLogin: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    });
  };
  return <Button onClick={handleLogin}>Log In</Button>;
};

export default ButtonLogin;
