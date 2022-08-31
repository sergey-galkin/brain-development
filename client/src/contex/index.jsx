import React from 'react';

export const modalStateData = {
  visible: false,
  header: null,
  children: null,
  update: () => {}
}

export const ModalContext = React.createContext();