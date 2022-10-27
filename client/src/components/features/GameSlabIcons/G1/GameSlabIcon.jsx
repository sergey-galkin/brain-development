import React from 'react'
import css from './GameSlabIcon.module.css'
import CircleButton from '../../Buttons/SVGButtons/G1/CircleButton/CircleButton'
import CrossButton from '../../Buttons/SVGButtons/G1/CrossButton/CrossButton'
import RectButton from '../../Buttons/SVGButtons/G1/RectButton/RectButton'
import TriangleButton from '../../Buttons/SVGButtons/G1/TriangleButton/TriangleButton'

const GameSlabIcon = () => {
  return (
    <div className={css.container} >
      <RectButton classesArr={[css.item, css.right]} />
      <TriangleButton classesArr={[css.item]} />
      <CrossButton classesArr={[css.item]} />
      <CircleButton classesArr={[css.item, css.wrong]} />
    </div>
  )
}

export default GameSlabIcon