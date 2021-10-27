/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/canvas3d.js":
/*!************************************!*\
  !*** ./assets/scripts/canvas3d.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas3d\": () => (/* binding */ Canvas3d),\n/* harmony export */   \"PerspectiveCamera\": () => (/* binding */ PerspectiveCamera),\n/* harmony export */   \"AmbientLight\": () => (/* binding */ AmbientLight),\n/* harmony export */   \"SpotLight\": () => (/* binding */ SpotLight),\n/* harmony export */   \"AreaLight\": () => (/* binding */ AreaLight),\n/* harmony export */   \"Display\": () => (/* binding */ Display)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\n\nclass Canvas3d {\n\tconstructor(target) {\n\t\tthis.target = target\n\t\tthis.width = window.innerWidth\n\t\tthis.height = window.innerHeight\n\t\tthis.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()\n\t\tthis.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ alpha: true, antialias: true })\n\t}\n\tdraw() {\n\t\tthis.renderer.setSize(this.width, this.height)\n\t\tthis.renderer.setClearColor('#ffffff', 0)\n\t\tthis.target.appendChild(this.renderer.domElement)\n\t}\n\tupdate() {\n\t\tthis.renderer.setPixelRatio(window.devicePixelRatio)\n\t\tthis.renderer.setSize(this.width, this.height)\n\t}\n\tresize() {\n\t\tthis.width = window.innerWidth\n\t\tthis.height = window.innerHeight\n\t}\n\trender(camera) {\n\t\tthis.camera = camera\n\t\tthis.renderer.render(this.scene, this.camera)\n\t}\n}\n\nclass PerspectiveCamera {\n\tconstructor(canvas3d) {\n\t\tthis.canvas3d = canvas3d\n\t\tthis.FOV = 60\n\t\tthis.fovRad = (this.FOV / 2) * (Math.PI / 180)\n\t\tthis.dist = (this.canvas3d.height / 2) / Math.tan(this.fovRad)\n\t\tthis.set()\n\t}\n\tset() {\n\t\tthis.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(this.FOV, this.canvas3d.width / this.canvas3d.height, 1, this.dist * 2)\n\t\tthis.camera.position.z = this.dist\n\t}\n\tsetFov(fov) {\n\t\tthis.FOV = fov\n\t}\n\tresize() {\n\t\tthis.fovRad = (this.FOV / 2) * (Math.PI / 180)\n\t\tthis.dist = (this.canvas3d.height / 2) / Math.tan(this.fovRad)\n\t\tthis.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(this.FOV, this.canvas3d.width / this.canvas3d.height, 1, this.dist * 2)\n\t\tthis.camera.position.z = this.dist\n\t}\n}\n\n\nclass AmbientLight {\n\tconstructor(canvas3d, color) {\n\t\tthis.canvas3d = canvas3d\n\t\tthis.color = color ? color : '#ffffff'\n\t\tthis.light = new three__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(this.color, 1)\n\t\tthis.light.castShadow = true\n\t}\n\tadd() {\n\t\tthis.canvas3d.scene.add(this.light)\n\t}\n}\n\nclass SpotLight {\n\tconstructor(canvas3d, color) {\n\t\tthis.canvas3d = canvas3d\n\t\tthis.color = color ? color : '#ffffff'\n\t\tthis.light = new three__WEBPACK_IMPORTED_MODULE_0__.SpotLight(this.color, .5, 1000)\n\t\tthis.light.castShadow = true\n\t}\n\tset(x, y, z) {\n\t\tthis.x = x\n\t\tthis.y = y\n\t\tthis.z = z\n\t\tthis.light.position.set(this.x, this.y, this.z)\n\t}\n\tadd() {\n\t\tthis.canvas3d.scene.add(this.light)\n\t}\n}\n\nclass AreaLight {\n\tconstructor(canvas3d, color) {\n\t\tthis.canvas3d = canvas3d\n\t\tthis.color = color ? color : '#ffffff'\n\t\tthis.light = new three__WEBPACK_IMPORTED_MODULE_0__.RectAreaLight(this.color, 1, 2000, 2000)\n\t\tthis.light.lookAt(0, 0, 0)\n\t\tthis.light.castShadow = true\n\t}\n\tset(x, y, z) {\n\t\tthis.x = x\n\t\tthis.y = y\n\t\tthis.z = z\n\t\tthis.light.position.set(this.x, this.y, this.z)\n\t}\n\tadd() {\n\t\tthis.canvas3d.scene.add(this.light)\n\t}\n}\n\nclass Display {\n\tconstructor(canvas3d, sp, tb) {\n\t\tthis.canvas3d = canvas3d\n\t\tthis.mode = null\n\t\tthis.size = {\n\t\t\tsp: sp,\n\t\t\ttb: tb\n\t\t}\n\t\tthis.update()\n\t}\n\tupdate() {\n\t\tif(this.size.tb < this.canvas3d.width) {\n\t\t\tthis.mode = 'pc'\n\t\t}else if(this.size.sp < this.canvas3d.width) {\n\t\t\tthis.mode = 'tb'\n\t\t}else {\n\t\t\tthis.mode = 'sp'\n\t\t}\n\t}\n}\n\n\n//# sourceURL=webpack:///./assets/scripts/canvas3d.js?");

/***/ }),

