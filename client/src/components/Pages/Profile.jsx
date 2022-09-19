import React from 'react';
import { useParams } from 'react-router-dom';

const HomePage = () => {
  const {login} = useParams();
  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: '50vh'}}>Profile of user {login}</h1>
    </div>
  );
}

export default HomePage;
