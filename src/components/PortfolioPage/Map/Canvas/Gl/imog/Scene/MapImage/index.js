/* eslint-disable */

import * as THREE from 'three'
import gsap from 'gsap'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import loadTexture from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/three/loadTexture'
import useWindowSize from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/windowSize'

import Shader from './Shader'
const g = new THREE.PlaneGeometry(1, 1)

const mapWidth = 5246
const mapHeight = 4096

export default IMOG.Component('MapImage', {
  options: {
    addTo: null,
    ref: null,
    type: 'color',
    layer: 0,
    colorMap: null,
  },

  props() {
    const _windowSize = useWindowSize()
    return {
      active: true,
      focus: false,
      size: props => ({ ..._windowSize }),
      exposedSize: [1, 1],
      maskOut: 0,
    }
  },

  async setup({ options }) {
    this.material = new THREE.ShaderMaterial({ ...Shader(), transparent: true })
    ;(async () => {
      let map

      if (options.type === 'color') {
        map = options.colorMap
      } else {
        map = await loadTexture(
          options.type === 'mask'
            ? '/images/portfolio/map/hover.webp'
            : '/images/portfolio/map/intro.webp'
        )
      }
      map.generateMipmaps = false
      this.material.uniforms.uImageAspect.value = mapWidth / mapHeight
      this.props.exposedSize = [mapWidth, mapHeight]
      this.material.uniforms.uTexture.value = map
    })()

    this.mesh = new THREE.Mesh(g, this.material)
    this.mesh.layers.set(options.layer)
    if (options.addTo) options.addTo.add(this.mesh)
  },

  hooks: {
    'while:active'(dt) {
      this.material.uniforms.uPosition.value.copy(
        this.options.ref.parent.position
      )
      this.material.uniforms.uScale.value = this.options.ref.parent.scale.x
    },
    'set:size'({ width, height }) {
      this.mesh.scale.set(width, height, 1)
      this.material.uniforms.uResolution.value.set(width, height)
    },
    'set:focus'(f) {
      gsap.to(this.material.uniforms.uSaturation, {
        value: f ? 0 : 1,
        delay: 0,
      })
    },
    'set:maskOut'(v) {
      this.material.uniforms.uMaskOut.value = v
      this.material.transparent = v < 1

      if (v === 1) this.mesh.visible = false
    },
  },
})
