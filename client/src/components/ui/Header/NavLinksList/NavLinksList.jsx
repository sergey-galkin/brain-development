import React from 'react';
import CustomLink from '../CustomLink/CustomLink';
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
            <CustomLink {...route} />
          </li>
        )
      })}
    </ul>
  );
}

export default NavLinksList;
