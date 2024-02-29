import * as styles from './leading.module.scss'
import React from 'react'
import Btn from '../btn'

const Leading = ({ title, text, btnLabel, btnLink }) => {
  return (
    <section className={styles.leading}>
      <p>{text}</p>

      <h2>{title}</h2>

      <Btn
        href={btnLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        {btnLabel}
      </Btn>
    </section>
  )
}

export default Leading
