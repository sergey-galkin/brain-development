import React, { memo, useRef, useState } from 'react'
import css from './MenuIcon.module.css'
import { useSprings, animated } from '@react-spring/web'

const MenuIcon = memo(({ isMenuOpened, handleMenu }) => {
  const allowClick = useRef(true);
  
  const handleIconClick = () => {
    if (!allowClick.current) return;

    handleMenu();
    allowClick.current = false;
    setTimeout(() => allowClick.current = true, aProps.duration);
  }

  // animation props
  const aProps = {
    duration: 300,
    stages: 2,
  }

  // the value of the second line at "end" state of "y1" argument (in this case "0") doesn't matter,
  // it just must differ from value at previous state (in this case "50"),
  // otherwise the animation will skip this state and will start handling next state in sequence
  const y1 = {
    start: [20, 50, 80],
    middle: [50, 50, 50],
    end: [20, 0, 80], 
  }
  const y2 = {
    start: [20, 50, 80],
    middle: [50, 50, 50],
    end: [80, 0, 20],
  }
  const x1 = {
    start: [10, 10, 10],
    middle: [20, 20, 20],
    end: [20, 20, 20],
  }
  const x2 = {
    start: [90, 90, 90],
    middle: [80, 80, 80],
    end: [80, 80, 80],
  }

  const to = {
    forward: i => [
      { y1: y1.middle[i], y2: y2.middle[i], x1: x1.middle[i], x2: x2.middle[i] },
      { y1: y1.end[i], y2: y2.end[i], x1: x1.end[i], x2: x2.end[i], display: i === 1 ? 'none' : '' },
    ],
    backward: i => [
      { y1: y1.middle[i], y2: y2.middle[i], x1: x1.middle[i], x2: x2.middle[i] },
      { y1: y1.start[i], y2: y2.start[i], x1: x1.start[i], x2: x2.start[i], display: '' },
    ],
  }

  const springs = useSprings(3, y1.start.map((v, i) => ({
    from: { y1: y1.start[i], y2: y2.start[i], x1: x1.start[i], x2: x2.start[i] },
    to: isMenuOpened ? to.forward(i) : to.backward(i),
    config: {
      duration: aProps.duration / aProps.stages,
    }
  })))

  return (
    <div className={css.menuIcon} onClick={handleIconClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        {springs.map(({x1, y1, x2, y2, display}, i) => 
          <animated.line key={i} 
            x1={x1} y1={y1} x2={x2} y2={y2}
            style={{display: display}} 
          />
        )}
      </svg>
    </div>
  )
})

export default MenuIcon