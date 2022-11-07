import React, { useCallback, useState } from 'react'
import css from './PageNavigationGroup.module.css'
import LastPageButton from '../Buttons/SVGButtons/LastPageButton/LastPageButton';
import NextPageButton from '../Buttons/SVGButtons/NextPageButton/NextPageButton';

const PageNavigationGroup = ({allowScroll, handleScroll, currentPageIndex, lastPageIndex, direction, show}) => {
  const buttonsAmount = 2;
  const [buttonsPushedStatus, setButtonsPushedStatus] = useState(Array(buttonsAmount).fill(false));

  const handlePageButtonClick = useCallback((delta, buttonIndex) => {
    setButtonsPushedStatus((prev) => {
      const newStatuses = [...prev];
      newStatuses[buttonIndex] = true;
      return newStatuses;
    });
    
    setTimeout(() => {
      setButtonsPushedStatus(Array(buttonsAmount).fill(false));
    }, 150);

    handleScroll(delta);
  }, []);

  const groupClasses = [css.pageNavigationGroup];
  if (direction === -1) groupClasses.push(css.topGroup);
  else groupClasses.push(css.bottomGroup);
  if (
    (currentPageIndex === 0 && direction === -1) ||
    (currentPageIndex === lastPageIndex && direction === 1) ||
    (!show.top && direction === -1) ||
    (!show.bottom && direction === 1)
  ) {
    groupClasses.push(css.disabledBlock);
  }

  return (
    <div className={groupClasses.join(' ')}>
      <NextPageButton 
        classesArr={[buttonsPushedStatus[0] ? css.pushedButton : '']} 
        handleClick={() => allowScroll ? handlePageButtonClick(direction, 0) : null}
      />
      <LastPageButton 
        classesArr={[buttonsPushedStatus[1] ? css.pushedButton : '']} 
        handleClick={() => allowScroll ? handlePageButtonClick(direction * lastPageIndex, 1) : null}
      />
    </div>
  )
}

export default PageNavigationGroup