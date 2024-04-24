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
    document.body.classList.add('disable-scroll')

    return () => {
      document.body.classList.remove('disable-scroll')
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
      <meta
        http-equiv="refresh"
        content="0; URL='https://portfolio.metamask.io'"
      />
      <script src="https://www.youtube.com/iframe_api"></script>
    </Helmet>
  )
}

export default PortfolioHelmet
