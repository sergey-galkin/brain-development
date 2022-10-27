import React from 'react';
import { useParams } from 'react-router-dom';
import MainBackground from '../features/MainBackground/MainBackground';

const HomePage = () => {
  const {login} = useParams();
  return (
    <MainBackground>
      <h1 style={{textAlign: 'center', marginTop: '45vh', fontSize: '3em'}}>Profile of user {login}</h1>
    </MainBackground>
  );
}

export default HomePage;
