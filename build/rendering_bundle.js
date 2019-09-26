(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rendering"] = factory(require("three"));
	else
		root["rendering"] = factory(root["THREE"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/three/examples/js/libs/stats.min.js":
/*!**********************************************************!*\
  !*** ./node_modules/three/examples/js/libs/stats.min.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// stats.js - http://github.com/mrdoob/stats.js
var Stats=function(){function h(a){c.appendChild(a.dom);return a}function k(a){for(var d=0;d<c.children.length;d++)c.children[d].style.display=d===a?"block":"none";l=a}var l=0,c=document.createElement("div");c.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000";c.addEventListener("click",function(a){a.preventDefault();k(++l%c.children.length)},!1);var g=(performance||Date).now(),e=g,a=0,r=h(new Stats.Panel("FPS","#0ff","#002")),f=h(new Stats.Panel("MS","#0f0","#020"));
if(self.performance&&self.performance.memory)var t=h(new Stats.Panel("MB","#f08","#201"));k(0);return{REVISION:16,dom:c,addPanel:h,showPanel:k,begin:function(){g=(performance||Date).now()},end:function(){a++;var c=(performance||Date).now();f.update(c-g,200);if(c>e+1E3&&(r.update(1E3*a/(c-e),100),e=c,a=0,t)){var d=performance.memory;t.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return c},update:function(){g=this.end()},domElement:c,setMode:k}};
Stats.Panel=function(h,k,l){var c=Infinity,g=0,e=Math.round,a=e(window.devicePixelRatio||1),r=80*a,f=48*a,t=3*a,u=2*a,d=3*a,m=15*a,n=74*a,p=30*a,q=document.createElement("canvas");q.width=r;q.height=f;q.style.cssText="width:80px;height:48px";var b=q.getContext("2d");b.font="bold "+9*a+"px Helvetica,Arial,sans-serif";b.textBaseline="top";b.fillStyle=l;b.fillRect(0,0,r,f);b.fillStyle=k;b.fillText(h,t,u);b.fillRect(d,m,n,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d,m,n,p);return{dom:q,update:function(f,
v){c=Math.min(c,f);g=Math.max(g,f);b.fillStyle=l;b.globalAlpha=1;b.fillRect(0,0,r,m);b.fillStyle=k;b.fillText(e(f)+" "+h+" ("+e(c)+"-"+e(g)+")",t,u);b.drawImage(q,d+a,m,n-a,p,d,m,n-a,p);b.fillRect(d+n-a,m,a,p);b.fillStyle=l;b.globalAlpha=.9;b.fillRect(d+n-a,m,a,e((1-f/v)*p))}}}; true&&(module.exports=Stats);


/***/ }),

/***/ "./src/controls/CameraControl.js":
/*!***************************************!*\
  !*** ./src/controls/CameraControl.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "three");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CameraControl = function () {
  function CameraControl(_ref) {
    var _this = this;

    var camera = _ref.camera,
        face = _ref.face,
        heightField = _ref.heightField,
        domElement = _ref.domElement;

    _classCallCheck(this, CameraControl);

    this._camera = camera;
    this._heightField = heightField;
    this._face = face;
    this._theta = 0;
    this._speed = 0;
    this._extraHeight = 5;
    this.cameraLookAt = this.cameraLookAt.bind(this);
    this._keyMap = {};
    domElement.addEventListener('keydown', function (e) {
      // console.log(e)
      _this._keyMap[e.key] = true;
    }, false);
    domElement.addEventListener('keyup', function (e) {
      // console.log(e)
      _this._keyMap[e.key] = false;
    }, false);

    // helper information
    this._prevNormal = undefined;
    this._realFace = undefined;
  }

  _createClass(CameraControl, [{
    key: 'update',
    value: function update() {
      var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // console.log(delta)
      var acc = 200;
      var maxSpeed = 500;
      var camera = this._camera;
      var heightField = this._heightField;
      if (this._speed > 0) {
        this._speed = this._speed - acc * delta > 0 ? this._speed - acc * delta : 0;
      } else if (this._speed < 0) {
        this._speed = this._speed + acc * delta < 0 ? this._speed + acc * delta : 0;
      }
      if (this._keyMap['w']) {
        this._speed += (acc + 50) * delta;
      }
      if (this._keyMap['s']) {
        this._speed -= (acc + 50) * delta;
      }
      if (this._speed > maxSpeed) this._speed = maxSpeed;
      if (this._speed < -maxSpeed) this._speed = -maxSpeed;
      // console.log(this._speed)
      var cameraPosition = camera.position.clone().add(this._face.clone().multiplyScalar(this._speed * delta));
      cameraPosition.z = 0;
      cameraPosition.z = heightField.heightByFormula(cameraPosition.clone());
      cameraPosition.z += this._extraHeight;
      var normal = heightField.normalInPoint(cameraPosition);
      if (this._prevNormal) {
        normal.copy(this._prevNormal.clone().add(normal.clone().sub(this._prevNormal).multiplyScalar(delta))).normalize();
      }
      this._prevNormal = normal.clone();
      var realFace = this._face.clone().sub(normal.clone().multiplyScalar(this._face.dot(normal) / this._face.length()));
      this.cameraLookAt(cameraPosition, normal, realFace);
      this._updateDirection();
      this._realFace = realFace;

      var maxBound = 3900;
      if (cameraPosition.x > maxBound || cameraPosition.x < -maxBound) {
        var sign = cameraPosition.x * this._speed * this._face.x;
        if (sign > 0) {
          this._speed = -this._speed;
        }
      }
      if (cameraPosition.y > maxBound || cameraPosition.y < -maxBound) {
        var _sign = cameraPosition.y * this._speed * this._face.y;
        if (_sign > 0) {
          this._speed = -this._speed;
        }
      }
    }
  }, {
    key: '_updateDirection',
    value: function _updateDirection() {
      if (this._keyMap['a']) {
        this._face.set(Math.cos(this._theta), Math.sin(this._theta), 0);
        this._theta += 0.02;
      }
      if (this._keyMap['d']) {
        this._face.set(Math.cos(this._theta), Math.sin(this._theta), 0);
        this._theta -= 0.02;
      }
    }
  }, {
    key: 'cameraLookAt',
    value: function cameraLookAt(position, up, face) {
      var camera = this._camera;
      camera.matrix.setPosition(position).lookAt(position, face.clone().add(position), up);
      camera.matrix.decompose(camera.position, camera.quaternion, new _three.Vector3());
    }
  }]);

  return CameraControl;
}();

exports.default = CameraControl;

/***/ }),

