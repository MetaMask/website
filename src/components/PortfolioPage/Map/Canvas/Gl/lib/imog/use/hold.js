import { observable } from '@nx-js/observer-util'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'

export default () => {
  const result = observable({ value: 0 })

  const onMouseUp = ({ pageX, pageY }) => {
    result.value = 0
    window.removeEventListener('mouseup', onMouseUp, false)
  }
  const onMouseDown = ({ pageX, pageY }) => {
    result.value = 1
    window.addEventListener('mouseup', onMouseUp, false)
  }

  IMOG.onSetup(() => {
    window.addEventListener('mousedown', onMouseDown, false)
  })
  IMOG.onDestroy(() => {
    window.removeEventListener('mousedown', onMouseDown, false)
    window.removeEventListener('mouseup', onMouseUp, false)
  })

  return result
}
