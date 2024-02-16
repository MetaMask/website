import * as styles from './multi-token.module.scss'
import Picture from '../picture'
import React from 'react'
import Btn from '../btn'

const MultiToken = ({ title, text, btnLabel, btnLink }) => {
  return (
    <section className={styles.multiToken}>
      <Picture
        src="/images/landing/get/multi-token.png"
        alt="Swap multiple tokens to one, in a single transaction"
        width={820}
        height={463}
        className={styles.img}
      />

      <h2>{title}</h2>

      <p>{text}</p>

      <Btn
        href={btnLink}
        target="_blank"
        rel="noopener"
        white={true}
        className={styles.btn}
      >
        {btnLabel}
      </Btn>
    </section>
  )
}

export default MultiToken
