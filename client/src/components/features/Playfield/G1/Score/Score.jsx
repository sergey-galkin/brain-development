import { useSpring, animated } from '@react-spring/web';
import React, { useEffect } from 'react'
import css from './Score.module.css'

const Score = ({score}) => {
  const {currentMove, current} = score;
  const currentMoveClassesArr = [css.currentMoveScore];
  if (currentMove > 0) currentMoveClassesArr.push(css.plus);
  if (currentMove < 0) currentMoveClassesArr.push(css.minus);

  const [styles, api] = useSpring(() => ({
    from: {opacity: 0},
    config: {
      duration: 250,
    }
  }))

  useEffect(() => {
    if (currentMove === 0) return;
    api.start({opacity: 1})
    setTimeout(() => {
      api.start({opacity: 0})
    }, 750)
  }, [currentMove])
  

  return (
    <div className={css.score}>
      <div className={css.currentScore}>{current}</div>
      <animated.div style={styles} className={currentMoveClassesArr.join(' ')}>
        {currentMove > 0 ? '+' + currentMove : currentMove}
      </animated.div>
    </div>
  )
}

export default Score