import React from 'react';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import NavButton from '../../Buttons/CSSButtons/NavButton/NavButton';
import CustomLink from '../CustomLink/CustomLink';
import { logout } from '../DropDownMenu/authSlice';

const Authenticated = ({ login, closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isDesktop = useMediaQuery({minWidth: 768});

  const handleExitButtonClick = () => {
    dispatch(logout());
    navigate('/');
  }

  return (
    <>
      <span onClick={closeMenu}>
        <CustomLink path={'profile/' + login}>{login}</CustomLink>
      </span>
      {
        isDesktop && <div style={{'padding': '10px 0'}}>|</div>
      }
      <NavButton handleClick={handleExitButtonClick}>Выйти</NavButton>
    </>
  );
}

export default Authenticated;
