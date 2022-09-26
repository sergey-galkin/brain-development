import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import css from './Modal.module.css';
import { close, open } from './modalSlice';

const Modal = ({header, closeModal, children }) => {
  const container = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( open() );
    container.current.classList.add(css.visible);
  }, [])

  const closeModalHandler = () => {
    container.current.classList.remove(css.visible);
    setTimeout( () => {
      closeModal();
      dispatch( close() );
    }, 100);
  };

  return (
    <div ref={container} className={css['modal-container']} >
      <div className={css.modal} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          { React.cloneElement(children, { closeModal: closeModalHandler }) }
        </div>
        <div className={css.cross} onClick={() => closeModalHandler()} />
      </div>
    </div>
  );
}

export default Modal;
