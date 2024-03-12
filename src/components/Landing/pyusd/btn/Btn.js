import { MetaMaskContext } from '../../../../Context/MetaMaskContextProvider'
import * as styles from './btn.module.scss'
import React, { useContext } from 'react'

const Btn = ({
  href,
  hrefMMinstalled,
  target,
  rel,
  className,
  onClick,
  children,
}) => {
  const { isMetaMaskInstalled } = useContext(MetaMaskContext)

  if (!href) {
    return (
      <button className={`${styles.btn} ${className ?? ''}`} onClick={onClick}>
        {children}
      </button>
    )
  }

  return (
    <a
      href={isMetaMaskInstalled && hrefMMinstalled ? hrefMMinstalled : href}
      target={target}
      rel={rel}
      className={`${styles.btn} ${className ?? ''}`}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default Btn
