import React, { useState } from 'react';
import NavLinksList from '../NavLinksList/NavLinksList';

const NavLinksGroup = ({capture, routes, visible, hideLinksList}) => {
  return (
    <div>
      <a 
        href='#'
        onClick={() => hideLinksList(v => !v)}
      >
        {capture}
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
