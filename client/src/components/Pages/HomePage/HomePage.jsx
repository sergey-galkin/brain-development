import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer'
import { useSpring, animated } from '@react-spring/web'
import css from './HomePage.module.css'
import { sectionsData } from '../../../meta_data/home_page/homePageMetaData'
import Section from '../../features/HomePageSection/HomePageSection';
import useScroll from '../../../hooks/HomePage/useScroll';
import StartDevelopmentButton from '../../features/Buttons/CSSButtons/StartDevelopmentButton/StartDevelopmentButton';
import PageNavigationGroup from '../../features/PageNavigationGroup/PageNavigationGroup';
import MainBackground from '../../common/MainBackground/MainBackground';

const HomePage = () => {
  const [topRef, topInView] = useInView({ threshold: 0 })
  const [bottomRef, bottomInView] = useInView({ threshold: 0 })
  const [activeBG, setActiveBG] = useState(false);
  
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

  const maxIndex = sectionsData.length
  const [index, allowScroll, scroll] = useScroll(0, maxIndex, animation);

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
    <MainBackground classesArr={[activeBG ? css.activeBG : '']} >
      <div ref={topRef} />
      <animated.div style={styles} className={css.sectionHolder}>
        { index !== maxIndex
          ? <Section {...sectionData} pageIndex={index} />
          : <StartDevelopmentButton animation={animation} handleMouseOver={setActiveBG} />
        }
      </animated.div>
      <PageNavigationGroup {...navigationProps} direction={-1} />
      <PageNavigationGroup {...navigationProps} direction={1} />
      <div ref={bottomRef} />
    </MainBackground>
  );
}

export default HomePage;
