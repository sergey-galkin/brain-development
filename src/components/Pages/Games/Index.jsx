import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../NotFound';

const Index = () => {
  const {game} = useParams();
  
  const games = [
    '1',
    '2',
    '3',
  ];

  if (games.indexOf(game) === -1) return <NotFound/>
  
  return (
    <div>
      
    </div>
  );
}

export default Index;
