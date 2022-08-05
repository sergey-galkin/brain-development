import React, { useEffect, useState } from 'react';
import css from './G2Index.module.css';
import Modal from '../../../../../ui/Modal/Modal';
import Card from './Card/Card';
import GameMenu from './GameMenu/GameMenu';
import GameModal from './GameModal/GameModal';

function createCards(difficulty) {
  const cardAmount = 1;
  const playfield = [];
  for (let i = 0; i < difficulty * 2; i++) {
    for (let j = 0; j < cardAmount; j++) {
      playfield.push({
        pictureId: j,
        active: true,
        turned: false,
        matched: false,
        random: Math.random()
      })
    }
  }
  return playfield.sort((a, b) => b.random - a.random)
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
  // setTimeTimerId: [],
}

const G2 = () => {
  const [modal, setModal] = useState(false);
  const [difficulty, setDifficulty] = useState(1);
  const [cards, setCards] = useState(createCards(difficulty));
  const [turnedCards, setTurnedCards] = useState([]);
  const [time, setTime] = useState('0:00');
  const [result, setResult] = useState(createResultObject());

  useEffect(() => {
    startGame(difficulty)
  }, []);

  function changeDifficulty(value) {
    clearInterval(generalData.setTimeTimerId);
    setDifficulty(value);
    startGame(value);
  }

  function turnCard(index) {
    const newCards = [...cards];
    newCards[index].active = false;
    newCards[index].turned = true;
    setCards(newCards);
    
    const newTurnedCards = [...turnedCards];
    newTurnedCards.push(newCards[index]);
    setTurnedCards(newTurnedCards);
    
    if (newTurnedCards.length === 2) {
      newCards.forEach((card) => card.active = false);
      setTimeout(() => {
        if (newTurnedCards[0].pictureId === newTurnedCards[1].pictureId) {
          newTurnedCards[0].matched = true;
          newTurnedCards[1].matched = true;
        }
      }, 1000);
      setTimeout(() => {
        newCards.forEach((card) => {if (!card.matched) card.active = true});
        newTurnedCards.forEach((card) => card.turned = false)
        setCards(newCards);
        setTurnedCards([]);
        gameOverCheck();
      }, 2000);
    }
  }
  
  function startGame(difficulty = 1) {
    setModal(false);
    setCards(createCards(difficulty));
    setTime('0:00');
    const newResult = [...result];
    newResult.forEach((r) => r.current = null);
    setResult(newResult);

    generalData.startTime = Date.now();
    if (generalData.setTimeTimerId) clearInterval(generalData.setTimeTimerId);
    generalData.setTimeTimerId = setInterval(() => {
      setTime(getTime());
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
    if (cards.filter(c => !c.matched).length) return;
    
    generalData.finishTime = Date.now();
    clearInterval(generalData.setTimeTimerId);
    
    const newResult = [...result];
    const index = difficulty - 1;
    newResult[index].current = generalData.finishTime - generalData.startTime;
    newResult[index].previousBest = newResult[index].best;
    
    if (!newResult[index].best || newResult[index].current < newResult[index].best) newResult[index].best = newResult[index].current;
    setResult(newResult);
    setModal(true);
  }

  return (
    <div className={'container ' + css.flex}>
      <GameMenu time={time} difficulty={difficulty} handleClick={changeDifficulty}/>
      <div className={css.playfield}>
        {
          cards.map((card, i) => {
            return <Card key={card.random} {...card} handleClick={() => turnCard(i)}/>
          })
        }
      </div>
      {modal && 
        <Modal 
          visible={modal}
          setVisible={setModal}
        >
          <GameModal
            result={result[difficulty - 1]}
            startGame={startGame}
          />
        </Modal>
      }
    </div>
  );
}

export default G2;
