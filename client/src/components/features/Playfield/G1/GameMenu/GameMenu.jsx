import React from 'react'
import css from './GameMenu.module.css'

const GameMenu = ({steps, errors}) => {
  return (
    <div className={css.gameMenu}>
      <div>Уровень: {Math.ceil((steps + 1) / 5)}</div>
      <div>Ошибки: {errors.current + '/' + errors.max}</div>
    </div>
  )
}

export default GameMenu