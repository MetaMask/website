import * as styles from './picture.module.scss'
import React from 'react'

const Picture = ({ src, alt, width, height, fit, className, lazy = true }) => {
  const pb = ((height / width) * 100).toFixed(2)

  return (
    <div
      className={`${styles.wrapper} ${fit ? styles[fit] : ''} ${className ??
        ''}`}
      style={{ '--pb': `${pb}%` }}
    >
      <picture>
        <source srcSet={src.replace(/\.[^.]+$/, '.avif')} type="image/avif" />
        <source srcSet={src.replace(/\.[^.]+$/, '.webp')} type="image/webp" />

        <img
          src={src}
          alt={alt}
          draggable="false"
          decoding="async"
          loading={lazy ? 'lazy' : 'eager'}
        />
      </picture>
    </div>
  )
}

export default Picture
