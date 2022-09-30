import React from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinksList from '../NavLinksList/NavLinksList';
import gamesData from '../../../../games_meta_data/gamesMetaData';
import Authenticated from '../UserMenu/Authenticated';
import Anonymous from '../UserMenu/Anonymous';
import { useIdentificationQuery } from '../../../../api/apiSlice';
import Container from '../../../common/Container/Container';

const Header = () => {
  const { data: user, isLoading } = useIdentificationQuery();
  
  // const routes = gamesData.map(
  //   d => {return {
  //     path: 'games/' + d.urls[0],
  //     capture: d.name
  //   }
  // });

  const UserMenu = user
    ? <Authenticated login={user.login} />
    : isLoading
    ? null
    : <Anonymous />
  ;

  return (
    <nav className={css.navigation}>
      <Container>
        <div className={css.navContainer}>
          <Logo/>
          {/* <div> */}
            {/* <NavLinksList routes={routes}/>  */}
          {/* </div> */}
          {UserMenu}
        </div>
      </Container>
    </nav>
  );
}

export default Header;
