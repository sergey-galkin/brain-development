import React, { useState } from 'react'
import css from './Games.module.css'
import { useNavigate } from 'react-router-dom'
import { animated, useTransition } from '@react-spring/web'
import { getGamesData } from '../../../../meta_data/games/gamesMetaData'
import MainBackground from '../../../common/MainBackground/MainBackground'
import Container from '../../../common/Container/Container'
import GameSlab from '../../../features/GameSlab/GameSlab'

const Games = () => {
  const initialItems = Object.values( getGamesData() )
    .map(game => ({
      id: game.id,
      url: game.urls[0],
      handleClick: () => navigateToGamePage(game.urls[0]),
    }))
  ;

  const [items, setItems] = useState(initialItems);
  
  const navigate = useNavigate();
  function navigateToGamePage(url) {
    setItems([]);
    setTimeout(() => {
      navigate(url);
    }, aProps.trail * initialItems.length + aProps.duration);
  };
  
  const aProps = {
    duration: 100 * initialItems.length,
    trail: 200,
    states: [
      { opacity: 0, scale: 0.2 },
      { opacity: 1, scale: 1 },
    ],
  };
  
  const transitions = useTransition(items, {
    from: aProps.states[0],
    enter: aProps.states[1],
    leave: aProps.states[0],
    trail: aProps.trail,
    config: {
      duration: aProps.duration,
    },
  })
  
  const AnimatedGameSlab = animated(GameSlab);

  return (
    <MainBackground>
      <div className={css.containerHolder}>
        <Container classesArr={[css.container]}>
          {transitions((styles, item) => (
            <AnimatedGameSlab {...item} style={styles} />
          ))}
        </Container>
      </div>
    </MainBackground>
  )
}

export default Games
