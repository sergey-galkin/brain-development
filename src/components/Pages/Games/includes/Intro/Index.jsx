import React from 'react';
import Game1 from './Internals/Game1';
import css from './Index.module.css';

const Index = () => {
  return (
    <div className={css.intro}>
      <div className='contaiber'>
        <Game1/>
      </div>
    </div>
  );
}

export default Index;
