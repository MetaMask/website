import PropTypes from 'prop-types'
import React from 'react'
import accessiBeScript from './lib/services/accessibe'
import livePersonScript from './lib/services/live-person'
import checkThemeScript from './lib/services/thememode'
import redirect from './lib/services/redirect'
// import { MetaMaskProvider } from '@metamask/sdk-react'

const HTML = props => {
  const {
    htmlAttributes,
    headComponents,
    bodyAttributes,
    preBodyComponents,
    body,
    postBodyComponents,
  } = props

  return (
    <html {...htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {headComponents}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: redirect }}
        />
        <link
          rel="preload"
          href="/fonts/EuclidCircularB-Regular-WebXL.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/EuclidCircularB-Bold-WebXL.woff2"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-640x1136.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-750x1294.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-1242x2148.png"
          media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-1125x2436.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-1536x2048.png"
          media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-1668x2224.png"
          media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
        <link
          rel="apple-touch-startup-image"
          href="/images/splash/launch-2048x2732.png"
          media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)"
        />
      </head>
      <body {...bodyAttributes}>
        {/* <MetaMaskProvider> */}
        <script src="https://cmp.osano.com/AzZMxHTbQDOQD8c1J/a2e89f0e-f467-4542-bfea-30ea2c1a6648/osano.js"></script>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: checkThemeScript }}
        ></script>
        {preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {postBodyComponents}
        {process.env.NODE_ENV === 'production' && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: livePersonScript }}
            />
          ) && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: accessiBeScript }}
            />
          )}
        {/* </MetaMaskProvider> */}
      </body>
    </html>
  )
}

export default HTML

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
