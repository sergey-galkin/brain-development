import React from 'react'
import css from './ModalWindowButton.module.css'

const ModalWindowButton = (props) => {
  return (
    <input className={css.btn} {...props} />
  )
}

export default ModalWindowButton