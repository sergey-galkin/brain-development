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
      <NavLink to={'/games'} >
        <h1 style={{textAlign: 'center', marginTop: '150px'}}>{'Games'}</h1>
      </NavLink>
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
