import { useState, useEffect, useRef } from 'react'

export const useMetamaskDetect = () => {
  const [isMetaMaskInstalled, _setIsMetaMaskInstalled] = useState()
  const isMetaMaskInstalledRef = useRef(isMetaMaskInstalled)

  const setIsMetaMaskInstalled = v => {
    isMetaMaskInstalledRef.current = v
    _setIsMetaMaskInstalled(v)
  }

  useEffect(() => {
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
