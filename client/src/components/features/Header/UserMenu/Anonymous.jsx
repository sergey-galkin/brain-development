import React, { useState } from 'react';
import LoginWindow from '../../ModalChildren/LoginWindow/LoginWindow';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/RegistrationWindow';
import Modal from '../../Modal/Modal';
import { delayedOpen } from '../../Modal/handlers';
import { useMediaQuery } from 'react-responsive';
import NavButton from '../../Buttons/CSSButtons/NavButton/NavButton';

const Anonymous = () => {
  const [dialogIndex, setDialogIndex] = useState(0);
  const isDesktop = useMediaQuery({minWidth: 768});

  const dialogs = [
    null,
    <Modal header={'Вход'} closeModal={() => setDialogIndex(0)}>
      <LoginWindow/>
    </Modal>,
    <Modal header={'Регистрация'} closeModal={() => setDialogIndex(0)}>
      <RegistrationWindow/>
    </Modal>,
  ];
  
  function showModal(index) {
    delayedOpen( () => setDialogIndex(index))
  }

  return (
    <>
      <NavButton handleClick={() => showModal(1)}>Войти</NavButton>
      {
        isDesktop && <div style={{'padding': '10px 0'}}>|</div>
      }
      <NavButton handleClick={() => showModal(2)}>Регистрация</NavButton>
      { dialogs[dialogIndex] }
    </>
  );
}

export default Anonymous;
