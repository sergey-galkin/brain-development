import React from 'react'
import Template from '../../Template/Template'

const TriangleButton = ({classesArr, ...props}) => {
  return (
    <Template>
      <path className={classesArr.join(' ')} {...props} d="M 3 97 H 97 L 50 3 z" stroke="gray" fill="none" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
    </Template>
  )
}

export default TriangleButton