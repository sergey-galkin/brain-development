import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../meta_data/games/gamesMetaData';
import * as Games from '../../../features/Playfield/collector';

const Playfield = () => {
  const {gameURL} = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound/>
  
  const CurrentGame = Games[gameData.id];

  return (
    <CurrentGame gameId={gameData.id} initialDifficulty={gameData.difficulty} />
  )
}

export default Playfield;
