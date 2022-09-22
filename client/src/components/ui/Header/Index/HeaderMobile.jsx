import React, { useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import CustomLink from '../CustomLink/CustomLink';
import NavLinksGroup from '../NavLinksGroup/NavLinksGroup';
import gamesData from '../../../../games_meta_data/gamesMetaData';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/RegistrationWindow';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu/Mobile'

const Header = () => {
  // const routes = gamesData.map(
  //   d => {return {
  //     path: 'games/' + d.urls[0],
  //     capture: d.name
  //   }
  // });
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const menuClasses = [css['menu-icon']];
  if (isMenuOpened) menuClasses.push(css['opened'])

  const menuIcon = <div className={menuClasses.join(' ')} onClick={() => setIsMenuOpened(!isMenuOpened)}></div>

  return (
    <nav className={css.navigation}>
      <div className='container'>
        <div className={css['nav-container']}>
          <Logo />
          {menuIcon}
          {/* <div className={menuClasses.join(' ')} onClick={() => setIsMenuOpened(!isMenuOpened)}></div> */}
        </div>
      </div>
    </nav>
  );
}

export default Header;
