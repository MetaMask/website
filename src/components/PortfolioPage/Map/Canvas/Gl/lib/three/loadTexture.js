import * as THREE from 'three'

const loader = new THREE.TextureLoader()
const loadTexture = (url, { colorSpace = THREE.SRGBColorSpace } = {}) =>
  new Promise((resolve, reject) => {
    loader.load(
      url,
      texture => {
        texture.colorSpace = colorSpace
        resolve(texture)
      },
      () => {},
      () => reject()
    )
  })

export default loadTexture
