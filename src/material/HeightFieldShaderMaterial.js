import { ShaderMaterial, Color, Vector3, Matrix4 } from 'three'

class HeightFieldShaderMaterial extends ShaderMaterial {
  constructor (options) {
    super(options)
    this.uniforms = {
      color: {
        type: 'v3',
        value: new Color(options.color)
      },
      light: {
        type: 'v3',
        value: new Vector3()
      },
      lightColor: {
        type: 'v3',
        value: new Color(0.2, 0.5, 1.0)
      },
      heightInterval: {
        type: 'f',
        value: 40
      },
      lineWidth: {
        type: 'f',
        value: 10
      },
      headLight0: {
        value: {
          projectionMatrix: new Matrix4(),
          matrixWorldInverse: new Matrix4()
        }
      },
      headLight1: {
        value: {
          projectionMatrix: new Matrix4(),
          matrixWorldInverse: new Matrix4()
        }
      }
    }
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader
    this.side = options.side
    this.wireframe = options.wireframe

    this.extensions.derivatives = true
  }

  set light (_light) {
    this.uniforms.light.value = _light
  }
  set lightColor (color) {
    this.uniforms.lightColor.value = color
  }

  set heightInterval (interval) {
    this.uniforms.heightInterval.value = interval
  }

  set lineWidth (width) {
    this.uniforms.lineWidth.value = width
  }
}

const vertexShader = `
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vLight;

varying vec3 modelPosition;
varying float slope;

uniform vec3 light;

mat4 scaleBiasedMatrix = mat4(0.5, 0.0, 0.0, 0.0,
  0.0, 0.5, 0.0, 0.0,
  0.0, 0.0, 0.5, 0.0,
  0.5, 0.5, 0.5, 1.0);
struct HeadLight {
  mat4 projectionMatrix;
  mat4 matrixWorldInverse;
  vec3 color;
  vec3 worldPosition;
  float coneCos;
};
uniform HeadLight headLight0;
varying vec4 hlPosition0;

uniform HeadLight headLight1;
varying vec4 hlPosition1;

void main () {
  modelPosition = position;
  slope = normalize(normal).z;

  vec4 inPosition = vec4(position, 1.0);
  vec4 vPosition4 = modelViewMatrix * inPosition;
  vPosition = vPosition4.xyz / vPosition4.w;
  vec4 vLight4 = modelViewMatrix * vec4(
    light.x, light.y, light.z + 10.0, 1.0
  );
  vLight = vLight4.xyz / vLight4.w;
  vNormal = normalize(normalMatrix * normal);
  vec4 modelPosition = modelViewMatrix * inPosition;
  gl_Position = projectionMatrix * modelPosition;

  hlPosition0 = scaleBiasedMatrix * headLight0.projectionMatrix * headLight0.matrixWorldInverse * modelMatrix * inPosition;
  hlPosition1 = scaleBiasedMatrix * headLight1.projectionMatrix * headLight1.matrixWorldInverse * modelMatrix * inPosition;
}
`

const fragmentShader = `
#include <common>
#include <bsdfs>
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vLight;
uniform vec3 color;
uniform vec3 lightColor;

varying vec3 modelPosition;
varying float slope;
uniform float heightInterval;
uniform float lineWidth;

struct HeadLight {
  mat4 projectionMatrix;
  mat4 matrixWorldInverse;
  vec3 color;
  vec3 worldPosition;
  float coneCos;
};
uniform HeadLight headLight0;
varying vec4 hlPosition0;

uniform HeadLight headLight1;
varying vec4 hlPosition1;

void main () {
  vec3 finalColor = vec3(0.0);
  finalColor += color * clamp(dot(normalize(vec3(1.0)), vNormal), 0.0, 1.0);

  float f = abs(2.0 * fract(modelPosition.z / heightInterval) - 1.0);
  float df = fwidth(modelPosition.z / heightInterval);
  float fLimit0 = lineWidth / heightInterval * (1.0 + slope);
  float fLimit = fLimit0;
  float lineMix = f < fLimit ? f / fLimit : 1.0;
  vec4 lineColor = vec4(0.0, 0.0, 1.0, 1.0);

  finalColor = mix(lineColor, vec4(finalColor, 1.0), lineMix).rgb;

  vec3 direction = normalize(vLight - vPosition);
  float ndotl = clamp(dot(direction, vNormal), 0.0, 1.0);
  finalColor += lightColor * ndotl;

  float x0 = hlPosition0.x / hlPosition0.w;
  float y0 = hlPosition0.y / hlPosition0.w;
  float z0 = hlPosition0.z / hlPosition0.w;
  float x1 = hlPosition1.x / hlPosition1.w;
  float y1 = hlPosition1.y / hlPosition1.w;
  float z1 = hlPosition1.z / hlPosition1.w;
  float a0 = step(0.0, x0) - step(1.0, x0);
  float b0 = step(0.0, y0) - step(1.0, y0);
  float c0 = step(0.0, z0) - step(1.0, z0);
  float a1 = step(0.0, x1) - step(1.0, x1);
  float b1 = step(0.0, y1) - step(1.0, y1);
  float c1 = step(0.0, z1) - step(1.0, z1);
  if (
    (a0 == 1.0 && b0 == 1.0 && c0 == 1.0) ||
    (a1 == 1.0 && b1 == 1.0 && c1 == 1.0)
  ) {
    vec3 hlColor0 = vec3(0.0);
    vec3 hlColor1 = vec3(0.0);
    float angleCos;
    float lightDistance;
    lightDistance = length(headLight0.worldPosition - vPosition);
    angleCos = dot(
      normalize(vec3(x0, y0, z0) - vec3(0.5)),
      vec3(0, 0, 1)
    );
    if (angleCos > headLight0.coneCos) {
      float spotEffect = smoothstep( headLight0.coneCos, 1.0, angleCos );
      hlColor0 = vec3(spotEffect) * headLight0.color * punctualLightIntensityToIrradianceFactor(
        lightDistance, 18000.0, 1.0
      );
    }
    lightDistance = length(headLight1.worldPosition - vPosition);
    angleCos = dot(
      normalize(vec3(x1, y1, z1) - vec3(0.5)),
      vec3(0, 0, 1)
    );
    if (angleCos > headLight1.coneCos) {
      float spotEffect = smoothstep( headLight1.coneCos, 1.0, angleCos );
      hlColor1 = vec3(spotEffect) * headLight1.color * punctualLightIntensityToIrradianceFactor(
        lightDistance, 18000.0, 1.0
      );
    }
    finalColor += mix(vec4(hlColor0, 1.0), vec4(hlColor1, 1.0), 0.5).xyz;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
`

export default HeightFieldShaderMaterial
