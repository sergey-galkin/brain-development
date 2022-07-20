import React from 'react';
import GameButton from '../GameButton/GameButton';
import css from './ActionField.module.css';

const ActionField = ({gameData}) => {
  return (
    <div className={css['action-field']}>
      <GameButton figureColor={gameData.figureColor}/>
    </div>
  );
}


export default ActionField;
