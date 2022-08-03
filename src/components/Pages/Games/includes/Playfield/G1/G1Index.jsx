import React, { useState, useEffect } from 'react';
import css from './G1Index.module.css';
import Modal from '../../../../../ui/Modal/Modal';
import GameModal from './GameModal/GameModal';
import ActionField from './ActionField/ActionField';
import Controllers from './Controllers/Controllers';

const colors = ['red', 'blue', 'green', 'yellow'];
const generalData = {
  startTime: null,
  moveStartTime: null,
  timeLimit: 10*1000,
  moveTimerId: null,
  forcingMoveTimerId: null,
}

const Playfield = () => {
  const [gameData, setGameData] = useState({
    active: true,
    result: {
      previous: null,
      current: null,
      best: null,
    },
    figureColor: '',
  });

  const [modal, setModal] = useState(false);

  useEffect(() => {
    startGame();
  }, []);
  // useEffect(() => {
  //   if (started && !gameData.active) {
  //     startGame();
  //   }
  // }, [started]);

  function bodyOnKeyDown(enable) {
    if (enable) {
      document.body.onkeydown = function (e) {
        e = e || window.event;
        const index = getIndex(e);
        if (index !== null) {
          handleGameButtonClick(colors[index - 1])
        }
      }
    } else {
      document.body.onkeydown = null;
    }
    
    function getIndex(event) {
      if (event.code.includes('Digit')) {
        return event.code.slice(-1)
      }
      return null;
    }
  }

  function updateScore(chosenColor) {
    setGameData(calcState);

    function calcState(prevGameData) {
      const points = chosenColor === prevGameData.figureColor ? 10 : -10;
      const result = {
        previous: prevGameData.result.current,
        current: prevGameData.result.current + points,
        best: prevGameData.result.best,
      }
      return {...prevGameData, result: result}
    }
  }

  function nextMove() {
    clearTimeout(generalData.moveTimerId);
    clearTimeout(generalData.forcingMoveTimerId);
    
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        figureColor: '',
      }
    });
    
    generalData.moveStartTime = Date.now();
    generalData.forcingMoveTimerId = setTimeout(handleGameButtonClick, 2000, 'nocolor');
    generalData.moveTimerId = setTimeout(() => {
      setGameData((prevGameData) => {
        return {
          ...prevGameData,
          figureColor: getRandomColor(), 
          result: {
            ...prevGameData.result, 
            previous: prevGameData.result.current
          },
        }
      })
      bodyOnKeyDown(true);
    }, 1000);

    function getRandomColor() {
      const index = Math.round(Math.random() * (colors.length - 1));
      return colors[index];
    }
  }

  function startGame() {
    setModal(false);
    generalData.startTime = Date.now();
    setGameData((prevGameData) => {
      return {
        ...prevGameData,
        active: true,
        result: {
          previous: 0,
          current: 0,
          best: prevGameData.result.best,
        }
      }
    });
    
    nextMove();

    // set game over actions
    setTimeout(() => {
      bodyOnKeyDown(false);
      clearTimeout(generalData.moveTimerId);
      clearTimeout(generalData.forcingMoveTimerId);

      setModal(true);
      setGameData((prevGameData) => {
        let bestResult = prevGameData.result.best;
        if (prevGameData.result.current > prevGameData.result.best || bestResult === null) {
          bestResult = prevGameData.result.current;
        }
        return {
          ...prevGameData,
          active: false,
          figureColor: '',
          result: {
            ...prevGameData.result,
            previous: prevGameData.result.current,
            best: bestResult,
          }
        }
      });
    }, generalData.timeLimit);
  }


  function handleGameButtonClick(chosenColor) {
    bodyOnKeyDown(false);
    updateScore(chosenColor);
    nextMove();
  }

  function getScoreElementColor() {
    if (gameData.result.previous < gameData.result.current) return 'green';
    if (gameData.result.previous > gameData.result.current) return 'red';
    return '';
  }

  return (
    <div className={css.playfield}>
      <div className={css.score} style={{color: getScoreElementColor()}}>
        {gameData.result.current}
      </div>
      <ActionField
        gameData={gameData}
      />
      <Controllers
        colors={colors}
        handleGameButtonClick={handleGameButtonClick}
        gameData={gameData}
      />
      <Modal 
        visible={modal}
        setVisible={setModal}
      >
        <GameModal
          result={gameData.result}
          startGame={startGame}
        />
      </Modal>
    </div>
  );
}

export default Playfield;