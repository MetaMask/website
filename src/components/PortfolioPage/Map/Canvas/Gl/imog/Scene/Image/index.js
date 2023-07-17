import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import * as THREE from 'three'
import loadTexture from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/three/loadTexture'

const g = new THREE.PlaneGeometry(2048, 2048)

const mapWidth = 5246
const mapHeight = 4096

export default IMOG.Component('Image', {
  options: {
    addTo: null,
  },
  props() {
    return {
      scale: 1,
      computedScale: (props, { context }) =>
        (0.244 * context.$rendererProps.windowSize.height) / 1000,
      maskOut: 0,
    }
  },

  setup({ options }) {
    this.mesh = new THREE.Mesh(
      g,
      new THREE.MeshBasicMaterial({
        transparent: true,
        // opacity: 0.5,
      })
    )
    this.mesh.position.copy({ x: -11, y: 22, z: 0 })
    if (options.addTo) options.addTo.add(this.mesh)
    ;(async () => {
      const map = await loadTexture(
        '/images/portfolio/map/intro-map-slice.webp'
      )
      map.generateMipmaps = false
      this.mesh.material.map = map
      this.mesh.material.needsUpdate = true
      //   this.mesh.scale.set(map.image.naturalWidth, map.image.naturalHeight, 1)
    })()
  },

  hooks: {
    'set:computedScale'(s) {
      this.mesh.scale.setScalar(s)
    },
    'set:maskOut'(v) {
      this.mesh.material.transparent = v < 1
      this.mesh.material.opacity = 1 - v
      if (v === 1) this.mesh.visible = false
    },
  },
})
