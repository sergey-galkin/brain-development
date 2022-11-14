import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import css from './Index.module.css'
import axios from 'axios';
import Modal from '../../../Modal/Modal';
import GameResult from '../../../ModalChildren/G1/GameResult';
import { delayedOpen } from '../../../Modal/handlers';
import Container from '../../../../common/Container/Container';
import RectButton from '../../../Buttons/SVGButtons/G1/RectButton/RectButton';
import TriangleButton from '../../../Buttons/SVGButtons/G1/TriangleButton/TriangleButton';
import CrossButton from '../../../Buttons/SVGButtons/G1/CrossButton/CrossButton';
import CircleButton from '../../../Buttons/SVGButtons/G1/CircleButton/CircleButton';
import MainBackground from '../../../../common/MainBackground/MainBackground';
import GameMenu from '../GameMenu/GameMenu';
import Score from '../Score/Score';
import Controllers from '../Controllers/Controllers';

const G1 = ({ gameId }) => {
  const [modal, setModal] = useState(false);
  const [gameData, setGameData] = useState({
    active: false,
    gameOver: false,
    steps: 0,
    score: {
      currentMove: 0,
      current: 0,
      best: null,
      previousBest: null,
    },
    figureIndex: undefined,
    chosenIndex: undefined,
    errors: {
      current: 0,
      max: 3,
    },
    session: 0, // number of current game session, needed to know when update buttons positions
  });

  // general data that do not need to be stored in state
  const gd = useRef({
    startTime: null,
    moveStartTime: null,
    waitingNextMoveTimeLimit: 1000,
    moveTimeLimit: 2000 + 100,
    waitingNextMoveTimerId: null,
    moveTimerId: null,
  })
  
  // start game after background animation will finished
  const animationDuration = 1000;
  useEffect(() => {
    setTimeout(() => {
      // escaping double start
      clearTimeout(gd.current.waitingNextMoveTimerId);
      clearTimeout(gd.current.moveTimerId);

      startGame();
    }, animationDuration + 300);
  }, []);
  
  // if player pushed button clear timeouts, calculate errors, check game over,
  // calculate score, finish game or make next move
  useEffect(() => {
    if (gameData.chosenIndex === undefined) return;
    
    clearTimeout(gd.current.waitingNextMoveTimerId);
    clearTimeout(gd.current.moveTimerId);
    
    const errors = calcErrors();
    const isGameOver = errors.current === errors.max;
    const score = calcScore(isGameOver);
    const interMoveState = getInterMoveState();
    const gameOverState = isGameOver ? getGameOverState() : {};
    setGameData((prev) => ({
      ...prev,
      errors: {...errors},
      score: {...score},
      ...interMoveState,
      ...gameOverState,
    }))

    if (isGameOver) setTimeout(() => delayedOpen( () => setModal(true) ), 700);
    else scheduleNextMove();

  }, [gameData.chosenIndex]);

  function handleGameButtonClick(chosenIndex) {
    setGameData((prev) => {
      return {...prev, chosenIndex: chosenIndex}
    })
  }
  
  function calcErrors() {
    const errorsAmount = gameData.errors.current;
    const newErrorCount = gameData.chosenIndex !== gameData.figureIndex ? 1 : 0;
    return {
      ...gameData.errors,
      current: errorsAmount + newErrorCount,
    }
  }

  function calcScore(isGameOver) {
    const timeDelta = Date.now() - gd.current.moveStartTime;
    const multiplier = gameData.chosenIndex === null 
      ? 0 : gameData.chosenIndex === gameData.figureIndex 
        ? 1 : -1
    ;
    const level = Math.ceil((gameData.steps + 1) / 5);
    const points = Math.round((gd.current.moveTimeLimit - timeDelta) * multiplier * level / 100);

    const score = {
      ...gameData.score,
      currentMove: points,
      current: gameData.score.current + points,
    }

    if (isGameOver) {
      score.previousBest = score.best;
      if (score.current > score.best || score.best === null) {
        score.best = score.current;
      }
    }

    return score;
  }

  function getInterMoveState() {
    return {figureIndex: undefined, chosenIndex: undefined}
  }
  
  function getGameOverState() {
    return {
      gameOver: true,
    }
  }

  function scheduleNextMove() {
    const level = Math.ceil((gameData.steps + 1) / 5);
    const timeLimit = gd.current.waitingNextMoveTimeLimit + gd.current.moveTimeLimit - level * 100;
    gd.current.moveTimerId = setTimeout(handleGameButtonClick, timeLimit, null);
    gd.current.waitingNextMoveTimerId = setTimeout(() => {
      const newIndex = getRandomIndex();
      setGameData((prev) => {
        if (prev.gameOver) return {...prev}
        return {
          ...prev,
          steps: prev.steps + 1,
          figureIndex: newIndex, 
          score: {
            ...prev.score, 
            currentMove: 0,
          },
        }
      })
      
      gd.current.moveStartTime = Date.now();
    }, gd.current.waitingNextMoveTimeLimit);

    function getRandomIndex() {
      const controllersAmount = 4;
      return Math.round(Math.random() * (controllersAmount - 1));
    }
  }
  
  function startGame() {
    gd.current.startTime = Date.now();
    setGameData((prev) => ({
      ...prev,
      active: true,
      session: 1,
    }));
    scheduleNextMove();
  }

  function startNewGame() {
    const modalAnimationDuration = 100;
    setTimeout(() => {
      gd.current.startTime = Date.now();
      setGameData((prev) => ({
        ...prev,
        gameOver: false,
        score: {
          ...prev.score,
          currentMove: 0,
          current: 0,
        },
        errors: {
          current: 0,
          max: 3,
        },
        steps: 0,
        session: prev.session + 1,
      }));
      scheduleNextMove();
    }, modalAnimationDuration);
  }

  const buttons = useMemo(
    () => {
      const arr = [
        [RectButton, Math.random()],
        [TriangleButton, Math.random()],
        [CrossButton, Math.random()],
        [CircleButton, Math.random()],
      ]
      return arr.sort((a, b) => a[1] - b[1]);
    },
    [gameData.session]
  );

  const CurrentButton = useMemo(
    () => {
      if (gameData.figureIndex === undefined || gameData.figureIndex === null) return null;
      else return buttons[gameData.figureIndex][0];
    },
    [gameData.figureIndex]
  );

  return (
    <MainBackground animationDuration={animationDuration} >
      <Container classesArr={[css.container]}>
        <GameMenu steps={gameData.steps} errors={gameData.errors} />
        <Score score={gameData.score} />
        <div className={css.playfield}>
          {CurrentButton && <CurrentButton classesArr={[css.button]} />}
        </div>
        {gameData.active && 
          <Controllers 
            buttons={buttons} 
            figureIndex={gameData.figureIndex} 
            chosenIndex={gameData.chosenIndex} 
            handleGameButtonClick={handleGameButtonClick} 
          />
        }
      </Container>
      { modal &&
        <Modal header='Результаты' closeModal={() => setModal(false)}>
          <GameResult result={gameData.score} startNewGame={startNewGame} />
        </Modal>
      }
    </MainBackground>
  );
}

export default G1;
