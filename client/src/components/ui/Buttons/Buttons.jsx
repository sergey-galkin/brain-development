import React from 'react';
import css from './Buttons.module.css'

export const Container = ({children}) => {
  return (
    <div className={css.container}>
      {children}
    </div>
  );
}

export const AcceptButton = ({handleClick}) => {
  return (
    <button type='button' className={css.default + ' ' + css.accept} onClick={() => handleClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
        <circle r="47" cx="50" cy="50" strokeWidth="6" stroke="currentColor" fill="none"></circle>
        <path d="M 30 50 L 45 70 L 70 30 " strokeLinecap="round" strokeLinejoin='round' strokeWidth="7" stroke="currentColor" fill="none"></path>
      </svg>
    </button>
  );
}

export const CancelButton = ({handleClick}) => {
  return (
    <button type='button' className={css.default + ' ' + css.cancel} onClick={() => handleClick()}>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 100 100">
        <circle r="47" cx="50" cy="50" strokeWidth="6" stroke="currentColor" fill="none"></circle>
        <path d="M 30 30 L 70 70 M 70 30 L 30 70 " strokeLinecap="round" strokeWidth="7" stroke="currentColor" fill="none"></path>
      </svg>
    </button>
  );
}
