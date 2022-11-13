import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import EventHandler from '../../../../../libs/EventHandler';
import css from './Controllers.module.css'

const Controllers = ({buttons, figureIndex, handleGameButtonClick}) => {
  const [classes, setClasses] = useState(Array(4).fill(''));
  const currentIndex = useRef(figureIndex);
  
  // if figureIndex defined set keydown handler
  useEffect(() => {
    currentIndex.current = figureIndex;
    if (figureIndex > -1) digitsKeydownEH.add();
    else digitsKeydownEH.remove();
  }, [figureIndex]);

  const handleDigitButtons = useCallback((event) => {
    event = event || window.event;
    const codes = ['Digit1', 'Digit2', 'Digit3', 'Digit4'];
    const index = codes.indexOf(event.code);
    if (index > -1) handleClick(index);
  }, [])

  const digitsKeydownEH = useMemo( () => {
    return new EventHandler(
      document, { 'keydown': handleDigitButtons }
    )}
  , [])

  const handleClick = useCallback((i) => {
    const className = i === currentIndex.current ? css.right : css.wrong;
    const newClasses = Array(4).fill('')
    newClasses[i] = className;
    setClasses([...newClasses]);
    setTimeout(() => {
      setClasses(Array(4).fill(''));
    }, 500);
    handleGameButtonClick(i);
  }, [])

  return (
    <div className={css.buttonsHolder}>
      {buttons.map(([Button, random], i) => (
        <div key={random} className={css.buttonHolder}>
          <div className={css.hotKey}>{i + 1}</div>
          <Button
            classesArr={[css.button, classes[i]]}
            handleClick={() => figureIndex > -1 ? handleClick(i) : null}
          />
        </div>
      ))}
    </div>
  )
}

export default Controllers