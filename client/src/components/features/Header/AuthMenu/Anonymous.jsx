import React, { useContext } from 'react';
import LoginWindow from '../../ModalChildren/LoginWindow/Index/Index';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/Index/Index';
import { useMediaQuery } from 'react-responsive';
import NavButton from '../../Buttons/CSSButtons/NavButton/NavButton';
import { ModalContext } from '../../../../context/context';

const Anonymous = () => {
  const isDesktop = useMediaQuery({minWidth: 768});
  const { update } = useContext(ModalContext);

  const dialogs = [
    {
      visible: true,
      header: 'Вход',
      children: <LoginWindow/>,
    },
    {
      visible: true,
      header: 'Регистрация',
      children: <RegistrationWindow/>,
    },
  ];
  
  return (
    <>
      <NavButton handleClick={() => update(dialogs[0])}>Войти</NavButton>
      { isDesktop && <div style={{'padding': '10px 0'}}>|</div> }
      <NavButton handleClick={() => update(dialogs[1])}>Регистрация</NavButton>
    </>
  );
}

export default Anonymous;
