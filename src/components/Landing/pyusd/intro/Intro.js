import * as styles from './intro.module.scss'
import Picture from '../../picture'
import React from 'react'
import Btn from '../btn'

const Intro = ({
  title,
  text,
  smallText,
  firstBtnLabel,
  firstBtnLink,
  alternativeLink,
  secondBtnLabel,
  secondBtnLink,
  sectionId,
}) => {
  return (
    <section id={sectionId} className={styles.intro}>
      <div className="wrapper">
        <div className={styles.left}>
          <h2>{title}</h2>

          <p>{text}</p>

          <small>{smallText}</small>

          <div className={styles.btnWrapper}>
            <Btn
              href={firstBtnLink}
              hrefMMinstalled={alternativeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {firstBtnLabel}
            </Btn>

            <a
              href={secondBtnLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.termsLink}
            >
              {secondBtnLabel}
            </a>
          </div>
        </div>

        <Picture
          src="/images/landing/pyusd/intro.png"
          alt="Metamask | PYUSD"
          width={1677}
          height={1167}
          className={styles.right}
        />
      </div>
    </section>
  )
}

export default Intro