/***/ "./src/helper/LoadUtils.js":
/*!*********************************!*\
  !*** ./src/helper/LoadUtils.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// import OBJLoader from 'three/examples/js/loaders/OBJLoader'
// import MTLLoader from 'three/examples/js/loaders/MTLLoader'

var loadmtl = function loadmtl(mtlpath, onLoad, onProgress, onError) {
  new THREE.MTLLoader().load(mtlpath, onLoad, onProgress, onError);
};
var loadobj = function loadobj(objpath, materials, onLoad, onProgress, onError) {
  new THREE.OBJLoader().setMaterials(materials).load(objpath, onLoad, onProgress, onError);
};
var loadmtlobj = function loadmtlobj(mtlpath, objpath, onLoad, onError) {
  loadmtl(mtlpath, function (materials) {
    console.log(materials);
    loadobj(objpath, materials, onLoad, undefined, onError);
  }, undefined, onError);
};

exports.loadmtl = loadmtl;
exports.loadobj = loadobj;
exports.loadmtlobj = loadmtlobj;

/***/ }),

/***/ "./src/material/HeightFieldShaderMaterial.js":
/*!***************************************************!*\
  !*** ./src/material/HeightFieldShaderMaterial.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "three");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HeightFieldShaderMaterial = function (_ShaderMaterial) {
  _inherits(HeightFieldShaderMaterial, _ShaderMaterial);

  function HeightFieldShaderMaterial(options) {
    _classCallCheck(this, HeightFieldShaderMaterial);

    var _this = _possibleConstructorReturn(this, (HeightFieldShaderMaterial.__proto__ || Object.getPrototypeOf(HeightFieldShaderMaterial)).call(this, options));

    _this.uniforms = {
      color: {
        type: 'v3',
        value: new _three.Color(options.color)
      },
      light: {
        type: 'v3',
        value: new _three.Vector3()
      },
      lightColor: {
        type: 'v3',
        value: new _three.Color(0.2, 0.5, 1.0)
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
          projectionMatrix: new _three.Matrix4(),
          matrixWorldInverse: new _three.Matrix4()
        }
      },
      headLight1: {
        value: {
          projectionMatrix: new _three.Matrix4(),
          matrixWorldInverse: new _three.Matrix4()
        }
      }
    };
    _this.vertexShader = vertexShader;
    _this.fragmentShader = fragmentShader;
    _this.side = options.side;
    _this.wireframe = options.wireframe;

    _this.extensions.derivatives = true;
    return _this;
  }

  _createClass(HeightFieldShaderMaterial, [{
    key: 'light',
    set: function set(_light) {
      this.uniforms.light.value = _light;
    }
  }, {
    key: 'lightColor',
    set: function set(color) {
      this.uniforms.lightColor.value = color;
    }
  }, {
    key: 'heightInterval',
    set: function set(interval) {
      this.uniforms.heightInterval.value = interval;
    }
  }, {
    key: 'lineWidth',
    set: function set(width) {
      this.uniforms.lineWidth.value = width;
    }
  }]);

  return HeightFieldShaderMaterial;
}(_three.ShaderMaterial);

var vertexShader = '\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vLight;\n\nvarying vec3 modelPosition;\nvarying float slope;\n\nuniform vec3 light;\n\nmat4 scaleBiasedMatrix = mat4(0.5, 0.0, 0.0, 0.0,\n  0.0, 0.5, 0.0, 0.0,\n  0.0, 0.0, 0.5, 0.0,\n  0.5, 0.5, 0.5, 1.0);\nstruct HeadLight {\n  mat4 projectionMatrix;\n  mat4 matrixWorldInverse;\n  vec3 color;\n  vec3 worldPosition;\n  float coneCos;\n};\nuniform HeadLight headLight0;\nvarying vec4 hlPosition0;\n\nuniform HeadLight headLight1;\nvarying vec4 hlPosition1;\n\nvoid main () {\n  modelPosition = position;\n  slope = normalize(normal).z;\n\n  vec4 inPosition = vec4(position, 1.0);\n  vec4 vPosition4 = modelViewMatrix * inPosition;\n  vPosition = vPosition4.xyz / vPosition4.w;\n  vec4 vLight4 = modelViewMatrix * vec4(\n    light.x, light.y, light.z + 10.0, 1.0\n  );\n  vLight = vLight4.xyz / vLight4.w;\n  vNormal = normalize(normalMatrix * normal);\n  vec4 modelPosition = modelViewMatrix * inPosition;\n  gl_Position = projectionMatrix * modelPosition;\n\n  hlPosition0 = scaleBiasedMatrix * headLight0.projectionMatrix * headLight0.matrixWorldInverse * modelMatrix * inPosition;\n  hlPosition1 = scaleBiasedMatrix * headLight1.projectionMatrix * headLight1.matrixWorldInverse * modelMatrix * inPosition;\n}\n';

var fragmentShader = '\n#include <common>\n#include <bsdfs>\nvarying vec3 vPosition;\nvarying vec3 vNormal;\nvarying vec3 vLight;\nuniform vec3 color;\nuniform vec3 lightColor;\n\nvarying vec3 modelPosition;\nvarying float slope;\nuniform float heightInterval;\nuniform float lineWidth;\n\nstruct HeadLight {\n  mat4 projectionMatrix;\n  mat4 matrixWorldInverse;\n  vec3 color;\n  vec3 worldPosition;\n  float coneCos;\n};\nuniform HeadLight headLight0;\nvarying vec4 hlPosition0;\n\nuniform HeadLight headLight1;\nvarying vec4 hlPosition1;\n\nvoid main () {\n  vec3 finalColor = vec3(0.0);\n  finalColor += color * clamp(dot(normalize(vec3(1.0)), vNormal), 0.0, 1.0);\n\n  float f = abs(2.0 * fract(modelPosition.z / heightInterval) - 1.0);\n  float df = fwidth(modelPosition.z / heightInterval);\n  float fLimit0 = lineWidth / heightInterval * (1.0 + slope);\n  float fLimit = fLimit0;\n  float lineMix = f < fLimit ? f / fLimit : 1.0;\n  vec4 lineColor = vec4(0.0, 0.0, 1.0, 1.0);\n\n  finalColor = mix(lineColor, vec4(finalColor, 1.0), lineMix).rgb;\n\n  vec3 direction = normalize(vLight - vPosition);\n  float ndotl = clamp(dot(direction, vNormal), 0.0, 1.0);\n  finalColor += lightColor * ndotl;\n\n  float x0 = hlPosition0.x / hlPosition0.w;\n  float y0 = hlPosition0.y / hlPosition0.w;\n  float z0 = hlPosition0.z / hlPosition0.w;\n  float x1 = hlPosition1.x / hlPosition1.w;\n  float y1 = hlPosition1.y / hlPosition1.w;\n  float z1 = hlPosition1.z / hlPosition1.w;\n  float a0 = step(0.0, x0) - step(1.0, x0);\n  float b0 = step(0.0, y0) - step(1.0, y0);\n  float c0 = step(0.0, z0) - step(1.0, z0);\n  float a1 = step(0.0, x1) - step(1.0, x1);\n  float b1 = step(0.0, y1) - step(1.0, y1);\n  float c1 = step(0.0, z1) - step(1.0, z1);\n  if (\n    (a0 == 1.0 && b0 == 1.0 && c0 == 1.0) ||\n    (a1 == 1.0 && b1 == 1.0 && c1 == 1.0)\n  ) {\n    vec3 hlColor0 = vec3(0.0);\n    vec3 hlColor1 = vec3(0.0);\n    float angleCos;\n    float lightDistance;\n    lightDistance = length(headLight0.worldPosition - vPosition);\n    angleCos = dot(\n      normalize(vec3(x0, y0, z0) - vec3(0.5)),\n      vec3(0, 0, 1)\n    );\n    if (angleCos > headLight0.coneCos) {\n      float spotEffect = smoothstep( headLight0.coneCos, 1.0, angleCos );\n      hlColor0 = vec3(spotEffect) * headLight0.color * punctualLightIntensityToIrradianceFactor(\n        lightDistance, 18000.0, 1.0\n      );\n    }\n    lightDistance = length(headLight1.worldPosition - vPosition);\n    angleCos = dot(\n      normalize(vec3(x1, y1, z1) - vec3(0.5)),\n      vec3(0, 0, 1)\n    );\n    if (angleCos > headLight1.coneCos) {\n      float spotEffect = smoothstep( headLight1.coneCos, 1.0, angleCos );\n      hlColor1 = vec3(spotEffect) * headLight1.color * punctualLightIntensityToIrradianceFactor(\n        lightDistance, 18000.0, 1.0\n      );\n    }\n    finalColor += mix(vec4(hlColor0, 1.0), vec4(hlColor1, 1.0), 0.5).xyz;\n  }\n\n  gl_FragColor = vec4(finalColor, 1.0);\n}\n';

exports.default = HeightFieldShaderMaterial;

/***/ }),

