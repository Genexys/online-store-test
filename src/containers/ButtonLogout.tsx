import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import Button from '@/components/Button';

const ButtonLogout: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  return <Button onClick={handleLogout}>Log In</Button>;
};

export default ButtonLogout;
