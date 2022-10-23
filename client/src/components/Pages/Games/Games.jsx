import React, { useMemo, useState } from 'react'
import Container from '../../common/Container/Container'
import css from './Games.module.css'
import { getGamesData } from '../../../meta_data/games/gamesMetaData'
import GameSlab from '../../features/GameSlab/GameSlab'
import { animated, config, useTransition } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'


const Games = () => {
  const initialItems = useMemo(() => {
    return Object.values( getGamesData() ).map((game) => {
      return {
        id: game.id,
        url: game.urls[0],
        handleClick: () => navigateToGamePage(game.urls[0]),
      }
    })
  }, []);
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();
  
  const aProps = {
    duration: 100 * initialItems.length,
    trail: 200,
    states: [
      { opacity: 0, scale: 0.2 },
      { opacity: 1, scale: 1 },
    ],
  };
  
  function navigateToGamePage(url) {
    setItems([]);
    setTimeout(() => {
      navigate(url);
    }, aProps.trail * initialItems.length + aProps.duration);
  }

  const transitions = useTransition(items, {
    from: aProps.states[0],
    enter: aProps.states[1],
    leave: aProps.states[0],
    trail: aProps.trail,
    // config: config.gentle,
    config: {
      duration: aProps.duration,
    },
  })
  
  const AnimatedGameSlab = animated(GameSlab);

  return (
    <div className={css.containerHolder}>
      <Container classesArr={[css.container]}>
        {transitions((styles, item) => (
          <AnimatedGameSlab {...item} style={styles} />
        ))}
      </Container>
    </div>
  )
}

export default Games
