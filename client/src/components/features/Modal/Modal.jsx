import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import css from './Modal.module.css';
import { close, open } from './modalSlice';
import { useSpring, animated } from '@react-spring/web'
import EventHandler from '../../../libs/EventHandler';

const Modal = ({header, closeModal, children }) => {
  const dispatch = useDispatch();
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: {
      duration: 100,
    }
  }))

  useEffect(() => {
    dispatch( open() );
    api.start({ opacity: 1 });
    escapeKeydownEH.current.add();

    return () => escapeKeydownEH.current.remove();
  }, [])

  const closeModalHandler = () => {
    api.start({ opacity: 0 })
    setTimeout( () => {
      closeModal();
      dispatch( close() );
    }, 100);
  };

  const escapeKeydownEH = useRef(
    new EventHandler(
      document, { 'keydown': handleEscapeButton }
    )
  )

  function handleEscapeButton(e) {
    e = e || window.event;
    if (e.code !== 'Escape') return;
    closeModalHandler();
  }

  return (
    <animated.div style={styles} className={css['modal-container']} >
      <div className={css.modal} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          { React.cloneElement(children, { closeModal: closeModalHandler }) }
        </div>
        <div className={css.cross} onClick={() => closeModalHandler()} />
      </div>
    </animated.div>
  );
}

export default Modal;
