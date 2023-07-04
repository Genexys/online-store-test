import { Auth0Provider, AppState } from '@auth0/auth0-react';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type TProps = {
  children: ReactNode;
};

export const Auth0ProviderWithNavigate = ({ children }: TProps): JSX.Element | null => {
  const navigate = useNavigate();

  const domain: string | undefined = process.env.REACT_APP_AUTH0_DOMAIN;
  console.log(
    '🚀 ~ file: authProvider.tsx:13 ~ Auth0ProviderWithNavigate ~ process.env:',
    process.env
  );
  console.log('🚀 ~ file: authProvider.tsx:13 ~ Auth0ProviderWithNavigate ~ domain:', domain);
  const clientId: string | undefined = process.env.REACT_APP_AUTH0_CLIENT_ID;
  console.log('🚀 ~ file: authProvider.tsx:15 ~ Auth0ProviderWithNavigate ~ clientId:', clientId);
  const redirectUri: string | undefined = process.env.REACT_APP_AUTH0_CALLBACK_URL;
  console.log(
    '🚀 ~ file: authProvider.tsx:17 ~ Auth0ProviderWithNavigate ~ redirectUri:',
    redirectUri
  );

  const onRedirectCallback = (appState: AppState | undefined): void => {
    console.log(
      '🚀 ~ file: authProvider.tsx:18 ~ onRedirectCallback ~ appState?.returnTo || window.location.pathname:',
      appState?.returnTo || window.location.pathname
    );
    navigate(appState?.returnTo || window.location.pathname);
  };

  console.log(
    '🚀 ~ file: authProvider.tsx:27 ~ Auth0ProviderWithNavigate ~ domain && clientId && redirectUri:',
    domain && clientId && redirectUri
  );

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
