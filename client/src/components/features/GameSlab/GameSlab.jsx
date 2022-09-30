import React, { useState } from 'react'
import css from './GameSlab.module.css'
import * as Icons from '../GameSlabIcons/collector'
import { useNavigate } from 'react-router-dom';

const GameSlab = ({ id, url, description }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const navigate = useNavigate();

  const Icon = Icons[id];

  return (
    <div className={css.container}
      onMouseEnter={() => setMouseOver(true)}
      onMouseLeave={() => setMouseOver(false)}
      onClick={() => navigate(url)}
    >
      <Icon mouseOver={mouseOver}/>
      <Description>{description}</Description>
    </div>
  )
}

const Description = ({ children }) => {
  return (
    <div className={css.description}>
      {children}
    </div>
  )
}


export default GameSlab