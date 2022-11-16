import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import EventHandler from "../../libs/EventHandler";

export default function (initIndex, maxIndex, animation) {
  const [index, setIndex] = useState(initIndex);
  const [allowScroll, setAllowScroll] = useState(true);
  const page = useRef(index);

  const scroll = useCallback((delta) => {
    if (
      (page.current >= maxIndex && delta > 0) ||
      (page.current <= 0 && delta < 0)
    ) return;
    
    animation.close();
    setAllowScroll(false);
    scrollEventsHandler.remove();
    
    setTimeout(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + delta;
        if (newIndex > maxIndex) page.current = maxIndex;
        else if (newIndex < 0) page.current = 0;
        else page.current = newIndex;
        
        animation.open();
        return page.current;
      })
    }, animation.duration);
    
    setTimeout(() => {
      setAllowScroll(true);
      scrollEventsHandler.add();
    }, animation.duration * 2);
  }, [])

  const handleMouseWheel = useCallback((event) => {
    const delta = event.deltaY > 0 ? 1 : -1;
    scroll(delta);
  }, [])

  const handleScrollButtons = useCallback((e) => {
    const delta = getDelta(e);
    if (delta) scroll(delta);
    
    function getDelta(event) {
      if (['ArrowDown', 'PageDown'].indexOf(event.code) > -1) return 1;
      if (['ArrowUp', 'PageUp'].indexOf(event.code) > -1) return -1;
      if (['End'].indexOf(event.code) > -1) return maxIndex;
      if (['Home'].indexOf(event.code) > -1) return -maxIndex;
      return 0;
    }
  }, [])

  const scrollEventsHandler = useMemo(() =>
    new EventHandler(
      document,
      {
        'wheel': handleMouseWheel,
        'keydown': handleScrollButtons,
      }
    )
  , [])

  useEffect(() => {
    scrollEventsHandler.add();
    return () => {
      scrollEventsHandler.remove();
    }
  }, [])

  return [index, allowScroll, scroll];
}