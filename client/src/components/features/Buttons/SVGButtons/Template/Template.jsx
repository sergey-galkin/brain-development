import React from 'react';
import css from './Template.module.css';

const Template = ({classesArr = [], handleClick, children}) => {
  const classes = [css.default, ...classesArr];
  return (
    <button type='button' className={classes.join(' ')} onClick={handleClick || (() => {})}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        {children}
      </svg>
    </button>
  );
}

export default Template;