/***/ "./src/objects/Bubble.js":
/*!*******************************!*\
  !*** ./src/objects/Bubble.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "three");

var _SpriteWithNumber = __webpack_require__(/*! ./SpriteWithNumber */ "./src/objects/SpriteWithNumber.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// written based on https://stemkoski.github.io/Three.js/Bubble.html
var Bubble = function (_Object3D) {
  _inherits(Bubble, _Object3D);

  function Bubble(_ref) {
    var radius = _ref.radius;

    _classCallCheck(this, Bubble);

    var _this = _possibleConstructorReturn(this, (Bubble.__proto__ || Object.getPrototypeOf(Bubble)).call(this));

    var resolution = radius / 25 * 256;
    var power = Math.round(Math.log2(resolution));
    resolution = Math.pow(2, power);
    // resolution = resolution > 256 ? 256 : resolution
    var cubeCamera = new _three.CubeCamera(1, 8000, resolution);
    console.log(radius, power, resolution);
    _this.cubeCamera = cubeCamera;
    _this.add(cubeCamera);

    var spheregeo = new _three.SphereBufferGeometry(1, 16, 16);

    _this.radius = radius;

    var bubbleMaterial = new _three.ShaderMaterial({
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
          type: 'v3', value: new _three.Color(0xffffff)
        }
      },
      vertexShader: vertexShader, fragmentShader: fragmentShader
    });
    var bubble = new _three.Mesh(spheregeo, bubbleMaterial);
    bubble.scale.set(radius, radius, radius);
    _this.add(bubble);
    _this._bubble = bubble;

    _this.score = Math.floor(radius / 25 * 10);
    _this.score = _this.score > 9 ? 9 : _this.score;

    _this.spriteManager = (0, _SpriteWithNumber.createSpriteWithNumber)();
    _this.spriteManager.sprite.position.z = radius * 1.5;
    _this.spriteManager.sprite.scale.set(40, 20, 20);
    _this.spriteManager.sprite.material.depthTest = false;
    _this.add(_this.spriteManager.sprite);
    _this.spriteManager.drawNumber(_this.score.toString());

    _this.velocity = new _three.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(200);
    _this.acceleration = new _three.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(10);
    return _this;
  }

  _createClass(Bubble, [{
    key: 'move',
    value: function move(delta, heightField) {
      this.position.add(this.velocity.clone().multiplyScalar(delta));
      this.velocity.add(this.acceleration.clone().multiplyScalar(delta));
      if (Math.abs(this.position.x) > 3000) {
        this.velocity.x = this.position.x * this.velocity.x >= 0 ? -this.velocity.x : this.velocity.x;
      }
      if (Math.abs(this.position.y) > 3000) {
        this.velocity.y = this.position.y * this.velocity.y >= 0 ? -this.velocity.y : this.velocity.y;
      }
      var height = heightField.heightByFormula(this.position) + this.radius + 0.1;
      if (this.position.z < height) {
        this.position.z = height;
      }
      if (this.position.z > height + 5) {
        this.position.z = height + 5;
      }
    }
  }, {
    key: 'color',
    set: function set(_c) {
      this._bubble.material.uniforms.color.value = new _three.Color(_c);
    }
  }]);

  return Bubble;
}(_three.Object3D);

