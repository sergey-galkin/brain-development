import React, { useState } from 'react';
import Template from '../Template/Template';
import css from './NextPageButton.module.css';

const NextPageButton = ({handleClick, classesArr=[], animationDuration}) => {
  const templateClasses = [css.nextPageTemplate, ...classesArr];
  const buttonClasses = [css.nextPage];

  return (
    <Template classesArr={templateClasses} handleClick={handleClick}>
      <g className={buttonClasses.join(' ')}>
        <circle r="48" cx="50" cy="50" strokeWidth="4" />
        <path d="M 35 45 L 50 60 L 65 45" strokeLinecap="round" strokeLinejoin='round' strokeWidth="3" />
      </g>
    </Template>
  );
}
export default NextPageButton