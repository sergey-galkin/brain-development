import React, { useState } from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinkActive from '../NavLink/NavLink';
import NavLinksList from '../NavLinksList/NavLinksList';
import gamesData from '../../../../games_data/index';

const Header = () => {
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
