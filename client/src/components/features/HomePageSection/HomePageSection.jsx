import React from 'react'
import css from './HomePageSection.module.css'
// import { config, useTransition, animated } from '@react-spring/web'
import Container from '../../common/Container/Container';


const Section = ({ header, text, pageIndex }) => {
  const classes = [css.section];
  return (
    <div className={classes.join(' ')}>
      <Container classesArr={[css.container]}>
        <h1 className={css.header}>{header}</h1>
        <ul className={[css.text, pageIndex ? '' : css.firstPage].join(' ')}>
          { text.map((item, i) => <li key={item}>{item}</li>) }
        </ul>
      </Container>
    </div>
  );
}

export default Section