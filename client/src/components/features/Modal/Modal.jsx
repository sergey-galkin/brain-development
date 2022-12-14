import React, { useContext, useEffect, useMemo } from 'react';
import css from './Modal.module.css';
import { useSpring, animated } from '@react-spring/web'
import EventHandler from '../../../libs/EventHandler';
import { ModalContext } from '../../../context/context';

const Modal = () => {
  const { header, children, update } = useContext(ModalContext);
  const animationDudation = 100;
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 },
    config: {
      duration: animationDudation,
    }
  }))

  useEffect(() => {
    api.start({ opacity: 1 });
    escapeKeydownEH.add();

    return () => escapeKeydownEH.remove();
  }, [])

  const closeModalHandler = () => {
    api.start({ opacity: 0 })
    setTimeout( () => {
      update({
        visible: false,
        header: null,
        children: null,
      });
    }, animationDudation);
  };

  const escapeKeydownEH = useMemo(() =>
    new EventHandler(
      document, { 'keydown': handleEscapeButton }
    )
  , [])

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
