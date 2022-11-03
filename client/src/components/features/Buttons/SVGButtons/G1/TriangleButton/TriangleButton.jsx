import React from 'react'
import Template from '../../Template/Template'

const TriangleButton = (props) => {
  return (
    <Template {...props} >
      <path d="M 4 96 H 96 L 50 4 z" strokeWidth="8" />
    </Template>
  )
}

export default TriangleButton