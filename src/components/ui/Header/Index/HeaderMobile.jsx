import React, { useState } from 'react';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinkActive from '../NavLink/NavLink';
import NavLinksGroup from '../NavLinksGroup/NavLinksGroup';

const Header = () => {
  const [visible, setVisible] = useState(false);

  const routes = [
    {path: 'games/1', capture: 'Игра 1'},
    {path: 'games/2', capture: 'Игра 2'},
    {path: 'games/3', capture: 'Игра 3'},
  ];

  return (
    <nav className={classes.navigation}>
      <div className='container'>
        <div className={classes['nav-container']}>
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
            <NavLinkActive 
              path='profile/John' 
              capture='Profile'
              hideLinksList={() => setVisible(false)}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
