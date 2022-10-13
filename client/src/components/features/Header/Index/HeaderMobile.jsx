import React, { useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import CustomLink from '../CustomLink/CustomLink';
import NavLinksGroup from '../NavLinksGroup/NavLinksGroup';
import gamesData from '../../../../meta_data/games/gamesMetaData';
import RegistrationWindow from '../../ModalChildren/RegistrationWindow/RegistrationWindow';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu/Mobile'
import Container from '../../../common/Container/Container';

const Header = () => {
  // const routes = gamesData.map(
  //   d => {return {
  //     path: 'games/' + d.urls[0],
  //     capture: d.name
  //   }
  // });
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const menuClasses = [css.menuIcon];
  if (isMenuOpened) menuClasses.push(css.opened)

  const menuIcon = <div className={menuClasses.join(' ')} onClick={() => setIsMenuOpened(!isMenuOpened)}></div>

  return (
    <nav className={css.navigation}>
      <Container>
        <div className={css.navContainer}>
          <Logo />
          {menuIcon}
          {/* <div className={menuClasses.join(' ')} onClick={() => setIsMenuOpened(!isMenuOpened)}></div> */}
        </div>
      </Container>
    </nav>
  );
}

export default Header;
