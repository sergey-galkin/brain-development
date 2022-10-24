import React from 'react'
import css from './RectButton.module.css'
import Template from '../../Template/Template'

const RectButton = ({classesArr = [], handleClick, ...props}) => {
  classesArr.push(css.default)

  return (
    <Template classesArr={classesArr} handleClick={handleClick}>
      <rect className={css.default} {...props} width="92" height="92" x="4" y="4" strokeWidth="8" />
    </Template>
  )
}

export default RectButton