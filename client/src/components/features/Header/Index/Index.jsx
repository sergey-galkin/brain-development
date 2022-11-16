import React, { useCallback, useRef, useState } from 'react';
import css from './Index.module.css';
import Logo from '../Logo/Logo';
import Container from '../../../common/Container/Container';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import MenuIcon from '../MenuIcon/MenuIcon';

const Header = () => {
  const menuRef = useRef();
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [isMenuMounted, setIsMenuMounted] = useState(false)
  
  const animationDuration = 300;

  const handleMenu = useCallback(() => {
    // if menu closed then just open it,
    // animation handles by DropDownMenu component internally in useEffect hook
    if (!menuRef.current) {
      setIsMenuOpened(true);
      setIsMenuMounted(true);
      return;
    }
    // if menu opened then hide it and after that unmount
    hideMenu();
    setIsMenuOpened(false)
    setTimeout(() => {
      setIsMenuMounted(false);
    }, animationDuration);
  }, [])
  
  function hideMenu() {
    const menuHeight = menuRef.current.getBoundingClientRect().height;
    const headerHeight = 60;
    menuRef.current.style.top = headerHeight - menuHeight + 'px';
    menuRef.current.style.zIndex = -1;
  }

  function animateMenuApearance() {
    hideMenu();
    setTimeout(() => {
      menuRef.current.style.top = '60px';
    }, 0);
    setTimeout(() => {
      // if menu is still opened then put it on top layer
      if (menuRef.current.style.top === '60px') menuRef.current.style.zIndex = 1;
    }, animationDuration);
  }

  return (
    <div className={css.header}>
      <Container>
        <nav className={css.navContainer}>
          <Logo handleClick={isMenuMounted ? handleMenu : null} />
          <MenuIcon isMenuOpened={isMenuOpened} handleMenu={handleMenu} />
          {isMenuMounted &&
            <DropDownMenu ref={menuRef} closeMenu={handleMenu} animate={animateMenuApearance} />
          }
        </nav>
      </Container>
    </div>
  );
}

export default Header;
