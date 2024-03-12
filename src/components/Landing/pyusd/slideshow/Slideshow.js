import * as styles from './slideshow.module.scss'
import React, { useState } from 'react'
import Picture from '../../picture'
import Btn from '../btn'

const Slideshow = ({ title, text, items, sectionId }) => {
  const [index, setIndex] = useState(0)

  const next = () => {
    if (index < items.length - 1) setIndex(index + 1)
  }

  const prev = () => {
    if (index > 0) setIndex(index - 1)
  }

  return (
    <section id={sectionId} className={styles.slideshow}>
      <h2>{title}</h2>
      <span>{text}</span>

      <div className={styles.list}>
        <div className={styles.item}>
          <Picture
            src={`/images/landing/pyusd/step-${index + 1}.svg`}
            alt={title}
            width={336}
            height={674}
            className={styles.left}
          />

          <div className={styles.right}>
            <span className={styles.steps}>Step {index + 1}/5</span>
            <p dangerouslySetInnerHTML={{ __html: items[index].text }}></p>

            <div className={styles.btnWrapper}>
              <Btn
                className={`${styles.prev} ${index === 0 && styles.disabled}`}
                onClick={prev}
              >
                Prev
              </Btn>
              <Btn
                className={`${styles.next} ${index === items.length - 1 &&
                  styles.disabled}`}
                onClick={next}
              >
                Next
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Slideshow
