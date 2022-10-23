import React from 'react'
import Template from '../../Template/Template'

const CircleButton = ({classesArr, ...props}) => {
  return (
    <Template>
      <circle className={classesArr.join(' ')} {...props} r="47" cx="50" cy="50" stroke="gray" fill="none" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
    </Template>
  )
}

export default CircleButton