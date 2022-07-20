import React from 'react';
import css from './Modal.module.css';

const Modal = ({visible, setVisible, children}) => {
  const containerClasses = [css['modal-container']];
  containerClasses.push(visible ? css.visible : '');
  
  const modalClasses = [css.modal, css.info];
  modalClasses.push(visible ? '' : css.invisible);
  
  return (
    <div 
      className={containerClasses.join(' ')} 
    >
      <div 
        className={modalClasses.join(' ')} 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <div className={css.cross} onClick={() => setVisible(false)}>
          X
        </div>
      </div>
    </div>
  );
}

export default Modal;
