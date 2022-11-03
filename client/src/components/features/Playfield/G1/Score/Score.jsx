import { useSpring, animated } from '@react-spring/web';
import React, { useEffect } from 'react'
import css from './Score.module.css'

const Score = ({score}) => {
  const {current, total} = score;
  const currentClassesArr = [css.currentScore];
  if (current > 0) currentClassesArr.push(css.plus);
  if (current < 0) currentClassesArr.push(css.minus);

  const [styles, api] = useSpring(() => ({
    from: {opacity: 0},
    config: {
      duration: 250,
    }
  }))

  useEffect(() => {
    if (current === 0) return;
    api.start({opacity: 1})
    setTimeout(() => {
      api.start({opacity: 0})
    }, 750)
  }, [current])
  

  return (
    <div className={css.score}>
      <div className={css.totalScore}>{total}</div>
      <animated.div style={styles} className={currentClassesArr.join(' ')}>
        {current > 0 ? '+' + current : current}
      </animated.div>
    </div>
  )
}

export default Score