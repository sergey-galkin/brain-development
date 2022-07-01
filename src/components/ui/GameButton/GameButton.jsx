import React from 'react';
import classes from './GameButton.module.css';

const GameButton = (props) => {
  return (
    <div 
      className={classes.square  + ' ' + classes[props.figureColor]}
      onClick={props.onClick}
    >
    </div>
  );
}

export default GameButton;
