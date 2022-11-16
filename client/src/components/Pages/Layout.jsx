import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../features/Footer/Index/Index';
import Header from '../features/Header/Index/Index';
import { ModalContext, modalStateData } from '../../context/context';
import Modal from '../features/Modal/Modal';

const Layout = () => {
  const [modal, setModal] = useState({...modalStateData, update: updateModal});

  function updateModal({visible, header, children}) {
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
      setModal({
        visible: false,
        header: null,
        children: null,
        update: updateModal,
      })
    }
  }

  return (
    <div className="app">
      <ModalContext.Provider value={modal}>
        <Header /> 
        <Outlet />
        {/* <Footer /> */}
        {modal.visible && <Modal />}
      </ModalContext.Provider>
    </div>
  );
}

export default Layout;
