import React from 'react'
import css from './StartGameButton.module.css'

const StartGameButton = ({ handleClick, ...props }) => {
  return (
    <button className={css.btn} onClick={handleClick} {...props} >
      НАЧАЛО
    </button>
  );
}

export default StartGameButton