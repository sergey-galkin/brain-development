import React, { memo, useEffect } from 'react'
import css from './Achievements.module.css'
import { useSpring, animated } from '@react-spring/web'

const Achievements = memo(({data}) => {
  // const colors = useMemo(() => ({
  //   red: data.level <= 0.7 ? 200 : data.level <= 0.8 ? 150 : data.level <= 0.9 ? 80 : 0,
  //   green: data.level >= 0.3 ? 200 : data.level >= 0.2 ? 150 : data.level >= 0.1 ? 80 : 0,
  // }), []);
  
  const colors = {
    red: data.level <= 0.7 ? 255 : data.level <= 0.8 ? 180 : data.level <= 0.9 ? 150 : 0,
    green: data.level >= 0.3 ? 255 : data.level >= 0.2 ? 180 : data.level >= 0.1 ? 150 : 0,
  };
  
  const [styles, api] = useSpring(() => ({
    from: {
      width: '0%',
      background: `rgb(200, 0, 0)`,
    },
    to: {
      width: `${data.level * 100}%`,
      background: `rgb(${colors.red}, ${colors.green}, 0)`
    },
    delay: 1000,
    config: {
      duration: 1000,
    }
  }))
  
  useEffect(() => {
    api.start()
  }, [])
  
  const bestResult = data.bestResult ? data.bestResult.toLocaleString() : '-';
  const gamesPlayed = data.gamesPlayed.toLocaleString();
  const level = Math.round(data.level * 100);
  
  return (
    <table className={css.table}>
      <tbody>
        <tr className={css.row}>
          <td className={css.name}>Лучший результат:</td>
          <td className={css.value}>{bestResult}</td>
        </tr>
        <tr className={css.row}>
          <td className={css.name}>Кол-во попыток:</td>
          <td className={css.value}>{gamesPlayed}</td>
        </tr>
        <tr className={css.row}>
          <td className={css.name}>Уровень:</td>
          <td className={css.value}>{level}%</td>
        </tr>
        <tr className={css.row}>
          <td colSpan={2} className={css.gradeContainer}>
            <animated.div style={styles} className={css.grade}/>
          </td>
        </tr>
      </tbody>
    </table>
  )
})

export default Achievements
