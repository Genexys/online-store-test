import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

const domNode = document.getElementById('root') as HTMLDivElement;

const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
