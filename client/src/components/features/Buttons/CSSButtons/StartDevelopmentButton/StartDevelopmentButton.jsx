import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import css from './StartDevelopmentButton.module.css'

const StartDevelopmentButton = ({ animation, handleMouseOver }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    animation.close();
    setTimeout(navigate, animation.duration, 'games')
  }

  return (
    <div className={css.container}>
      <button
        className={css.button}
        onMouseEnter={() => handleMouseOver(true)}
        onMouseLeave={() => handleMouseOver(false)}
        onClick={handleClick}
      >
        <h1>НАЧАТЬ РАЗВИТИЕ</h1>
      </button>
    </div>
  )
}

export default StartDevelopmentButton