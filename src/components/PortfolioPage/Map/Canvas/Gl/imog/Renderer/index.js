/* eslint-disable */

import * as THREE from 'three'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import useWindowSize from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/windowSize'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'

import BasicCamera from 'src/components/PortfolioPage/Map/Canvas/Gl/imog/Cameras/BasicCamera'

export default IMOG.Component('Renderer', {
  options: {
    renderDepthBuffer: true,
    domElement: null,
  },

  props() {
    return {
      windowSize: useWindowSize(),
      pr: 2,
      size: props => ({
        width: props.windowSize.width,
        height: props.windowSize.height,
        pr: props.pr,
      }),

      cameraType: 'basic',
    }
  },

  setup({ options }) {
    if (WebGL.isWebGL2Available() === false) {
      return
    }
    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      stencil: false,
      depth: false,
      logarithmicDepthBuffer: true,
    })
    this.renderer.autoClear = false
    this.renderer.setClearColor(0x060606)

    if (!options.domElement) {
      document.body.appendChild(this.renderer.domElement)
      this.renderer.domElement.className = 'main-canvas'
    } else {
      options.domElement.appendChild(this.renderer.domElement)
    }
    IMOG.inject('renderer', this.renderer)
    IMOG.inject('rendererProps', this.props)

    // world
    this.worldScene = new THREE.Scene()
    IMOG.inject('worldScene', this.worldScene)
    this.basicCamera = new BasicCamera({
      options: { addTo: this.worldScene },
      props: {
        active: true,
        helpers: false,
      },
    })
    this.worldCamera = this.basicCamera.camera
    IMOG.inject('worldCamera', this.worldCamera)

    if (this.$gui) {
      // const fCameras = this.$gui.addFolder({
      //   title: 'Cameras',
      //   expanded: false,
      // });
      // fCameras
      //   .addButton({ title: 'OrbitCamera' })
      //   .on('click', () => (this.props.cameraType = 'orbit'));
      // fCameras
      //   .addButton({ title: 'BasicCamera' })
      //   .on('click', () => (this.props.cameraType = 'basic'));
      // fCameras
      //   .addButton({ title: 'KeyboardCamera' })
      //   .on('click', () => (this.props.cameraType = 'keyboard'));
      const fGrading = this.$gui.addFolder({
        title: 'ToneMapping',
        expanded: true,
      })
      // fGrading.addInput(this.props, 'compositing', { min: 0, max: 2 });
      fGrading
        .addInput(this.props, 'levels', {
          x: { step: 0.01 },
          y: { step: 0.01 },
          z: { step: 0.01 },
        })
        .on('change', () => {
          const obj = { ...this.props.levels }
          obj[Math.random()] = 0
          this.props.levels = obj
        })
      fGrading.addInput(this.props, 'saturation', { min: 0, max: 2 })
    }

    setTimeout(() => {
      if (this.$gui) this.$gui.refresh()
    }, 0)

    window.addEventListener('focus', this.handleWindowFocus)
    window.addEventListener('blur', this.handleWindowBlur)
  },

  destroy() {
    this.renderer.dispose()
    this.renderer.domElement.parentElement.remove(this.renderer.domElement)
  },

  hooks: {
    'set:size'({ width, height, pr }) {
      this.renderer.setSize(width, height)
      this.renderer.setPixelRatio(pr)
      this.render()
    },
  },

  methods: {
    render(ms) {
      this.renderer.setRenderTarget(null)
      this.renderer.render(this.worldScene, this.worldCamera)
    },
  },
})
