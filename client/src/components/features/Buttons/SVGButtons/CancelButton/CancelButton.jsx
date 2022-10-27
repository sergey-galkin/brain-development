import React from 'react';
import Template from '../Template/Template';
import css from './CancelButton.module.css';

const CancelButton = ({ handleClick, classesArr=[] }) => {
  return (
    <Template classesArr={[css.cancelBtn, ...classesArr]} handleClick={handleClick}>
      <g>
        <circle r="47" cx="50" cy="50" strokeWidth="6" />
        <path d="M 30 30 L 70 70 M 70 30 L 30 70 " strokeWidth="7" />
      </g>
    </Template>
  );
}
export default CancelButton