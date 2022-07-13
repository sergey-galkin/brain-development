import React, { useState } from 'react';
// import { useMediaQuery } from 'react-responsive';
import classes from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinkActive from '../NavLink/NavLink';
import NavLinksList from '../NavLinksList/NavLinksList';

const Header = () => {
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
            <Logo/>
            <NavLinksList routes={routes}/> 
          </div>
          <div>
            {}
            <NavLinkActive 
              path='profile/John' 
              capture='Profile'
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
