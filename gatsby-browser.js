// gatsby-browser.js
import React, { useEffect, useState } from 'react'
import ClientSideWrapper from './src/components/ClientSideWrapper'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import MetaMaskContextProvider from './src/Context/MetaMaskContextProvider'

require('prismjs/themes/prism.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')

const RootElement = ({ children }) => {
  const [LDProvider, setLDProvider] = useState(null)

  useEffect(() => {
    if (!process.env.GATSBY_LD_CLIENT_ID) {
      console.error('GATSBY_LD_CLIENT_ID is not defined')
      return null
    }

    asyncWithLDProvider({
      clientSideID: process.env.GATSBY_LD_CLIENT_ID,
      context: {
        kind: 'user',
        key: 'metamask-user',
      },
    }).then(Provider => {
      setLDProvider(() => Provider)
    })
  }, [])

  return (
    LDProvider && (
      <LDProvider>
        <MetaMaskContextProvider>{children}</MetaMaskContextProvider>
      </LDProvider>
    )
  )
}

export const wrapPageElement = ({ element, props }) => (
  <ClientSideWrapper {...props}>{element}</ClientSideWrapper>
)

export const wrapRootElement = ({ element }) => {
  return <RootElement>{element}</RootElement>
}
