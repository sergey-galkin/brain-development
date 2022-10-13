import React from 'react';
import { NavLink } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';
import css from './Logo.module.css';
import logoSrc from '../../../../images/icons/logo.svg'

const Logo = ({hideLinksList}) => {
  const logo = <img src={logoSrc} className={css['logo-img']} alt='logo' />;
  const logoText = <span className={css['logo-text']}>Brain Development</span>;

  return (
    <div 
      className={css['logo-container']}
      onClick={hideLinksList}
    >
      <NavLink to='/' style={{padding: 0}}>
        {logo}
      </NavLink>
      <CustomLink path='/' capture={logoText}/>
    </div>
  );
}

export default Logo;
