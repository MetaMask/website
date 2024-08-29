import React, { useEffect, createContext } from 'react'
import { useWalletDetect } from '../hooks/useWalletDetect'

export const MetaMaskContext = createContext({
  isMetaMaskInstalled: null,
  walletsInstalled: [],
})

const MetaMaskContextProvider = ({ children }) => {
  const { isMetaMaskInstalled, walletsInstalled } = useWalletDetect()

  useEffect(() => {
    if (walletsInstalled.length > 0) {
      window.dataLayer = window.dataLayer || []
      window.walletsInstalled = walletsInstalled.join(',')

      window.dataLayer.push({
        event: 'wallets_installed',
        wallets: window.walletsInstalled,
      })
    } else {
      window.walletsInstalled = 'None'
    }
  }, [walletsInstalled])

  useEffect(() => {
    if (typeof isMetaMaskInstalled === 'boolean')
      document.body.classList.add('visible')
  }, [isMetaMaskInstalled])

  return (
    <MetaMaskContext.Provider value={{ isMetaMaskInstalled, walletsInstalled }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
