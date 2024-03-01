import clsx from 'clsx'
import React from 'react'
import * as styles from './supportedNetwork.module.scss'

const SupportedNetwork = () => {
  const networkList = [
    {
      id: 1,
      src: '/images/landing/network-logos/ethereum.jpg',
      alt: 'ethereum logo',
      large: true,
    },
    {
      id: 2,
      src: '/images/landing/network-logos/polygon.png',
      alt: 'polygon logo',
      large: true,
    },
    {
      id: 3,
      src: '/images/landing/network-logos/bnb-chain.png',
      alt: 'bnb chain logo',
    },
    {
      id: 4,
      src: '/images/landing/network-logos/avalanche.png',
      alt: 'avalanche logo',
      large: true,
    },
    {
      id: 5,
      src: '/images/landing/network-logos/optimism.png',
      alt: 'optimism logo',
    },
    {
      id: 6,
      src: '/images/landing/network-logos/arbitrum.png',
      alt: 'arbitrum logo',
      large: true,
    },
    {
      id: 7,
      src: '/images/landing/network-logos/linea.png',
      alt: 'linea logo',
    },
  ]

  return (
    <section className={clsx(styles.supportedNetwork)}>
      <div className={clsx(styles.wrapper, 'wrapper')}>
        <div>
          <h3 className={styles.title}>Supported Networks</h3>

          <div className={styles.listLogoWrapper}>
            <div className={styles.listLogo}>
              {networkList.map(p => (
                <img
                  className={clsx(styles.logo, { [styles.large]: p.large })}
                  key={p.id}
                  src={p.src}
                  alt={p.alt}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SupportedNetwork
