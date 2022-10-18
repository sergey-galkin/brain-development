import React from 'react';
import { NavLink } from 'react-router-dom';
import css from './CustomLink.module.css';

const CustomLink = ({path, children}) => {
  return (
    <NavLink 
      to={path}
      className={({isActive}) =>
        isActive ? css.active : undefined
      }
    >
      {children}
    </NavLink>
  );
}

export default CustomLink;
