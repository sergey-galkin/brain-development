import React from 'react'
import Container from '../../../common/Container/Container'
import css from './Header.module.css'

const Header = () => {
  return (
    <Container classesArr={[css.container]}>
      <header className={css.header}>
        <h1>ДОСТИЖЕНИЯ</h1>
      </header>
    </Container>
  )
}

export default Header