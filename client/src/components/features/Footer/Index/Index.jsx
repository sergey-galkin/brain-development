import React from 'react'
import css from './Index.module.css'
import routes from '../../../../router/router'
import Container from '../../../common/Container/Container'
import Block from '../Block/Block'

const Footer = () => {
  const navigationItems = routes.filter(r => r.tags.includes('footer'));
  const feedbackItems = [{
    path: 'mailto:support@brain-development.online',
    caption: 'e-mail: support@brain-development.online',
    email: true,
  }]

  return (
    <div className={css.footer}>
      <Container classesArr={[css.container]}>
        <Block header={'Разделы'} items={navigationItems}/>
        <Block header={'Обратная связь'} items={feedbackItems}/>
        <div className={css.copyright}>
          © {new Date().getFullYear()} brain-development.online
        </div>
      </Container>
    </div>
  )
}

export default Footer