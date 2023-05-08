import { isChrome } from 'react-device-detect'

export default function isChromium() {
  const isChromium =
    navigator.userAgentData &&
    navigator.userAgentData.brands &&
    navigator.userAgentData.brands.some(brand => brand.brand === 'Chromium') &&
    !navigator.userAgentData.brands.some(brand =>
      brand.brand.includes('Chrome')
    )
  return isChrome && isChromium
}
