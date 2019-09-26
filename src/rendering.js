import { Geometry, MeshBasicMaterial, Mesh, Vector2, Face3, Color, 
  ShaderMaterial, DoubleSide, WebGLRenderer, Scene, PerspectiveCamera, Vector3,
  Object3D, SphereGeometry, Clock, CubeGeometry, TextureLoader, MeshFaceMaterial,
  Line, LineBasicMaterial, AxesHelper, Matrix4, CameraHelper, WebGLRenderTarget,
  RGBFormat, NearestFilter, DepthTexture, UnsignedShortType, PlaneBufferGeometry,
  OrthographicCamera, LinearFilter, Sprite, SpriteMaterial, CanvasTexture,
  BoxGeometry, DataTexture, Texture
} from 'three'
import HeightFieldShaderMaterial from './material/HeightFieldShaderMaterial'
import HeightField from './objects/HeightField'
import CameraControl from './controls/CameraControl'
import Stats from 'three/examples/js/libs/stats.min.js'
import { loadmtlobj } from './helper/LoadUtils'
import Bubble from './objects/Bubble'
import { createSpriteWithNumber } from './objects/SpriteWithNumber'

let scene, camera, renderer, object, controls
let stats
let init = () => {
  renderer = new WebGLRenderer({
    antialias: true
  })
  renderer.context.getExtension('GL_OES_standard_derivatives')
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  scene = new Scene()
  window.scene = scene
  // scene.background = new THREE.Color( 0xcce0ff );
  // scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
  camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
  object = new Object3D()
  let axisHelper = new AxesHelper(400)
  object.add(axisHelper)
  controls = new CameraControl({
    camera: object,
    face: new Vector3(1, 0, 0),
    domElement: document.body
  })
  stats = new Stats()
  document.body.appendChild(stats.domElement)
}
let resize = (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
init()
window.addEventListener('resize', resize, false)
window.camera = camera
window.renderer = renderer
window.controls = controls
var skyGeo = new CubeGeometry(8000, 8000, 8000)
var cubeMaterials = [
  // back side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/back.jpg'),
    side: DoubleSide
  }),
  // front side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/front.jpg'),
    side: DoubleSide
  }), 
  // Top side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/top.jpg'),
    side: DoubleSide
  }), 
  // Bottom side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/bottom.jpg'),
    side: DoubleSide
  }), 
  // right side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/right.jpg'),
    side: DoubleSide
  }), 
  // left side
  new MeshBasicMaterial({
    map: new TextureLoader().load('./examples/left.jpg'),
    side: DoubleSide
  }) 
];
var skyMaterial = new MeshFaceMaterial(cubeMaterials)
var skyBox = new Mesh(skyGeo, skyMaterial)
skyBox.rotateX(Math.PI / 2)
// scene.add(skyBox)
let heightField = new HeightField(8000, 8000, 200, 200)
heightField.content.material = new HeightFieldShaderMaterial({
  color: 0x372b35,
  wireframe: false,
  side: DoubleSide
})
controls._heightField = heightField
let geometry = heightField.content.geometry
let material = heightField.content.material
window.geometry = geometry
window.material = material
heightField.content.material.light = camera.position
// scene.add(heightField.content)
let bubbleReflectScene = new Object3D()
bubbleReflectScene.add(heightField.content)
bubbleReflectScene.add(skyBox)
scene.add(bubbleReflectScene)
// complete setup here

camera.position.copy(geometry.vertices[heightField.getVerticeIndex(40, 40, heightField._rows, heightField._columns)])
camera.position.z += controls._extraHeight
camera.up.set(0, 0, 1)
let face = new Vector3(1, 0, 0)
let cameraLookAt = controls.cameraLookAt
window.cameraLookAt = cameraLookAt
cameraLookAt(camera.position.clone(), camera.up.clone(), face.clone())

