import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Route, Routes } from 'react-router-dom';
import {
  HOME_ROUTE,
  CART_ROUTE,
  ORDER_ROUTE,
  ORDER_STEP2_ROUTE,
  ORDER_STEP3_ROUTE,
} from '@/routePaths';
import Main from '@/pages/Main';
import Home from '@/pages/Home/Home';
import Cart from '@/pages/Cart/Cart';
import Order from '@/pages/Order/Order';
import Step1 from '@/pages/Order/Step1';
import Step2 from '@/pages/Order/Step2';
import Step3 from '@/pages/Order/Step3';
import Error from '@/pages/Error/Error';

const RoutesApp: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <div> Loading ... </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Main />}>
        <Route index element={<Home />} />
        <Route path={CART_ROUTE} element={<Cart />} />
        <Route path={`${ORDER_ROUTE}/*`} element={<Order />}>
          <Route index element={<Step1 />} />
          <Route path={ORDER_STEP2_ROUTE} element={<Step2 />} />
          <Route path={ORDER_STEP3_ROUTE} element={<Step3 />} />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default RoutesApp;
