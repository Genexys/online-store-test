import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  HOME_ROUTE,
  CART_ROUTE,
  ORDER_ROUTE,
  ORDER_STEP1_ROUTE,
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
import Error from '@/pages/Error';

const RoutesApp: React.FC = () => {
  return (
    <Routes>
      <Route path={HOME_ROUTE} element={<Main />}>
        <Route index element={<Home />} />
        <Route path={CART_ROUTE} element={<Cart />} />
        <Route path="order/*" element={<Order />}>
          <Route index element={<Step1 />} />
          <Route path="step2" element={<Step2 />} />
          <Route path="step3" element={<Step3 />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default RoutesApp;
