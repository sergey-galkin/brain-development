import React from 'react'
import Template from '../../Template/Template'

const CrossButton = ({classesArr = [], ...props}) => {
  return (
    <Template classesArr={classesArr}>
      <path {...props} d="M 50 4 L 50 96 M 4 50 L 96 50 " strokeWidth="8" />
    </Template>
  )
}

export default CrossButton