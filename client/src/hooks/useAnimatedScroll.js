import { useRef, useState } from "react"

export default function useAnimatedScroll(initIndex, maxIndex, {animation, scrollEventsHandler}) {
  const [index, setIndex] = useState(initIndex);
  const [allowScroll, setAllowScroll] = useState(true);
  const page = useRef(index);
  
  const scroll = (delta) => {
    if (
      (page.current >= maxIndex && delta > 0) ||
      (page.current <= 0 && delta < 0)
    ) return;
    
    animation.close();
    setAllowScroll(false);
    scrollEventsHandler.current.remove();
    
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
      scrollEventsHandler.current.add();
    }, animation.duration * 2);
  }
  return [index, allowScroll, scroll];
}