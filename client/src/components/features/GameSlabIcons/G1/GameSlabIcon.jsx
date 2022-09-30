import { useSpring, animated } from '@react-spring/web'
import React from 'react'
import css from './GameSlabIcon.module.css'

const GameSlabIcon = ({ mouseOver }) => {
  const colors = {
    rect: mouseOver ? 'green' : 'grey',
    circle: mouseOver ? 'grey' : 'red',
  }

  const [rectStyles, rectApi] = useSpring(() => ({
    from: { stroke: 'grey' },
  }))

  const [circleStyles, circleApi] = useSpring(() => ({
    from: { stroke: 'red' },
  }))

  rectApi.start({ stroke: colors.rect })
  circleApi.start({ stroke: colors.circle })

  return (
    <div className={css.container}>
      <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <g stroke="gray" fill="none" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round">
          <animated.rect style={rectStyles} width="60" height="60" x="20" y="20" />
          <path d="M 120 76 H 180 L 150 24 z" />
          <path d="M 50 115 L 50 185 M 15 150 L 85 150 " />
          <animated.circle style={circleStyles} r="35" cx="150" cy="150"/>
        </g>
      </svg>
    </div>
  )
}

export default GameSlabIcon