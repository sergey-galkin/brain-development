import React, { forwardRef, useEffect } from 'react'
import CustomLink from '../CustomLink/CustomLink'
import css from './DropDownMenu.module.css'
import routes from '../../../../router/router'
import Authenticated from '../AuthMenu/Authenticated'
import Anonymous from '../AuthMenu/Anonymous'
import Container from '../../../common/Container/Container'
import { useSelector } from 'react-redux'
import { selectAuthData } from './authSlice'

const DropDownMenu = forwardRef(({ closeMenu, animate }, ref) => {
  const user = useSelector(selectAuthData);
  
  const UserMenu = user
    ? <Authenticated login={user.login} closeMenu={closeMenu} />
    : <Anonymous />
  ;

  const separator = <div className={css.separator} />
  
  useEffect(() => {
    animate();
  }, [])
  
  const headerRoutes = routes.filter(r => r.tags.includes('header'));

  return (
    <div ref={ref} className={css.menuHolder}>
      <Container classesArr={[css.container]}>
        <ul className={css.list}>
          {headerRoutes.map( route =>
            <li key={route.caption} onClick={closeMenu}>
              <CustomLink path={route.path}>{route.caption}</CustomLink>
            </li>
          )}
        </ul>
        { separator }
        { UserMenu }
      </Container>
    </div>
  )
})

export default DropDownMenu
