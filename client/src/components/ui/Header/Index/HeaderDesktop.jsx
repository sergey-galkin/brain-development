import React from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinksList from '../NavLinksList/NavLinksList';
import gamesData from '../../../../games_data/index';
import Authenticated from '../UserMenu/Authenticated';
import Anonymous from '../UserMenu/Anonymous';
import { useIdentificationQuery } from '../../../../api/apiSlice';

const Header = () => {
  const { data: user, isLoading } = useIdentificationQuery();
  
  const routes = gamesData.map(
    d => {return {
      path: 'games/' + d.urls[0],
      capture: d.name
    }
  });

  const UserMenu = user
    ? <Authenticated login={user.login} />
    : isLoading
    ? null
    : <Anonymous />
  ;

  return (
    <nav className={css.navigation}>
      <div className='container'>
        <div className={css['nav-container']}>
          <div>
            <Logo/>
            <NavLinksList routes={routes}/> 
          </div>
          {UserMenu}
        </div>
      </div>
    </nav>
  );
}

export default Header;
