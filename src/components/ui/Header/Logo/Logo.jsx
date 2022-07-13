import React from 'react';
import NavLink from '../NavLink/NavLink';
import classes from './Logo.module.css';

const Logo = ({hideLinksList}) => {
  return (
    <div 
      className={classes.logo}
      onClick={hideLinksList}
    >
      <NavLink path='/' capture='Home'/>
    </div>
  );
}

export default Logo;
