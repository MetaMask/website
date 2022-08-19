// react/dom glue code
import { vec2, vec3 } from 'gl-matrix'
import * as React from 'react'
import { FoxRenderer } from './fox-render'

const MIN_DISTANCE = 100
const MAX_DISTANCE = 800

export type MetamaskBoxAnimationProps = {
  noGLFallback: React.ReactNode
  left: number
  phi: number
  theta: number
  distance: number
  hemisphereAxis: number[]
  hemisphereColor0: number[]
  hemisphereColor1: number[]
  interiorColor0: number[]
  interiorColor1: number[]
  fogColor: number[]
  enableZoom?: boolean

  // if set, follow mouse
  followMouse?: boolean
  lookPixel?: number[]
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export class MetamaskBoxAnimation extends React.Component<
  MetamaskBoxAnimationProps,
  {}
> {
  // webgl state
  public static canvas: HTMLCanvasElement | null = null
  public static gl: WebGLRenderingContext | null = null
  public static glFailed: boolean = false
  public static renderer: FoxRenderer | null = null
  public static initWebGL() {
    if (this.gl || this.glFailed) {
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 512
    Object.assign(canvas.style, {
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      margin: 0,
      padding: 0,
      'pointer-events': 'none',
      position: 'absolute',
    })

    try {
      this.gl = canvas.getContext('webgl', {
        premultipliedAlpha: true,
        alpha: true,
        antialias: true,
      })
    } catch (err) {
      this.glFailed = true
      throw err
    }
    const gl = this.gl
    if (!gl) {
      this.glFailed = true
      throw new Error('Failed to get WebGL context')
    }

    this.canvas = canvas

    // create animation
    this.renderer = new FoxRenderer(gl)
  }

  // glue stuff
  private container: HTMLDivElement | null = null
  private resizeObserver: ResizeObserver | null = null
  private intersectionObserver: IntersectionObserver | null = null
  private raf: number = 0

  constructor(props: MetamaskBoxAnimationProps) {
    super(props)
    MetamaskBoxAnimation.initWebGL()
  }

  public componentWillUnmount() {
    if (this.container) {
      this._handleMouseUp()
      this.container.removeEventListener('touchstart', this._handleTouchStart)
      this.container.removeEventListener('wheel', this._handleWheel)
      const canvas = MetamaskBoxAnimation.canvas
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
    if (this.raf) {
      cancelAnimationFrame(this.raf)
    }
  }

  private frame = (timestamp: number) => {
    const gl = MetamaskBoxAnimation.gl
    if (!gl) {
      return
    }
    const renderer = MetamaskBoxAnimation.renderer
    if (renderer) {
      renderer.animate(timestamp)
      renderer.draw()
    }
    this.raf = requestAnimationFrame(this.frame)
  }

  private updateSize = () => {
    const container = this.container
    const canvas = MetamaskBoxAnimation.canvas
    if (!container || !canvas) {
      return
    }
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
    const bounds = container.getBoundingClientRect()
    canvas.width = Math.ceil(bounds.width * window.devicePixelRatio)
    canvas.height = Math.ceil(bounds.height * window.devicePixelRatio)
    container.appendChild(canvas)
    MetamaskBoxAnimation?.renderer?.draw()
  }

  private updateVisibility = (entries: { isIntersecting: boolean }[]) => {
    const e = entries[0]
    if (!this.container || !e) {
      if (this.raf) {
        cancelAnimationFrame(this.raf)
        this.raf = 0
      }
      return
    }
    if (e.isIntersecting) {
      if (!this.raf) {
        this.raf = requestAnimationFrame(this.frame)
      }
    } else if (this.raf) {
      cancelAnimationFrame(this.raf)
      this.raf = 0
    }
  }

  private _prevPos = vec2.fromValues(0, 0)
  private _handleMouseDown = (x: number, y: number) => {
    if (!MetamaskBoxAnimation.renderer) {
      return
    }
    this._prevPos[0] = x
    this._prevPos[1] = y
    MetamaskBoxAnimation.renderer.explodeRay(x, y, 100)
    document.body.addEventListener('mousemove', this._handleMouseMove, {
      passive: false,
    })
    document.body.addEventListener('touchmove', this._handleTouchMove, {
      passive: false,
    })
    document.body.addEventListener('mouseup', this._handleMouseUp)
    document.body.addEventListener('touchend', this._handleMouseUp)
  }

  private _lastPinchDist = 0

  private _handleMove(posX: number, posY: number) {
    const renderer = MetamaskBoxAnimation.renderer
    if (!renderer) {
      return
    }
    MetamaskBoxAnimation.renderer.explodeRay(posX, posY, 30)
    const { _prevPos } = this
    _prevPos[0] = posX
    _prevPos[1] = posY
  }

  private _handleTouchMove = (ev: TouchEvent) => {
    const renderer = MetamaskBoxAnimation.renderer
    if (!renderer) {
      return
    }
    ev.preventDefault()
    if (ev.touches.length === 0) {
      return
    } else if (ev.touches.length > 1 && this.props.enableZoom) {
      const dist = Math.hypot(
        ev.touches[0].pageX - ev.touches[1].pageX,
        ev.touches[0].pageY - ev.touches[1].pageY
      )
      const dx = this._lastPinchDist - dist
      this._lastPinchDist = dist
      renderer.distance = clamp(
        renderer.distance + dx * 0.1,
        MIN_DISTANCE,
        MAX_DISTANCE
      )
      return
    }

    const touch = ev.touches[0]
    this._handleMove(touch.layerX, touch.layerY)
  }

  private _handleMouseMove = (ev: MouseEvent) => {
    const renderer = MetamaskBoxAnimation.renderer
    if (!renderer) {
      return
    }
    ev.preventDefault()
    this._handleMove(ev.layerX, ev.layerY)
  }

  private _handleMouseUp = () => {
    document.body.removeEventListener('mousemove', this._handleMouseMove)
    document.body.removeEventListener('touchmove', this._handleTouchMove)
    document.body.removeEventListener('mouseup', this._handleMouseUp)
    document.body.removeEventListener('touchend', this._handleMouseUp)
  }

  private _handleTouchStart = (ev: TouchEvent) => {
    const renderer = MetamaskBoxAnimation.renderer
    if (!renderer) {
      return
    }
    ev.preventDefault()
    const touch = ev.touches[0]
    if (!touch) {
      return
    }
    if (ev.touches.length === 1) {
      this._handleMouseDown(touch.layerX, touch.layerY)
    } else {
      this._lastPinchDist = Math.hypot(
        ev.touches[0].pageX - ev.touches[1].pageX,
        ev.touches[0].pageY - ev.touches[1].pageY
      )
    }
  }

  private _handleWheel = (ev: WheelEvent) => {
    const renderer = MetamaskBoxAnimation.renderer
    if (!renderer) {
      return
    }
    if (this.props.enableZoom) {
      ev.stopPropagation()
      ev.preventDefault()
      const { deltaY } = ev
      renderer.distance = clamp(
        renderer.distance + deltaY * 0.1,
        MIN_DISTANCE,
        MAX_DISTANCE
      )
    }
  }

  public render() {
    if (!MetamaskBoxAnimation.gl) {
      return this.props.noGLFallback
    }
    if (MetamaskBoxAnimation.renderer) {
      const renderer = MetamaskBoxAnimation.renderer

      renderer.phi = this.props.phi
      renderer.theta = this.props.theta
      renderer.distance = this.props.distance
      vec3.normalize(renderer.hemisphereAxis, this.props.hemisphereAxis as any)
      vec3.copy(renderer.hemisphereColor0, this.props.hemisphereColor0 as any)
      vec3.copy(renderer.hemisphereColor1, this.props.hemisphereColor1 as any)
      vec3.copy(renderer.interiorColor0, this.props.interiorColor0 as any)
      vec3.copy(renderer.interiorColor1, this.props.interiorColor1 as any)
      vec3.copy(renderer.fogColor, this.props.fogColor as any)

      if (this.props.lookPixel) {
        renderer.foxLookAt(this.props.lookPixel[0], this.props.lookPixel[1])
      }
    }
    const left = this.props.left

    return (
      <div
        style={{
          cursor: 'grab',
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: 0,
          margin: 0,
          top: 0,
          left: left
        }}
        onMouseDown={(ev) => {
          if (MetamaskBoxAnimation.renderer) {
            this._handleMouseDown(ev.layerX, ev.layerY)
          }
        }}
        onMouseMove={(ev) => {
          if (this.props.followMouse && MetamaskBoxAnimation.renderer) {
            MetamaskBoxAnimation.renderer.foxLookAt(ev.layerX, ev.layerY)
          }
        }}
        ref={(container) => {
          if (this.resizeObserver) {
            this.resizeObserver.disconnect()
            this.resizeObserver = null
          }
          if (this.intersectionObserver) {
            this.intersectionObserver.disconnect()
            this.intersectionObserver = null
          }
          if (!container) {
            return
          }
          if (typeof window['ResizeObserver'] !== 'undefined') {
            this.resizeObserver = new ResizeObserver(this.updateSize)
            this.resizeObserver.observe(container)
          } else {
            this.updateSize()
          }

          if (typeof window['IntersectionObserver'] !== 'undefined') {
            this.intersectionObserver = new IntersectionObserver(
              this.updateVisibility
            )
            this.intersectionObserver.observe(container)
          } else {
            this.updateVisibility([
              {
                isIntersecting: true,
              },
            ])
          }
          if (!this.container) {
            this.container = container
            container.addEventListener('touchstart', this._handleTouchStart, {
              passive: false,
            })
            if (this.props.enableZoom) {
              container.addEventListener('wheel', this._handleWheel, {
                passive: false,
              })
            }
            this.updateSize()
          }
        }}
      />
    )
  }
}
