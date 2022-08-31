import React, { useContext } from 'react';
import { ModalContext } from '../../../contex';
import css from './Modal.module.css';

const Modal = () => {
  const {visible, update, header, children} = useContext(ModalContext);

  const containerClasses = [css['modal-container']];
  containerClasses.push(visible ? css.visible : '');
  
  const modalClasses = [css.modal];
  modalClasses.push(visible ? '' : css.invisible);
  
  return (
    <div className={containerClasses.join(' ')} >
      <div className={modalClasses.join(' ')} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          {children}
        </div>
        <div className={css.cross} onClick={() => update()} />
      </div>
    </div>
  );
}

export default Modal;
