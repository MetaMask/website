import {
  difference,
  each,
  isArray,
  isObject,
  isFunction,
  last,
  mapObject,
  without,
} from 'underscore'
import {
  observable,
  observe,
  unobserve,
  // isObservable,
} from '@nx-js/observer-util'

import { EventBus } from 'light-event-bus'
import { Ticker } from './ticker'

const eventBus = new EventBus()

// IMOG stats

const stats = {
  components: {
    created: 0,
  },
  hooks: {
    activeWhiles: 0,
  },
}

// IMOG internal ticker and schedulers

let ticker
if (!(process.env.isNuxt && !process.client)) {
  ticker = new Ticker()
  ticker.addLabel('propWhileHook')
  ticker.addLabel('propUpdate')
  ticker.addLabel('propHooks')
  ticker.addLabel('propCopyToPrev')
  ticker.addLabel('render')
  ticker.addLabel('afterRender')
  const propUpdateScheduler = new Set()
  ticker.add(
    () => propUpdateScheduler.forEach(reaction => reaction()),
    'propUpdate'
  )
}

// IMOG internal references

const classes = []
let components = []
const plugins = []
const currentContext = []
const onSetupHooks = new Map()
const onDestroyHooks = new Map()

// IMOG lifecycle Hooks

const onSetup = cb => {
  const context = last(currentContext)
  if (!context) {
    console.warn('onSetup needs to be called within the setup context')
  }
  let hooks = onSetupHooks.get(context)
  if (!hooks) {
    hooks = []
  }
  hooks.push(cb)
  onSetupHooks.set(context, hooks)
}

export { onSetup }

const onDestroy = cb => {
  const context = last(currentContext)
  if (!context) {
    console.warn('onDestroy needs to be called within the setup context')
  }
  let hooks = onDestroyHooks.get(context)
  if (!hooks) {
    hooks = []
  }
  hooks.push(cb)
  onDestroyHooks.set(context, hooks)
}

export { onDestroy }

const getContext = cb => {
  return last(currentContext)
}

export { getContext }

// Hooks

const hookApplier = {
  set({ ctx, prop, cb, prevValue }) {
    cb.call(ctx, ctx.props[prop], prevValue)
  },
  on({ ctx, prop, cb }) {
    if (ctx.props[prop] === true) {
      cb.call(ctx, ctx.props[prop])
    }
  },
  off({ ctx, prop, cb }) {
    if (ctx.props[prop] === false) {
      cb.call(ctx, ctx.props[prop])
    }
  },
  while({ ctx, prop, cb, prevValue }) {
    if (ctx.props[prop] === true) {
      stats.hooks.activeWhiles++
      ctx._ticks = [...ctx._ticks, cb]
      ticker.addFixed(cb, 'propWhileHook')
    } else if (prevValue === true) {
      stats.hooks.activeWhiles--
      ctx._ticks = without(ctx._ticks, cb)
      ticker.removeFixed(cb, 'propWhileHook')
    }
  },
  add({ ctx, prop, cb, prevValue, settingUp = false }) {
    if (!isArray(ctx.props[prop])) {
      return
    }
    if (!isArray(prevValue)) {
      prevValue = []
    }
    const currentIds = ctx.props[prop].map(o => o.id)
    const prevIds = prevValue.map(o => o.id)
    const addedIds = settingUp ? currentIds : difference(currentIds, prevIds)
    addedIds.forEach(id => {
      const added = ctx.props[prop].find(item => item.id === id)
      cb(added)
    })
  },
  remove() {
    // // !! make sure that calling cb doesn't add dependencies to observe
    //
    // const currentIds = this.props[propKey].map((o) => o.id);
    // const prevIds = this._prevProps[propKey].map((o) => o.id);
    // const removedIds = _.difference(prevIds, currentIds);
    // removedIds.forEach((id) => {
    //   cb(this._prevProps[propKey].find((item) => item.id === id));
    // });
    // // !! reafctor this with scheduler
    // setTimeout(() => (this._prevProps[propKey] = this.props[propKey]));
  },
}

