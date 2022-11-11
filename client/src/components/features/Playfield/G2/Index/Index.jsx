import React, { useCallback, useEffect, useState } from 'react';
import css from './Index.module.css';
import Card from '../Card/Card';
import GameMenu from '../GameMenu/GameMenu';
import Modal from '../../../Modal/Modal';
import GameModal from '../../../ModalChildren/G1/GameResult';
import { delayedOpen } from '../../../Modal/handlers';
import Container from '../../../../common/Container/Container';
import MainBackground from '../../../../common/MainBackground/MainBackground';
import useResult from '../../../../../hooks/G2/useResult';
import useCards from '../../../../../hooks/G2/useCards';
import useTime from '../../../../../hooks/G2/useTime';

const G2 = ({ id, initialDifficulty }) => {
  const [modal, setModal] = useState(false);
  const [playfield, setPlayfield] = useState(false);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [cards, cardsDispatch] = useCards(difficulty);
  const [result, resultDispatch] = useResult();
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
      resultDispatch({type: 'reset', payload: difficulty});
    }, modalAnimationDuration)
  }, [difficulty]);

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
    startGame();
  }, [difficulty])

  useEffect(() => {
    defineMatchedCards(cards);
  }, [cards])

  useEffect(() => {
    const isAnyNotMatchedCards = cards.filter(c => !c.matched).length > 0;
    if (!cards.length || isAnyNotMatchedCards) return;
    setGameOver(true);
    timeDispatch({type: 'stop'});
  }, [moves])

  useEffect(() => {
    if (!gameOver) return;
    setTimeout(() => {
      const timeDelta = finishTime - startTime;
      resultDispatch({type: 'update', payload: {timeDelta, difficulty, moves}});
      delayedOpen( () => setModal(true) );
    }, 1000);
  }, [gameOver])

  return (
    <MainBackground animationDuration={1000}>
      {playfield &&
        <Container classesArr={[css.container]}>
          <GameMenu 
            difficulty={difficulty}
            time={time} 
            moves={moves} 
            handleClick={setDifficulty}
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
      {modal &&
        <Modal header='Результаты' closeModal={() => setModal(false)}>
          <GameModal
            result={result[difficulty - 1]}
            startNewGame={startGame}
          />
        </Modal>
      }
    </MainBackground>
  );
}

export default G2;
