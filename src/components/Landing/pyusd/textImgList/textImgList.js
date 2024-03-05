import * as styles from './text-img-list.module.scss'
import Picture from '../../picture'
import React from 'react'

const TextImgList = ({ items, sectionId }) => {
  return (
    <section id={sectionId} className={styles.textImgList}>
      <img
        src="/images/landing/pyusd/background.svg"
        alt="background"
        className={styles.background}
      />

      <ul className={`${styles.list} wrapper`}>
        {items.map(({ title, text, img }, index) => (
          <li key={index}>
            <div className={styles.left}>
              <h3>{title}</h3>

              <p>{text}</p>
            </div>

            <Picture {...img} alt={title} className={styles.right} />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default TextImgList
