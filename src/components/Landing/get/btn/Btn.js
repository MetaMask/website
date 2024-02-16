import * as styles from './btn.module.scss'
import React from 'react'

const Btn = ({ href, target, rel, className, stroke, white, children }) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${styles.btn} ${className ?? ''} ${
        stroke ? styles.stroke : ''
      } ${white ? styles.white : ''}`}
    >
      {children}
    </a>
  )
}

export default Btn
