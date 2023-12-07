import { isFunction } from 'underscore'
import { observable, observe } from '@nx-js/observer-util'
import { clamp } from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'

const wheel = ({
  active = true,
  min = -Infinity,
  max = +Infinity,
  mult = 1,
  domElement = window,
} = {}) => {
  const reactions = []

  const result = observable({
    y: 0,
    wheeling: false,
    active: false,
  })

  const context = IMOG.getContext()

  let timeOut = null
  const onWheel = ({ deltaY }) => {
    if (!result.active) return
    clearTimeout(timeOut)
    timeOut = setTimeout(() => {
      result.wheeling = false
    }, 100)
    result.wheeling = true
    result.y = clamp(result.y + deltaY * mult, min, max)
  }

  IMOG.onSetup(() => {
    if (isFunction(active)) {
      reactions.push(
        observe(() => {
          result.active = active(context.props, { context })
        })
      )
    } else {
      result.active = active
    }

    domElement.addEventListener('wheel', onWheel, false)
  })
  IMOG.onDestroy(() => {
    domElement.removeEventListener('wheel', onWheel, false)
  })

  return result
}

export default wheel
