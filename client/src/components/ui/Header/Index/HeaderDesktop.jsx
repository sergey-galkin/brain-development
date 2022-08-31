import React, { useContext, useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinkActive from '../NavLink/NavLink';
import NavLinksList from '../NavLinksList/NavLinksList';
import gamesData from '../../../../games_data/index';
import { ModalContext } from '../../../../contex';
import RegistrationWindow from '../../RegistrationWindow/RegistrationWindow';
import LoginWindow from '../../LoginWindow/LoginWindow';

const Header = () => {
  const modal = useContext(ModalContext);

  const routes = gamesData.map(
    d => {return {
      path: 'games/' + d.urls[0],
      capture: d.name
    }
  });

  return (
    <nav className={css.navigation}>
      <div className='container'>
        <div className={css['nav-container']}>
          <div>
            <Logo/>
            <NavLinksList routes={routes}/> 
          </div>
          <div>
            <a 
              href='#'
              onClick={() => {
                modal.update(true, 'Вход', <LoginWindow />);
              }}
            >
              Войти
            </a>
            <div className={css.separator}>|</div>
            <a 
              href='#'
              onClick={() => {
                modal.update(true, 'Регистрация', <RegistrationWindow />);
              }}
            >
              Регистрация
            </a>
            {/* <NavLinkActive 
              path='profile/John' 
              capture='Profile'
            /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
