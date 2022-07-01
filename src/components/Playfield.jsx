import React, {useState} from 'react';
import ActionField from './ActionField';
import Controllers from './Controllers';

const colors = ['red', 'blue', 'green', 'yellow'];
const gameData = {
  // started: false,
  // finished: false,
  active: false,
  lastResult: null,
  bestResult: null,
  startTime: null,
  moveStartTime: null,
  timeLimit: 10*1000,
  moveTimerId: null,
  forcingMoveTimerId: null,
}

const Playfield = () => {
  const [score, setScore] = useState(0);
  const [figureColor, setFigureColor] = useState(null);
  const [scoreColor, setScoreColor] = useState(null);

  function bodyOnKeyDown() {
    if (gameData.active) {
      document.body.onkeydown = function (e) {
        e = e || window.event;
        const index = getIndex(e);
        console.log(index)
        console.log(colors[index - 1])
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
    console.log(chosenColor)
    console.log(figureColor)
    console.log(chosenColor === figureColor)
    const points = calcPoints(chosenColor);
    setScore((prevScore) => {
      gameData.lastResult = prevScore + points
      return gameData.lastResult
    });
    setScoreColor(points > 0 ? 'green' : 'red');
    // console.log(gameData.lastResult)
    function calcPoints(chosenColor) {
      return (chosenColor === figureColor ? 10 : -10)
    }
  }

  function nextMove() {
    setFigureColor('');
    clearTimeout(gameData.moveTimerId);
    clearTimeout(gameData.forcingMoveTimerId);
    
    gameData.moveTimerId = setTimeout(() => {
      setFigureColor( getRandomColor() );
      setScoreColor('');

      const now = Date.now();
      if (!gameData.startTime) gameData.startTime = now;
      gameData.moveStartTime = now;

      // forcing next move, if player goes over time limit of 2 seconds
      gameData.forcingMoveTimerId = setTimeout(handleGameButtonClick, 2000, 'nocolor');
    }, 1000);

    function getRandomColor() {
      const index = Math.round(Math.random() * (colors.length - 1));
      return colors[index];
    }
  }

  function handleStartButtonClick() {
    gameData.active = true;
    setScore(0);
    nextMove();
    bodyOnKeyDown();

    // set game over actions
    setTimeout(() => {
      gameData.active = false;
      if (gameData.lastResult > gameData.bestResult || gameData.bestResult === null) {
        gameData.bestResult = gameData.lastResult;
      }
      clearTimeout(gameData.moveTimerId);
      clearTimeout(gameData.forcingMoveTimerId);
      setScoreColor(null);
      bodyOnKeyDown();
    }, gameData.timeLimit);
  }


  function handleGameButtonClick(chosenColor) {
    updateScore(chosenColor);
    nextMove();
  }

  return (
    <div className='playfield'>
      <div className='score' style={{color: scoreColor}}>
        {score}
      </div>
      <ActionField
        figureColor={figureColor}
        gameData={gameData}
      />
      <Controllers
        colors={colors}
        figureColor={figureColor}
        handleGameButtonClick={handleGameButtonClick}
        handleStartButtonClick={handleStartButtonClick}
        isGameActive={gameData.active}
      />
    </div>
  );
}

export default Playfield;