var vertexShader = '\nuniform float refractRatio;\nuniform float fresnelBias;\nuniform float fresnelScale;\nuniform float fresnelPower;\n\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\n\nvoid main() {\n\n  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );\n\n  vec3 I = worldPosition.xyz - cameraPosition;\n\n  vReflect = reflect( I, worldNormal );\n  vRefract[0] = refract( normalize( I ), worldNormal, refractRatio );\n  vRefract[1] = refract( normalize( I ), worldNormal, refractRatio * 0.99 );\n  vRefract[2] = refract( normalize( I ), worldNormal, refractRatio * 0.98 );\n  vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );\n\n  gl_Position = projectionMatrix * mvPosition;\n\n}\n';

var fragmentShader = '\nuniform samplerCube tCube;\nuniform vec3 color;\n\nvarying vec3 vReflect;\nvarying vec3 vRefract[3];\nvarying float vReflectionFactor;\n\nvoid main() {\n\n  vec4 reflectedColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n  vec4 refractedColor = vec4( 1.0 );\n\n  refractedColor.r = textureCube( tCube, vec3( -vRefract[0].x, vRefract[0].yz ) ).r;\n  refractedColor.g = textureCube( tCube, vec3( -vRefract[1].x, vRefract[1].yz ) ).g;\n  refractedColor.b = textureCube( tCube, vec3( -vRefract[2].x, vRefract[2].yz ) ).b;\n\n  gl_FragColor = vec4(color, 1.0) * mix( refractedColor, reflectedColor, clamp( vReflectionFactor, 0.0, 1.0 ) );\n\n}\n';

exports.default = Bubble;

/***/ }),

/***/ "./src/objects/HeightField.js":
/*!************************************!*\
  !*** ./src/objects/HeightField.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = __webpack_require__(/*! three */ "three");

