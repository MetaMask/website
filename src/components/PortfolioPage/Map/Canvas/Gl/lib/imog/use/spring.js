import _, { isFunction } from 'underscore'
import { observable, observe, unobserve } from '@nx-js/observer-util'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import Ticker from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/ticker'
import { clamp } from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'
import { Spring } from 'wobble'

export default (...args) => {
  let { friction } = args[0]
  friction = friction || 0.2
  const context = IMOG.getContext()
  const reactions = []
  const vars = _.without(_.keys(args[0]), 'friction')
  const cbs = args[0]

  const targets = _.object(vars, vars.map(() => 0))
  let computedFriction = false
  let _friction

  const results = observable(_.object(vars, vars.map(() => 0)))

  const tick = dt => {
    dt *= 1000
    dt = clamp(dt, 0, 50)
    if (!computedFriction) _friction = args[0].friction || friction
    _.each(vars, (key, val) => {
      results[key] += (targets[key] - results[key]) * _friction * dt * 0.16
    })
  }

  IMOG.onSetup(() => {
    _.each(vars, (key, val) => {
      results[key] = cbs[key](context.props, { context })
      reactions.push(
        observe(() => {
          targets[key] = cbs[key](context.props, { context })
        })
      )
    })

    if (isFunction(friction)) {
      computedFriction = true
      reactions.push(
        observe(() => {
          _friction = friction(context.props, { context })
        })
      )
    } else {
      _friction = friction
    }
    Ticker.add(tick)
  })

  IMOG.onDestroy(() => {
    Ticker.remove(tick)
    reactions.forEach(unobserve)
  })

  return results
}
