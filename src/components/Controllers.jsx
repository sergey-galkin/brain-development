import React from 'react';
import GameButton from './ui/GameButton/GameButton';
import StartButton from './ui/StartButton/StartButton';

const Controllers = ({colors, figureColor, handleGameButtonClick, handleStartButtonClick, isGameActive}) => {
  return (
    <div className='controllers'>
      {
        isGameActive
        ?
        colors.map((color) => {
          return (
            <GameButton 
              key={color}
              figureColor={color} 
              onClick={() => figureColor ? handleGameButtonClick(color) : null}
            />
          )
        })
        :
        <StartButton
          handleClick={handleStartButtonClick}
        />
      }
    </div>
  );
}

export default Controllers;
