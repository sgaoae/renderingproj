import { 
  Object3D, SphereBufferGeometry, CubeCamera, Mesh, ShaderMaterial, Color, Vector3
} from 'three'
import { createSpriteWithNumber } from './SpriteWithNumber'

// written based on https://stemkoski.github.io/Three.js/Bubble.html
class Bubble extends Object3D {
  constructor ({
    radius
  }) {
    super()
    let resolution = radius / 25 * 256
    let power = Math.round(Math.log2(resolution))
    resolution = Math.pow(2, power)
    // resolution = resolution > 256 ? 256 : resolution
    let cubeCamera = new CubeCamera(1, 8000, resolution)
    console.log(radius, power, resolution)
    this.cubeCamera = cubeCamera
    this.add(cubeCamera)

    let spheregeo = new SphereBufferGeometry(1, 16, 16)

    this.radius = radius

    let bubbleMaterial = new ShaderMaterial({
      uniforms: {
        refractRatio: {
          type: 'f', value: 1.02
        },
        fresnelBias: {
          type: 'f', value: 0.1
        },
        fresnelPower: {
          type: 'f', value: 2.0
        },
        fresnelScale: {
          type: 'f', value: 1.0
        },
        tCube: {
          type: 't', value: cubeCamera.renderTarget
        },
        color: {
          type: 'v3', value: new Color(0xffffff)
        }
      },
      vertexShader, fragmentShader
    })
    let bubble = new Mesh(
      spheregeo, bubbleMaterial
    )
    bubble.scale.set(radius, radius, radius)
    this.add(bubble)
    this._bubble = bubble

    this.score = Math.floor(radius / 25 * 10)
    this.score = this.score > 9 ? 9 : this.score

    this.spriteManager = createSpriteWithNumber()
    this.spriteManager.sprite.position.z = radius * 1.5
    this.spriteManager.sprite.scale.set(40, 20, 20)
    this.spriteManager.sprite.material.depthTest = false
    this.add(this.spriteManager.sprite)
    this.spriteManager.drawNumber(this.score.toString())

    this.velocity = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).multiplyScalar(200)
    this.acceleration = new Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    ).multiplyScalar(10)
  }

  set color (_c) {
    this._bubble.material.uniforms.color.value = new Color(_c)
  }

  move (delta, heightField) {
    this.position.add(this.velocity.clone().multiplyScalar(delta))
    this.velocity.add(this.acceleration.clone().multiplyScalar(delta))
    if (Math.abs(this.position.x) > 3000) {
      this.velocity.x = this.position.x * this.velocity.x >= 0 ? -this.velocity.x : this.velocity.x
    }
    if (Math.abs(this.position.y) > 3000) {
      this.velocity.y = this.position.y * this.velocity.y >= 0 ? -this.velocity.y : this.velocity.y
    }
    let height = heightField.heightByFormula(this.position) + this.radius + 0.1
    if (this.position.z < height) {
      this.position.z = height
    }
    if (this.position.z > height + 5) {
      this.position.z = height + 5
    }
  }
}

let vertexShader = 
`
uniform float refractRatio;
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {

  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

  vec3 I = worldPosition.xyz - cameraPosition;

  vReflect = reflect( I, worldNormal );
  vRefract[0] = refract( normalize( I ), worldNormal, refractRatio );
  vRefract[1] = refract( normalize( I ), worldNormal, refractRatio * 0.99 );
  vRefract[2] = refract( normalize( I ), worldNormal, refractRatio * 0.98 );
  vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

  gl_Position = projectionMatrix * mvPosition;

}
`

let fragmentShader = 
`
uniform samplerCube tCube;
uniform vec3 color;

varying vec3 vReflect;
varying vec3 vRefract[3];
varying float vReflectionFactor;

void main() {

  vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );
  vec4 refractedColor = vec4( 1.0 );

  refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;
  refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;
  refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;

  gl_FragColor = vec4(color, 1.0) * mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );

}
`

export default Bubble
