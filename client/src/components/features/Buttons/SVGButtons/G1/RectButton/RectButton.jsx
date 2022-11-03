import React from 'react'
import Template from '../../Template/Template'

const RectButton = (props) => {
  return (
    <Template {...props}>
      <rect width="92" height="92" x="4" y="4" strokeWidth="8" />
    </Template>
  )
}

export default RectButton