import React, { useCallback, useMemo } from 'react'
import css from './Slab.module.css'
import * as Icons from '../../GameSlabIcons/collector'
import Achievements from '../Achievements/Achievements';
import { getGameData } from '../../../../meta_data/games/gamesMetaData';
import { useNavigate } from 'react-router-dom';

const Slab = ({data, difficulty, ...props}) => {
  const Icon = useMemo(() => Icons[data.id], []);
  const url = useMemo(() => getGameData({id: data.id}).urls[0], []);
  const navigate = useNavigate();

  const navigateToGamePage = useCallback(() => navigate('/games/' + url), []);
  
  return (
    <div className={css.container} onClick={navigateToGamePage} {...props} >
      <Icon classesArr={[css.icon]} difficulty={difficulty} />
      <Achievements data={data} />
    </div>
  )
}

export default Slab
