import Header from '@/components/Header';
import Layout from '@/components/Layout';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <>
      <Header />
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
};

export default Main;
