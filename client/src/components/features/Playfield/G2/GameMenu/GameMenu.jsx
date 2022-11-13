import React from 'react';
import css from './GameMenu.module.css';

const GameMenu = ({difficulty, time, moves}) => {
  return (
    <div className={css.menu}>
      <div className={css.difficulty}>
        <div>Сложность:</div>
        <div className={css.difficultyItem} >
          {difficulty}
        </div>
      </div>
      <div>Время: {time}</div>
      <div>Ходы: {moves}</div>
    </div>
  );
}

export default GameMenu;
