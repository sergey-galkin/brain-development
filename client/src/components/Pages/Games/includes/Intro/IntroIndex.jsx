import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './IntroIndex.module.css';
import Description from './Description/Description';
import StartButton from './StartButton/StartButton';
import NotFound from '../../../NotFound';
import gamesData from '../../../../../games_data/index';

const Index = () => {
  const navigate = useNavigate();
  const {gameURL} = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound/>
  
  function getGameData(url) {
    for (let i = 0; i < gamesData.length; i++) {
      const urls = gamesData[i].urls;
      if (urls.indexOf(url) > -1) return gamesData[i];
    }
    return false;
  }

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
      <StartButton handleClick={() => navigate('playfield') }/>
    </div>
  );
}

export default Index;
