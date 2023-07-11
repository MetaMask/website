/* eslint-disable */

import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import * as THREE from 'three'
import gsap from 'gsap'
import useDrag from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/drag'
import useLerp from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/lerp'
import useWheel from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/wheel'
import useMouse from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/mouse'
import usePinch from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/pinch'

export default IMOG.Component('Draggable', {
  options: {
    addTo: null,
    content: null,
    minZoom: 1,
    maxZoom: 2,
  },

  props() {
    const _drag = useDrag({ domElement: this.$renderer.domElement })
    this.dragApi = _drag.api
    const _scaleSpring = useLerp({
      friction: props => props.scaleFriction,
      value: props => props.scale,
    })
    const _mouse = useMouse({ normalized: false })
    return {
      active: true,
      drag: () => ({ x: _drag.result.x, y: _drag.result.y }),
      dragging: () => _drag.result.dragging,
      draggingStarted: false,
      mouse: () => ({ ..._mouse }),
      dragScale: 1,
      controlScale: 0,
      zoomEnabled: true,
      wheel: useWheel({
        active: props => props.zoomEnabled,
        min: this.options.minZoom - 1,
        max: this.options.maxZoom - 1,
        mult: 0.0035,
        domElement: this.$renderer.domElement,
      }),
      pinch: usePinch({
        active: props => props.zoomEnabled,
        min: this.options.minZoom,
        max: this.options.maxZoom,
      }),
      pinching: props => props.pinch.pinching,
      hasPinch: false,
      pointerType: 'ui',
      pointer: props =>
        props.pointerType === 'pinch'
          ? { x: props.pinch.centerX, y: props.pinch.centerY }
          : props.pointerType === 'mouse'
          ? { x: _mouse.x, y: _mouse.y }
          : { x: 0, y: 0 },
      supportDragScale: true,
      scale: props =>
        (props.supportDragScale ? props.dragScale : 1) *
        (props.hasPinch ? props.pinch.factor : 1 + props.wheel.y),
      scaleFriction: props =>
        props.dragging || props.wheel.wheeling ? 0.1 : 0.04,
      scaleSpring: () => _scaleSpring.value,
      exposedPosition: [0, 0],
    }
  },

  async setup({ options, props }) {
    this.group = new THREE.Group()
    if (options.addTo) options.addTo.add(this.group)
    if (options.content) this.group.add(options.content)
    this.dragPosition = new THREE.Vector3()
    this.pointerOffset = new THREE.Vector3()
    this.dragOrigin = [0, 0, 0]
    this.lastScale = 1
    this.props.wheel.y = options.maxZoom
    this.props.pinch.factor = options.maxZoom

    const checkTouches = event => {
      if (event.touches) {
        this.props.hasPinch = true
        this.props.supportDragScale = false
      }
      window.removeEventListener('touchstart', checkTouches)
    }
    window.addEventListener('touchstart', checkTouches)

    // this.centerHelper = new THREE.Mesh(
    // new THREE.SphereGeometry(10),
    // new THREE.MeshBasicMaterial({ color: 'green' })
    // );
    // if (options.addTo) options.addTo.add(this.centerHelper);
  },

  hooks: {
    'while:active'() {
      this.group.position.copy(this.dragPosition).add(this.pointerOffset)
      this.props.exposedPosition = [
        Math.round(this.group.position.x),
        Math.round(this.group.position.y),
      ]
    },
    'set:dragging'(active) {
      this.props.draggingStarted = false
      if (active) {
        gsap.killTweensOf(this.dragPosition)
        this.dragOrigin = this.dragPosition.toArray()
        this.props.pointerType = 'mouse'
        this.$canvas.unfocus()
      }
    },
    'set:draggingStarted'(active) {
      if (active) this.props.dragScale = 0.9
      else this.props.dragScale = 1
    },
    'set:drag'({ x, y }) {
      if (this.props.dragging && !this.props.draggingStarted) {
        if (Math.abs(x) > 5 || Math.abs(y) > 5) {
          this.props.draggingStarted = true
        }
      }
      const newDragPos = new THREE.Vector3(
        -x + this.dragOrigin[0] || 0,
        -y + this.dragOrigin[1] || 0,
        0
      )
      this.dragPosition.copy(newDragPos)
    },
    'set:scaleSpring'(s) {
      const delta = s / this.lastScale
      if (delta === 0) return

      this.group.scale.set(s, s, 1)

      this.pointerOffset.x -=
        (this.props.pointer.x - this.group.position.x) * (delta - 1)
      this.pointerOffset.y -=
        (this.props.pointer.y - this.group.position.y) * (delta - 1)

      this.pointerOffset.x = this.pointerOffset.x || 0
      this.pointerOffset.y = this.pointerOffset.y || 0

      this.lastScale = s
    },
    'set:pinching'(active) {
      if (active) {
        this.props.pointerType = 'pinch'
      }
    },
  },
  methods: {
    moveTo({ x, y, immediate }) {
      this.dragOrigin = [0, 0]
      this.props.pointerType = 'ui'
      const config = {
        ease: 'power4.inOut',
        duration: immediate ? 0 : 1,
      }
      if (!immediate) {
        gsap.to(this.props.wheel, {
          y: 0.5,
          ease: 'power3.inOut',
          duration: 1.1,
        })
        gsap.to(this.props.pinch, {
          factor: 0.25 + 1,
          ease: 'power3.out',
          duration: 1.1,
        })
      }

      gsap.killTweensOf(this.dragPosition)
      gsap.to(this.dragPosition, {
        x: x - this.pointerOffset.x,
        y: y - this.pointerOffset.y,
        ...config,

        onComplete: () => {
          this.dragApi.setPosition({
            x: -this.dragPosition.x,
            y: -this.dragPosition.y,
          })
        },
      })
    },
  },
})
