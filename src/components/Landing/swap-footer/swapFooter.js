import clsx from 'clsx'
import React from 'react'
import { Link } from 'gatsby'
import * as styles from './SwapFooter.module.scss'

const SwapFooter = () => {
  return (
    <section className={clsx(styles.swapFooter)}>
      <div className={clsx(styles.wrapper, 'wrapper')}>
        <div className={styles.innerWrapper}>
          <div className={styles.logo}>
            <img src="/images/mm-logo-white-text.svg" alt="metamask-logo" />
          </div>
          <div className={styles.navigationWrapper}>
            <div>
              <p className={styles.title}>ABOUT</p>
              <ul>
                <li>
                  <Link to="/download/">Download</Link>
                </li>
              </ul>
            </div>
            <div>
              <p className={styles.title}>LEGAL</p>
              <ul>
                <li>
                  <Link to="/privacy-policy/">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-of-use/">Terms of Use</Link>
                </li>
              </ul>
            </div>
          </div>
          <p className={styles.copyright}>
            © MetaMask 2024. A Consensys Formation.
          </p>
        </div>
      </div>
    </section>
  )
}

export default SwapFooter
