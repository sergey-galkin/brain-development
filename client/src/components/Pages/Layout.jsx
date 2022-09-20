import React from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeaderDesktop from '../ui/Header/Index/HeaderDesktop';
import HeaderMobile from '../ui/Header/Index/HeaderMobile';

const Layout = () => {
  const isDesktop = useMediaQuery({minWidth: 600});

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
