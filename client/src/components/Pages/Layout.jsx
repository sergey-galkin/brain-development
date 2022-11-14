import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../features/Footer/Index/Index';
import Header from '../features/Header/Index/Header';

const Layout = () => {
  return (
    <div className="app">
      <Header /> 
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;
