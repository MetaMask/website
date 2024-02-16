import * as styles from './header.module.scss'
import React from 'react'
import Btn from '../btn'

const Header = ({ title, btnLabel, btnLink }) => {
  return (
    <header className={`${styles.header} wrapper`}>
      <h1>
        <a href={btnLink} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h1>

      <Btn href={btnLink} target="_blank" rel="noopener noreferrer">
        {btnLabel}
      </Btn>
    </header>
  )
}

export default Header