/***/ "./assets/scripts/webgl/basic_shader/script.js":
/*!*****************************************************!*\
  !*** ./assets/scripts/webgl/basic_shader/script.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../assets/scripts/canvas3d.js */ \"./assets/scripts/canvas3d.js\");\n\n\n\n(function() {\n\n/*====================================\n\n\tvariables\n\n====================================*/\n\n\tlet target = null\n\tlet canvas3d = null\n\tlet display = null\n\tlet targetArea = null\n\n\tlet perspectiveCamera = null\n\tlet mouse = null\n\n\tlet geometry = null\n\tlet material = null\n\tlet mesh = null\n\n\tlet uniforms = {}\n\n\n/*====================================\n\n\tevent\n\n====================================*/\n\n\twindow.addEventListener('DOMContentLoaded', () => {\n\t\tinitialize()\n\t\tresize()\n\t\tanimate()\n\t}, false)\n\n\n/*====================================\n\n\tfunction\n\n====================================*/\n\n\tconst initialize = () => {\n\t\ttarget = document.querySelector('#js--mainvisual-canvas')\n\t\ttargetArea = document.querySelector('#js--mainvisual')\n\n\t\tmouse = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0.5, 0.5)\n\n\t\tcanvas3d = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.Canvas3d(target)\n\t\tcanvas3d.draw()\n\n\t\tdisplay = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.Display(canvas3d, 560, 768)\n\n\t\tperspectiveCamera = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(canvas3d)\n\t\tperspectiveCamera.setFov(30)\n\n\t\tgeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(1, 1, 10, 10)\n\n\t\tuniforms = {\n\t\t\tuAspect: {\n\t\t\t\tvalue: canvas3d.width / canvas3d.height\n\t\t\t},\n\t\t\tuTime: {\n\t\t\t\tvalue: 0.0\n\t\t\t},\n\t\t\tuMouse: {\n\t\t\t\tvalue: mouse\n\t\t\t}\n\t\t}\n\n\t\tmaterial = new three__WEBPACK_IMPORTED_MODULE_1__.ShaderMaterial({\n\t\t\tuniforms: uniforms,\n\t\t\tvertexShader: vertexSource,\n\t\t\tfragmentShader: fragmentSource,\n\t\t\t// wireframe: true\n\t\t})\n\n\n\t\tmesh = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material)\n\n\t\tcanvas3d.scene.add(mesh)\n\n\n\t\twindow.addEventListener('resize', () => {\n\t\t\tresize()\n\t\t}, false)\n\n\t\ttargetArea.addEventListener('mousemove', e => {\n\t\t\tmouseMoved(e.offsetX, e.offsetY)\n\t\t}, false)\n\n\t\ttargetArea.addEventListener('click', e => {\n\t\t\tmaterial.wireframe = material.wireframe ? false: true\n\t\t}, false)\n\n\t}\n\n\tconst animate = () => {\n\t\trequestAnimationFrame(animate)\n\n\t\tconst sec = performance.now() / 1000;\n\t\tuniforms.uTime.value = sec\n\n\n\t\tcanvas3d.render(perspectiveCamera.camera)\n\t}\n\n\tconst mouseMoved = (x, y) => {\n\t\tif(x && y) {\n\t\t\tmouse.x = x / canvas3d.width\n\t\t\tmouse.y = 1.0 - (y / canvas3d.height)\n\t\t}\n\t}\n\n\tconst randRange = (min, max) => {\n\t\treturn Math.floor(Math.random() * (max - min + 1) + min)\n\t}\n\n\tconst resize = () => {\n\t\tcanvas3d.resize()\n\t\tcanvas3d.update()\n\t\tperspectiveCamera.resize()\n\t\tdisplay.update()\n\t}\n\n\n/*====================================\n\n\tvertex shader\n\t頂点シェーダー\n\n====================================*/\n\n\tconst vertexSource = `\n\t\t// 「varying」 頂点シェーダー → フラグメントシェーダーへ変数を送る為に使う装飾子\n\t\t// 「float」型 javascriptでは、見慣れないがシェーダーでは型付けが必要。\n\t\t// varying float vSample;\n\n\t\tvarying vec2 vUv;\n\t\tuniform float uTime;\n\n\t\tvoid main() {\n\n\t\t\t// 「uv」 ShaderMaterialで補完される vec2型(x, y)の変数。\n\t\t\tvUv = uv;\n\n\t\t\tvec3 pos = position;\n\t\t\tpos.y = pos.y + sin(pos.x + uTime) * 0.1;\n\t\t\tgl_Position = vec4(pos, 1.0);\n\t\t}\n\t`\n\n\n/*====================================\n\n\tfragment shader\n\tフラグメントシェーダー・ピクセルシェーダー\n\n====================================*/\n\n\tconst fragmentSource = `\n\t\t// 「varying」 頂点シェーダー → フラグメントシェーダーへ送られてきた変数を受け取る。\n\t\t// varying float vSample;\n\n\t\tvarying vec2 vUv;\n\t\tuniform float uAspect;\n\t\tuniform float uTime;\n\t\tuniform vec2 uMouse;\n\n\t\tvoid main() {\n\t\t\tvec4 color = vec4(vUv.x, vUv.y, 1.0, 1.0);\n\t\t\tgl_FragColor = color;\n\t\t}\n\t`\n\n\n})()\n\n\n//# sourceURL=webpack:///./assets/scripts/webgl/basic_shader/script.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/scripts/webgl/basic_shader/script.js");
/******/ 	
/******/ })()
;