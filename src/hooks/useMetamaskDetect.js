import { useState, useEffect } from 'react'

export const useMetamaskDetect = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(null)

  useEffect(() => {
    // eip6963RequestProvider timed out
    const timeoutId = setTimeout(() => {
      setIsMetaMaskInstalled(false)
    }, 500)

    const checkMetaMask = ({ detail }) => {
      const isMetaMask = detail?.info?.name === 'MetaMask'

      clearTimeout(timeoutId)

      if (isMetaMask) {
        window.removeEventListener('eip6963:announceProvider', checkMetaMask)
      }

      setIsMetaMaskInstalled(isMetaMask)
    }

    window.addEventListener('eip6963:announceProvider', checkMetaMask)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    return () =>
      window.removeEventListener('eip6963:announceProvider', checkMetaMask)
  }, [])

  return isMetaMaskInstalled
}
