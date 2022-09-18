import React from 'react';
import { useDispatch } from 'react-redux';
import { delayedOpen } from '../../Modal/modalSlice';

const Anonymous = () => {
  const dispatch = useDispatch();

  const modalPayload = {
    enter: {
      header: 'Вход',
      childComponentName: 'LoginWindow',
    },
    reg: {
      header: 'Регистрация',
      childComponentName: 'RegistrationWindow',
    },
  };

  return (
    <div>
      <a 
        href='#'
        onClick={() => dispatch(delayedOpen(modalPayload.enter))}
      >
        Войти
      </a>
      <div style={{'padding': '10px 0'}}>|</div>
      <a 
        href='#'
        onClick={() => dispatch(delayedOpen(modalPayload.reg))}
      >
        Регистрация
      </a>
    </div>
  );
}

export default Anonymous;
