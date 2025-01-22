import * as styles from './link-button.module.scss'
import React from 'react'
import clsx from 'clsx'

const LinkButton = ({
  color = 'primary',
  href = '#',
  target = '_self',
  children = '',
}) => {
  return (
    <a
      href={href}
      target={target}
      className={clsx(styles.button, styles[color])}
    >
      {children}
    </a>
  )
}

export default LinkButton
