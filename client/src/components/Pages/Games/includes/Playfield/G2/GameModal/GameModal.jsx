import React from 'react';
import css from './GameModal.module.css';

const GameModal = ({result, startGame}) => {
  return (
    <div>
      <table className={css['result-container']}>
        <tbody>
          <tr>
            <td>Текущий:</td>
            <Time value={result.current} />
            {
              result.current > result.previousBest && result.previousBest &&
              <Deviation value={result.current - result.previousBest} />
            }
          </tr>
          <tr>
            <td>Лучший:</td>
            <Time value={result.best} />
            {
              result.best < result.previousBest &&
              <Deviation value={(result.best - result.previousBest)} />
            }
          </tr>
        </tbody>
      </table>
      <button 
        className={css.btn}
        onClick={() => startGame()}
      >
        Новая игра
      </button>
    </div>
  );
}

const Time = ({value}) => {
  return (
    <td className={css['result-value']}>
      {getTime(value)}
    </td>
  )
}

const Deviation = ({value}) => {
  const classes = [];
  const sign = value > 0 ? '+' : '-';
  if (value < 0) {
    classes.push([css.minus]);
    value *= -1;
  }
  if (value > 0) classes.push([css.plus]);

  return (
    <td className={classes.join(' ')}>
      {sign + getTime(value)}
    </td>
  )
}

function getTime(time) {
  time = time / 1000;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  const shares = Math.round(time * 100 % 100);
  const prefixSeconds = seconds < 10 ? '0' : '';
  const prefixShares = shares < 10 ? '0' : '';
  return minutes + ':' + prefixSeconds + seconds + '.' + prefixShares + shares;
}

export default GameModal;