var _HeightFieldShaderMaterial = __webpack_require__(/*! ../material/HeightFieldShaderMaterial */ "./src/material/HeightFieldShaderMaterial.js");

var _HeightFieldShaderMaterial2 = _interopRequireDefault(_HeightFieldShaderMaterial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HeightField = function () {
  function HeightField(width, height, rows, columns, materialOptions) {
    _classCallCheck(this, HeightField);

    this._width = width;
    this._height = height;
    this._rows = rows;
    this._columns = columns;
    this._geometryInfo = this._createHeightField(width, height, rows, columns);
    var geometry = new _three.Geometry();
    geometry.vertices = this._geometryInfo.vertices;
    geometry.faces = this._geometryInfo.faces;
    geometry.computeBoundingSphere();
    geometry.computeVertexNormals();
    // let material = new HeightFieldShaderMaterial(materialOptions)
    // let material = {}
    this.content = new _three.Mesh(geometry, {});
  }

  _createClass(HeightField, [{
    key: '_createHeightField',
    value: function _createHeightField() {
      var time0 = Date.now();
      var rows = this._rows;
      var columns = this._columns;
      var width = this._width;
      var height = this._height;
      var vertices = [];
      for (var i = 0; i < rows; ++i) {
        for (var j = 0; j < columns; ++j) {
          vertices.push(new _three.Vector3(-width / 2 + i / (rows - 1) * width, -height / 2 + j / (columns - 1) * height, 0));
        }
      }
      var time1 = Date.now();
      console.log(time1 - time0);
      var faces = [];
      for (var _i = 0; _i < rows - 1; ++_i) {
        for (var _j = 0; _j < columns - 1; ++_j) {
          faces.push(new _three.Face3(this.getVerticeIndex(_i, _j, rows, columns), this.getVerticeIndex(_i + 1, _j + 1, rows, columns), this.getVerticeIndex(_i + 1, _j, rows, columns)));
          faces.push(new _three.Face3(this.getVerticeIndex(_i + 1, _j + 1, rows, columns), this.getVerticeIndex(_i, _j, rows, columns), this.getVerticeIndex(_i, _j + 1, rows, columns)));
        }
      }
      var time2 = Date.now();
      console.log(time2 - time1);
      for (var _i2 = 0; _i2 < rows; ++_i2) {
        for (var _j2 = 0; _j2 < columns; ++_j2) {
          var vertice = vertices[this.getVerticeIndex(_i2, _j2, rows, columns)];
          vertice.z += this.heightByFormula(vertice.clone(), width, height);
        }
      }

      return {
        vertices: vertices,
        faces: faces
      };
    }
  }, {
    key: 'getVerticeIndex',
    value: function getVerticeIndex(i, j, rows, columns) {
      return i + j * rows;
    }
  }, {
    key: 'heightByFormula',
    value: function heightByFormula(vertice) {
      var point = vertice.clone().sub(new _three.Vector3(this._width / 2, this._height / 2));
      point.z = 0;
      var P1 = 0.003;
      var P2 = 0.0039999;
      var P3 = 0.0059661;
      var NRM = 4;
      var maxHill = 300;
      var SHIFT = 0;
      var AMP = 1;
      var PIdiv2 = Math.PI / 2;
      var len = Math.max(1., 0.0001 * point.length());
      var hx = Math.max(0., Math.sin(P1 * (point.x + point.y)) + AMP * Math.sin(P2 * point.x + PIdiv2) + SHIFT);
      var hy = Math.max(0., Math.sin(P1 * (point.y + .5 * point.x)) + AMP * Math.sin(P3 * point.y + PIdiv2) + SHIFT);
      return maxHill * (hx + hy) / NRM / len;
    }
  }, {
    key: 'normalInPoint',
    value: function normalInPoint(pt) {
      var rows = this._rows;
      var columns = this._columns;
      var width = this._width;
      var height = this._height;
      var step = 0.001;
      var cpt = new _three.Vector3(pt.x, pt.y, this.heightByFormula(pt));
      var xpt = new _three.Vector3(pt.x + step, pt.y, 0);
      xpt.z = this.heightByFormula(xpt);
      var ypt = new _three.Vector3(pt.x, pt.y + step, 0);
      ypt.z = this.heightByFormula(ypt);
      return new _three.Vector3().crossVectors(xpt.sub(cpt), ypt.sub(cpt)).normalize();
    }
  }]);

  return HeightField;
}();

exports.default = HeightField;

/***/ }),

/***/ "./src/objects/SpriteWithNumber.js":
/*!*****************************************!*\
  !*** ./src/objects/SpriteWithNumber.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSpriteWithNumber = undefined;

var _three = __webpack_require__(/*! three */ "three");

