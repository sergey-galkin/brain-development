import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import css from './Intro.module.css';
import NotFound from '../../NotFound';
import { getGameData } from '../../../../games_meta_data/gamesMetaData';
import Container from '../../../common/Container/Container';

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

const StartButton = () => {
  const navigate = useNavigate();
  return (
    <button className={css.btn} onClick={() => navigate('playfield')}>
      Играть
    </button>
  );
}

const Intro = () => {
  const { gameURL } = useParams();

  const gameData = getGameData(gameURL);
  if (!gameData) return <NotFound />
  
  return (
    <div>
      <div className={css.headerHolder}>
        <Container stylesArr={[css.headerContainer]}>
          <h1>{gameData.header}</h1>
        </Container>
      </div>
      <Container stylesArr={[css.descriptionContainer]}>
        {
          gameData.description.map((d => <Description key={d.header} {...d}/>))
        }
      </Container>
      <StartButton />
    </div>
  );
}

export default Intro;
