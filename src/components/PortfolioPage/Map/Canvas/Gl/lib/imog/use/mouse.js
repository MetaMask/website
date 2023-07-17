import _, { isFunction } from 'underscore'
import { observable, observe, unobserve } from '@nx-js/observer-util'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'

export default ({ normalized = false, active = true } = {}) => {
  const reactions = []
  const result = observable({ x: 0, y: 0 })
  const context = IMOG.getContext()
  let _active

  const onMouseMove = event => {
    if (!_active) return
    const { clientX, clientY } = event.touches ? event.touches[0] : event
    const x = clientX - window.innerWidth / 2
    const y = -clientY + window.innerHeight / 2

    if (!normalized) {
      result.x = x
      result.y = y
    } else {
      result.x = x / window.innerWidth
      result.y = y / window.innerHeight
    }
  }

  IMOG.onSetup(() => {
    if (isFunction(active)) {
      reactions.push(
        observe(() => {
          _active = active(context.props, { context })
        })
      )
    } else {
      _active = active
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onMouseMove)
  })
  IMOG.onDestroy(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('touchmove', onMouseMove)
    reactions.forEach(unobserve)
  })

  return result
}
