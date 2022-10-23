import React from 'react'
import Template from '../../Template/Template'

const RectButton = ({classesArr, ...props}) => {
  return (
    <Template>
      <rect className={classesArr.join(' ')} {...props} width="94" height="94" x="3" y="3" stroke="gray" fill="none" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round"/>
    </Template>
  )
}

export default RectButton