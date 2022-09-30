import { useSpring, animated } from '@react-spring/web'
import React from 'react'
import css from './GameSlabIcon.module.css'

const cards = [
  {
    id: 1,
    pictureId: 3,
    turned: false,
    matched: false,
  },
  {
    id: 2,
    pictureId: 5,
    turned: false,
    matched: false,
  },
  {
    id: 3,
    pictureId: 5,
    turned: false,
    matched: false,
  },
  {
    id: 4,
    pictureId: 2,
    turned: false,
    matched: false,
  },
];

const GameSlabIcon = ({ mouseOver }) => {
  if (mouseOver) {
    cards[1].turned = true;
    cards[2].turned = true;
  } else {
    cards.forEach(c => c.turned = false)
  }

  return (
    <div className={css.container}>
      { cards.map((card) => <Card key={card.id} {...card}/>) }
    </div>
  )
}

const Card = ({ pictureId, turned, matched }) => {
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
    <div className={cardClasses.join(' ')} >
      <div className={frontClasses.join(' ')} />
      <div className={backClasses.join(' ')} />
    </div>
  )
}

export default GameSlabIcon
