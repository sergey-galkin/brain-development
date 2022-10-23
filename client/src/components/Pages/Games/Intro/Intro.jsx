import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './Intro.module.css';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../meta_data/games/gamesMetaData';
import Container from '../../../common/Container/Container';
import GameSlab from '../../../features/GameSlab/GameSlab';
import * as Icons from '../../../features/GameSlabIcons/collector'
import { useSpring, animated, config, useTransition } from '@react-spring/web';
import StartGameButton from '../../../features/Buttons/StartGameButton/StartGameButton';

const Description = ({ description, ...props }) => {
  return (
    <div className={[css.descriptionContainer].join(' ')} {...props} >
      { description.map(({ header, internals }) => 
        <div key={header} className={css.contentHolder}>
          <div className={css.block}>
            <h3 className={css.header}>{header}</h3>
            <div className={css.internals}>
              { internals.map((text) => <p key={text}>{text}</p>) }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const CheckingWrapper = () => {
  const { gameURL } = useParams();
  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound />

  return (
    <Intro gameData={gameData} />
  );
}

const Intro = ({ gameData }) => {
  const { id, description } = gameData;
  const Icon = Icons[id];
  
  const initialItems = [
    ({...props}) => <div className={css.contentHolder} {...props} >
      <Icon />
    </div>,
    ({...props}) => <Description description={description} {...props} />,
    ({...props}) => <StartGameButton handleClick={navigateToPlayfield} {...props} />,
  ];
  const [items, setItems] = useState(initialItems);

  const aProps = {
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

  function animate(items) {
    return items.map(item => animated(item))
  }

  const transitions = useTransition( animate(items), {
    from: aProps.states[0],
    enter: aProps.states[1],
    leave: aProps.states[0],
    trail: aProps.trail,
    // config: config.gentle,
    config: {
      duration: aProps.duration,
    },  
  })  
  
  return (
    <div className={css.container}>
      <Container classesArr={[css.contentContainer]}>
        {transitions((styles, Item) => {
          return <Item style={styles} />;
        })}
      </Container>
    </div>
  );
}

export default CheckingWrapper;
