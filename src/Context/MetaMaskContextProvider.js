import React, { createContext } from 'react'
import { useMetamaskDetect } from '../hooks/useMetamaskDetect'

export const MetaMaskContext = createContext({
  isMetaMaskInstalled: false,
})

const MetaMaskContextProvider = ({ children }) => {
  const isMetaMaskInstalled = useMetamaskDetect()

  return (
    <MetaMaskContext.Provider value={{ isMetaMaskInstalled }}>
      {children}
    </MetaMaskContext.Provider>
  )
}

export default MetaMaskContextProvider
