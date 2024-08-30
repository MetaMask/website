import { useState, useRef, useEffect } from 'react'
import { persistDeveloper } from '../lib/utils/localStorage'

export const useWalletDetect = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [walletsInstalled, setWalletsInstalled] = useState([])
  const wallets = useRef(new Set())

  useEffect(() => {
    // Check for Binance Chain Wallet until it supports EIP-6963
    if (window.BinanceChain) {
      wallets.current.add('BNB')
    }

    // eip6963RequestProvider timed out
    const timeoutId = setTimeout(() => {
      setIsMetaMaskInstalled(false)
    }, 50)

    const checkMetaMask = ({ detail }) => {
      clearTimeout(timeoutId)

      let name = detail?.info?.name

      if (name) {
        // Use less char for GTM event
        name = name.replace(' Wallet', '')

        wallets.current.add(name)
        setWalletsInstalled(Array.from(wallets.current))

        if (wallets.current.has('MetaMask')) {
          setIsMetaMaskInstalled(true)
        }

        if (wallets.current.has('MetaMask Flask')) {
          persistDeveloper()
        }
      }
    }

    window.addEventListener('eip6963:announceProvider', checkMetaMask)
    window.dispatchEvent(new Event('eip6963:requestProvider'))

    return () => {
      window.removeEventListener('eip6963:announceProvider', checkMetaMask)
      clearTimeout(timeoutId)
    }
  }, [])

  return { isMetaMaskInstalled, walletsInstalled }
}
