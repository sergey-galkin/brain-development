import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import css from './Modal.module.css';
import { close, open } from './modalSlice';
import { useSpring, animated } from '@react-spring/web'

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
    api.start({ opacity: 1 })
  }, [])

  const closeModalHandler = () => {
    api.start({ opacity: 0 })
    setTimeout( () => {
      closeModal();
      dispatch( close() );
    }, 100);
  };

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
