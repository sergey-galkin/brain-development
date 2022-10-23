import React from 'react'
import CircleButton from '../../Buttons/SVGButtons/G1/CircleButton/CircleButton'
import CrossButton from '../../Buttons/SVGButtons/G1/CrossButton/CrossButton'
import RectButton from '../../Buttons/SVGButtons/G1/RectButton/RectButton'
import TriangleButton from '../../Buttons/SVGButtons/G1/TriangleButton/TriangleButton'
import css from './Header.module.css'

const Header = () => {
  return (
    <div className={css.container}>
      <RectButton />
      <TriangleButton />
      <CrossButton />
      <CircleButton />
    </div>
  )
}

export default Header