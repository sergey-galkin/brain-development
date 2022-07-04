import React from 'react';
import GameButton from './ui/GameButton/GameButton';
import StartButton from './ui/StartButton/StartButton';

const Controllers = ({colors, handleGameButtonClick, handleStartButtonClick, gameData}) => {
  return (
    <div className='controllers'>
      {
        gameData.active
        ?
        colors.map((color) => {
          return (
            <GameButton 
              key={color}
              figureColor={color} 
              onClick={() => gameData.figureColor ? handleGameButtonClick(color) : null}
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
