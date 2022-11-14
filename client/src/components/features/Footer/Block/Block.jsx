import React from 'react'
import css from './Block.module.css'
import { NavLink } from 'react-router-dom';

const Block = ({ header, items }) => {
  return (
    <div className={css.block}>
      <h4 className={css.header}>{header}</h4>
      <ul className={css.list}>
        {items.map(r =>
          <li key={r.path} className={css.listItem}>
            {r.email 
              ? <a href={r.path}>{r.caption}</a>
              : <NavLink to={r.path}>{r.caption}</NavLink>
            }
          </li>
        )}
      </ul>
    </div>
  )
}

export default Block