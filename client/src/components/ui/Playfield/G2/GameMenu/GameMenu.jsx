import React from 'react';
import css from './GameMenu.module.css';

const GameMenu = ({difficulty, time, moves, handleClick}) => {
  const items = [1, 2, 3];

  return (
    <div className={css.menu}>
      <div className={css.difficulty}>
        <div>Сложность:</div>
        {
          items.map((v) => {
            const classes = [css.difficultyItem];
            if (difficulty === v) classes.push(css.active);
            return <div key={v} className={classes.join(' ')} onClick={() => handleClick(v)}>{v}</div>
          })
        }
      </div>
      <div>Время: {time}</div>
      <div>Ходы: {moves}</div>
    </div>
  );
}

export default GameMenu;