// IMOG Component
const Component = (
  className,
  {
    mixins = [],
    options = {},
    props = () => {
      return {}
    },
    setup = function() {},
    destroy = function() {},
    render = null,
    afterRender = null,
    hooks = {},
    on = {},
    methods = {},
  } = {}
) => {
  const defaults = {
    options: Object.assign.apply({}, [
      ...mixins.map(m => m.options || {}),
      options,
    ]),
    props: function(...args) {
      const ctx = this
      return Object.assign.apply({}, [
        ...mixins.map(m => (m.props ? m.props.apply(ctx, args) : {})),
        props.apply(ctx, args),
      ])
    },
    hooks: { ...hooks },
    methods: { ...methods },
  }
  mixins.forEach(mixin => {
    if (mixin.methods) {
      each(mixin.methods, (method, key) => {
        if (defaults.methods[key]) {
          const origin = defaults.methods[key]
          defaults.methods[key] = function(...args) {
            origin.call(this, ...args)
            method.call(this, ...args)
          }
        } else {
          defaults.methods[key] = method
        }
      })
    }
    if (mixin.hooks) {
      each(mixin.hooks, (hook, key) => {
        if (defaults.hooks[key]) {
          const origin = defaults.hooks[key]
          defaults.hooks[key] = function(...args) {
            origin.call(this, ...args)
            hook.call(this, ...args)
          }
        } else {
          defaults.hooks[key] = hook
        }
      })
    }
  })

  const Component = class {
    constructor({
      //
      options = {},
      props = {},
    } = {}) {
      currentContext.push(this)
      const ctx = this
      components.push(this)
      this.id = stats.components.created++
      this.className = className

      // plugins
      plugins.forEach(({ name, val }) => {
        Component.prototype['$' + name] = val
      })

      // options
      this.options = { ...defaults.options, ...options }

      // private stuff
      this._computeReactions = {}
      this._hookReactions = []
      this._ticks = []
      this._settingUp = true
      this._destroyed = false
      this._prevProps = {
        ...defaults.props.call(this, { options: this.options, ctx: this }),
        ...props,
      }
      this._subscriptions = []

      const hooksByProp = {}
      Object.entries(defaults.hooks).forEach(([key, cb]) => {
        const [hookType, propKey] = key.split(':')
        if (!hooksByProp[propKey]) {
          hooksByProp[propKey] = []
        }
        hooksByProp[propKey].push({
          type: hookType,
          prop: propKey,
          cb: cb.bind(this),
        })
      })

      // methods
      Object.assign(
        this,
        mapObject(defaults.methods, method => method.bind(this))
      )

      // props
      // const props = { ...this._prevProps };

      this.props = new Proxy(
        { ...this._prevProps },
        {
          set(target, property, value) {
            // if (ctx._destroyed) return true
            if (isFunction(value)) {
              return true
            }
            if (target[property] === value) {
              return true
            }
            if (isObject(value) && isObject(target[property])) {
              const keys1 = Object.keys(target[property])
              const keys2 = Object.keys(value)
              if (keys1.length === keys2.length) {
                let allequal = true
                for (const key of keys1) {
                  if (target[property][key] !== value[key]) {
                    allequal = false
                  }
                }
                if (allequal) {
                  return true
                }
              }
            }
            const prevValue = target[property]
            target[property] = value
            if (this._settingUp) {
              return true
            }
            const hooksApplicable = hooksByProp[property]
            if (!hooksApplicable) {
              return true
            }
            if (ctx._destroyed) {
              return true
            }
            hooksApplicable.forEach(({ type, cb }) => {
              hookApplier[type]({
                ctx,
                prop: property,
                cb,
                prevValue,
              })
            })
            return true
          },
          get(target, property) {
            return target[property]
          },
        }
      )

      this.props = observable(this.props)

      // precompute props
      const preProps = {}

      // events
      each(on, (cb, key) => {
        this._subscriptions.push(eventBus.subscribe(key, cb.bind(this)))
      })
      this.$trigger = (key, args) => {
        eventBus.publish(key, args)
      }

      // setup
      mixins.forEach(mixin => {
        if (mixin.beforeSetup) {
          mixin.beforeSetup.call(this, {
            options: this.options,
            props: preProps,
          })
        }
      })
      setup.call(this, { options: this.options, props: preProps })

      // render
      if (render) {
        this.render = render.bind(this)
        ticker.add(this.render, 'render')
      }

      if (afterRender) {
        this.afterRender = afterRender.bind(this)
        ticker.add(this.afterRender, 'afterRender')
      }

      // onSetup hooks
      const ctxOnSetupHooks = onSetupHooks.get(this)
      if (ctxOnSetupHooks) {
        ctxOnSetupHooks.forEach(hook => {
          ticker.once(() => {
            hook()
          }, 'propHooks')
        })
      }
      onSetupHooks.delete(this)

      each(hooksByProp, (hooks, prop) => {
        hooks.forEach(({ type, cb }) => {
          if (isFunction(this.props[prop])) {
            return
          }
          hookApplier[type]({
            ctx: this,
            prop,
            cb,
            settingUp: true,
          })
        })
      })
      each(this.props, (compute, key) => {
        if (isFunction(compute)) {
          // is computed
          // !! todo: how to raise warning when trying to manually set computed prop?
          // this._prevProps[key] = compute(this.props);
          const reaction = () => {
            this.props[key] = compute(this.props, { context: this })
          }
          observe(reaction)
          this._computeReactions[key] = reaction
        }
      })

      // final
      this._settingUp = false
      currentContext.pop()
    }

    destroy() {
      components = without(components, this)
      if (this._destroyed) {
        console.warn('cannot destroy whats already been destroyed')
        return
      }
      if (render) {
        ticker.remove(this.render, 'render')
      }
      if (afterRender) {
        ticker.remove(this.afterRender, 'afterRender')
      }
      destroy.call(this)
      this._ticks.forEach(tick => {
        ticker.remove(tick, 'propWhileHook')
      })
      this._ticks = []
      this._subscriptions.forEach(s => s.unsubscribe())
      each(this._computeReactions, unobserve)
      this._computeReactions = {}
      this._hookReactions.forEach(unobserve)
      this._hookReactions = null
      const ctxOnDestroyHooks = onDestroyHooks.get(this)
      if (ctxOnDestroyHooks) {
        ctxOnDestroyHooks.forEach(hook => hook())
      }
      onDestroyHooks.delete(this)

      mixins.forEach(mixin => {
        if (mixin.afterDestroy) {
          mixin.afterDestroy.call(this)
        }
      })

      this._destroyed = true
    }
  }

  classes.push(Component)

  return Component
}

// IMOG inject

const inject = (name, val) => {
  plugins.push({ name, val })
  classes.forEach(Class => {
    Class.prototype['$' + name] = val
  })
}

const getPlugin = _name => plugins.find(({ name }) => name === _name).val

// Export

const IMOG = {
  Component,
  inject,
  getPlugin,
  onSetup,
  onDestroy,
  getContext,
  stats,
  getComponents: () => components,
}

// if (!process.env.VERCEL ) window.IMOG = IMOG

export default IMOG
