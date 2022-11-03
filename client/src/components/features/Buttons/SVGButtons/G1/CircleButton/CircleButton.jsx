import React from 'react'
import Template from '../../Template/Template'

const CircleButton = (props) => {
  return (
    <Template {...props} >
      <circle r="46" cx="50" cy="50" strokeWidth="8" />
    </Template>
  )
}

export default CircleButton