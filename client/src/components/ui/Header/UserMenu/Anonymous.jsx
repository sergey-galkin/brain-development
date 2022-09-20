import React, { useState } from 'react';
import LoginWindow from '../../ModalChildren/LoginWindow/LoginWindow';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/RegistrationWindow';
import Modal from '../../Modal/Modal';

const Anonymous = () => {
  const [dialogIndex, setDialogIndex] = useState(0);

  const dialogs = [
    null,
    <Modal header={'Вход'} handleCrossClick={() => setDialogIndex(0)}>
      <LoginWindow/>
    </Modal>,
    <Modal header={'Регистрация'} handleCrossClick={() => setDialogIndex(0)}>
      <RegistrationWindow/>
    </Modal>,
  ];

  return (
    <div>
      <a href='#' onClick={() => setDialogIndex(1)} >
        Войти
      </a>
      <div style={{'padding': '10px 0'}}>|</div>
      <a href='#' onClick={() => setDialogIndex(2)}>
        Регистрация
      </a>
      { dialogs[dialogIndex] }
    </div>
  );
}

export default Anonymous;
