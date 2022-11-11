import { useCallback, useReducer } from "react";

export default function() {
  const createResultArray = useCallback(() => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      result.push({
        current: null,
        best: null,
        previousBest: null,
      })
    }
    return result;
  }, []);

  const cloneResult = useCallback((result) => {
    const clone = [];
    result.forEach(r => clone.push({...r}));
    return clone;
  }, []);

  const update = useCallback((result, {timeDelta, difficulty, moves}) => {
    const clone = cloneResult(result);
    const index = difficulty - 1;
    const gameResult = clone[index];
    const minutes = timeDelta / (60*1000);
    const multiplier = 100000;
    gameResult.current = Math.round(multiplier / (minutes * (moves + 1)));
    gameResult.previousBest = gameResult.best;
    
    if (!gameResult.best || gameResult.current > gameResult.best) {
      gameResult.best = gameResult.current;
    }
    // dispatch(updateGameStat({
    //   id: data.id,
    //   result: result,
    //   gamesPlayed: gamesPlayed,
    //   level: level,
    // }))

    return clone;
  }, []);

  const reset = useCallback((result, difficulty) => {
    const clone = cloneResult(result);
    const index = difficulty - 1;
    clone[index].current = null;
    return clone;
  }, []);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return reset(state, action.payload);
      case 'update':
        return update(state, action.payload);
      default:
        throw new Error('Unknown action type in "useResult" hook');
    }
  }, []);
  
  const [result, dispatch] = useReducer(reducer, createResultArray());

  return [result, dispatch];
}