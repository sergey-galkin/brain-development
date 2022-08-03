import React from 'react';
import css from './Card.module.css';

const Card = ({pictureId}) => {
  return (
    <div className={css.card}>
      <div className={[css['card-side'], css.front].join(' ')}></div>
      <div className={[css['card-side'], css.back, css['picture-' + pictureId]].join(' ')} />
    </div>
  );
}

export default Card;
