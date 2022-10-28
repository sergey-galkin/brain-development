import React from 'react'
import css from './MenuIcon.module.css'

const MenuIcon = ({ isMenuOpened, handleClick }) => {
  const classes = [css.menuIcon];
  if (isMenuOpened) classes.push(css.opened)

  return (
    <div className={classes.join(' ')} onClick={handleClick} />
  )
}

export default MenuIcon