import * as styles from './whySwap.module.scss'
import Picture from '../picture'
import React from 'react'
import clsx from 'clsx'

const whySwap = ({ bgColor }) => {
  const featureList = [
    {
      id: 1,
      title: 'Find competitive rates every time',
      description:
        'The swap feature ensures that you always have access to the largest selection of tokens and the most competitive prices by providing prices from multiple aggregators and individual market makers in one place.',
    },
    {
      id: 2,
      title: 'Reduced gas costs',
      description:
        'We pursue a different path to locate the best trade. Each route requires a varying amount of gas fees to execute the transaction. We source available quotes and determine which liquidity source is the most gas efficient for every trade.',
    },
    {
      id: 3,
      title: 'Fewer approvals',
      description:
        'You only need to approve each token once to gain access to all the available liquidity on DeFi, reducing time and gas costs.',
    },
    {
      id: 4,
      title: 'Slippage protection',
      description:
        'Large swaps are often subject to wild price swings when there is insufficient liquidity available on a particular DEX. When swapping with MetaMask Portfolio, orders are spread across virtually all DEXs to reduce slippage impact on the final price.',
    },
  ]

  return (
    <section className={clsx(styles.whySwap, [styles[bgColor]])}>
      <div className={clsx(styles.wrapper, 'wrapper')}>
        <div>
          <h3 className={styles.title}>Why Swap with MetaMask?</h3>

          <div className={styles.featureListWrapper}>
            <div className={styles.featureList}>
              {featureList.map(feature => (
                <div className={styles.featureCard} key={feature.id}>
                  <p className={styles.cardTitle}>{feature.title}</p>
                  <p className={styles.cardDescription}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Picture
        src="/images/landing/multitoken-swap/why-swap-left.png"
        alt="Swap multiple tokens to one, in a single transaction"
        width={592}
        height={2076}
        className={styles.sideImageLeft}
      />

      <Picture
        src="/images/landing/multitoken-swap/why-swap-right.png"
        alt="Swap multiple tokens to one, in a single transaction"
        width={933}
        height={1260}
        className={styles.sideImageRight}
      />
    </section>
  )
}

export default whySwap
