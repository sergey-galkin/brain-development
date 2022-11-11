import React from 'react'
import css from './Container.module.css'

const Container = ({ classesArr = [], children }) => {
  classesArr.push(css.container);
  console.log(111);
  return (
    <div className={classesArr.join(' ')}>
      {children}
    </div>
  )
}

export default Container