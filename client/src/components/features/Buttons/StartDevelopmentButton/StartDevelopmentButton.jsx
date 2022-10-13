import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import css from './StartDevelopmentButton.module.css'

const StartDevelopmentButton = ({ animation }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const navigate = useNavigate();
  
  const containerClasses = [css.container, mouseOver ? css.active : ''];

  const handleClick = () => {
    animation.close();
    setTimeout(navigate, animation.duration, 'games')
    // navigate('games')
  }

  return (
    <div className={containerClasses.join(' ')}>
      <button
        className={css.button}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}
        onClick={handleClick}
      >
        <h1>НАЧАТЬ РАЗВИТИЕ</h1>
      </button>
    </div>
  )
}

export default StartDevelopmentButton