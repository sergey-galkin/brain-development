import React from 'react';
import classes from './StartButton.module.css';

const StartButton = ({handleClick}) => {
  return (
    <button className={classes.startBtn} onClick={handleClick}>
      Новая игра
    </button>
  );
}

export default StartButton;
