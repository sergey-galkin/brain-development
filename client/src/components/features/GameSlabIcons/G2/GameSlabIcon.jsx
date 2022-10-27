import { useSpring, animated } from '@react-spring/web'
import React from 'react'
import css from './GameSlabIcon.module.css'

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

const GameSlabIcon = () => {
  return (
    <div className={css.container}>
      { cards.map((card) => <Card key={card.id} {...card}/>) }
    </div>
  )
}

const Card = ({ pictureId, matched }) => {
  const cardClasses = [css.card];
  const frontClasses = [css.cardSide, css.front];
  const backClasses = [css.cardSide, css.back];

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
