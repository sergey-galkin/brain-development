import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavLink.module.css';

const NavLinkCustom = ({path, capture}) => {
  return (
    <NavLink 
      to={path}
      className={({isActive}) =>
        isActive ? classes['active-link'] : undefined
      }
    >
      {capture}
    </NavLink>
  );
}

export default NavLinkCustom;
