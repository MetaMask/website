// gatsby-browser.js
// Import the component at the top of the file
import React from 'react'
import ClientSideWrapper from './src/components/ClientSideWrapper'
import MetaMaskContextProvider from './src/Context/MetaMaskContextProvider'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export const wrapRootElement = ({ element }) => (
  <MetaMaskContextProvider>{element}</MetaMaskContextProvider>
)
