import React, { useMemo } from 'react'
import css from './Slab.module.css'
import * as Icons from '../../GameSlabIcons/collector'
import Achievements from '../Achievements/Achievements';

const Slab = ({data, difficulty, ...props}) => {
  const Icon = useMemo(() => Icons[data.id], []);
  return (
    <div className={css.container} {...props} >
      <Icon classesArr={[css.icon]} difficulty={difficulty} />
      <Achievements data={data} />
    </div>
  )
}

export default Slab
