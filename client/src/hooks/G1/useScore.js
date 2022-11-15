import { useCallback, useReducer } from "react";

export default function (timer) {
  const initialState = {
    currentMove: 0,
    current: 0,
  };

  const update = useCallback((score, {figureIndex, chosenIndex, steps}) => {
    const timeDelta = Date.now() - timer.current.moveStartTime;
    const multiplier = chosenIndex === null 
      ? 0 : chosenIndex === figureIndex 
        ? 1 : -1
    ;
    const level = Math.ceil((steps + 1) / 5);
    const points = Math.round((timer.current.moveTimeLimit - timeDelta) * multiplier * level / 100);

    return {
      currentMove: points,
      current: score.current + points,
    }
  }, [])

  const resetCurrentMoveScore = useCallback(
    score => ({...score, currentMove: 0})
  , [])

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return initialState;
      case 'update':
        return update(state, action.payload);
      case 'reset current move score':
        return resetCurrentMoveScore(state);
      default:
        throw new Error('Unknown action type in "useScore" hook');
    }
  }, [])

  const [score, dispatch] = useReducer(reducer, initialState);

  return [score, dispatch]
}