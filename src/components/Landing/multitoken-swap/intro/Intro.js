import * as styles from './intro.module.scss'
import Picture from '../picture'
import React from 'react'
import Btn from '../btn'
import clsx from 'clsx'

const Intro = ({
  title,
  subTitle,
  description,
  firstBtnLabel,
  firstBtnLink,
  text,
  secondBtnLabel,
  secondBtnLink,
  bgColor,
  sectionId,
}) => {
  return (
    <section id={sectionId} className={clsx(styles.intro, [styles[bgColor]])}>
      <div className={`${styles.wrapper} wrapper`}>
        <div className={styles.left}>
          <div className={styles.titleWrapper}>
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            {subTitle && (
              <h3
                className={styles.subTitle}
                dangerouslySetInnerHTML={{ __html: subTitle }}
              />
            )}
          </div>
          {description && (
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
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
            {secondBtnLabel && (
              <Btn
                href={secondBtnLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.download}
                stroke={true}
              >
                {secondBtnLabel}
              </Btn>
            )}
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
