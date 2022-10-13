import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'
import css from './HomePage.module.css'
import { sectionsData } from '../../../meta_data/home_page/homePageMetaData'
import Section from '../../features/HomePageSection/HomePageSection';
import useAnimatedScroll from '../../../hooks/useAnimatedScroll';
import EventHandler from '../../../libs/EventHandler';
import StartDevelopmentButton from '../../features/Buttons/StartDevelopmentButton/StartDevelopmentButton';
import PageNavigationGroup from '../../features/PageNavigationGroup/PageNavigationGroup';


const HomePage = () => {
  const [topRef, topInView, topEntry] = useInView({ threshold: 0 })
  const [bottomRef, bottomInView, bottomEntry] = useInView({ threshold: 0 })
  const animationDuration = 500;
  const [styles, api] = useSpring(() => ({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      duration: animationDuration,
    }
  }))

  const animation = {
    close: () => api.start({ opacity: 0 }),
    open: () => api.start({ opacity: 1 }),
    duration: animationDuration,
  }

  const scrollEventsHandler = useRef(
    new EventHandler(
      document,
      {
        'wheel': handleMouseWheel,
        'keydown': handleScrollButtons,
      }
    )
  )

  const maxIndex = sectionsData.length
  const [index, allowScroll, scroll] = useAnimatedScroll(0, maxIndex, {animation, scrollEventsHandler});

  function handleMouseWheel(e) {
    const delta = e.deltaY > 0 ? 1 : -1;
    scroll(delta);
  }

  function handleScrollButtons(e) {
    const delta = getDelta(e);
    scroll(delta);
    
    function getDelta(event) {
      if (['ArrowDown', 'PageDown'].indexOf(event.code) > -1) return 1;
      if (['ArrowUp', 'PageUp'].indexOf(event.code) > -1) return -1;
      if (['End'].indexOf(event.code) > -1) return sectionsData.length;
      if (['Home'].indexOf(event.code) > -1) return -sectionsData.length;
      return 0;
    }
  }

  useEffect(() => {
    scrollEventsHandler.current.add();
    return () => {
      scrollEventsHandler.current.remove();
    }
  }, [])
  
  const sectionData = sectionsData[index];
  const navigationProps = {
    allowScroll: allowScroll,
    handleScroll: scroll,
    currentPageIndex: index,
    lastPageIndex: maxIndex,
    animationDuration: animation.duration,
    show: {top: topInView, bottom: bottomInView},
  }
  
  return (
    <div className={css.container}>
      <div ref={topRef} />
      <animated.div style={styles} className={css.sectionHolder}>
        { index !== maxIndex
          ? <Section {...sectionData} pageIndex={index} />
          : <StartDevelopmentButton animation={animation} />
        }
      </animated.div>
      <PageNavigationGroup {...navigationProps} direction={-1} />
      <PageNavigationGroup {...navigationProps} direction={1} />
      <div ref={bottomRef} />
    </div>
  );
}

export default HomePage;
