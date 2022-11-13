import React, { memo } from 'react'
import css from './GameSlabIcon.module.css'

const GameSlabIcon = memo(({classesArr = [], difficulty, ...props}) => {
  const cards = [
    {
      id: 1,
      pictureId: 3,
      matched: false,
    },
    {
      id: 2,
      pictureId: 4,
      matched: true,
    },
    {
      id: 3,
      pictureId: 4,
      matched: true,
    },
    {
      id: 4,
      pictureId: 2,
      matched: false,
    },
  ];

  classesArr.push(css.container);
  return (
    <div className={classesArr.join(' ')} {...props}>
      { cards.map((card) => <Card key={card.id} difficulty={difficulty} {...card}/>) }
    </div>
  )
})

const Card = ({ difficulty, pictureId, matched }) => {
  const cardClasses = [css.card];
  const frontClasses = [css.cardSide, css.front, css['difficulty-' + difficulty]];
  const backClasses = [css.cardSide, css.back, css['difficulty-' + difficulty]];

  backClasses.push(css['picture-' + ++pictureId]);
  if (matched) {
    frontClasses.push(css.matched);
    backClasses.push(css.matched);
  }

  return (
    <div className={cardClasses.join(' ')} >
      <div className={frontClasses.join(' ')} />
      <div className={backClasses.join(' ')} />
    </div>
  )
}

export default GameSlabIcon
