// gatsby-browser.js
import React from 'react'
import { withLDProvider } from 'launchdarkly-react-client-sdk'
import ClientSideWrapper from './src/components/ClientSideWrapper'
import MetaMaskContextProvider from './src/Context/MetaMaskContextProvider'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export const wrapRootElement = ({ element }) => {
  const clientSideID = process.env.GATSBY_LD_CLIENT_ID

  // Check if the LaunchDarkly client ID is defined
  if (!clientSideID) {
    console.error('GATSBY_LD_CLIENT_ID is not defined')
    return <MetaMaskContextProvider>{element}</MetaMaskContextProvider>
  }

  const LDProvider = withLDProvider({
    clientSideID,
    context: {
      kind: 'user',
      key: 'metamask-user',
    },
  })(({ children }) => <>{children}</>)

  return (
    <LDProvider>
      <MetaMaskContextProvider>{element}</MetaMaskContextProvider>
    </LDProvider>
  )
}
