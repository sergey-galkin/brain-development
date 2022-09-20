import React, { useContext, useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinkActive from '../NavLink/NavLink';
import NavLinksGroup from '../NavLinksGroup/NavLinksGroup';
import gamesData from '../../../../games_data/index';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/RegistrationWindow';
import { ModalContext } from '../../../../contex';

const Header = () => {
  const modal = useContext(ModalContext);
  const [visible, setVisible] = useState(false);

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
            <Logo hideLinksList={() => setVisible(false)}/>
            <NavLinksGroup 
              capture={'Игры'} 
              routes={routes}
              visible={visible}
              hideLinksList={setVisible}
            />
          </div>
          <div onClick={() => setVisible(false)}>
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
