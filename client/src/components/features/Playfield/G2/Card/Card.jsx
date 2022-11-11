import React, { memo } from 'react';
import css from './Card.module.css';

const Card = memo(({cards, index, pictureId, active, turned, matched, handleClick}) => {
  const cardClasses = [css.card];
  const frontClasses = [css.cardSide, css.front];
  const backClasses = [css.cardSide, css.back];
  
  if (turned) {
    cardClasses.push(css.turned);
    backClasses.push(css['picture-' + ++pictureId]);
  }
  if (matched) {
    frontClasses.push(css.matched);
    backClasses.push(css.matched);
  }
  
  return (
    <div className={cardClasses.join(' ')} onClick={active ? () => handleClick(cards, index) : null}>
      <div className={frontClasses.join(' ')}></div>
      <div className={backClasses.join(' ')} />
    </div>
  );
})

export default Card;
