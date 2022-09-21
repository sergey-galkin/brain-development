import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './Intro.module.css';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../games_meta_data/gamesMetaData';

const Description = ({header, internals}) => {
  return (
    <div className={css.block}>
      <h3 className={css.header}>{header}</h3>
      <div className={css.internals}>
        {
          internals.map((text) => <p key={text}>{text}</p>)
        }
      </div>
    </div>
  );
}

const StartButton = () => {
  const navigate = useNavigate();
  return (
    <button className={css.btn} onClick={() => navigate('playfield')}>
      Играть
    </button>
  );
}

const Intro = () => {
  const { gameURL } = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound/>
  
  return (
    <div>
      <div className={css['header-holder']}>
        <div className={'container ' + css['header-container']}>
          <h1>{gameData.header}</h1>
        </div>
      </div>
      <div className={'container ' + css['description-container']}>
        {
          gameData.description.map((d => <Description key={d.header} {...d}/>))
        }
      </div>
      <StartButton />
    </div>
  );
}

export default Intro;
