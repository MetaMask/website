/* eslint-disable */

import * as THREE from 'three'
import _ from 'underscore'
import gsap from 'gsap'
import IMOG from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog'
import loadTexture from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/three/loadTexture'
import useWindowSize from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/windowSize'
import useMouse from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/imog/use/mouse'
import { mod } from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'

import Shader from './Shader'
import Text from './Text'

const g = new THREE.PlaneGeometry(1, 1)
const v3 = new THREE.Vector3()

const raycaster = new THREE.Raycaster()
const pointer = new THREE.Vector2()

const mapWidth = 3639
const mapHeight = 2841

const HELPERS = false

export default IMOG.Component('HotSpots', {
  options: {
    addTo: null,
    ref: null,
    picker: null,
    colorMap: null,
    // prettier-ignore
    data: [
      { name: 'Dashboard', maskChannel: [0, 0, 1], x: -340, y: -285, width: 340, height: 340, color: '#ffe466', pinPos: [10, 200] },
      { name: 'Buy', maskChannel: [1, 0, 0], x: -430, y: 95, width: 420, height: 420, color: '#75c4fd', pinPos: [115, 220] },
      { name: 'Swap', maskChannel: [0, 0, 1], x: 400, y: 310, width: 460, height: 360, color: '#86e29b', pinPos: [0, 200] },
      { name: 'Bridge', maskChannel: [0, 1, 0], x: -10, y: 110, width: 390, height: 450, color: '#ffafea', pinPos: [100, 100] },
      { name: 'Stake', maskChannel: [1, 0, 0], x: 270, y: -330, width: 400, height: 340, color: '#f5841f',  pinPos: [-5, 170] },
    ]
  },

  props() {
    const _windowSize = useWindowSize()
    const _mouse = useMouse({ normalized: true })

    return {
      active: true,
      focus: false,
      dragging: false,
      imageSize: [0, 0],
      containerOffset: [0, 0],
      containerScale: 1,
      windowSize: (props, { context }) => context.$rendererProps.size,
      mouse: props => ({ ..._mouse }),
      hoverName: null,

      repeatData: props => ({
        imageWidth: props.imageSize[0],
        imageHeight: props.imageSize[1],
        x: props.containerOffset[0],
        y: props.containerOffset[1],
        scale: Math.round(props.containerScale * 1000) / 1000,
        windowHeight: _windowSize.height,
      }),
    }
  },

  async setup({ options }) {
    this.group = new THREE.Group()
    if (options.addTo) options.addTo.add(this.group)

    this.meshes = []
    options.data.forEach(data => {
      _.times(4, cellOffset => {
        const mesh = new THREE.Mesh(
          g,
          new THREE.ShaderMaterial({
            ...Shader(),
            transparent: true,
            depthTest: false,
            visible: false,
          })
        )
        mesh.renderOrder = 2
        mesh.position.set(data.x, data.y, 0)
        mesh.userData.positionOrigin = mesh.position.clone()
        mesh.userData.color = data.color
        mesh.userData.maskChannel = data.maskChannel
        mesh.userData.pinPos = data.pinPos
        mesh.userData.cellOffset = [cellOffset % 2, Math.floor(cellOffset / 2)]
        mesh.userData.name = data.name
        mesh.scale.set(data.width, data.height, 1)

        if (HELPERS) {
          mesh.userData.debugText = new Text({ options: { addTo: mesh } })
          mesh.add(
            new THREE.Mesh(
              g,
              new THREE.MeshBasicMaterial({
                transparent: true,
                depthTest: false,
                // color: mesh.userData.color,
                color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
                opacity: 0.8,
              })
            )
          )
          mesh.children[1].renderOrder = 999
        }
        this.group.add(mesh)
        this.meshes.push(mesh)
      })
    })

    this.activeMesh = new THREE.Mesh(
      g,
      new THREE.ShaderMaterial({
        ...Shader(),
        transparent: true,
        depthTest: false,
        visible: false,
      })
    )
    this.group.add(this.activeMesh)
    ;(async () => {
      const map = options.colorMap
      map.generateMipmaps = false
      this.map = map
      const maskMap = await loadTexture('/images/portfolio/map/mask.webp')
      maskMap.generateMipmaps = false
      this.maskMap = maskMap

      this.activeMesh.material.uniforms.uImageAspect.value =
        mapWidth / mapHeight
      this.activeMesh.material.uniforms.uTexture.value = map
      this.activeMesh.material.uniforms.uMaskTexture.value = maskMap

      this.meshes.forEach(mesh => {
        mesh.material.uniforms.uImageAspect.value = mapWidth / mapHeight
        mesh.material.uniforms.uTexture.value = map
        mesh.material.uniforms.uMaskTexture.value = maskMap
        mesh.material.uniforms.uOverlay.value = 1
        mesh.material.uniforms.uOpacity.value = 0
        mesh.material.uniforms.uShineColor.value.setStyle(mesh.userData.color)
        mesh.material.uniforms.uMaskChannel.value.fromArray(
          mesh.userData.maskChannel
        )
      })

      // temp
      // this.$canvas.focusHotspot({ name: 'Buy' })

      //
    })()

    this.pinHelper = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({
        color: 'red',
        depthTest: false,
        transparent: true,
        visible: false,
      })
    )
    this.pinHelper.renderOrder = 20

    this.hoverMeshes = []
    this.hoverIds = []

    this.$renderer.domElement.addEventListener(
      'mousedown',
      this.handleMouseDown
    )
    this.$renderer.domElement.addEventListener(
      'mousemove',
      this.handleMouseMove
    )
    this.$renderer.domElement.addEventListener('mouseup', this.handleMouseUp)
  },

  destroy() {
    this.$renderer.domElement.removeEventListener(
      'mousedown',
      this.handleMouseDown
    )
    this.$renderer.domElement.removeEventListener(
      'mousemove',
      this.handleMouseMove
    )
    this.$renderer.domElement.removeEventListener('mouseup', this.handleMouseUp)

    // TODO: Make sure to destroy pool
  },

  hooks: {
    'while:active'() {
      ;[this.activeMesh, ...this.hoverMeshes, ...this.meshes].forEach(mesh => {
        mesh.material.uniforms.uPosition.value.set(
          this.options.ref.parent.position.x * this.props.windowSize.pr,
          this.options.ref.parent.position.y * this.props.windowSize.pr
        )
        mesh.material.uniforms.uScale.value = this.options.ref.parent.scale.x
      })
    },
    'set:repeatData'(data) {
      const scale = (data.windowHeight / data.imageHeight) * data.scale

      this.meshes.forEach(mesh => {
        mesh.position.copy(mesh.userData.positionOrigin)
        mesh.updateMatrixWorld()
        mesh.updateMatrix()

        const wP = mesh.getWorldPosition(v3)

        let row = Math.floor(wP.y / (data.imageHeight * scale))
        row += mesh.userData.cellOffset[1]

        wP.y = mod(wP.y, data.imageHeight * scale)
        // wP.y = wP.y % (data.imageHeight * scale)
        wP.y -= data.imageHeight * scale * mesh.userData.cellOffset[1]

        let col = Math.floor(wP.x / (data.imageWidth * scale))
        col += mesh.userData.cellOffset[0]

        wP.x = mod(
          wP.x - row * data.imageWidth * 0.4079 * scale,
          data.imageWidth * scale
        )
        wP.x -= data.imageWidth * scale * mesh.userData.cellOffset[0]

        mesh.parent.worldToLocal(wP)
        mesh.position.copy(wP)

        mesh.userData.id = `${Math.round(mesh.position.x / 100)}-${Math.round(
          mesh.position.y / 100
        )}`
        if (HELPERS) {
          // const { cellOffset, positionOrigin } = mesh.userData
          // mesh.userData.debugText.props.value = `${row} ${col} ${positionOrigin.x} ${positionOrigin.y} ${cellOffset}`
          mesh.userData.debugText.props.value = mesh.userData.id
        }
      })
    },
    'set:windowSize'({ width, height, pr }) {
      this.group.scale.setScalar(height / 1000)
      ;[this.activeMesh, ...this.hoverMeshes, ...this.meshes].forEach(mesh => {
        mesh.material.uniforms.uResolution.value.set(width * pr, height * pr)
      })
    },
    'set:mouse'({ x, y }, more) {
      if (!this.props.active) return
      if (!this.mouseInitialized) {
        this.mouseInitialized = true
        return
      }
      if (!this.props.dragging && !this.props.focus) {
        this.checkIntersects()
      }
    },
    'set:dragging'() {
      this.meshes.forEach(mesh => {
        mesh.material.visible = false
      })
    },
    'set:focus'() {
      this.meshes.forEach(mesh => {
        if (mesh.material.visible) {
          gsap.killTweensOf(mesh.material.uniforms.uOpacity)
          gsap.to(mesh.material.uniforms.uOpacity, {
            value: 0,
            duration: 0.5,
            onComplete: () => (mesh.material.visible = false),
          })
        }
      })
    },
    // 'set:hoverName'(name) {
    // },
  },
  methods: {
    focus({ mesh }) {
      this.activeMesh.position.copy(mesh.position)
      this.activeMesh.scale.copy(mesh.scale)
      // this.activeMesh.material.color.copy(mesh.material.color)
      this.activeMesh.material.visible = true
      this.activeMesh.material.uniforms.uMaskChannel.value.fromArray(
        mesh.userData.maskChannel
      )

      this.activeMesh.add(this.pinHelper)
      this.pinHelper.position.set(
        mesh.userData.pinPos[0] / this.activeMesh.scale.x,
        mesh.userData.pinPos[1] / this.activeMesh.scale.y,
        0
      )
      this.pinHelper.scale.setScalar(1 / mesh.scale.x)
    },
    unfocus() {
      this.activeMesh.remove(this.pinHelper)

      // this.activeMesh.material.visible = false
    },
    checkIntersects() {
      pointer.set(this.props.mouse.x * 2, this.props.mouse.y * 2)
      raycaster.setFromCamera(pointer, this.$worldCamera)
      let hitFound = false
      this.meshes.forEach(mesh => {
        const intersects = raycaster.intersectObjects([mesh])
        const intersect = intersects[0]
        if (intersect) {
          const pixelColor = this.options.picker.getColorAtPointer()
          if (pixelColor[0] > 0 || pixelColor[1] > 0 || pixelColor[2] > 0) {
            // TODO
            if (!intersect.object.userData.highlighted) {
              intersect.object.material.visible = true
              intersect.object.userData.highlighted = true
              gsap.killTweensOf(intersect.object.material.uniforms.uOpacity)
              gsap.fromTo(
                intersect.object.material.uniforms.uOpacity,
                { value: 0 },
                { value: 1, duration: 0.1 }
              )
            }

            if (intersect.object.userData.name !== this.props.hoverName) {
              const highlightMesh = Pool.alloc({
                props: this.props,
                options: this.options,
                map: this.map,
                maskMap: this.maskMap,
              })
              highlightMesh.userData.id = intersect.object.userData.id

              if (this.hoverIds.find(id => id === highlightMesh.userData.id)) {
                const active = this.hoverMeshes.find(
                  mesh => mesh.userData.id === highlightMesh.userData.id
                )
                if (active.parent) active.parent.remove(active)
              }

              this.hoverMeshes.push(highlightMesh)
              this.hoverIds.push(highlightMesh.userData.id)

              highlightMesh.position.copy(intersect.object.position)
              highlightMesh.scale.copy(intersect.object.scale)
              highlightMesh.material.visible = true
              highlightMesh.material.uniforms.uMaskChannel.value.fromArray(
                intersect.object.userData.maskChannel || [0, 0, 0]
              )
              highlightMesh.material.uniforms.uShineColor.value.setStyle(
                intersect.object.userData.color
              )
              gsap.fromTo(
                highlightMesh.material.uniforms.uShineOpacity,
                { value: 0.8 },
                {
                  value: 0,
                  ease: 'power2.out',
                  duration: 0.8,
                  onComplete: () => {
                    this.group.remove(highlightMesh)
                    Pool.free(highlightMesh)
                    this.hoverMeshes = _.without(
                      this.hoverMeshes,
                      highlightMesh
                    )
                    this.hoverIds = _.without(
                      this.hoverIds,
                      highlightMesh.userData.id
                    )
                  },
                }
              )
              gsap.fromTo(
                highlightMesh.material.uniforms.uShineT,
                { value: 0 },
                {
                  value: 1.1,
                  ease: 'power2.out',
                  duration: 0.8,
                }
              )

              this.group.add(highlightMesh)

              this.props.hoverName = intersect.object.userData.name
              this.hoverMesh = intersect.object
            }
            hitFound = true
          }
        }
      })
      if (!hitFound) {
        this.props.hoverName = null
        this.meshes.forEach(mesh => {
          if (mesh.userData.highlighted) {
            mesh.userData.highlighted = false
            gsap.killTweensOf(mesh.material.uniforms.uOpacity)
            gsap.to(mesh.material.uniforms.uOpacity, {
              value: 0,
              duration: 0.5,
              onComplete: () => (mesh.material.visible = false),
            })
          }
        })
      }
    },
    handleMouseDown(event) {
      this.clicking = true
    },
    handleMouseUp() {
      if (this.clicking) this.handleClick()
    },
    handleMouseMove() {
      this.clicking = false
    },
    handleClick() {
      // if (this.props.dragging) return
      if (this.props.hoverName) {
        this.props.hoverName = null
        this.$canvas.focusHotspot({
          name: this.props.hoverName,
          mesh: this.hoverMesh,
          id: this.hoverMesh.userData.id,
        })
      }
    },
  },
})

const Pool = {
  meshes: [],
  alloc({ props, options, map, maskMap }) {
    let mesh
    if (this.meshes.length) {
      mesh = Pool.meshes.pop()
    } else {
      mesh = new THREE.Mesh(
        g,
        new THREE.ShaderMaterial({
          ...Shader(),
          transparent: true,
          depthTest: false,
          visible: false,
        })
      )
      mesh.renderOrder = 2
    }
    mesh.material.uniforms.uPosition.value.set(
      props.containerOffset[0] * props.windowSize.pr,
      props.containerOffset[1] * props.windowSize.pr
    )
    mesh.material.uniforms.uScale.value = options.ref.parent.scale.x
    mesh.material.uniforms.uResolution.value.set(
      props.windowSize.width * props.windowSize.pr,
      props.windowSize.height * props.windowSize.pr
    )
    if (map) {
      mesh.material.uniforms.uImageAspect.value = mapWidth / mapHeight
      mesh.material.uniforms.uTexture.value = map
    }
    mesh.material.uniforms.uMaskTexture.value = maskMap
    return mesh
  },
  free(mesh) {
    this.meshes.push(mesh)
  },
}
