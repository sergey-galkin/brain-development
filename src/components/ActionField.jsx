import React from 'react';
import GameButton from './ui/GameButton/GameButton';

const ActionField = ({figureColor, gameData}) => {
  const components = [];
  if (gameData.active) {
    components.push(<GameButton key={1} figureColor={figureColor}/>)
  } else {
    if (gameData.lastResult !== null) {
      components.push(
        <ComponentWrapper key={2}>
          <h1>Ваш результат: {gameData.lastResult}</h1>
        </ComponentWrapper>
      )
    }
    if (gameData.bestResult !== null) {
      components.push(
        <ComponentWrapper key={3}>
          <h1>Ваш лучший результат: {gameData.bestResult}</h1>
        </ComponentWrapper>
      )
    }
  }

  return (
    <div className='action-field'>
      {components}
    </div>
  );
}

const ComponentWrapper = ({children}) => {
  return (
    children
  );
}

export default ActionField;
