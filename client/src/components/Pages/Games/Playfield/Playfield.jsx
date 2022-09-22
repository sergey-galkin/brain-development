import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../games_meta_data/gamesMetaData';
import * as Games from '../../../ui/Playfield/collector';

const Playfield = () => {
  const {gameURL} = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound/>
  
  const CurrentGame = Games[gameData.id];

  return (
    <CurrentGame/>
  )
}

export default Playfield;
