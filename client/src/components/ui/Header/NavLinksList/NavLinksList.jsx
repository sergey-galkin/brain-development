import React from 'react';
import NavLinkActive from '../NavLink/NavLink';
import classes from './NavLinksList.module.css';

const NavLinksList = ({routes, groupList, visible, hideLinksList}) => {
  let className = '';
  className += groupList ? classes['nav-links-group-list'] : classes['nav-links-list'];
  className += visible ? (' ' + classes['nav-links-list-visible']) : '';

  return (
    <ul className={className}>
      {routes.map((route) => {
        return (
          <li 
            key={route.capture} 
            onClick={hideLinksList}
          >
            <NavLinkActive {...route} />
          </li>
        )
      })}
    </ul>
  );
}

export default NavLinksList;