var createSpriteWithNumber = function createSpriteWithNumber() {
  var canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 512, 256);
  ctx.fillStyle = 'red';
  ctx.font = '300px Arial';
  var map = new _three.Texture(canvas);
  map.needsUpdate = true;
  var sprite = new _three.Sprite(new _three.SpriteMaterial({ map: map, color: 0xffffff }));
  sprite.material.needsUpdate = true;
  sprite.needsUpdate = true;
  sprite.needsUpdate = true;
  sprite.scale.set(2, 1, 1);
  // console.log(canvas, ctx, map, sprite)
  return {
    sprite: sprite,
    drawNumber: function drawNumber(number) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      ctx.clearRect(0, 0, 512, 256);
      ctx.fillStyle = 'red';
      ctx.font = '300px Arial';
      ctx.fillText(number, mode === 0 ? 40 + 128 : 60, 256 - 20);
      sprite.material.map.needsUpdate = true;
      sprite.material.needsUpdate = true;
      sprite.needsUpdate = true;
    }
  };
};

exports.createSpriteWithNumber = createSpriteWithNumber;

/***/ }),

/***/ "./src/rendering.js":
/*!**************************!*\
  !*** ./src/rendering.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help1 = undefined;

var _three = __webpack_require__(/*! three */ "three");

var _HeightFieldShaderMaterial = __webpack_require__(/*! ./material/HeightFieldShaderMaterial */ "./src/material/HeightFieldShaderMaterial.js");

var _HeightFieldShaderMaterial2 = _interopRequireDefault(_HeightFieldShaderMaterial);

var _HeightField = __webpack_require__(/*! ./objects/HeightField */ "./src/objects/HeightField.js");

var _HeightField2 = _interopRequireDefault(_HeightField);

var _CameraControl = __webpack_require__(/*! ./controls/CameraControl */ "./src/controls/CameraControl.js");

var _CameraControl2 = _interopRequireDefault(_CameraControl);

var _statsMin = __webpack_require__(/*! three/examples/js/libs/stats.min.js */ "./node_modules/three/examples/js/libs/stats.min.js");

var _statsMin2 = _interopRequireDefault(_statsMin);

var _LoadUtils = __webpack_require__(/*! ./helper/LoadUtils */ "./src/helper/LoadUtils.js");

var _Bubble = __webpack_require__(/*! ./objects/Bubble */ "./src/objects/Bubble.js");

var _Bubble2 = _interopRequireDefault(_Bubble);

var _SpriteWithNumber = __webpack_require__(/*! ./objects/SpriteWithNumber */ "./src/objects/SpriteWithNumber.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scene = void 0,
    camera = void 0,
    renderer = void 0,
    object = void 0,
    controls = void 0;
var stats = void 0;
var init = function init() {
  renderer = new _three.WebGLRenderer({
    antialias: true
  });
  renderer.context.getExtension('GL_OES_standard_derivatives');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  scene = new _three.Scene();
  window.scene = scene;
  // scene.background = new THREE.Color( 0xcce0ff );
  // scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
  camera = new _three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
  object = new _three.Object3D();
  var axisHelper = new _three.AxesHelper(400);
  object.add(axisHelper);
  controls = new _CameraControl2.default({
    camera: object,
    face: new _three.Vector3(1, 0, 0),
    domElement: document.body
  });
  stats = new _statsMin2.default();
  document.body.appendChild(stats.domElement);
};
var resize = function resize(e) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
init();
window.addEventListener('resize', resize, false);
window.camera = camera;
window.renderer = renderer;
window.controls = controls;
var skyGeo = new _three.CubeGeometry(8000, 8000, 8000);
var cubeMaterials = [
// back side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/back.jpg'),
  side: _three.DoubleSide
}),
// front side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/front.jpg'),
  side: _three.DoubleSide
}),
// Top side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/top.jpg'),
  side: _three.DoubleSide
}),
// Bottom side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/bottom.jpg'),
  side: _three.DoubleSide
}),
// right side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/right.jpg'),
  side: _three.DoubleSide
}),
// left side
new _three.MeshBasicMaterial({
  map: new _three.TextureLoader().load('./examples/left.jpg'),
  side: _three.DoubleSide
})];
var skyMaterial = new _three.MeshFaceMaterial(cubeMaterials);
var skyBox = new _three.Mesh(skyGeo, skyMaterial);
skyBox.rotateX(Math.PI / 2);
// scene.add(skyBox)
var heightField = new _HeightField2.default(8000, 8000, 200, 200);
heightField.content.material = new _HeightFieldShaderMaterial2.default({
  color: 0x372b35,
  wireframe: false,
  side: _three.DoubleSide
});
controls._heightField = heightField;
var geometry = heightField.content.geometry;
var material = heightField.content.material;
window.geometry = geometry;
window.material = material;
heightField.content.material.light = camera.position;
// scene.add(heightField.content)
var bubbleReflectScene = new _three.Object3D();
bubbleReflectScene.add(heightField.content);
bubbleReflectScene.add(skyBox);
scene.add(bubbleReflectScene);
// complete setup here

camera.position.copy(geometry.vertices[heightField.getVerticeIndex(40, 40, heightField._rows, heightField._columns)]);
camera.position.z += controls._extraHeight;
camera.up.set(0, 0, 1);
var face = new _three.Vector3(1, 0, 0);
var cameraLookAt = controls.cameraLookAt;
window.cameraLookAt = cameraLookAt;
cameraLookAt(camera.position.clone(), camera.up.clone(), face.clone());

