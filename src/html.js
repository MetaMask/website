import PropTypes from 'prop-types'
import React from 'react'
import accessiBeScript from './lib/services/accessibe'
import livePersonScript from './lib/services/live-person'
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
      </head>
      <body {...bodyAttributes}>
        {/* <MetaMaskProvider> */}
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
