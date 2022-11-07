import { useCallback, useMemo, useReducer, useRef } from "react";

export default function() {
  const timer = useRef({});

  const getTime = useCallback(() => {
    const time = (Date.now() - timer.current.startTime) / 1000;
    const minutes = Math.floor(time / 60);
    const seconds = Math.round(time % 60);
    const prefix = seconds < 10 ? '0' : '';
    return minutes + ':' + prefix + seconds;
  }, []);
  
  const initialTime = useMemo(() => '0:00', []);

  const launchTimer = useCallback(() => {
    clearInterval(timer.current.id);
    timer.current.startTime = Date.now();
    timer.current.id = setInterval(() => 
      dispatch({type: 'increment'})
    , 1000);
    
    return initialTime;
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

  const [time, dispatch] = useReducer(reducer, initialTime);

  return [time, timer.current.startTime, timer.current.finishTime, dispatch];
}