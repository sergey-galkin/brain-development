import React from 'react'
import css from './MainBackground.module.css'

const MainBackground = ({classesArr = [], ...props}) => {
  return (
    <div className={[css.bgContainer, ...classesArr].join(' ')} {...props} />
  )
}

export default MainBackground