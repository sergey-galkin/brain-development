import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeaderDesktop from '../features/Header/Index/HeaderDesktop';
import HeaderMobile from '../features/Header/Index/HeaderMobile';

const Layout = () => {
  const isDesktop = useMediaQuery({minWidth: 768});

  return (
    <div className="app">
      {isDesktop 
        ? <HeaderDesktop/> 
        : <HeaderMobile/>
      }
      <Outlet />
    </div>
  );
}

export default Layout;
