import React, { useEffect, createContext } from 'react'
import { useMetamaskDetect } from '../hooks/useMetamaskDetect'

export const MetaMaskContext = createContext({
  isMetaMaskInstalled: null,
})

const MetaMaskContextProvider = ({ children }) => {
  const isMetaMaskInstalled = useMetamaskDetect()

  useEffect(() => {
    if (typeof isMetaMaskInstalled === 'boolean')
      document.body.classList.add('visible')
  }, [isMetaMaskInstalled])

  return (
    <MetaMaskContext.Provider value={{ isMetaMaskInstalled }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
