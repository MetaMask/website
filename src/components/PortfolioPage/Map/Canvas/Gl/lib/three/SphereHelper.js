import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

class SphereHelper extends THREE.LineSegments {
  constructor({
    radius = 1,
    divisions = 64,
    color1 = 0x444444,
    color2 = 0x888888,
  } = {}) {
    const ref = new THREE.PolarGridHelper(radius, 0, 1, divisions, 0, 'yellow')
    const g1 = ref.geometry.clone()
    const g2 = ref.geometry.clone().rotateX(Math.PI / 2)
    const g3 = g2.clone().rotateY(Math.PI / 2)

    const g = BufferGeometryUtils.mergeBufferGeometries([g1, g2, g3], false)

    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      toneMapped: false,
    })

    super(g, material)

    this.type = 'SphereHelper'
  }

  dispose() {
    this.geometry.dispose()
    this.material.dispose()
  }
}

export default SphereHelper
