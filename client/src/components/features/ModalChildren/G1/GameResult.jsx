import React from 'react';
import ModalWindowButton from '../../Buttons/CSSButtons/ModalWindowButton/ModalWindowButton';
import css from './GameResult.module.css';

const GameModal = ({result, startNewGame, closeModal}) => {
  return (
    <div>
      <table className={css['result-container']}>
        <tbody>
          <tr>
            <td>Текущий:</td>
            <Points value={result.total} />
            {
              result.total < result.previousBest && result.previousBest !== null &&
              <Deviation value={result.total - result.best} />
            }
          </tr>
          <tr>
            <td>Лучший:</td>
            <Points value={result.best} />
            {
              result.best > result.previousBest && result.previousBest !== null &&
              <Deviation value={'+' + (result.best - result.previousBest)} />
            }
          </tr>
        </tbody>
      </table>
      <ModalWindowButton
        type='button'
        autoFocus={true}
        classesArr={[css.button]}
        onClick={() => {closeModal(); startNewGame()}}
      >
        Новая игра
      </ModalWindowButton>
    </div>
  );
}

const Points = ({value}) => {
  return (
    <td className={css['result-value']}>
      {value}
    </td>
  )
}

const Deviation = ({value}) => {
  const classes = [];
  if (value < 0) classes.push([css.minus]);
  if (value > 0) classes.push([css.plus]);

  return (
    <td className={classes.join(' ')}>
      {value}
    </td>
  )
}


export default GameModal;
