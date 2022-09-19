import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './Modal.module.css';
import { close, selectModal } from './modalSlice';
import * as ModalChildren from "./ModalChildren";
import * as ModalChildrenHandlers from "./ModalChildrenHandlers";

const Modal = () => {
  const dispatch = useDispatch();
  const { visible, header, childComponentName, childComponentProps } = useSelector(selectModal);
  const ChildComponent = ModalChildren[childComponentName || 'Empty'];
  
  const handlers = {};
  if (childComponentProps && childComponentProps.handlers) {
    for (const key in childComponentProps.handlers) {
      if (Object.hasOwnProperty.call(childComponentProps.handlers, key)) {
        handlers[key] = ModalChildrenHandlers[childComponentProps.handlers[key]];
      }
    }
  }
  const props = {...childComponentProps, handlers: handlers};
  
  const containerClasses = [css['modal-container']];
  containerClasses.push(visible ? css.visible : '');
  
  const modalClasses = [css.modal];
  modalClasses.push(visible ? '' : css.invisible);

  return (
    <div className={containerClasses.join(' ')} >
      <div className={modalClasses.join(' ')} >
        <div className={css['content-holder']}>
          <h1 className={css.header}>{header}</h1>
          <ChildComponent {...props} />
        </div>
        <div className={css.cross} onClick={() => dispatch(close())} />
      </div>
    </div>
  );
}

export default Modal;
