import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './Intro.module.css';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../meta_data/games/gamesMetaData';
import Container from '../../../common/Container/Container';
import * as Headers from '../../../features/IntroPage/Header/collector'
import { animated, useTransition } from '@react-spring/web';
import StartGameButton from '../../../features/Buttons/CSSButtons/StartGameButton/StartGameButton';
import Description from '../../../features/IntroPage/Desctiption/Description';
import MainBackground from '../../../common/MainBackground/MainBackground';

const CheckingWrapper = () => {
  const { gameURL } = useParams();
  const gameData = getGameData({url: gameURL});
  if (!gameData) return <NotFound />

  return (
    <Intro gameData={gameData} />
  );
}

const Intro = ({ gameData }) => {
  const { id, description, difficulty } = gameData;
  const Header = Headers[id];
  
  const initialItems = useMemo(() => [
    ({...props}) => <div className={css.contentHolder} {...props} >
      <Header difficulty={difficulty}/>
    </div>,
    ({...props}) => <div className={css.contentHolder} {...props} >
      <Description description={description} />
    </div>,
    ({...props}) => <StartGameButton handleClick={navigateToPlayfield} {...props} />,
  ], []);
  const [items, setItems] = useState(initialItems);

  const aProps ={
    duration: 100 * description.length,
    trail: 200,
    states: [
      { opacity: 0, scale: 0.2 },
      { opacity: 1, scale: 1 },
    ],  
  };
  
  const navigate = useNavigate();
  function navigateToPlayfield() {
    setItems([]);
    const timeout = aProps.duration + aProps.trail * description.length;
    setTimeout(navigate, timeout, 'playfield');
  }

  const animate = items => items.map(item => animated(item));
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
      <Container classesArr={[css.contentContainer]}>
        {transitions((styles, Item) => {
          return <Item style={styles} />;
        })}
      </Container>
    </MainBackground>
  );
}

export default CheckingWrapper;
