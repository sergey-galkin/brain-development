import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';
import Modal from '../../ui/Modal/Modal';
import Intro from './includes/Intro/IntroIndex';
import gamesData from '../../../games_data/index';
import * as Games from './includes/Playfield/Index';

const GameIndex = () => {
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

  const CurentGame = Games[gameData.id];
  
  return (
    <CurentGame/>
  )
}

export default GameIndex;
