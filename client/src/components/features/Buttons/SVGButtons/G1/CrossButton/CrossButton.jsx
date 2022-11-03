import React from 'react'
import Template from '../../Template/Template'

const CrossButton = (props) => {
  return (
    <Template {...props} >
      <path d="M 50 4 L 50 96 M 4 50 L 96 50 " strokeWidth="8" />
    </Template>
  )
}

export default CrossButton