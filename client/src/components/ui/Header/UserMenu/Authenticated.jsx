import React from 'react';
import { useLogoutMutation } from '../../../../api/apiSlice';
import NavLinkActive from '../NavLink/NavLink';

const Authenticated = ({ login }) => {
  const [logout, {}] = useLogoutMutation();

  return (
    <div>
      <NavLinkActive 
        path={'profile/' + login}
        capture={login}
      />
      <div style={{'padding': '10px 0'}}>|</div>
      <a 
        href='#'
        onClick={() => logout()}
      >
        Выйти
      </a>
    </div>
  );
}

export default Authenticated;
