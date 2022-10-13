import React from 'react'
import css from './Container.module.css'

const Container = ({ classesArr = [], children }) => {
  classesArr.push(css.container);

  return (
    <div className={classesArr.join(' ')}>
      {children}
    </div>
  )
}

export default Container