import React from 'react'
import css from './Description.module.css'

const Description = ({ description, ...props }) => {
  return (
    <div className={[css.container].join(' ')} {...props} >
      { description.map(({ header, internals }) => 
        <div key={header} className={css.block}>
          <h3 className={css.header}>{header}</h3>
          <div className={css.internals}>
            { internals.map((text) => <p key={text}>{text}</p>) }
          </div>
        </div>
      )}
    </div>
  );
}

export default Description
