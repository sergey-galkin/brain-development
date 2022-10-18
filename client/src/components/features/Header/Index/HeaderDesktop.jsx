import React from 'react';
import css from './Header.module.css';
import Logo from '../Logo/Logo';
import NavLinksList from '../NavLinksList/NavLinksList';
import gamesData from '../../../../meta_data/games/gamesMetaData';
import Authenticated from '../UserMenu/Authenticated';
import Anonymous from '../UserMenu/Anonymous';
import { useIdentificationQuery } from '../../../../api/apiSlice';
import Container from '../../../common/Container/Container';

const Header = () => {
  const { data: user, isLoading } = useIdentificationQuery();
  
  const UserMenu = user
    ? <Authenticated login={user.login} />
    : isLoading
    ? null
    : <Anonymous />
  ;

  return (
    <div className={css.header}>
      <Container>
        <nav className={css.navContainer}>
          <Logo/>
          <div>
            {UserMenu}
          </div>
        </nav>
      </Container>
    </div>
  );
}

export default Header;
