import React from 'react';
import css from './StartButton.module.css';

const StartButton = ({handleClick}) => {
  return (
    <button 
      className={css.btn}
      onClick={handleClick}
    >
      Играть
    </button>
  );
}

export default StartButton;
