import * as THREE from 'three'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import gsap from 'gsap'

import Renderer from 'src/components/PortfolioPage/Map/Canvas/Gl/imog/Renderer'
import Scene from 'src/components/PortfolioPage/Map/Canvas/Gl/imog/Scene'

const v3 = new THREE.Vector3()

const searchParams = new URLSearchParams(
  typeof window !== `undefined` && window.location.search
)

export default IMOG.Component('Canvas', {
  options: {
    domElement: null,
    handleReady: () => {},
    handleItemLoaded: () => {},
    handleHotspotFocus: () => {},
    handleHotspotUnfocus: () => {},
    data: null,
  },

  props() {
    return {
      loading: true,
      rendering: true,
      intro: searchParams.has('skipIntro') ? false : true,
      introReady: props => !props.loading && props.intro,
      focus: false,
      enabled: searchParams.has('skipIntro') ? true : false, // are interactions enabled
    }
  },

  setup({ options }) {
    IMOG.inject('canvas', this)

    this.renderer = new Renderer({
      options: { domElement: options.domElement },
    })

    this.scene = new Scene({
      options: {
        addTo: this.renderer.worldScene,
        data: this.options.data,
      },
      props: {
        intro: props => this.props.intro,
        enabled: props => this.props.enabled,
        focus: props => this.props.focus,
      },
    })

    THREE.DefaultLoadingManager.onLoad = () => {
      options.handleReady()
      this.$trigger('mainLoad')
      this.props.loading = false
      this.renderer.render()
    }

    THREE.DefaultLoadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      options.handleItemLoaded({ itemsLoaded, itemsTotal })
    }

    THREE.DefaultLoadingManager.onError = function(url) {
      console.log('There was an error loading ' + url)
    }
    THREE.DefaultLoadingManager.itemStart('dummy')
    THREE.DefaultLoadingManager.itemEnd('dummy')
  },

  render(dt) {
    // if (this.props.loading) return
    if (!this.props.rendering) return
    this.renderer.render()
  },

  destroy() {
    this.renderer.destroy()
    const components = IMOG.getComponents()
    components.forEach(comp => {
      comp.destroy()
    })
  },

  hooks: {
    'set:introReady'(active) {
      if (!this.firstDone) {
        this.firstDone = true
        if (!active) return
      }
      gsap.killTweensOf(this.scene.draggable.props.wheel)
      gsap.killTweensOf(this.scene.draggable.props.pinch)
      if (active) {
        this.scene.focusHotspot({
          name: 'Bridge',
          immediate: true,
          silent: true,
          offset: [0.01, -0.25],
        })
        gsap.to(this.scene.draggable.props.wheel, {
          y: this.scene.draggable.options.maxZoom,
          duration: 0,
        })
        gsap.to(this.scene.draggable.props.pinch, {
          factor: this.scene.draggable.options.maxZoom,
          duration: 0,
        })
      } else {
        const config = {
          ease: 'expo.inOut',
          duration: 0.9,
        }
        gsap.to(this.scene.draggable.props.wheel, {
          y: this.scene.draggable.options.minZoom - 1,
          ...config,
        })
        gsap.to(this.scene.draggable.props.pinch, {
          factor: this.scene.draggable.options.minZoom,
          ...config,
        })
      }
    },
    'set:focus'(active) {
      if (!active) this.options.handleHotspotUnfocus()
    },
    // 'while:focus'() {
    //   console.log(this.getActiveHotspotPinPosition())
    // },
  },

  methods: {
    focusHotspot({ name, mesh, id }) {
      this.props.focus = true
      this.scene.focusHotspot({ name, mesh, id })
      this.options.handleHotspotFocus({ name: name || mesh.userData.name })
    },
    unfocus() {
      this.props.focus = false
      this.scene.unfocus()
    },
    getActiveHotspotPinPosition() {
      this.scene.hotspots.pinHelper.getWorldPosition(v3)
      return { x: v3.x, y: v3.y }
    },
    start() {
      this.props.intro = false
    },
    enable() {
      this.props.enabled = true
    },
    disable() {
      this.props.enabled = false
    },
    pauseRendering() {
      this.props.rendering = false
    },
    resumeRendering() {
      this.props.rendering = true
    },
  },
})
