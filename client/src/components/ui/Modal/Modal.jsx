import React, { useEffect, useRef, useState } from 'react';
import css from './Modal.module.css';

const Modal = ({header, handleCrossClick, children }) => {
  const container = useRef(null);

  useEffect(() => {
    container.current.classList.add(css.visible);
  }, [])

  const closeModal = () => {
    container.current.classList.remove(css.visible);
    setTimeout(() => {
      handleCrossClick();
    }, 100)
  };

  return (
    <div ref={container} className={css['modal-container']} >
      <div className={css.modal} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          { React.cloneElement(children, { closeModal: closeModal }) }
        </div>
        <div className={css.cross} onClick={closeModal} />
      </div>
    </div>
  );
}

export default Modal;
