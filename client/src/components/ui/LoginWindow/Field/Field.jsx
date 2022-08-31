import React from 'react';
import css from './Field.module.css';

const Field = ({type, id, placeholder, value, onChange}) => {
  return (
    <label>
      <input 
        autoFocus={ id === 'login' ? true : false}
        className={css.fild} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange}
      />
    </label>
  );
}

export default Field;
