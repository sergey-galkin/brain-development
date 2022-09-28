import React from 'react'
import css from './Container.module.css'

const Container = ({ stylesArr = [], children }) => {
  stylesArr.push(css.container);

  return (
    <div className={stylesArr.join(' ')}>
      {children}
    </div>
  )
}

export default Container