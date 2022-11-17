import React, { useCallback, useContext, useEffect, useState } from 'react';
import css from './Index.module.css';
import Card from '../Card/Card';
import GameMenu from '../GameMenu/GameMenu';
import Container from '../../../../common/Container/Container';
import MainBackground from '../../../../common/MainBackground/MainBackground';
import useResult from '../../../../../hooks/games/useResult';
import useCards from '../../../../../hooks/games/G2/useCards';
import useScore from '../../../../../hooks/games/G2/useScore';
import useTime from '../../../../../hooks/games/G2/useTime';
import { ModalContext } from '../../../../../context/context';
import GameResult from '../../../ModalChildren/GameResult/GameResult';

const G2 = ({ gameId, difficulty }) => {
  const { update: updateModal } = useContext(ModalContext);
  const [playfield, setPlayfield] = useState(false);
  const [cards, cardsDispatch] = useCards(difficulty);
  const [score, scoreDispatch] = useScore(0);
  const [result, resultUpdate] = useResult(gameId);
  const [time, startTime, finishTime, timeDispatch] = useTime();
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  
  const startGame = useCallback(() => {
    const modalAnimationDuration = 100;
    setTimeout(() => {
      setGameOver(false);
      timeDispatch({type: 'reset'});
      setMoves(0);
      cardsDispatch({type: 'reset', payload: difficulty});
      scoreDispatch({type: 'reset'});
    }, modalAnimationDuration)
  }, []);

  const turnCard = useCallback((cards, index) => {
    cards[index].active = false;
    cards[index].turned = true;
    cardsDispatch({type: 'update', payload: [...cards]});
  }, []);

  const defineMatchedCards = useCallback((cards) => {
    const turnedCards = cards.filter(c => c.turned);
    if (turnedCards.length === 2) {
      cards.forEach(card => card.active = false);
      setTimeout(() => {
        if (turnedCards[0].pictureId === turnedCards[1].pictureId) {
          turnedCards.forEach(card => card.matched = true);
        }
        turnedCards.forEach(card => card.turned = false);
        cards.forEach(card => {if (!card.matched) card.active = true});
        
        cardsDispatch({type: 'update', payload: [...cards]});
        setMoves((p) => p + 1);
      }, 2000);
    }
  }, []);

  const animationDuration = 1000;
  useEffect(() => {
    setTimeout(() => {
      setPlayfield(true);
      startGame();
    }, animationDuration + 300);
  }, [])

  useEffect(() => {
    defineMatchedCards(cards);
  }, [cards])

  // if all cards pairs founded, then stop timer and define finish time
  useEffect(() => {
    const isAnyNotMatchedCards = cards.filter(c => !c.matched).length > 0;
    if (!cards.length || isAnyNotMatchedCards) return;
    timeDispatch({type: 'stop'});
  }, [moves])
  
  // if finish time defined, then calculate score
  useEffect(() => {
    if (!finishTime) return;
    setTimeout(() => {
      const timeDelta = finishTime - startTime;
      scoreDispatch({type: 'update', payload: {timeDelta, difficulty, moves}});
    }, 1000);
  }, [finishTime])
  
  // if score calculated, then update result and finish game
  useEffect(() => {
    if (!score) return;
    resultUpdate(score);
    setGameOver(true);
  }, [score])

  // if game is over, then show modal
  useEffect(() => {
    if (!gameOver) return;
    updateModal({
      visible: true,
      header: 'Результаты',
      children: <GameResult result={{...result, current: score}} startNewGame={startGame} />,
    })
  }, [gameOver]);

  return (
    <MainBackground animationDuration={1000}>
      {playfield &&
        <Container classesArr={[css.container]}>
          <GameMenu 
            difficulty={difficulty}
            time={time} 
            moves={moves} 
          />
          <div className={css.playfieldHolder}>
            <div className={css.playfield}>
              {cards.map((card, i) => 
                <Card key={card.random} cards={cards} index={i} {...card} handleClick={turnCard}/>
              )}
            </div>
          </div>
        </Container>
      }
    </MainBackground>
  );
}

export default G2;
