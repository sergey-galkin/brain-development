import React, { useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import Container from '../../../common/Container/Container';
import MobileMenu from '../../MobileMenu/MobileMenu';

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const menuClasses = [css.menuIcon];
  if (isMenuOpened) menuClasses.push(css.opened)

  const MenuIcon = <div className={menuClasses.join(' ')} onClick={() => setIsMenuOpened(!isMenuOpened)}></div>

  return (
    <div className={css.header}>
      <Container>
        <nav className={css.navContainer}>
          <Logo />
          { MenuIcon }
          { isMenuOpened && <MobileMenu closeMenu={() => setIsMenuOpened(false)}/> }
        </nav>
      </Container>
    </div>
  );
}

export default Header;
