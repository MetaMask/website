import { useState, useEffect } from 'react'
import { persistDeveloper } from '../lib/utils/localStorage'

export const useMetamaskDetect = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

  useEffect(() => {
    // eip6963RequestProvider timed out
    const timeoutId = setTimeout(() => {
      setIsMetaMaskInstalled(false)
    }, 50)

    const checkMetaMask = ({ detail }) => {
      clearTimeout(timeoutId)

      const isMetaMask = detail?.info?.name === 'MetaMask'
      const isMetaMaskFlask = detail?.info?.name === 'MetaMask Flask'

      isMetaMask && setIsMetaMaskInstalled(isMetaMask)
      if (isMetaMaskFlask) {
        persistDeveloper()
      }
    }

    window.addEventListener('eip6963:announceProvider', checkMetaMask)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    return () =>
      window.removeEventListener('eip6963:announceProvider', checkMetaMask)
  }, [])

  return isMetaMaskInstalled
}
