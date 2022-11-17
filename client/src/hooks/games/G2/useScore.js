import { useCallback, useReducer } from "react";

export default function() {
  const update = useCallback(({timeDelta, difficulty, moves}) => {
    const minutes = timeDelta / (60*1000);
    const multiplier = 100000 * difficulty;
    return Math.round(multiplier / (minutes * (moves + 1)));
  }, []);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return null;
      case 'update':
        return update(action.payload);
      default:
        throw new Error('Unknown action type in "useScore" hook');
    }
  }, []);
  
  const [score, dispatch] = useReducer(reducer, null);

  return [score, dispatch];
}