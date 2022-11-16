import React, { useState, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import css from './Index.module.css'
import GameResult from '../../../ModalChildren/GameResult/GameResult';
import Container from '../../../../common/Container/Container';
import RectButton from '../../../Buttons/SVGButtons/G1/RectButton/RectButton';
import TriangleButton from '../../../Buttons/SVGButtons/G1/TriangleButton/TriangleButton';
import CrossButton from '../../../Buttons/SVGButtons/G1/CrossButton/CrossButton';
import CircleButton from '../../../Buttons/SVGButtons/G1/CircleButton/CircleButton';
import MainBackground from '../../../../common/MainBackground/MainBackground';
import GameMenu from '../GameMenu/GameMenu';
import Score from '../Score/Score';
import Controllers from '../Controllers/Controllers';
import useErrors from '../../../../../hooks/G1/useErrors';
import useScore from '../../../../../hooks/G1/useScore';
import useResult from '../../../../../hooks/G1/useResult';
import { ModalContext } from '../../../../../context/context';

const G1 = ({ gameId }) => {
  const { update: updateModal } = useContext(ModalContext);
  const timer = useRef({
    startTime: null,
    moveStartTime: null,
    waitingNextMoveTimeLimit: 1000,
    moveTimeLimit: 2000 + 100,
    waitingNextMoveTimerId: null,
    moveTimerId: null,
  })
  const [active, setActive] = useState(false);
  const [session, setSession] = useState(0); // number of current game session, needed to know when update buttons positions
  const [steps, setSteps] = useState(0);
  const [figureIndex, setFigureIndex] = useState(undefined);
  const [chosenIndex, setChosenIndex] = useState(undefined);
  const [errors, errorsDispatch] = useErrors();
  const [score, scoreDispatch] = useScore(timer);
  const [result, resultDispatch] = useResult();
  const [gameOver, setGameOver] = useState(false);
  
  // start game after background animation will finished
  const animationDuration = 1000;
  useEffect(() => {
    setTimeout(() => {
      // escaping double start
      clearTimeout(timer.current.waitingNextMoveTimerId);
      clearTimeout(timer.current.moveTimerId);

      startGame();
    }, animationDuration + 300);
  }, []);
  
  // if player pushed button, then clear timeouts, calculate errors, 
  // calculate score, schedule next move
  useEffect(() => {
    if (chosenIndex === undefined) return;
    
    clearTimeout(timer.current.moveTimerId);
    
    errorsDispatch({type: 'update', payload: {figureIndex, chosenIndex}});
    scoreDispatch({type: 'update', payload: {figureIndex, chosenIndex, steps}});
    setFigureIndex(undefined);
    setChosenIndex(undefined);
    scheduleNextMove();
  }, [chosenIndex]);

  // if errors limit is over, then clear timeouts and finish game
  useEffect(() => {
    if (errors.current !== errors.max) return;
    
    clearTimeout(timer.current.waitingNextMoveTimerId);
    clearTimeout(timer.current.moveTimerId);

    setGameOver(true);
  }, [errors.current]);

  // if game is over, then set result
  useEffect(() => {
    if (!gameOver) return;
    resultDispatch({type: 'update', payload: score.current});
  }, [gameOver]);
  
  // if game is over and result updated, then show modal
  useEffect(() => {
    if (!gameOver) return;
    
    updateModal({
      visible: true,
      header: 'Результаты',
      children: <GameResult result={{...result, ...score}} startNewGame={startNewGame} />,
    })
  }, [result]);

  const handleGameButtonClick = useCallback((chosenIndex) => {
    setChosenIndex(chosenIndex);
  }, [])
  
  const scheduleNextMove = useCallback(() => {
    const level = Math.ceil((steps + 1) / 5);
    const timeLimit = timer.current.waitingNextMoveTimeLimit + timer.current.moveTimeLimit - level * 100;
    timer.current.moveTimerId = setTimeout(handleGameButtonClick, timeLimit, null);
    timer.current.waitingNextMoveTimerId = setTimeout(() => {
      const newIndex = getRandomIndex();
      
      setSteps(p => p + 1);
      scoreDispatch({type: 'reset current move score'});
      setFigureIndex(newIndex);
      
      timer.current.moveStartTime = Date.now();
    }, timer.current.waitingNextMoveTimeLimit);

    function getRandomIndex() {
      const controllersAmount = 4;
      return Math.round(Math.random() * (controllersAmount - 1));
    }
  }, [])
  
  const startGame = useCallback(() => {
    timer.current.startTime = Date.now();
    setActive(true);
    setSession(p => p + 1);
    scheduleNextMove();
  }, [])

  const startNewGame = useCallback(() => {
    const modalAnimationDuration = 100;
    setTimeout(() => {
      timer.current.startTime = Date.now();

      setSteps(0);
      setSession(p => p + 1);
      errorsDispatch({type: 'reset'});
      scoreDispatch({type: 'reset'});
      setGameOver(false);
      scheduleNextMove();

    }, modalAnimationDuration);
  }, [])

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
    [session]
  );

  const CurrentButton = useMemo(
    () => {
      if (figureIndex === undefined || figureIndex === null) return null;
      else return buttons[figureIndex][0];
    },
    [figureIndex]
  );

  return (
    <MainBackground animationDuration={animationDuration} >
      <Container classesArr={[css.container]}>
        <GameMenu steps={steps} errors={errors} />
        <Score score={score} />
        <div className={css.playfield}>
          {CurrentButton && <CurrentButton classesArr={[css.button]} />}
        </div>
        {active && 
          <Controllers 
            buttons={buttons} 
            figureIndex={figureIndex} 
            chosenIndex={chosenIndex} 
            handleGameButtonClick={handleGameButtonClick} 
          />
        }
      </Container>
    </MainBackground>
  );
}

export default G1;
