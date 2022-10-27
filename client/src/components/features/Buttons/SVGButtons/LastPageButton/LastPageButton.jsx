import React from 'react';
import Template from '../Template/Template';
import css from './LastPageButton.module.css';

const NextPageButton = ({ handleClick, classesArr=[] }) => {
  const templateClasses = [css.nextPageTemplate, ...classesArr];
  const buttonClasses = [css.nextPage];

  return (
    <Template classesArr={templateClasses} handleClick={handleClick}>
      <g className={buttonClasses.join(' ')}>
        <circle r="48" cx="50" cy="50" strokeWidth="4" />
        <path d="M 35 35 L 50 50 L 65 35 M 35 52 L 50 67 L 65 52" strokeLinecap="round" strokeLinejoin='round' strokeWidth="3" />
      </g>
    </Template>
  );
}
export default NextPageButton