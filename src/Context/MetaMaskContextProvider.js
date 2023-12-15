import React, { createContext } from 'react'
import { useMetamaskDetect } from '../hooks/useMetamaskDetect'

export const MetaMaskContext = createContext({
  isMetaMaskInstalled: undefined,
})

const MetaMaskContextProvider = ({ children }) => {
  const isMetaMaskInstalled = useMetamaskDetect()

  if (typeof isMetaMaskInstalled !== 'boolean') return

  return (
    <MetaMaskContext.Provider value={{ isMetaMaskInstalled }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
