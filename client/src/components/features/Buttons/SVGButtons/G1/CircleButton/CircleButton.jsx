import React from 'react'
import Template from '../../Template/Template'

const CircleButton = ({classesArr = [], ...props}) => {
  return (
    <Template classesArr={classesArr}>
      <circle {...props} r="46" cx="50" cy="50" strokeWidth="8" />
    </Template>
  )
}

export default CircleButton