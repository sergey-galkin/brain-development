import React from 'react'
import Template from '../../Template/Template'

const CrossButton = ({classesArr, ...props}) => {
  return (
    <Template>
      <path className={classesArr.join(' ')} {...props} d="M 50 3 L 50 97 M 3 50 L 97 50 " stroke="gray" fill="none" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
    </Template>
  )
}

export default CrossButton