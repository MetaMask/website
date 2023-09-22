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

  useEffect(() => {
    document.body.classList.add('disable-scroll', 'no-dark')

    return () => {
      document.body.classList.remove('disable-scroll', 'no-dark')
    }
  }, [])

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
      link={[{ rel: 'manifest', href: '/site.portfolio.webmanifest' }]}
    >
      <script src="https://www.youtube.com/iframe_api"></script>
    </Helmet>
  )
}

export default PortfolioHelmet
