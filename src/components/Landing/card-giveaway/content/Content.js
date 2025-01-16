import * as styles from './content.module.scss'
import React from 'react'

const Content = ({ children }) => {
  return <section className={styles.content}>{children}</section>
}

export default Content
