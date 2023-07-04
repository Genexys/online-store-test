import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Auth0ProviderWithNavigate } from './providers/authProvider';
import store from './store';
import App from './components/App';

const domNode = document.getElementById('root') as HTMLDivElement;

const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </Provider>
);
