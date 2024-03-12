import * as styles from './title-btn.module.scss'
import React from 'react'
import Btn from '../btn'

const TitleBtn = ({ title, btnLabel, btnLink, alternativeLink, sectionId }) => {
  return (
    <section id={sectionId} className={styles.titleBtn}>
      <h2>{title}</h2>

      <Btn
        href={btnLink}
        hrefMMinstalled={alternativeLink}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
      >
        {btnLabel}
      </Btn>
    </section>
  )
}

export default TitleBtn