// todo
// add bubble, currently four
var bubbles = [];
for (var i = 0; i < 5; ++i) {
  var bubble = new _Bubble2.default({
    radius: (10 + Math.random() * 15) * 1.1
  });
  bubble.position.copy(geometry.vertices[heightField.getVerticeIndex(18 + i, 25, heightField._rows, heightField._columns)]);
  bubble.position.z = heightField.heightByFormula(bubble.position) + 30;
  bubbles.push(bubble);
  scene.add(bubble);
}
window.bubbles = bubbles;
// prepare update things
var updateBubble = function updateBubble(bubbleIndex) {
  var bubble = bubbles[bubbleIndex];
  bubble.visible = false;
  bubble.cubeCamera.update(renderer, scene);
  bubble.visible = true;
};
var updateBubbles = function updateBubbles() {
  for (var _i = 0; _i < bubbles.length; ++_i) {
    updateBubble(_i);
  }
};
var changeBubblesAcce = function changeBubblesAcce() {
  bubbles.map(function (b) {
    b.acceleration = new _three.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(10);
  });
};
// view-source:https://stemkoski.github.io/Three.js/Bubble.html
// add collision
var sphereCollideBox = function sphereCollideBox(position, radius, box, mesh) {
  var vectors = [new _three.Vector3(box.max.x, box.max.y, box.max.z), new _three.Vector3(box.max.x, box.max.y, box.min.z), new _three.Vector3(box.max.x, box.min.y, box.max.z), new _three.Vector3(box.max.x, box.min.y, box.min.z), new _three.Vector3(box.min.x, box.max.y, box.max.z), new _three.Vector3(box.min.x, box.max.y, box.min.z), new _three.Vector3(box.min.x, box.min.y, box.max.z), new _three.Vector3(box.min.x, box.min.y, box.min.z)];
  for (var _i2 = 0; _i2 < vectors.length; ++_i2) {
    var collide = vectors[_i2].applyMatrix4(mesh.matrixWorld).sub(position).length() <= radius;
    if (collide) {
      return true;
    }
  }
  return false;
};
var bubblesCollide = function bubblesCollide(object) {
  var meshArray = [];
  object.traverse(function (thing) {
    if (thing.isMesh) {
      meshArray.push(thing);
    }
  });
  var collideArray = [];
  for (var _i3 = 0; _i3 < bubbles.length; ++_i3) {
    var _bubble = bubbles[_i3];
    var collide = false;
    for (var _i4 = 0; _i4 < meshArray.length; ++_i4) {
      var mesh = meshArray[_i4];
      var check = sphereCollideBox(_bubble.position, _bubble.radius, mesh.geometry.boundingBox, mesh);
      if (check) {
        collide = true;
        break;
      }
    }
    collideArray.push(collide);
  }
  return collideArray;

  // for (var j = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {		
  //   var localVertex = MovingCube.geometry.vertices[vertexIndex].clone();
  //   var globalVertex = localVertex.applyMatrix4( MovingCube.matrix );
  //   var directionVector = globalVertex.sub( MovingCube.position );

  //   var ray = new THREE.Raycaster( originPoint, directionVector.clone().normalize() );
  //   var collisionResults = ray.intersectObjects( collidableMeshList );
  //   if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
  //     appendText(" Hit ");
  // }
};

// add headlights
var camera0 = new _three.PerspectiveCamera(120, 1, 0.1, 1000);
camera0.quaternion.set(0, 0, 0, 1);
camera0.scale.set(1, 1, 1);
camera0.position.copy(new _three.Vector3(-2.2, 3.4, -7.1).multiplyScalar(2));
camera0.rotateX(-Math.PI / 6);
camera0.rotateY(Math.PI / 10);
object.add(camera0);
heightField.content.material.uniforms.headLight0.value = camera0;
// let helper0 = new CameraHelper(camera0)
// scene.add(helper0)
window.camera0 = camera0;
var camera1 = new _three.PerspectiveCamera(120, 1, 0.1, 1000);
camera1.quaternion.set(0, 0, 0, 1);
camera1.scale.set(1, 1, 1);
camera1.position.copy(new _three.Vector3(2.2, 3.4, -7.1).multiplyScalar(2));
camera1.rotateX(-Math.PI / 6);
camera1.rotateY(-Math.PI / 10);
object.add(camera1);
heightField.content.material.uniforms.headLight1.value = camera1;
// let helper1 = new CameraHelper(camera1)
// scene.add(helper1)
window.camera1 = camera1;

camera0.color = new _three.Color(1, 0.3, 0);
camera1.color = new _three.Color(1, 0.3, 0);

var spritenumber = (0, _SpriteWithNumber.createSpriteWithNumber)();
// spritenumber.sprite.position.copy(geometry.vertices[heightField.getVerticeIndex(20, 23, heightField._rows, heightField._columns)])
spritenumber.sprite.position.set(0, 0, -40);
spritenumber.sprite.scale.set(70, 35, 35);
spritenumber.sprite.center.y = 0;
spritenumber.drawNumber('5');
object.add(spritenumber.sprite);

//-------key control-----
scene.add(object);
object.position.copy(geometry.vertices[heightField.getVerticeIndex(20, 20, heightField._rows, heightField._columns)]);
object.position.z += controls._extraHeight;
object.up.set(0, 0, 1);
cameraLookAt(object.position.clone(), object.up.clone(), face.clone());

