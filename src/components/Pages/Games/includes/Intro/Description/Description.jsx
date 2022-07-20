import React from 'react';
import css from './Description.module.css';

const Description = ({header, internals}) => {
  return (
    <div className={css.block}>
      <h3 className={css.header}>{header}</h3>
      <div className={css.internals}>
        {
          internals.map((text) => <p key={text}>{text}</p>)
        }
      </div>
    </div>
  );
}

export default Description;
