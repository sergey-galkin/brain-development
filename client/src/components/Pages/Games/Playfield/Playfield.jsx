import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../games_meta_data/gamesMetaData';
import * as Games from './collector';

const GameIndex = () => {
  const {gameURL} = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound/>
  
  const CurentGame = Games[gameData.id];
  
  return (
    <CurentGame/>
  )
}

export default GameIndex;
