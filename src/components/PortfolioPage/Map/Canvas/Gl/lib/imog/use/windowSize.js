import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import { observable } from '@nx-js/observer-util'

const windowSize = () => {
  const result = observable({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  const resize = () => {
    result.width = window.innerWidth
    result.height = window.innerHeight
  }

  IMOG.onSetup(() => {
    window.addEventListener('resize', resize, false)
  })
  IMOG.onDestroy(() => {
    window.removeEventListener('resize', resize, false)
  })

  return result
}

export default windowSize
