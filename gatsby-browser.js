// gatsby-browser.js
// Import the component at the top of the file
import React from 'react'
import { withLDProvider } from 'launchdarkly-react-client-sdk'
import ClientSideWrapper from './src/components/ClientSideWrapper'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => {
  return <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
}

export const wrapRootElement = ({ element }) => {
  // Check if the LaunchDarkly client ID is defined
  if (!process.env.GATSBY_LD_CLIENT_ID) {
    console.error('GATSBY_LD_CLIENT_ID is not defined')
    return element
  }

  const LDProvider = withLDProvider({
    clientSideID: process.env.GATSBY_LD_CLIENT_ID,
    context: {
      kind: 'user',
      key: 'metamask-user',
    },
  })(({ children }) => <>{children}</>)

  return <LDProvider>{element}</LDProvider>
}
