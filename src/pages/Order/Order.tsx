import React from 'react';
import { Outlet } from 'react-router-dom';

const Order: React.FC = () => {
  return (
    <div>
      <h1>Order Information</h1>
      <Outlet />
    </div>
  );
};

export default Order;
