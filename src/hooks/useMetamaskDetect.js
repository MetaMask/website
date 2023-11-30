import { useState, useEffect } from 'react'
import { MetaMaskSDK } from '@metamask/sdk'

export function useMetamaskDetect(initialState = false) {
  const MMSDK = new MetaMaskSDK()
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(initialState)

  useEffect(() => {
    const checkMetaMask = ({ detail }) => {
      if (isMetaMaskInstalled) return
      setIsMetaMaskInstalled(detail?.info?.name === 'MetaMask')
    }

    window.addEventListener('eip6963:announceProvider', checkMetaMask)

    return () => {
      window.removeEventListener('eip6963:announceProvider', checkMetaMask)
    }
  }, [isMetaMaskInstalled])

  return isMetaMaskInstalled
}
