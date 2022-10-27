import React from 'react';
import Template from '../Template/Template';
import css from './AcceptButton.module.css';

const AcceptButton = ({ handleClick, classesArr=[] }) => {
  return (
    <Template classesArr={[css.acceptBtn, ...classesArr]} handleClick={handleClick}>
      <g>
        <circle r="47" cx="50" cy="50" strokeWidth="6" />
        <path d="M 30 50 L 45 70 L 70 30 " strokeWidth="7" />
      </g>
    </Template>
  );
}
export default AcceptButton