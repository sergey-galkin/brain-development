import React, { useEffect } from 'react'
import Container from '../../common/Container/Container'
import css from './Games.module.css'
import { getGamesData } from '../../../meta_data/games/gamesMetaData'
import GameSlab from '../../features/GameSlab/GameSlab'
import { useSpring, animated } from '@react-spring/web'


const Games = () => {
  const animationDuration = 500;
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: animationDuration,
    }
  }))
  
  let gameSlabData = Object.values( getGamesData() ).map((game) => {
    return {
      id: game.id,
      url: game.urls[0],
      description: game.description[0].internals,
    }
  });


  useEffect(() => {
    api.start({ opacity: 1 })
    return () => {
      api.start({ opacity: 0 })
    }
  }, [])
  


  return (
    <div className={css.containerHolder}>
      <animated.div style={styles}>
        <div>
          <Container classesArr={[css.container]}>
            {
              gameSlabData.map((data) => <GameSlab key={data.id} {...data} />)
            }
          </Container>
        </div>
      </animated.div>
    </div>
  )
}

export default Games