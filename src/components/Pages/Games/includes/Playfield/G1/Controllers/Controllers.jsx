import React from 'react';
import GameButton from '../GameButton/GameButton';
import css from './Controllers.module.css';

const Controllers = ({colors, handleGameButtonClick, gameData}) => {
  return (
    <div className={css.controllers}>
      {
        colors.map((color) => {
          return (
            <GameButton 
              key={color}
              figureColor={color} 
              onClick={() => gameData.figureColor ? handleGameButtonClick(color) : null}
            />
          )
        })
      }
    </div>
  );
}

export default Controllers;
