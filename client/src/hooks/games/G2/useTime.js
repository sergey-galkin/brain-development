import { useCallback, useReducer, useRef, useState } from "react";

export default function() {
  const timer = useRef({});
  const [count, setCount] = useState(0);

  const getTime = useCallback(() => {
    // setCount forces rerender even if time value wasn't changed.
    // this behavior important when, by the time stopTimer function invoked,
    // getTime function returns the same value as at previous invoke
    setCount(c => c + 1);

    const time = (Date.now() - timer.current.startTime) / 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const prefix = seconds < 10 ? '0' : '';
    return minutes + ':' + prefix + seconds;
  }, []);
  
  const launchTimer = useCallback(() => {
    clearInterval(timer.current.id);
    timer.current.finishTime = null;
    timer.current.startTime = Date.now();
    timer.current.id = setInterval(() => 
      dispatch({type: 'increment'})
    , 1000);
    
    return '0:00';
  }, []);

  const stopTimer = useCallback(() => {
    timer.current.finishTime = Date.now();
    clearInterval(timer.current.id);
    return getTime();
  }, []);

  const reducer = useCallback((state, action) => {
    switch (action.type) {
      case 'reset':
        return launchTimer();
      case 'increment':
        return getTime();
      case 'stop':
        return stopTimer();
      default:
        throw new Error('Unknown action type in "useTime" hook');
    }
  }, [])

  const [time, dispatch] = useReducer(reducer, '0:00');

  return [time, timer.current.startTime, timer.current.finishTime, dispatch];
}