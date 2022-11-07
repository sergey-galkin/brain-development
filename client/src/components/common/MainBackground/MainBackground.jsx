import React from 'react'
import css from './MainBackground.module.css'
import { useSpring, animated } from '@react-spring/web'

const MainBackground = ({classesArr = [], animationDuration, ...props}) => {
  const { gradientPositions } = useSpring({
    from: { gradientPositions: [40, 70] },
    gradientPositions: [100, 100],
    config: { duration: animationDuration }
  })

  const styles = animationDuration 
    ?
    {backgroundImage: gradientPositions.to(
      (p1, p2) => `radial-gradient(circle, #fee3ff ${p1}%, var(--main-bg-color) ${p2}%)`
    )}
    :
    {}
  ;

  return (
    <animated.div
      style={styles}
      className={[css.bgContainer, ...classesArr].join(' ')}
      {...props}
    />
  )
}

export default MainBackground