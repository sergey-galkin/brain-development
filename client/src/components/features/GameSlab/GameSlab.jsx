import React from 'react'
import css from './GameSlab.module.css'
import * as Icons from '../GameSlabIcons/collector'

const GameSlab = ({ id, difficulty, handleClick, ...props }) => {
  const Icon = Icons[id];

  return (
    <div className={css.container} onClick={handleClick} {...props}>
      <Icon difficulty={difficulty} />
    </div>
  )
}

export default GameSlab
