import React, { useState, useEffect } from 'react'
import PreviewLoading from '../components/PreviewLoading'
import MetaMaskContextProvider from './MetaMaskContextProvider'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'

export const withLaunchDarkly = Component => {
  let LDProvider = null

  return props => {
    const [isLDReady, setLDReady] = useState(false)
    const id = Math.floor(Date.now() * Math.random()).toString(36)

    useEffect(() => {
      const fetchLDProvider = async () => {
        LDProvider = await asyncWithLDProvider({
          clientSideID: process.env.GATSBY_LD_CLIENT_ID,
          context: {
            kind: 'user',
            key: `metamask-user-${id}`,
          },
        })

        setLDReady(true)
      }

      fetchLDProvider()
    }, [])

    if (!isLDReady) {
      return <PreviewLoading />
    }

    return (
      <LDProvider>
        <MetaMaskContextProvider>
          <Component {...props} />
        </MetaMaskContextProvider>
      </LDProvider>
    )
  }
}
