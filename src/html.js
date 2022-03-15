import PropTypes from 'prop-types'
import React from 'react'
import accessiBeScript from './lib/services/accessibe'
import linkedInTrackingScript from './lib/services/lintrk'
import livePersonScript from './lib/services/live-person'
import redirect from './lib/services/redirect'
import { useLocation } from '@reach/router'

export default class HTML extends React.Component {
  render() {
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      body,
      postBodyComponents,
    } = this.props

    let partnerId = '451393'
    let conversionId = ''
    const location = useLocation()
    const pathname = location.pathname
    const isInstitutions = pathname.includes('/institutions')
    if (isInstitutions) {
      partnerId = '4249353'
      conversionId = '7714137'
    }
    let linkedInPartnerId = '_linkedin_partner_id = "' + partnerId + '";'
    let linkedInEventPixel =
      '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=' +
      partnerId +
      (conversionId ? '&conversionId=' + conversionId : '') +
      '&fmt=gif"/>'

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
          {preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: linkedInPartnerId + linkedInTrackingScript,
            }}
          />
          <noscript dangerouslySetInnerHTML={{ __html: linkedInEventPixel }} />
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
        </body>
      </html>
    )
  }
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
