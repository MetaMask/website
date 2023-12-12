// gatsby-browser.js
// Import the component at the top of the file
import React from 'react'
import { MetaMaskProvider } from '@metamask/sdk-react'
import ClientSideWrapper from './src/components/ClientSideWrapper'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export const wrapRootElement = ({ element }) => {
  return (
    <MetaMaskProvider
      sdkOptions={{
        dappMetadata: {
          name: 'MetaMask',
          url: window.location.origin,
        },
      }}
    >
      {element}
    </MetaMaskProvider>
  )
}
