import React from 'react'
import Container from '../../common/Container/Container'
import css from './Games.module.css'
import { getGamesData } from '../../../games_meta_data/gamesMetaData'
import GameSlab from '../../features/GameSlab/GameSlab'

const gameSlabData = Object.values( getGamesData() ).map((game) => {
  return {
    id: game.id,
    url: game.urls[0],
    description: game.description[0].internals,
  }
})

const Games = () => {
  return (
    <div className={css.containerHolder}>
      <Container stylesArr={[css.container]}>
        {
          gameSlabData.map((data) => <GameSlab key={data.id} {...data} />)
        }
      </Container>
    </div>
  )
}

export default Games