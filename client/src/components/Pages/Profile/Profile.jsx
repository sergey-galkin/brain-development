import React from 'react';
import css from './Profile.module.css'
import { useSelector } from 'react-redux'
import { animated, useTransition } from '@react-spring/web';
import Container from '../../common/Container/Container';
import MainBackground from '../../common/MainBackground/MainBackground';
import Header from '../../features/ProfilePage/Header/Header';
import Slab from '../../features/ProfilePage/Slab/Slab';
import { selectAllGamesStat } from './gamesStatSlice';
import { getGamesData } from '../../../meta_data/games/gamesMetaData';

const ProfilePage = () => {
  const gamesData = getGamesData();
  const gamesStat = useSelector(selectAllGamesStat);
  const items = gamesStat.map((data, i) => ({...props}) =>
    <Slab data={{...data, level: 0.25 * (i + 1)}} difficulty={gamesData[data.id].difficulty} {...props} />
  );
  
  const aProps = {
    duration: 100 * items.length,
    trail: 200,
    states: [
      { opacity: 0, scale: 0.2 },
      { opacity: 1, scale: 1 },
    ],  
  };  
  
  function animate(items) {
    return items.map(item => animated(item))
  }

  const transitions = useTransition( animate(items), {
    from: aProps.states[0],
    enter: aProps.states[1],
    leave: aProps.states[0],
    trail: aProps.trail,
    config: {
      duration: aProps.duration,
    },  
  })  
  
  return (
    <MainBackground>
      <Header />
      <Container classesArr={[css.contentContainer]}>
        {transitions((styles, Item) => {
          return <Item style={styles} />;
        })}
      </Container>
    </MainBackground>
  );
}

export default ProfilePage;
