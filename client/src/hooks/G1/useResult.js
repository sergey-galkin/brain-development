import { useCallback, useReducer } from "react";

export default function () {
  const initialState = {
    best: null,
    previousBest: null,
  };

  const update = useCallback((result, current) => {
    const newResult = {
      ...result,
      previousBest: result.best,
    };
    if (current > newResult.best || newResult.best === null) {
      newResult.best = current;
    }

    return newResult;
  }, [])

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'update':
        return update(state, action.payload);
      default:
        throw new Error('Unknown action type in "useResult" hook');
    }
  }, [])

  const [result, dispatch] = useReducer(reducer, initialState);

  return [result, dispatch]
}