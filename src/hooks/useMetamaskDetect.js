import { useState, useEffect, useRef } from 'react'

export function useMetamaskDetect() {
  const [isMetaMaskInstalled, _setIsMetaMaskInstalled] = useState(false)
  const isMetaMaskInstalledRef = useRef(isMetaMaskInstalled)

  const setIsMetaMaskInstalled = v => {
    isMetaMaskInstalledRef.current = v
    _setIsMetaMaskInstalled(v)
  }

  useEffect(() => {
    const checkMetaMask = ({ detail }) => {
      if (isMetaMaskInstalledRef.current) return
      setIsMetaMaskInstalled(detail?.info?.name === 'MetaMask')
    }

    window.addEventListener('eip6963:announceProvider', checkMetaMask)

    return () =>
      window.removeEventListener('eip6963:announceProvider', checkMetaMask)
  }, [])

  return isMetaMaskInstalled
}
