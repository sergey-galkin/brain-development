import React from 'react';
import css from './GameMenu.module.css';

const GameMenu = ({time, difficulty, handleClick}) => {
  const items = [1, 2, 3];

  return (
    <div className={css.menu}>
      <div className={css.difficulty}>
        <div>Сложность:</div>
        {
          items.map((v) => {
            const classes = [css['difficulty-item']];
            if (difficulty === v) classes.push(css.active);
            return <div key={v} className={classes.join(' ')} onClick={() => handleClick(v)}>{v}</div>
          })
        }
      </div>
      <div className={css.time}>Время: {time}</div>
    </div>
  );
}

export default GameMenu;
