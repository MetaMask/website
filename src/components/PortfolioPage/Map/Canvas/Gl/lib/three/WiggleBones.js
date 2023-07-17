import * as THREE from 'three'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

import {
  clamp,
  lerp,
} from 'src/components/PortfolioPage/Map/Canvas/Gl/lib/math'

const DEG2RAD = Math.PI / 180

const defaultOptions = {
  bounceFactor: 0.03,
  wobbleFactor: 10,
  maxTranslation: 0.05,
  maxRotationDegrees: 5 * DEG2RAD,
  maxStretch: 1,
}

const bsGeo = new THREE.SphereGeometry(0.01)
bsGeo.translate(0, -0.01 / 2, 0)
const bpGeo = new THREE.CylinderGeometry(0, 0.01, 0.1, 4, 1)
bpGeo.translate(0, 0.05, 0)
const boneGeo = BufferGeometryUtils.mergeBufferGeometries([bsGeo, bpGeo])
boneGeo.rotateX(Math.PI / 2)

export { boneGeo }

const helper = new THREE.Mesh(
  new THREE.SphereGeometry(0.03),
  new THREE.MeshBasicMaterial({
    color: 'blue',
    depthTest: false,
    transparent: true,
    visible: false,
    toneMapped: false,
  })
)
helper.renderOrder = 999
const helper2 = new THREE.Mesh(
  boneGeo,
  new THREE.MeshBasicMaterial({
    color: 'yellow',
    depthTest: false,
    transparent: true,
    opacity: 0.1,
    visible: false,
    toneMapped: false,
  })
)
helper2.renderOrder = 9999
const helper3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.02),
  new THREE.MeshBasicMaterial({
    color: 'yellow',
    depthTest: false,
    transparent: true,
    opacity: 0.1,
    visible: false,
    toneMapped: false,
  })
)
helper3.renderOrder = 999

const animatedBoneWorldPosition = new THREE.Vector3()
const animatedBoneWorldRotation = new THREE.Quaternion()
const goalPosition = new THREE.Vector3()
const goalRotation = new THREE.Quaternion()

class WiggleBone {
  constructor(target, options = {}) {
    this.options = { ...defaultOptions, ...options }
    this.target = target
    this.targetHelper = helper.clone()
    if (options.scene) options.scene.add(this.targetHelper)
    this.currentHelper = helper2.clone()
    if (options.scene) options.scene.add(this.currentHelper)
    this.currentHelper.add(helper3.clone())
    this.currentHelper.children[0].position.y = -0.1

    this.originPosition = target.position.clone()
    this.oldBoneWorldPosition = new THREE.Vector3()
    this.oldBoneWorldRotation = new THREE.Quaternion()
    this.target.getWorldPosition(this.oldBoneWorldPosition)
    this.target.getWorldQuaternion(this.oldBoneWorldRotation)
  }
  reset() {
    this.target.position.copy(this.originPosition)
    this.target.updateMatrixWorld(true, false)
    this.target.getWorldPosition(this.oldBoneWorldPosition)
  }
  update(dt) {
    this.target.parent.updateMatrixWorld(true, false)

    this.targetHelper.position.copy(this.originPosition)
    this.target.parent.localToWorld(this.targetHelper.position)

    // animatedBoneWorldPosition.copy(this.originPosition);
    // this.target.localToWorld(animatedBoneWorldPosition);

    // this.target.getWorldQuaternion(animatedBoneWorldRotation);

    nlerpVectors(
      goalPosition,
      this.oldBoneWorldPosition,
      this.targetHelper.position,
      this.options.bounceFactor * dt
    )
    if (dt > 10) {
      nlerpVectors(
        goalPosition,
        this.oldBoneWorldPosition,
        this.targetHelper.position,
        this.options.bounceFactor * dt
      )
    }

    this.target.position.copy(goalPosition)
    this.target.parent.worldToLocal(this.target.position)
    this.oldBoneWorldPosition.copy(goalPosition)

    const parentPosition = this.target.parent.getWorldPosition(
      new THREE.Vector3()
    )
    this.currentHelper.position.copy(goalPosition)
    this.currentHelper.updateMatrixWorld(true, false)

    this.currentHelper.lookAt(parentPosition)

    const lookAtPosition = this.currentHelper.children[0].getWorldPosition(
      new THREE.Vector3()
    )

    const unit = this.target.position.clone()
    unit.normalize()

    this.target.up.set(0, 1, 0)

    this.target.quaternion.setFromUnitVectors(this.target.up, unit)
    let l = Math.min(this.target.position.length(), this.options.maxStretch)
    this.target.position.set(0, l, 0)

    this.target.updateMatrix()
  }
}

const aux = new THREE.Vector3()
THREE.Vector3.prototype.moveTowards = function(target, step) {
  // newPos = startPos + (endPos - startPos).normalized * maxDist;
  aux.copy(target).sub(this)
  const l = aux.length()
  const _s = clamp(step, 0, l)
  aux.setLength(_s)
  this.add(aux)
}

export { WiggleBone }

//https://stackoverflow.com/questions/67919193/how-does-unity-implements-vector3-slerp-exactly

const relative = new THREE.Vector3()
function slerpVectors(target, start, end, percent) {
  // Dot product - the cosine of the angle between 2 vectors.
  let dot = start.dot(end)
  // console.log(dot);

  // Clamp it to be in the range of Acos()
  // This may be unnecessary, but floating point
  // precision can be a fickle mistress.
  dot = clamp(dot, -1.0, 1.0)

  // Acos(dot) returns the angle between start and end,
  // And multiplying that by percent returns the angle between
  // start and the final result.
  const theta = Math.acos(dot) * percent

  relative.copy(end)
  relative.x -= start.x * dot
  relative.y -= start.y * dot
  relative.z -= start.z * dot

  relative.normalize()

  // Orthonormal basis
  // The final result.
  const cosTheta = Math.cos(theta)
  const sinTheta = Math.sin(theta)

  target.x = start.x * cosTheta + relative.x * sinTheta
  target.y = start.y * cosTheta + relative.y * sinTheta
  target.z = start.z * cosTheta + relative.z * sinTheta

  return target
}

// https://keithmaggio.wordpress.com/2011/02/15/math-magician-lerp-slerp-and-nlerp/
const normalizedEnd = new THREE.Vector3()
function nlerpVectors(target, start, end, percent) {
  const lengthStart = start.length()
  const lengthEnd = end.length()
  normalizedEnd.copy(end).normalize()
  target
    .copy(start)
    .normalize()
    .lerp(normalizedEnd, percent)
    .normalize()
    .multiplyScalar(lerp(percent, lengthStart, lengthEnd))
}
