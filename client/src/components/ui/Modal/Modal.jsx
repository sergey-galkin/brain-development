import React, { useEffect, useRef } from 'react';
import css from './Modal.module.css';

const Modal = ({header, closeModal, children }) => {
  const container = useRef(null);

  useEffect(() => {
    container.current.classList.add(css.visible);
  }, [])

  const modalHandler = (handler) => {
    container.current.classList.remove(css.visible);
    setTimeout(handler || closeModal, 100);
  };

  return (
    <div ref={container} className={css['modal-container']} >
      <div className={css.modal} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          { React.cloneElement(children, { closeModal: modalHandler }) }
        </div>
        <div className={css.cross} onClick={() => modalHandler()} />
      </div>
    </div>
  );
}

export default Modal;
