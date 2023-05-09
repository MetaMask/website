import { useEffect, useState } from 'react'
import { isChrome } from 'react-device-detect'

export default function useIsChromium() {
  const [isChromium, setIsChromium] = useState(false)

  useEffect(() => {
    if (
      window.navigator &&
      navigator.userAgentData &&
      navigator.userAgentData.brands &&
      navigator.userAgentData.brands.some(
        brand => brand.brand === 'Chromium'
      ) &&
      !navigator.userAgentData.brands.some(brand =>
        brand.brand.includes('Chrome')
      )
    ) {
      setIsChromium(true)
    }
  }, [])
  return isChrome && isChromium
}
