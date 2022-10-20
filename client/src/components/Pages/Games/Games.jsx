import React, { useEffect, useReducer, useRef, useState } from 'react'
import Container from '../../common/Container/Container'
import css from './Games.module.css'
import { getGamesData } from '../../../meta_data/games/gamesMetaData'
import GameSlab from '../../features/GameSlab/GameSlab'
import { useSpring, animated, useTrail, config, easings } from '@react-spring/web'
import { useNavigate } from 'react-router-dom'


const Games = () => {
  const [needToNavigate, setNeedToNavigate] = useState(false);
  // const [animationAmount, dispatch] = useReducer((c) => c + 1, 0);
  const animationAmount = useRef(0);
  const navigate = useNavigate();
  const animationDuration = 500;
  const animationStates = [
    { opacity: 0, scale: 0.2 },
    { opacity: 1, scale: 1 },
  ]
  // const [styles, api] = useSpring(() => ({
  //   from: animationStates[0],
  //   to: animationStates[1],
  //   config: {
  //     duration: animationDuration,
  //   }
  // }))

  if (needToNavigate) animationStates.reverse();

  let gameSlabData = Object.values( getGamesData() ).map((game) => {
    return {
      id: game.id,
      url: game.urls[0],
      // handleClick: () => navigateToGamePage(game.urls[0]),
      handleClick: () => {
        // api.start(animationStates[0]);
        setNeedToNavigate(true);
        console.log(111)
      }
    }
  });

  gameSlabData = [...gameSlabData, ...gameSlabData]

  // const [trail, api] = useTrail(gameSlabData.length, () => ({
  const trail = useTrail(gameSlabData.length, {
    from: animationStates[0],
    to: animationStates[1],
    // config: config.default,
    onRest: () => {
      // dispatch(animationAmount.current)
      // console.log(animationAmount.current)
      // console.log(gameSlabData.length)
      // console.log(needToNavigate)
      if (needToNavigate) {
        animationAmount.current++;
        console.log(needToNavigate)
        if (animationAmount.current === gameSlabData.length) navigate(gameSlabData[0].url)
        // setTimeout(() => navigate(gameSlabData[0].url), 0)
        // setNeedToNavigate(false);
        // animationAmount.current = 0;
        // dispatch(0)
      }
    },
    config: {
      duration: animationDuration,
      // easing: easings.easeInOutCubic,
      precision: 0.0001
    },
    
  })

  function navigateToGamePage(url) {
    // api.start(animationStates[0]);
    // setTimeout(navigate, 500, url);
    navigate(gameSlabData[0].urls[0])
  }  
  
  
  // api.start(animationStates[1]);
  // useEffect(() => {
  //   api.start(animationStates[1]);

  // }, [])
  
  const AnimatedGameSlab = animated(GameSlab);

  return (
    <div className={css.containerHolder}>
      <Container classesArr={[css.container]}>
        {trail.map((styles, i) => (
          <AnimatedGameSlab key={gameSlabData[i].id + Math.random()} {...gameSlabData[i]} style={styles} />
        ))}
      </Container>
    </div>
  )
  // return (
  //   <div className={css.containerHolder}>
  //     <animated.div style={styles}>
  //       <Container classesArr={[css.container]}>
  //         {
  //           gameSlabData.map((data) => <GameSlab key={data.id} {...data} />)
  //         }
  //       </Container>
  //     </animated.div>
  //   </div>
  // )
}

export default Games