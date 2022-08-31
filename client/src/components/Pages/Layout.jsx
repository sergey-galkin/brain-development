import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import HeaderDesktop from '../ui/Header/Index/HeaderDesktop';
import HeaderMobile from '../ui/Header/Index/HeaderMobile';
import Modal from '../ui/Modal/Modal';
import { ModalContext, modalStateData } from '../../contex';


const Layout = () => {
  const isDesktop = useMediaQuery({minWidth: 600});
  const [modal, setModal] = useState({...modalStateData, update: updateModal});

  function updateModal(visible, header, children) {
    if (visible) {
      // if another modal is shown, wait until it would be closed
      const timerId = setInterval(() => {
        setModal((p) => {
          if (p.visible) return {...p};
          clearInterval(timerId);
          return {
            visible: visible,
            header: header || p.header,
            children: children || p.children,
            update: updateModal,
          }
        });
      }, 100);
    } else {
      setModal((p) => {
        return {
          visible: false,
          header: null,
          children: null,
          update: updateModal,
        }
      })
    }
  }

  return (
    <ModalContext.Provider value={modal}>
      <div className="app">
        {isDesktop 
          ? <HeaderDesktop/> 
          : <HeaderMobile/>
        }
        <Outlet />
      </div>
      <Modal />
    </ModalContext.Provider>
  );
}

export default Layout;
