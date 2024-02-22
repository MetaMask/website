import * as styles from './intro.module.scss'
import Picture from '../picture'
import React from 'react'
import Btn from '../btn'

const Intro = ({
  title,
  firstBtnLabel,
  firstBtnLink,
  text,
  secondBtnLabel,
  secondBtnLink,
}) => {
  return (
    <section className={styles.intro}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.left}>
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>

          <Btn
            href={firstBtnLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.connect}
          >
            {firstBtnLabel}
          </Btn>

          <p>
            {text}
            <Btn
              href={secondBtnLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.download}
              stroke={true}
            >
              {secondBtnLabel}
            </Btn>
          </p>
        </div>

        <Picture
          src="/images/landing/multitoken-swap/intro.png"
          alt="Metamask Portfolio | Swaps"
          width={825}
          height={643}
          className={styles.right}
        />
      </div>
    </section>
  )
}

export default Intro
