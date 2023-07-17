/* eslint-disable */

import * as THREE from 'three'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import useWindowSize from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/windowSize'

const wP = new THREE.Vector3()

export default IMOG.Component('BasicCamera', {
  options: {
    addTo: null,
  },

  props() {
    return {
      active: true,
      windowSize: useWindowSize(),
      size: props => ({
        width: props.windowSize.width,
        height: props.windowSize.height,
      }),
    }
  },

  setup({ options }) {
    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, 0.1, 1000)
    if (options.addTo) {
      options.addTo.add(this.camera)
    }

    this.camera.position.set(0, 0, 500)
  },

  hooks: {
    'set:size'({ width, height, pr }) {
      this.camera.left = -width / 2
      this.camera.right = width / 2
      this.camera.top = height / 2
      this.camera.bottom = -height / 2
      this.camera.updateProjectionMatrix()
    },
  },
})
