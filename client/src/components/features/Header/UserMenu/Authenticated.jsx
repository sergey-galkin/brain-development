import React from 'react';
import { useLogoutMutation } from '../../../../api/apiSlice';
import CustomLink from '../CustomLink/CustomLink';

const Authenticated = ({ login }) => {
  const [logout, {}] = useLogoutMutation();

  return (
    <div>
      <CustomLink 
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
