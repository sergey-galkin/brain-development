import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './Intro.module.css';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../meta_data/games/gamesMetaData';
import Container from '../../../common/Container/Container';
import GameSlab from '../../../features/GameSlab/GameSlab';
import * as Icons from '../../../features/GameSlabIcons/collector'
import { useSpring, animated, config } from '@react-spring/web';

const Description = ({header, internals}) => {
  return (
    <div className={css.block}>
      <h3 className={css.header}>{header}</h3>
      <div className={css.internals}>
        {
          internals.map((text) => <p key={text}>{text}</p>)
        }
      </div>
    </div>
  );
}

const StartButton = ({ handleClick }) => {
  return (
    <button className={css.btn} onClick={handleClick}>
      НАЧАЛО
    </button>
  );
}

const Intro = () => {
  const navigate = useNavigate();

  const animationDuration = 500;
  const animationStates = [
    { opacity: 0, scale: 0.2 },
    { opacity: 1, scale: 1 },
  ]
  const [styles, api] = useSpring(() => ({
    from: animationStates[0],
    to: animationStates[1],
    // config: config.stiff,
    config: {
      duration: animationDuration,
    }
  }))

  useEffect(() => {
    api.start(animationStates[1])
  }, [])

  const { gameURL } = useParams();
  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound />

  const Icon = Icons[gameData.id];

  function navigateToPlayfield() {
    api.start(animationStates[0]);
    setTimeout(navigate, animationDuration, 'playfield');
  }
  
  return (
    <div className={css.container}>
      <animated.div style={styles}>
        <Container classesArr={[css.contentContainer]}>
          {/* <GameSlab id={gameData.id} url={'/games'} /> */}
          <div className={css.contentHolder}>
            <Icon />
          </div>
          <div className={[css.descriptionContainer].join(' ')}>
            {
              gameData.description.map((d => <div className={css.contentHolder}><Description key={d.header} {...d}/></div>))
            }
          </div>
          <StartButton handleClick={navigateToPlayfield} />
        </Container>
      </animated.div>
    </div>
  );
  // return (
  //   <div className={css.container}>

  //     <div className={css.headerHolder}>
  //       <Container classesArr={[css.headerContainer]}>
  //         <h1>{gameData.header}</h1>
  //       </Container>
  //     </div>
  //     <Container classesArr={[css.descriptionContainer]}>
  //       {
  //         gameData.description.map((d => <Description key={d.header} {...d}/>))
  //       }
  //     </Container>
  //     <StartButton />
  //   </div>
  // );
}

export default Intro;
