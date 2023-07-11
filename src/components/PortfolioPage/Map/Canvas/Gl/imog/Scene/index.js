/* eslint-disable */

import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import * as THREE from 'three'
import gsap from 'gsap'

import TiledTexture from './HotSpots/TiledTexture'
import MapImage from './MapImage'
import Image from './Image'
import Draggable from './Draggable'
import Picker from './Picker'
import HotSpots from './HotSpots'
import Cursor from './Cursor'

const v3 = new THREE.Vector3()

export default IMOG.Component('Scene', {
  options: {
    addTo: null,
  },

  props() {
    return {
      active: false,
      intro: false,
      enabled: true,
      focus: false,
      animationActive: false,
      size: (props, { context }) => ({
        width: context.$rendererProps.size.width,
        height: context.$rendererProps.size.height,
      }),
    }
  },

  async setup({ options }) {
    this.dummy = new THREE.Mesh(
      new THREE.SphereGeometry(20),
      new THREE.MeshBasicMaterial({
        color: 'green',
        depthTest: false,
        visible: false,
      })
    )
    this.dummy.renderOrder = 2
    this.dummy.position._test = true
    this.draggable = new Draggable({
      options: { addTo: options.addTo, content: this.dummy },
      props: {
        zoomEnabled: props => !this.props.focus,
      },
    })

    this.tiledTexture = new TiledTexture({})

    this.mapImage = new MapImage({
      options: {
        addTo: options.addTo,
        ref: this.dummy,
        layer: 0,
        colorMap: this.tiledTexture.texture,
      },
      props: {
        focus: props => this.props.focus,
      },
    })
    this.maskImage = new MapImage({
      options: {
        addTo: options.addTo,
        ref: this.dummy,
        type: 'mask',
        layer: 2,
      },
      props: {
        focus: props => this.props.focus,
      },
    })

    this.introImage = new Image({
      options: {
        addTo: this.dummy,
      },
      props: {
        scale: props => this.draggable.props.scaleSpring,
      },
    })

    this.picker = new Picker()

    this.hotspots = new HotSpots({
      options: {
        addTo: this.dummy,
        ref: this.dummy,
        picker: this.picker,
        colorMap: this.tiledTexture.texture,
      },
      props: {
        active: props =>
          !this.props.intro &&
          this.props.enabled &&
          !this.props.animationActive,
        focus: props => this.props.focus,
        dragging: props => this.draggable.props.dragging,
        draggingStarted: props => this.draggable.props.draggingStarted,
        imageSize: props => this.mapImage.props.exposedSize,
        containerOffset: props => this.draggable.props.exposedPosition,
        containerScale: props => this.draggable.props.scaleSpring,
      },
    })

    this.cursor = new Cursor({
      props: {
        hovering: props => this.hotspots.props.hoverName !== null,
        grabbing: props => this.draggable.props.draggingStarted,
        grabbable: props =>
          !this.props.intro &&
          this.props.enabled &&
          !this.props.animationActive,
      },
    })

    this.props.active = true
  },

  hooks: {
    'set:focus'(active) {
      if (active) {
        this.draggable.props.pointerType = 'ui'
      } else {
        this.draggable.props.pointerType = 'mouse'
      }
    },
    'set:intro'(active) {
      this.props.animationActive = true
      gsap.killTweensOf(this.introImage.props, { maskOut: true })
      gsap.to(this.introImage.props, {
        maskOut: active ? 0 : 1,
        duration: 0.4,
        ease: 'linear',
        delay: 0.5,
        onComplete: () => {
          this.props.animationActive = false
        },
      })
    },
    'set:size'() {
      if (this.props.focus) {
        this.focusHotspot({
          mesh: this.lastFocusMesh,
          id: this.lastFocusId,
          immediate: true,
          silent: true,
        })
      }
    },
  },

  methods: {
    focusHotspot({
      name,
      mesh,
      immediate = false,
      silent = false,
      offset,
      id,
    }) {
      this.lastFocusId = id
      this.lasFocusMesh = mesh
      this.draggable.props.pointerType = 'ui'
      if (mesh || id) {
        const realMesh = this.hotspots.meshes.find(
          mesh => mesh.userData.id === id
        )
        const wP = (realMesh || mesh).getWorldPosition(v3)

        if (offset) {
          wP.x += offset[0] * window.innerWidth
          wP.y += offset[1] * window.innerHeight
        }
        this.draggable.moveTo({
          x: this.draggable.props.exposedPosition[0] - wP.x,
          y: this.draggable.props.exposedPosition[1] - wP.y,
          immediate,
        })
        this.hotspots.focus({ mesh: realMesh })
        return
      }
      const matches = this.hotspots.meshes.filter(
        mesh => mesh.userData.name === name
      )
      const closest = matches.reduce((a, b) => {
        const aLength = a.getWorldPosition(v3).length()
        const bLength = b.getWorldPosition(v3).length()
        if (aLength > bLength) return b
        else return a
      }, matches[0])

      if (closest) {
        const wP = closest.getWorldPosition(v3)
        if (offset) {
          wP.x += offset[0] * window.innerWidth
          wP.y += offset[1] * window.innerHeight
        }
        this.draggable.moveTo({
          x: this.draggable.props.exposedPosition[0] - wP.x,
          y: this.draggable.props.exposedPosition[1] - wP.y,
          immediate,
        })
        if (!silent) this.hotspots.focus({ mesh: closest })
      }
    },
    unfocus() {
      this.hotspots.unfocus()
    },
  },
})
