import * as styles from './geoblock-overlay.module.scss'
import React, { useEffect } from 'react'

const GeoblockOverlay = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('scroll-block')

    return () => {
      document.body.classList.remove('scroll-block')
    }
  }, [])

  return (
    <section className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  )
}

export default GeoblockOverlay
