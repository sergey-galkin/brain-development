import React, { useState } from 'react'
import css from './GameSlab.module.css'
import * as Icons from '../GameSlabIcons/collector'

const GameSlab = ({ id, handleClick, ...props }) => {
  const [mouseOver, setMouseOver] = useState(false);

  const Icon = Icons[id];

  return (
    <div className={css.container}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={handleClick}
      {...props}
    >
      <Icon mouseOver={mouseOver}/>
    </div>
  )
}

export default GameSlab
