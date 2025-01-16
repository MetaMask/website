import LinkButton from '../link-button/LinkButton'
import * as styles from './banner.module.scss'
import React from 'react'

const Banner = ({ children, image }) => {
  return (
    <section className={styles.banner}>
      <div className={styles.imageWrapper}>{image}</div>
      <div className={styles.content}>{children}</div>
    </section>
  )
}

export default Banner
