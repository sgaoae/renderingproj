import { Vector3 } from 'three'

class CameraControl {
  constructor ({
    camera,
    face,
    heightField,
    domElement
  }) {
    this._camera = camera
    this._heightField = heightField
    this._face = face
    this._theta = 0
    this._speed = 0
    this._extraHeight = 5
    this.cameraLookAt = this.cameraLookAt.bind(this)
    this._keyMap = {}
    domElement.addEventListener('keydown', (e) => {
      // console.log(e)
      this._keyMap[e.key] = true
    }, false)
    domElement.addEventListener('keyup', (e) => {
      // console.log(e)
      this._keyMap[e.key] = false
    }, false)

    // helper information
    this._prevNormal = undefined
    this._realFace = undefined
  }

  update (delta = 0) {
    // console.log(delta)
    let acc = 200
    let maxSpeed = 500
    let camera = this._camera
    let heightField = this._heightField
    if (this._speed > 0) {
      this._speed = this._speed - acc * delta > 0 ? this._speed - acc * delta : 0
    } else if (this._speed < 0) {
      this._speed = this._speed + acc * delta < 0 ? this._speed + acc * delta : 0
    }
    if (this._keyMap['w']) {
      this._speed += (acc + 50) * delta
    }
    if (this._keyMap['s']) {
      this._speed -= (acc + 50) * delta
    }
    if (this._speed > maxSpeed) this._speed = maxSpeed
    if (this._speed < -maxSpeed) this._speed = -maxSpeed
    // console.log(this._speed)
    let cameraPosition = camera.position.clone().add(this._face.clone().multiplyScalar(this._speed * delta))
    cameraPosition.z = 0
    cameraPosition.z = heightField.heightByFormula(cameraPosition.clone())
    cameraPosition.z += this._extraHeight
    let normal = heightField.normalInPoint(cameraPosition)
    if (this._prevNormal) {
      normal.copy(this._prevNormal.clone().add(normal.clone().sub(this._prevNormal).multiplyScalar(delta))).normalize()
    }
    this._prevNormal = normal.clone()
    let realFace = this._face.clone().sub(normal.clone().multiplyScalar(this._face.dot(normal) / this._face.length()))
    this.cameraLookAt(cameraPosition, normal, realFace)
    this._updateDirection()
    this._realFace = realFace

    let maxBound = 3900
    if (cameraPosition.x > maxBound || cameraPosition.x < -maxBound) {
      let sign = cameraPosition.x * this._speed * this._face.x
      if (sign > 0) {
        this._speed = -this._speed
      }
    }
    if (cameraPosition.y > maxBound || cameraPosition.y < -maxBound) {
      let sign = cameraPosition.y * this._speed * this._face.y
      if (sign > 0) {
        this._speed = -this._speed
      }
    }
  }

  _updateDirection () {
    if (this._keyMap['a']) {
      this._face.set(
        Math.cos(this._theta), Math.sin(this._theta), 0
      )
      this._theta += 0.02
    }
    if (this._keyMap['d']) {
      this._face.set(
        Math.cos(this._theta), Math.sin(this._theta), 0
      )
      this._theta -= 0.02
    }
  }

  cameraLookAt (position, up, face) {
    let camera = this._camera
    camera.matrix.setPosition(position).lookAt(position, face.clone().add(position), up)
    camera.matrix.decompose(camera.position, camera.quaternion, new Vector3())
  }
}

export default CameraControl
