import * as styles from './freedom.module.scss'
import Picture from '../picture'
import React from 'react'
import Btn from '../btn'

const Freedom = ({ title, text, btnLabel, btnLink }) => {
  return (
    <section className={styles.freedom}>
      <Picture
        src="/images/landing/token-swap/freedom.png"
        alt="The freedom ofself-custody meets the safety of MetaMask"
        width={652}
        height={593}
        className={styles.left}
      />

      <div className={styles.right}>
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>

        <p>{text}</p>

        <Btn
          href={btnLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
        >
          {btnLabel}
        </Btn>
      </div>
    </section>
  )
}

export default Freedom
