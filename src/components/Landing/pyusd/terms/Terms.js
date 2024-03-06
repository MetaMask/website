import * as styles from './terms.module.scss'
import React from 'react'

const Terms = ({ text, sectionId }) => {
  return (
    <section id={sectionId} className={styles.terms}>
      <p dangerouslySetInnerHTML={{ __html: text }}></p>
    </section>
  )
}

export default Terms