// todo
// add bubble, currently four
let bubbles = []
for (let i = 0; i < 5; ++i) {
  let bubble = new Bubble({
    radius: (10 + Math.random() * 15) * 1.1
  })
  bubble.position.copy(geometry.vertices[heightField.getVerticeIndex(18 + i, 25, heightField._rows, heightField._columns)])
  bubble.position.z = heightField.heightByFormula(bubble.position) + 30
  bubbles.push(bubble)
  scene.add(bubble)
}
window.bubbles = bubbles
// prepare update things
let updateBubble = (bubbleIndex) => {
  let bubble = bubbles[bubbleIndex]
  bubble.visible = false
  bubble.cubeCamera.update(renderer, scene)
  bubble.visible = true
}
let updateBubbles = () => {
  for (let i = 0; i < bubbles.length; ++i) {
    updateBubble(i)
  }
}
let changeBubblesAcce = () => {
  bubbles.map((b) => {
    b.acceleration = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).multiplyScalar(10)
  })
}
// view-source:https://stemkoski.github.io/Three.js/Bubble.html
// add collision
let sphereCollideBox = (position, radius, box, mesh) => {
  let vectors = [
    new Vector3(box.max.x, box.max.y, box.max.z),
    new Vector3(box.max.x, box.max.y, box.min.z),
    new Vector3(box.max.x, box.min.y, box.max.z),
    new Vector3(box.max.x, box.min.y, box.min.z),
    new Vector3(box.min.x, box.max.y, box.max.z),
    new Vector3(box.min.x, box.max.y, box.min.z),
    new Vector3(box.min.x, box.min.y, box.max.z),
    new Vector3(box.min.x, box.min.y, box.min.z)
  ]
  for (let i = 0; i < vectors.length; ++i) {
    let collide = vectors[i].applyMatrix4(mesh.matrixWorld).sub(position).length() <= radius
    if (collide) {
      return true
    }
  }
  return false
}
let bubblesCollide = (object) => {
  let meshArray = []
  object.traverse((thing) => {
    if (thing.isMesh) {
      meshArray.push(thing)
    }
  })
  let collideArray = []
  for (let i = 0; i < bubbles.length; ++i) {
    let bubble = bubbles[i]
    let collide = false
    for (let i = 0; i < meshArray.length; ++i) {
      let mesh = meshArray[i]
      let check = sphereCollideBox(bubble.position, bubble.radius, mesh.geometry.boundingBox, mesh)
      if (check) {
        collide = true
        break
      }
    }
    collideArray.push(collide)
  }
  return collideArray


  // for (var j = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {		
  //   var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
  //   var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
  //   var directionVector = globalVertex.sub( MovingCube.position );
    
  //   var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
  //   var collisionResults = ray.intersectObjects( collidableMeshList );
  //   if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
  //     appendText(" Hit ");
  // }
} 

// add headlights
let camera0 = new PerspectiveCamera(120, 1, 0.1, 1000)
camera0.quaternion.set(0, 0, 0, 1)
camera0.scale.set(1, 1, 1)
camera0.position.copy(new Vector3(-2.2, 3.4, -7.1).multiplyScalar(2))
camera0.rotateX(-Math.PI / 6)
camera0.rotateY(Math.PI / 10)
object.add(camera0)
heightField.content.material.uniforms.headLight0.value = camera0
// let helper0 = new CameraHelper(camera0)
// scene.add(helper0)
window.camera0 = camera0
let camera1 = new PerspectiveCamera(120, 1, 0.1, 1000)
camera1.quaternion.set(0, 0, 0, 1)
camera1.scale.set(1, 1, 1)
camera1.position.copy(new Vector3(2.2, 3.4, -7.1).multiplyScalar(2))
camera1.rotateX(-Math.PI / 6)
camera1.rotateY(-Math.PI / 10)
object.add(camera1)
heightField.content.material.uniforms.headLight1.value = camera1
// let helper1 = new CameraHelper(camera1)
// scene.add(helper1)
window.camera1 = camera1

camera0.color = new Color(1, 0.3, 0)
camera1.color = new Color(1, 0.3, 0)

let spritenumber = createSpriteWithNumber()
// spritenumber.sprite.position.copy(geometry.vertices[heightField.getVerticeIndex(20, 23, heightField._rows, heightField._columns)])
spritenumber.sprite.position.set(0, 0, -40)
spritenumber.sprite.scale.set(70,35,35)
spritenumber.sprite.center.y = 0
spritenumber.drawNumber('5')
object.add(spritenumber.sprite)

//-------key control-----
scene.add(object)
object.position.copy(geometry.vertices[heightField.getVerticeIndex(20, 20, heightField._rows, heightField._columns)])
object.position.z += controls._extraHeight
object.up.set(0, 0, 1)
cameraLookAt(object.position.clone(), object.up.clone(), face.clone())

