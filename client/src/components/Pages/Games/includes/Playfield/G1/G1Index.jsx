import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { playfield } from './Playfield';
import GameModal from './GameModal/GameModal';
import { ModalContext } from '../../../../../../contex';
import { useDispatch } from 'react-redux';

const generalData = {
  startTime: null,
  moveStartTime: null,
  waitingNextMoveTimeLimit: 1000,
  moveTimeLimit: 2000,
  waitingNextMoveTimerId: null,
  moveTimerId: null,
  // setTimeTimerId: null,
  level: 1,
}

function createIndexes() {
  const indexes = [];
  for (let i = 0; i < 4; i++) {
    indexes.push({
      i: i,
      random: Math.random()
    })
    
  }
  return indexes.sort((a, b) => b.random - a.random)
}

const G1 = () => {
  const [gameData, setGameData] = useState({
    active: true,
    steps: 0,
    moveTimeLimitDecrement: 0,
    result: {
      current: 0,
      total: 0,
      best: null,
      previousBest: null,
    },
    figureIndex: null,
    chosenIndex: null,
    errors: {
      current: 0,
      max: 3,
    },
    indexes: createIndexes(),
  });

  const modal = useContext(ModalContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const playfieldHolder = document.getElementById('playfieldHolder');
    playfield.create(playfieldHolder, generalData, gameData, handleGameButtonClick);
    startGame();
    return () => {
      playfieldHolder.innerHTML = '';
      // clearInterval(generalData.setTimeTimerId);
    }
  }, []);

  useEffect(() => {
    const playfieldHolder = document.getElementById('playfieldHolder');
    playfield.create(playfieldHolder, generalData, gameData, handleGameButtonClick);
    // if game over show results
    if (!gameData.active) {
      setTimeout(
        modal.update(
          true,
          'Результаты',
          <GameModal
            result={gameData.result}
            startGame={startGame}
          />
        )
      , 700);
    }
    return () => {
      playfieldHolder.innerHTML = '';
    }
  }, [gameData]);

  function handleGameButtonClick(chosenIndex) {
    bodyOnKeyDown(false);
    updateScore(chosenIndex);
    gameOverCheck(chosenIndex);
    nextMove();
  }

  function bodyOnKeyDown(enable) {
    if (enable) {
      document.body.onkeydown = function (e) {
        e = e || window.event;
        const index = getIndex(e);
        if (index !== null) {
          handleGameButtonClick(index)
        }
      }
    } else {
      document.body.onkeydown = null;
    }
    
    function getIndex(event) {
      const codes = ['Digit1', 'Digit2', 'Digit3', 'Digit4'];
      if (codes.indexOf(event.code) > -1) {
        return event.code.slice(-1) - 1;
      }
      return null;
    }
  }

  function updateScore(chosenIndex) {
    setGameData(calcState);

    function calcState(prevGameData) {
      const timeDelta = Date.now() - generalData.moveStartTime;
      const multiplier = chosenIndex === null 
        ? 0 : chosenIndex === prevGameData.figureIndex 
          ? 1 : -1
      ;
      const points = Math.round((generalData.moveTimeLimit - timeDelta) * multiplier * generalData.level / 100);
      const result = {
        ...prevGameData.result,
        current: points,
        total: prevGameData.result.total + points,
      }
      return {...prevGameData, result: result, chosenIndex: chosenIndex}
    }
  }

  function nextMove() {
    clearTimeout(generalData.waitingNextMoveTimerId);
    clearTimeout(generalData.moveTimerId);
    
    setGameData((prevGameData) => {
      generalData.level = Math.ceil((prevGameData.steps + 1) / 5);
      return {
        ...prevGameData,
        figureIndex: null,
      }
    });
    
    const timeLimit = generalData.waitingNextMoveTimeLimit + generalData.moveTimeLimit - generalData.level * 100;
    generalData.moveTimerId = setTimeout(handleGameButtonClick, timeLimit, null);
    generalData.waitingNextMoveTimerId = setTimeout(() => {
      setGameData((prevGameData) => {
        return {
          ...prevGameData,
          steps: prevGameData.steps + 1,
          figureIndex: getRandomIndex(), 
          result: {
            ...prevGameData.result, 
            current: 0,
          },
        }
      })
      
      generalData.moveStartTime = Date.now();
      bodyOnKeyDown(true);
    }, generalData.waitingNextMoveTimeLimit);

    function getRandomIndex() {
      const controllersAmount = 4;
      return Math.round(Math.random() * (controllersAmount - 1));
    }
  }

  function startGame() {
    modal.update();
    generalData.startTime = Date.now();
    generalData.moveTimeLimit = 2000 + 100;
    generalData.level = 1;
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        active: true,
        steps: 0,
        figureIndex: null,
        chosenIndex: null,
        result: {
          ...prevGameData.result,
          current: 0,
          total: 0,
        },
        errors: {
          current: 0,
          max: 3,
        },
        indexes: createIndexes(),
      }
    });

    nextMove();
  }

  function gameOverCheck(chosenIndex) {
    setGameData(calcState);
    
    function calcState(prevGameData) {
      const errorsAmount = prevGameData.errors.current;
      const newErrorCount = chosenIndex !== prevGameData.figureIndex ? 1 : 0;
      const errors = {
        ...prevGameData.errors,
        current: errorsAmount + newErrorCount,
      }
      const active = errors.current === errors.max ? false : true;

      if (active) return {...prevGameData, errors: errors};

      bodyOnKeyDown(false);
      clearTimeout(generalData.waitingNextMoveTimerId);
      clearTimeout(generalData.moveTimerId);

      const result = prevGameData.result;
      result.previousBest = result.best;
      if (result.total > result.best || result.best === null) {
        result.best = result.total;
      }

      // axios.get('/api')
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))
      // ;
      // axios.post('/api', {bestResult})
      //   .then(res => console.log(res))
      //   .catch(err => console.log(err))
      // ;


      return {
        ...prevGameData,
        active: false,
        figureIndex: null,
        result: result,
        errors: errors,
      }
    }
  }

  return (
    <div id={'playfieldHolder'} />
  );
}

export default G1;