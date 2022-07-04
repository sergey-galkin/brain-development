import React from 'react';
import GameButton from './ui/GameButton/GameButton';

const ActionField = ({gameData}) => {
  const components = [];
  if (gameData.active) {
    components.push(<GameButton key={1} figureColor={gameData.figureColor}/>)
  } else {
    if (gameData.result.current !== null) {
      components.push(
        <ComponentWrapper key={2}>
          <h1>Ваш результат: {gameData.result.current}</h1>
        </ComponentWrapper>
      )
    }
    if (gameData.result.best !== null) {
      components.push(
        <ComponentWrapper key={3}>
          <h1>Ваш лучший результат: {gameData.result.best}</h1>
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
