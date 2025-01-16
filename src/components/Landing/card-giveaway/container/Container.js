import clsx from 'clsx'
import * as styles from './container.module.scss'
import React from 'react'

const Container = ({ width = 'narrow', children }) => {
  return (
    <section className={clsx(styles.container, styles[width])}>
      {children}
    </section>
  )
}

export default Container
