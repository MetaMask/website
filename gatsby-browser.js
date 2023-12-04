// gatsby-browser.js
// Import the component at the top of the file
import React from 'react'
import { withLDProvider } from 'launchdarkly-react-client-sdk'
import ClientSideWrapper from './src/components/ClientSideWrapper'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export default withLDProvider({
  clientSideID: process.env.GATSBY_LD_CLIENT_ID,
  context: {
    kind: 'user',
  },
})(wrapPageElement)
