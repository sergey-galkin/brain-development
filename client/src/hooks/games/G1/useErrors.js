import { useCallback, useReducer } from "react";

export default function () {
  const initialState = {
    current: 0,
    max: 3,
  };

  const update = useCallback((errors, {figureIndex, chosenIndex}) => {
    const newError = chosenIndex !== figureIndex ? 1 : 0;
    return {
      current: errors.current + newError,
      max: 3,
    }
  }, [])

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return initialState;
      case 'update':
        return update(state, action.payload);
      default:
        throw new Error('Unknown action type in "useErrors" hook');
    }
  }, [])

  const [errors, dispatch] = useReducer(reducer, initialState);

  return [errors, dispatch]
}