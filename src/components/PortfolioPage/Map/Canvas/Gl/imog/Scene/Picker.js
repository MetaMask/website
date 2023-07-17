/* eslint-disable */
import * as THREE from 'three'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import useMouse from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/mouse'

const pointer = new THREE.Vector2()
const pixelBuffer = new Uint8Array(4)

export default IMOG.Component('ColorPicker', {
  setup() {
    this.target = new THREE.WebGLRenderTarget(1, 1)
  },

  props() {
    const _mouse = useMouse({ normalized: false })
    return {
      mouse: props => ({ ..._mouse }),
    }
  },

  hooks: {
    'set:mouse'({ x, y }) {
      pointer.set(x + window.innerWidth / 2, -y + window.innerHeight / 2)
      // console.log(pointer)
    },
  },

  methods: {
    getColorAtPointer() {
      this.$renderer.setClearColor(0x000000)
      this.$renderer.setClearAlpha(1)
      this.$renderer.setRenderTarget(this.target)
      this.$renderer.clear()
      const dpr = this.$renderer.getPixelRatio()
      this.$worldCamera.setViewOffset(
        this.$renderer.domElement.width,
        this.$renderer.domElement.height,
        Math.floor(pointer.x * dpr),
        Math.floor(pointer.y * dpr),
        1,
        1
      )
      this.$worldCamera.updateProjectionMatrix()
      this.$worldCamera.layers.set(2)
      this.$renderer.render(this.$worldScene, this.$worldCamera)
      this.$renderer.readRenderTargetPixels(
        this.target,
        0,
        0,
        1,
        1,
        pixelBuffer
      )
      // console.log(pixelBuffer)

      this.$worldCamera.clearViewOffset()
      this.$worldCamera.layers.set(0)
      return pixelBuffer
    },
  },
})
