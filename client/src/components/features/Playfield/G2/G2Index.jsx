import React, { useEffect, useRef, useState } from 'react';
import css from './G2Index.module.css';
import Card from './Card/Card';
import GameMenu from './GameMenu/GameMenu';
import Modal from '../../Modal/Modal';
import GameModal from '../../ModalChildren/G2/GameResult';
import { delayedOpen } from '../../Modal/handlers';
import Container from '../../../common/Container/Container';
import { useSpring, animated } from '@react-spring/web';
import MainBackground from '../../MainBackground/MainBackground';

function createCards(difficulty) {
  // const uniqueCardsAmount = 1;
  const uniqueCardsAmount = 12;
  const maxDifficulty = 3;
  const uniqueCardsAmountInGame = uniqueCardsAmount / (maxDifficulty + 1 - difficulty);
  const indexes = createRandomIndexes(uniqueCardsAmount);
  const cards = [];
  // for (let i = 0; i < 2 + 0 * (4 - difficulty); i++) {
  for (let i = 0; i < 4 * (4 - difficulty); i++) {
    for (let j = 0; j < uniqueCardsAmountInGame; j++) {
      cards.push({
        pictureId: indexes[j].i,
        active: true,
        turned: false,
        matched: false,
        random: Math.random()
      })
    }
  }
  return cards.sort((a, b) => b.random - a.random)
}

function createRandomIndexes(amount) {
  const indexes = [];
  for (let i = 0; i < amount; i++) {
    indexes.push({
      i: i,
      random: Math.random(),
    })
  }
  return indexes.sort((a, b) => b.random - a.random)
}

function createResultObject() {
  const result = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      current: null,
      best: null,
      previousBest: null,
    })
  }
  return result;
}

const G2 = () => {
  const [modal, setModal] = useState(false);
  const [playfield, setPlayfield] = useState(false);
  const [gameData, setGameData] = useState({
    difficulty: 1,
    cards: createCards(1),
    turnedCards: [],
    result: createResultObject(),
    time: '0:00',
    moves: 0,
  });

  const aProps = {
    duration: 1000,
  };  
  const { gradientPositions } = useSpring({
    from: {
      gradientPositions: [40, 70]
    },
    gradientPositions: [100, 100],
    config: {
      duration: aProps.duration,
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setPlayfield(true);
      startGame();
    }, aProps.duration + 300);
  }, [])

  // general data that do not need to be stored in state
  const gd = useRef({
    startTime: null,
    finishTime: null,
    setTimeTimerId: null,
  })

  function changeDifficulty(value) {
    clearInterval(gd.current.setTimeTimerId);
    setGameData((p) => {
      return {...p, difficulty: value}
    });
    startGame();
  }

  function turnCard(index) {
    const newCards = [...gameData.cards];
    newCards[index].active = false;
    newCards[index].turned = true;
    
    const newTurnedCards = [...gameData.turnedCards];
    newTurnedCards.push(newCards[index]);
    
    setGameData((p) => {
      return {...p, cards: newCards, turnedCards: newTurnedCards}
    });
    
    if (newTurnedCards.length === 2) {
      newCards.forEach((card) => card.active = false);
      setTimeout(() => {
        if (newTurnedCards[0].pictureId === newTurnedCards[1].pictureId) {
          newTurnedCards.forEach((card) => card.matched = true);
        }
        newCards.forEach((card) => {if (!card.matched) card.active = true});
        newTurnedCards.forEach((card) => card.turned = false)
        setGameData((p) => {
          return {...p, cards: newCards, turnedCards: [], moves: p.moves + 1}
        });
      }, 2000);
      setTimeout(() => {
        gameOverCheck();
      }, 3000);
    }
  }
  
  function startGame() {
    const newResult = [...gameData.result];
    newResult.forEach((r) => r.current = null);
    setGameData((p) => {
      return {
        ...p,
        cards: createCards(p.difficulty),
        turnedCards: [],
        result: newResult,
        time: '0:00',
        moves: 0,
      }
    });

    gd.current.startTime = Date.now();
    if (gd.current.setTimeTimerId) clearInterval(gd.current.setTimeTimerId);
    gd.current.setTimeTimerId = setInterval(() => {
      setGameData((p) => {
        return {...p, time: getTime()}
      });
    }, 1000);

    function getTime() {
      const time = (Date.now() - gd.current.startTime) / 1000;
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);
      const prefix = seconds < 10 ? '0' : '';
      return minutes + ':' + prefix + seconds;
    }
  }

  function gameOverCheck() {
    if (gameData.cards.filter(c => !c.matched).length) return;
    
    gd.current.finishTime = Date.now();
    clearInterval(gd.current.setTimeTimerId);
    
    const newResult = [...gameData.result];
    const index = gameData.difficulty - 1;
    newResult[index].current = gd.current.finishTime - gd.current.startTime;
    newResult[index].previousBest = newResult[index].best;
    
    if (!newResult[index].best || newResult[index].current < newResult[index].best) newResult[index].best = newResult[index].current;
    setGameData((p) => {
      return {...p, result: newResult}
    });
    
    delayedOpen( () => setModal(true) );
  }

  const AnimatedMainBackGround = animated(MainBackground);

  return (
    <AnimatedMainBackGround style={{
      backgroundImage: gradientPositions.to(
        (p1, p2) => `radial-gradient(circle, #fee3ff ${p1}%, var(--main-bg-color) ${p2}%)`
      )
    }}>
      {playfield &&
        <Container classesArr={[css.container]}>
          <GameMenu 
            difficulty={gameData.difficulty}
            time={gameData.time} 
            moves={gameData.moves} 
            handleClick={changeDifficulty}
          />
          <div className={css.playfieldHolder}>
            <div className={css.playfield}>
              {gameData.cards.map((card, i) => {
                return <Card key={card.random} {...card} handleClick={() => turnCard(i)}/>
              })}
            </div>
          </div>
        </Container>
      }
      {modal &&
        <Modal header='Результаты' closeModal={() => setModal(false)}>
          <GameModal
            result={gameData.result[gameData.difficulty - 1]}
            startGame={startGame}
          />
        </Modal>
      }
    </AnimatedMainBackGround>
  );
}

export default G2;
