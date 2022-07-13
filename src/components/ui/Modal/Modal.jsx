import React from 'react';
import css from './Modal.module.css';

const Modal = ({msg, btns}) => {
  return (
    <div>
      <div className={css['dark-screen']}></div>
      <div className={css['modal'] + ' ' + css['info']}>
        {msg}
      </div>
    </div>
  );
}

export default Modal;
