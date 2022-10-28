import React, { useRef, useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import Container from '../../../common/Container/Container';
import DropDownMenu from '../DropDownMenu/DropDownMenu';
import MenuIcon from '../MenuIcon/MenuIcon';

const Header = () => {
  const menuRef = useRef();
  const [isMenuOpened, setIsMenuOpened] = useState(false)

  function handleMenu() {
    // if menu closed then just open it,
    // animation handles by DropDownMenu component internally in useEffect hook
    if (!menuRef.current) {
      setIsMenuOpened(true);
      return;
    }
    // if menu opened then hide it and after that unmount
    hideMenu(menuRef);
    setTimeout(() => {
      setIsMenuOpened(false)
    }, 300);
  }

  function hideMenu(menuRef) {
    const menuHeight = menuRef.current.getBoundingClientRect().height;
    const headerHeight = 60;
    menuRef.current.style.top = headerHeight - menuHeight + 'px';
    menuRef.current.style.zIndex = -1;
  }

  return (
    <div className={css.header}>
      <Container>
        <nav className={css.navContainer}>
          <Logo handleClick={isMenuOpened ? handleMenu : null} />
          <MenuIcon isMenuOpened={isMenuOpened} handleClick={handleMenu} />
          {isMenuOpened &&
            <DropDownMenu ref={menuRef} closeMenu={handleMenu} hideMenu={hideMenu} />
          }
        </nav>
      </Container>
    </div>
  );
}

export default Header;
