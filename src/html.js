import PropTypes from 'prop-types'
import React from 'react'
import accessiBeScript from './lib/services/accessibe'
import livePersonScript from './lib/services/live-person'
import redirect from './lib/services/redirect'

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {this.props.headComponents}
          <script dangerouslySetInnerHTML={{ __html: redirect }} />
          {process.env.NODE_ENV === 'production' && (
            <script dangerouslySetInnerHTML={{ __html: livePersonScript }} />
          )}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
          {process.env.NODE_ENV === 'production' && (
            <script dangerouslySetInnerHTML={{ __html: accessiBeScript }} />
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
