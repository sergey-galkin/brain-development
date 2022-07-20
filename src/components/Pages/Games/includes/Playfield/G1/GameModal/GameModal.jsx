import React from 'react';
import css from './GameModal.module.css';

const GameModal = ({result, startGame}) => {
  return (
    <div>
      <h1 className={css.header}>Результаты</h1>
      <table className={css['result-container']}>
        <tbody>
          <tr>
            <td>Текущий:</td>
            <CurrentPoints value={result.current} classes={[css['result-value']]}/>
            <td></td>
          </tr>
          <tr>
            <td>Лучший:</td>
            <BestPoints value={result.best} classes={[css['result-value']]}/>
            <BestPoints value={result.previous - result.best} classes={[css['result-deviation']]}/>
          </tr>
        </tbody>
      </table>
      <button 
        className={css.btn}
        onClick={startGame}
      >
        Новая игра
      </button>
    </div>
  );
}

const CurrentPoints = ({value, classes}) => {
  if (value < 0) classes.push([css.minus]);
  if (value > 0) classes.push([css.plus]);

  return (
    <td className={classes.join(' ')}>
      {value}
    </td>
  )
}

const BestPoints = ({value, classes}) => {
  if (value < 0) classes.push([css.minus]);

  return (
    <td className={classes.join(' ')}>
      {value}
    </td>
  )
}

export default GameModal;
