import * as styles from './hero.module.scss'
import React from 'react'

const Hero = ({ title, description, buttons }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
          <div className={styles.actions}>{buttons}</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
