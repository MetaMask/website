import _, { isFunction, last } from 'underscore'
import { observable, observe, unobserve } from '@nx-js/observer-util'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import {
  clamp,
  lerp,
  map,
} from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'

export default ({
  normalized = false,
  active = true,
  domElement = null,
  min = -Infinity,
  max = Infinity,
  boundryMin = 0.3,
  boundryMax = 2,
} = {}) => {
  domElement = domElement || window
  const reactions = []
  const result = observable({
    factor: 1,
    centerX: 0,
    centerY: 0,
    pinching: false,
  })
  const context = IMOG.getContext()
  let _active

  const getLength = event => {
    const diffX = event.touches[1].clientX - event.touches[0].clientX
    const diffY = event.touches[1].clientY - event.touches[0].clientY
    return Math.sqrt(diffX * diffX + diffY * diffY)
  }

  const setCenter = event => {
    result.centerX =
      lerp(0.5, event.touches[0].clientX, event.touches[1].clientX) -
      window.innerWidth / 2
    result.centerY =
      -lerp(0.5, event.touches[0].clientY, event.touches[1].clientY) +
      window.innerHeight / 2
  }

  let lengthOrigin
  let factorOrigin

  const onTouchStart = event => {
    if (event.touches.length === 2) {
      result.pinching = true
    } else {
      result.pinching = false
      return
    }

    factorOrigin = result.factor
    lengthOrigin = getLength(event)

    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  const onTouchMove = event => {
    if (!_active) return

    if (event.touches.length === 2) result.pinching = true
    else result.pinching = false

    const currentLenght = getLength(event)
    const scaleDelta = currentLenght / lengthOrigin
    setCenter(event)

    let factor = factorOrigin * scaleDelta

    if (factor > max) {
      factor =
        clamp(factor, min, max) +
        Math.sin(
          (map(factor, max, max + boundryMax, 0, 1, true) * Math.PI) / 2
        ) *
          boundryMax
    } else if (factor < min) {
      factor =
        clamp(factor, min, max) +
        Math.sin(
          (map(factor, min, min - boundryMin, 0, -1, true) * Math.PI) / 2
        ) *
          boundryMin
    }

    result.factor = factor

    // const { clientX, clientY } = event;
    // const x = clientX -window.innerWidth / 2;
    // const y = -clientY +window.innerHeight / 2;

    // if (!normalized) {
    //   result.x = x;
    //   result.y = y;
    // } else {
    //   result.x = x /window.innerWidth;
    //   result.y = y /window.innerHeight;
    // }
  }

  const onTouchEnd = event => {
    if (event.touches.length !== 2) result.pinching = false
    else result.pinching = true

    if (!result.pinching) {
      result.factor = clamp(result.factor, min, max)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
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
    domElement.addEventListener('touchstart', onTouchStart)
  })
  IMOG.onDestroy(() => {
    domElement.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
    reactions.forEach(unobserve)
  })

  return result
}