window.angle = 40
let clock = new Clock()
let cameraIsFollowingCar = false
let accTime = 0
window.accTime = accTime
window.score = 0
let number = 4
let hideMsg = true
var animate = () => {
  requestAnimationFrame(animate)
  window.accTime = accTime
  let delta = clock.getDelta()
  if (accTime <= 5.4) {
    let number = Math.floor(5.4 - accTime)
    spritenumber.drawNumber(number.toString())
  }
  accTime += delta
  if (window.orbitControls && !cameraIsFollowingCar) {
    window.orbitControls.update()
  }
  if (controls && accTime > 5) {
    if (hideMsg) {
      spritenumber.sprite.visible = false
      hideMsg = false
    }
    controls.update(delta)
  }
  stats.update()
  heightField.content.material.light = object.position.clone().add(new Vector3(0, 0, 80)).add(
    controls._face.clone().multiplyScalar(40)
  )
  camera0.updateMatrix()
  camera0.updateMatrixWorld()
  camera0.updateProjectionMatrix()
  camera0.matrixWorldInverse = new Matrix4().getInverse(camera0.matrixWorld)
  camera0.worldPosition = new Vector3().setFromMatrixPosition(camera0.matrixWorld)
  camera0.coneCos = Math.cos(window.angle * Math.PI / 180)
  camera1.updateMatrix()
  camera1.updateMatrixWorld()
  camera1.updateProjectionMatrix()
  camera1.matrixWorldInverse = new Matrix4().getInverse(camera1.matrixWorld)
  camera1.worldPosition = new Vector3().setFromMatrixPosition(camera1.matrixWorld)
  camera1.coneCos = Math.cos(window.angle * Math.PI / 180)
  let bubblesCollideArray = bubblesCollide(object)
  bubblesCollideArray.map((collide, i) => {
    if (collide) {
      bubbles[i].position.copy(new Vector3(Math.random() * 3000, Math.random() * 3000, 0))
      window.score += bubbles[i].score
      spritenumber.sprite.visible = true
      spritenumber.drawNumber('+' + bubbles[i].score.toString(), 1)
      setTimeout(() => {spritenumber.sprite.visible = false}, 500)
      number = 5
      // console.log(i)
    }
  })
  for (let i = 0; i < number; ++i) {
    bubbles[i].move(delta, heightField)
  }
  updateBubbles()
  renderer.render(scene, camera)
}
// animate()
var changeColor = () => {
  var color = new THREE.Color( 0xffffff )
  color.setHex( Math.random() * 0xffffff )
  material.uniforms.color.value = color
}

window.cameraFollowCar = () => {
  // try to make camera follow car
  object.add(camera)
  camera.quaternion.set(0, 0, 0, 1)
  camera.scale.set(1, 1, 1)
  camera.position.copy(new Vector3(-1.7, 5.9, -0.5).multiplyScalar(2))
  camera.updateProjectionMatrix()
  cameraIsFollowingCar = true
}
window.cameraOut = () => {
  object.remove(camera)
  camera.position.copy(object.position)
  cameraIsFollowingCar = false
}

// use new car
loadmtlobj('./public/obj/BMW X5 4.mtl', './public/obj/BMW X5 4.obj', (group) => {
  // group.rotateX(Math.PI/2)
  group.rotateY(-Math.PI/2)

  let offset = 10
  // change phong to basic
  group.children.map((mesh) => {
    mesh.material = new MeshBasicMaterial({
      color: mesh.material.color,
      transparent: true,
      opacity: 0.7
    })
    mesh.geometry.computeBoundingBox()
    mesh.geometry.boundingBox.min.x -= offset
    mesh.geometry.boundingBox.min.y -= offset
    mesh.geometry.boundingBox.min.z -= offset
    mesh.geometry.boundingBox.max.x += offset
    mesh.geometry.boundingBox.max.y += offset
    mesh.geometry.boundingBox.max.z += offset
  })

  group.scale.set(0.2, 0.2, 0.2)

  object.add(group)

  window.object = object

  // ONLY FOR INIT ORIENTATION FOR CAR
  let wmap = controls._keyMap['w']
  controls._keyMap['w'] = true
  controls.update(0)
  controls._keyMap['w'] = wmap
  console.log('load complete')
  setInterval(changeColor, 1500)
  setInterval(changeBubblesAcce, 3000)
  cameraFollowCar()
  animate()
}, (e) => {
  console.warn('error', e)
})

let help1 = () => {
  console.log('help1')
}
export {
  help1
}
