import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'

/**
 * @name PortfolioLoader
 * @summary -
 * @description - Portfolio page - Loader
 */

const PortfolioHelmet = props => {
  const { showLoader, showIntro } = props

  const [viewportMeta, setViewportMeta] = useState(false)

  useEffect(() => {
    if (!showIntro && !showLoader) setViewportMeta(true)
  }, [showIntro, showLoader])

  return (
    <Helmet
      meta={
        viewportMeta
          ? [
              {
                name: 'viewport',
                content:
                  'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no',
              },
            ]
          : []
      }
      bodyAttributes={{
        class: 'disable-scroll',
      }}
      link={[{ rel: 'manifest', href: '/site.portfolio.webmanifest' }]}
    />
  )
}

export default PortfolioHelmet
