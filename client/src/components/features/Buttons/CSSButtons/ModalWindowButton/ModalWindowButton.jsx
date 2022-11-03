import React from 'react'
import css from './ModalWindowButton.module.css'

const ModalWindowButton = ({type='button', classesArr=[], children, ...props}) => {
  return (
    <button type={type} className={[css.btn, ...classesArr].join(' ')} {...props}>
      {children}
    </button>
  )
}

export default ModalWindowButton