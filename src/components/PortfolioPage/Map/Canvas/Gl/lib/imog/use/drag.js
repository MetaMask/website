import { isFunction } from 'underscore'
import { observable, observe, unobserve } from '@nx-js/observer-util'
import { clamp } from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import Ticker from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/ticker'
import { Spring } from 'wobble'

const springConfig = {
  stiffness: 1220,
  damping: 520,
  mass: 1,
}

export default ({
  active = true,
  bounds = { x: null, y: null },
  domElement = null,
} = {}) => {
  domElement = domElement || window

  const context = IMOG.getContext()
  const reactions = []

  let dragTouchOrigin = { x: 0, y: 0 }
  let dragValOrigin = { x: 0, y: 0 }

  const result = observable({
    dragging: false,
    x: 0,
    y: 0,
    originX: 0,
    originY: 0,
    bounds: isFunction(bounds) ? null : bounds,
    active: false,
  })

  const springX = new Spring({
    ...springConfig,
    fromValue: 0,
    toValue: 0,
  }).onUpdate(() => (result.x = springX.currentValue))
  const springY = new Spring({
    ...springConfig,
    fromValue: 0,
    toValue: 0,
  }).onUpdate(() => (result.y = springY.currentValue))

  let inertiaActive = false
  let velX = 0
  let velY = 0
  const inertiaDrag = 0.95
  const tick = dt => {
    dt *= 1000
    dt = clamp(dt, 0, 50)
    if (inertiaActive) {
      velX *= inertiaDrag
      velY *= inertiaDrag
      result.x += velX
      result.y += velY
      if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) {
        inertiaActive = false
      }
    }
  }

  IMOG.onSetup(() => {
    if (isFunction(bounds)) {
      reactions.push(
        observe(() => {
          result.bounds = bounds(context.props)
        })
      )
    }
    Ticker.add(tick)
  })

  IMOG.onDestroy(() => {
    reactions.forEach(unobserve)
    Ticker.remove(tick)
  })

  let isClick = true
  const onTouchStart = event => {
    if (!result.active) return
    isClick = true
    inertiaActive = false
    velX = 0
    velY = 0
    window.addEventListener('mousemove', onTouchMove)
    window.addEventListener('mouseup', onTouchEnd)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)

    const { pageX, pageY } = event.touches ? event.touches[0] : event
    dragTouchOrigin = { x: pageX, y: pageY }
    dragValOrigin = { x: 0, y: 0 }
    result.originX = dragTouchOrigin.x - window.innerWidth / 2
    result.originY = dragTouchOrigin.y - window.innerHeight / 2

    const diff = {
      x: 0,
      y: 0,
    }

    const x = result.bounds.x
      ? clamp(dragValOrigin.x - diff.x, result.bounds.x[0], result.bounds.x[1])
      : dragValOrigin.x - diff.x
    springX
      .updateConfig({ fromValue: x, toValue: x, initialVelocity: 0 })
      .stop()
    const y = result.bounds.y
      ? clamp(dragValOrigin.y + diff.y, result.bounds.y[0], result.bounds.y[1])
      : dragValOrigin.y + diff.y
    springY
      .updateConfig({ fromValue: y, toValue: y, initialVelocity: 0 })
      .stop()
    setTimeout(() => {
      springX.start()
      springY.start()
      result.x = x
      result.y = y
    })

    result.dragging = true
  }

  const onTouchMove = event => {
    isClick = false
    const { pageX, pageY } = event.touches ? event.touches[0] : event
    const current = { x: pageX, y: pageY }
    const diff = {
      x: current.x - dragTouchOrigin.x,
      y: current.y - dragTouchOrigin.y,
    }
    const x = result.bounds.x
      ? clamp(dragValOrigin.x - diff.x, result.bounds.x[0], result.bounds.x[1])
      : dragValOrigin.x - diff.x
    springX.updateConfig({ toValue: x }).start()
    const y = result.bounds.y
      ? clamp(dragValOrigin.y + diff.y, result.bounds.y[0], result.bounds.y[1])
      : dragValOrigin.y + diff.y
    springY.updateConfig({ toValue: y }).start()
  }

  const onTouchEnd = () => {
    result.dragging = false
    if (!isClick) {
      inertiaActive = true
      velX = springX.currentVelocity * 4
      velY = springY.currentVelocity * 4
      springX.stop()
      springY.stop()
    }
    window.removeEventListener('mousemove', onTouchMove)
    window.removeEventListener('mouseup', onTouchEnd)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
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

    domElement.addEventListener('mousedown', onTouchStart)
    domElement.addEventListener('touchstart', onTouchStart)
  })

  IMOG.onDestroy(() => {
    domElement.removeEventListener('mousedown', onTouchStart)
    window.removeEventListener('mousemove', onTouchMove)
    domElement.removeEventListener('mouseup', onTouchEnd)
    domElement.removeEventListener('touchstart', onTouchStart)
    window.removeEventListener('touchsmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  })

  const api = {
    setPosition({ x, y }) {
      result.x = x
      result.y = y
      springX
        .updateConfig({ fromValue: x, toValue: x, initialVelocity: 0 })
        .stop()
      springY
        .updateConfig({ fromValue: y, toValue: y, initialVelocity: 0 })
        .stop()
    },
  }

  return { result, api }
}
