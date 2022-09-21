import React from 'react';
import { NavLink } from 'react-router-dom';
import { getGamesData } from '../../games_meta_data/gamesMetaData'

const routes = Object.values( getGamesData() ).map(
  d => { return {
    path: 'games/' + d.urls[0],
    capture: d.name
  }
});

const HomePage = () => {
  return (
    <>
      {
        routes.map(r => 
          <NavLink key={r.path} to={r.path} >
            <h1 style={{textAlign: 'center', marginTop: '150px'}}>{r.capture}</h1>
          </NavLink>
        )
      }
    </>
  );
}

export default HomePage;
