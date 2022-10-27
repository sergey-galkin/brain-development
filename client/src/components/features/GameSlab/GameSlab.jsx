import React from 'react'
import css from './GameSlab.module.css'
import * as Icons from '../GameSlabIcons/collector'

const GameSlab = ({ id, handleClick, ...props }) => {
  const Icon = Icons[id];

  return (
    <div className={css.container} onClick={handleClick} {...props}>
      <Icon />
    </div>
  )
}

export default GameSlab
