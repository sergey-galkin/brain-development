import React from 'react'
import css from './NavButton.module.css'

const NavButton = ({ handleClick, children }) => {
  return (
    <button className={css.navButton} onClick={handleClick}>{children}</button>
  )
}

export default NavButton