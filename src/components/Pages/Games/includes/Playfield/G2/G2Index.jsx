import React from 'react';
import Card from './Card/Card';
import css from './G2Index.module.css';

const Game2 = () => {
  
  return (
    <div className={'container ' + css.flex}>
      <div className={css.time}>Время: {}</div>
      <div className={css.playfield}>
        <Card pictureId={1}/>
        <Card pictureId={2}/>
        <Card pictureId={3}/>
        <Card pictureId={4}/>
        <Card pictureId={5}/>
        <Card pictureId={6}/>
        <Card pictureId={7}/>
        <Card pictureId={8}/>
        <Card pictureId={9}/>
        <Card pictureId={10}/>
        <Card pictureId={11}/>
        <Card pictureId={12}/>
      </div>
    </div>
  );
}

export default Game2;