window.angle = 40;
var clock = new _three.Clock();
var cameraIsFollowingCar = false;
var accTime = 0;
window.accTime = accTime;
window.score = 0;
var number = 4;
var hideMsg = true;
var animate = function animate() {
  requestAnimationFrame(animate);
  window.accTime = accTime;
  var delta = clock.getDelta();
  if (accTime <= 5.4) {
    var _number = Math.floor(5.4 - accTime);
    spritenumber.drawNumber(_number.toString());
  }
  accTime += delta;
  if (window.orbitControls && !cameraIsFollowingCar) {
    window.orbitControls.update();
  }
  if (controls && accTime > 5) {
    if (hideMsg) {
      spritenumber.sprite.visible = false;
      hideMsg = false;
    }
    controls.update(delta);
  }
  stats.update();
  heightField.content.material.light = object.position.clone().add(new _three.Vector3(0, 0, 80)).add(controls._face.clone().multiplyScalar(40));
  camera0.updateMatrix();
  camera0.updateMatrixWorld();
  camera0.updateProjectionMatrix();
  camera0.matrixWorldInverse = new _three.Matrix4().getInverse(camera0.matrixWorld);
  camera0.worldPosition = new _three.Vector3().setFromMatrixPosition(camera0.matrixWorld);
  camera0.coneCos = Math.cos(window.angle * Math.PI / 180);
  camera1.updateMatrix();
  camera1.updateMatrixWorld();
  camera1.updateProjectionMatrix();
  camera1.matrixWorldInverse = new _three.Matrix4().getInverse(camera1.matrixWorld);
  camera1.worldPosition = new _three.Vector3().setFromMatrixPosition(camera1.matrixWorld);
  camera1.coneCos = Math.cos(window.angle * Math.PI / 180);
  var bubblesCollideArray = bubblesCollide(object);
  bubblesCollideArray.map(function (collide, i) {
    if (collide) {
      bubbles[i].position.copy(new _three.Vector3(Math.random() * 3000, Math.random() * 3000, 0));
      window.score += bubbles[i].score;
      spritenumber.sprite.visible = true;
      spritenumber.drawNumber('+' + bubbles[i].score.toString(), 1);
      setTimeout(function () {
        spritenumber.sprite.visible = false;
      }, 500);
      number = 5;
      // console.log(i)
    }
  });
  for (var _i5 = 0; _i5 < number; ++_i5) {
    bubbles[_i5].move(delta, heightField);
  }
  updateBubbles();
  renderer.render(scene, camera);
};
// animate()
var changeColor = function changeColor() {
  var color = new THREE.Color(0xffffff);
  color.setHex(Math.random() * 0xffffff);
  material.uniforms.color.value = color;
};

window.cameraFollowCar = function () {
  // try to make camera follow car
  object.add(camera);
  camera.quaternion.set(0, 0, 0, 1);
  camera.scale.set(1, 1, 1);
  camera.position.copy(new _three.Vector3(-1.7, 5.9, -0.5).multiplyScalar(2));
  camera.updateProjectionMatrix();
  cameraIsFollowingCar = true;
};
window.cameraOut = function () {
  object.remove(camera);
  camera.position.copy(object.position);
  cameraIsFollowingCar = false;
};

// use new car
(0, _LoadUtils.loadmtlobj)('./public/obj/BMW X5 4.mtl', './public/obj/BMW X5 4.obj', function (group) {
  // group.rotateX(Math.PI/2)
  group.rotateY(-Math.PI / 2);

  var offset = 10;
  // change phong to basic
  group.children.map(function (mesh) {
    mesh.material = new _three.MeshBasicMaterial({
      color: mesh.material.color,
      transparent: true,
      opacity: 0.7
    });
    mesh.geometry.computeBoundingBox();
    mesh.geometry.boundingBox.min.x -= offset;
    mesh.geometry.boundingBox.min.y -= offset;
    mesh.geometry.boundingBox.min.z -= offset;
    mesh.geometry.boundingBox.max.x += offset;
    mesh.geometry.boundingBox.max.y += offset;
    mesh.geometry.boundingBox.max.z += offset;
  });

  group.scale.set(0.2, 0.2, 0.2);

  object.add(group);

  window.object = object;

  // ONLY FOR INIT ORIENTATION FOR CAR
  var wmap = controls._keyMap['w'];
  controls._keyMap['w'] = true;
  controls.update(0);
  controls._keyMap['w'] = wmap;
  console.log('load complete');
  setInterval(changeColor, 1500);
  setInterval(changeBubblesAcce, 3000);
  cameraFollowCar();
  animate();
}, function (e) {
  console.warn('error', e);
});

var help1 = function help1() {
  console.log('help1');
};
exports.help1 = help1;

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/rendering.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/rendering.js */"./src/rendering.js");


/***/ }),

/***/ "three":
/*!************************************************************************!*\
  !*** external {"root":"THREE","commonjs":"three","commonjs2":"three"} ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ })

/******/ });
});
//# sourceMappingURL=rendering_bundle.js.map