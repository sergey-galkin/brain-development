import React from 'react';
import css from './Field.module.css';

const Field = ({type, id, placeholder, value, onChange, onBlur, msg}) => {
  return (
    <label>
      <div className={css.warning}>{msg}</div>
      <input 
        autoFocus={ id === 'login' ? true : false}
        className={css.fild} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange} onBlur={onBlur}
      />
    </label>
  );
}

export default Field;
