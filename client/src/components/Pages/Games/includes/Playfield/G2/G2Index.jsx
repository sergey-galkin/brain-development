import React, { useEffect, useState } from 'react';
import css from './G2Index.module.css';
import Modal from '../../../../../ui/Modal/Modal';
import Card from './Card/Card';
import GameMenu from './GameMenu/GameMenu';
import GameModal from './GameModal/GameModal';

function createCards(difficulty) {
  const uniqueCardsAmount = 12;
  const maxDifficulty = 3;
  const uniqueCardsAmountInGame = uniqueCardsAmount / (maxDifficulty + 1 - difficulty);
  const indexes = createRandomIndexes(uniqueCardsAmount);
  const cards = [];
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

const generalData = {
  startTime: null,
  finishTime: null,
  setTimeTimerId: null,
}

const G2 = () => {
  const [modal, setModal] = useState(false);
  const [gameData, setGameData] = useState({
    difficulty: 1,
    cards: createCards(1),
    turnedCards: [],
    result: createResultObject(),
    time: '0:00',
    moves: 0,
  });


  useEffect(startGame, []);

  function changeDifficulty(value) {
    clearInterval(generalData.setTimeTimerId);
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
    setModal(false);
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

    generalData.startTime = Date.now();
    if (generalData.setTimeTimerId) clearInterval(generalData.setTimeTimerId);
    generalData.setTimeTimerId = setInterval(() => {
      setGameData((p) => {
        return {...p, time: getTime()}
      });
    }, 1000);

    function getTime() {
      const time = (Date.now() - generalData.startTime) / 1000;
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60);
      const prefix = seconds < 10 ? '0' : '';
      return minutes + ':' + prefix + seconds;
    }
  }

  function gameOverCheck() {
    if (gameData.cards.filter(c => !c.matched).length) return;
    
    generalData.finishTime = Date.now();
    clearInterval(generalData.setTimeTimerId);
    
    const newResult = [...gameData.result];
    const index = gameData.difficulty - 1;
    newResult[index].current = generalData.finishTime - generalData.startTime;
    newResult[index].previousBest = newResult[index].best;
    
    if (!newResult[index].best || newResult[index].current < newResult[index].best) newResult[index].best = newResult[index].current;
    setGameData((p) => {
      return {...p, result: newResult}
    });
    setModal(true);
  }

  return (
    <div className={'container ' + css.flex}>
      <GameMenu 
        difficulty={gameData.difficulty}
        time={gameData.time} 
        moves={gameData.moves} 
        handleClick={changeDifficulty}
      />
      <div className={css.playfield}>
        {
          gameData.cards.map((card, i) => {
            return <Card key={card.random} {...card} handleClick={() => turnCard(i)}/>
          })
        }
      </div>
      {modal && 
        <Modal visible={modal} setVisible={setModal}>
          <GameModal
            result={gameData.result[gameData.difficulty - 1]}
            startGame={startGame}
          />
        </Modal>
      }
    </div>
  );
}

export default G2;
