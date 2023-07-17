/* eslint-disable */

import _ from 'underscore'
import * as THREE from 'three'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import loadTexture from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/three/loadTexture'

export default IMOG.Component('TiledTexture', {
  options: {
    size: [5246, 4096],
    textureSize: 2048,
    path: ({ row, col }) =>
      `/images/portfolio/map/map-color-hq-${row}-${col}.webp`,
  },

  async setup({ options }) {
    const scale =
      Math.min(5246, this.$renderer.capabilities.maxTextureSize) / 5246
    this.target = new THREE.WebGLRenderTarget(
      Math.floor(scale * options.size[0]),
      Math.floor(scale * options.size[1])
    )
    this.texture = this.target.texture
    this.camera = new THREE.OrthographicCamera(
      0,
      options.size[0],
      0,
      options.size[1],
      0.1,
      1000
    )
    this.camera.position.set(0, 0, -50)
    this.camera.lookAt(0, 0, 0)
    this.scene = new THREE.Scene()
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(options.textureSize, options.textureSize),
      new THREE.MeshBasicMaterial({ depthTest: false, side: THREE.DoubleSide })
    )
    this.mesh.geometry
      .scale(-1, -1, 0)
      .translate(-options.textureSize / 2, options.textureSize / 2, 0)
    this.scene.add(this.mesh)

    const columns = Math.ceil(options.size[0] / options.textureSize)
    const rows = Math.ceil(options.size[1] / options.textureSize)

    const texturePromises = _.range(columns * rows).map(index => {
      const col = (index % columns) + 1
      const row = Math.floor(index / columns) + 1
      return loadTexture(options.path({ col, row }))
    })

    this.textures = await Promise.all(texturePromises)

    this.$renderer.setRenderTarget(this.target)
    this.$renderer.setClearColor(0xffff00)
    this.$renderer.render(this.scene, this.camera)

    this.textures.forEach((texture, index) => {
      const col = index % columns
      const row = Math.floor(index / columns)
      this.mesh.material.map = texture
      this.mesh.material.needsUpdate = true
      this.mesh.position.x = -col * options.textureSize
      this.mesh.position.y = row * options.textureSize
      this.$renderer.setRenderTarget(this.target)
      this.$renderer.autoClear = false
      this.$renderer.render(this.scene, this.camera)
      this.$renderer.setRenderTarget(null)
    })

    this.textures.forEach(texture => texture.dispose())
  },
})
