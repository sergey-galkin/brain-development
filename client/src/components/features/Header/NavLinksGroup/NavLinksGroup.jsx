import React from 'react';
import NavLinksList from '../NavLinksList/NavLinksList';

const NavLinksGroup = ({caption, routes, visible, hideLinksList}) => {
  return (
    <div>
      <a 
        href='#'
        onClick={() => hideLinksList(v => !v)}
      >
        {caption}
      </a>
      <NavLinksList 
        routes={routes} 
        groupList={true}
        visible={visible}
        hideLinksList={() => hideLinksList(false)}
      />
    </div>
  );
}

export default NavLinksGroup;
