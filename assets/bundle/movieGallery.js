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

/***/ "./assets/scripts/webgl/movie_gallery/script.js":
/*!******************************************************!*\
  !*** ./assets/scripts/webgl/movie_gallery/script.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../assets/scripts/canvas3d.js */ \"./assets/scripts/canvas3d.js\");\n\n\n\n(function() {\n\n/*====================================\n\n\tvariables\n\n====================================*/\n\n\tlet target = null\n\tlet canvas3d = null\n\tlet display = null\n\tlet targetArea = null\n\n\tlet perspectiveCamera = null\n\tlet mouse = null\n\tlet mouseRayCaster = null\n\tlet raycaster = null\n\tlet intersects = null\n\n\tlet geometry = null\n\tlet material = null\n\tlet meshArray = []\n\tlet meshList = []\n\tlet texture = null\n\n\tlet ambientLight = null\n\tlet spotLight = null\n\tlet areaLight = null\n\n\tlet BOX_WIDTH = null\n\tlet BOX_HEIGHT = null\n\tlet BOX_COLUMN = null\n\tlet BOX_COLUMN_MARGIN = null\n\tlet BOX_ROW = null\n\tlet BOX_ROW_MARGIN = null\n\n\tlet timeline = null\n\n\tlet modalTarget = document.querySelector('#js--movie-modal')\n\tlet modalIcon = document.querySelector('#js--movie-modal .movie-modal-icon')\n\tlet modalImg = document.querySelector('#js--movie-modal .movie-modal-img')\n\tlet modalText = document.querySelector('#js--movie-modal .movie-modal-text')\n\n\n/*====================================\n\n\tevent\n\n====================================*/\n\n\twindow.addEventListener('DOMContentLoaded', () => {\n\t\tinitialize()\n\t\tresize()\n\t\tanimate()\n\t}, false)\n\n\n/*====================================\n\n\tfunction\n\n====================================*/\n\n\tconst initialize = () => {\n\t\ttarget = document.querySelector('#js--mainvisual-canvas')\n\t\ttargetArea = document.querySelector('#js--mainvisual')\n\n\t\tmouse = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0)\n\t\tmouseRayCaster = new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0, 0)\n\t\traycaster = new three__WEBPACK_IMPORTED_MODULE_1__.Raycaster()\n\n\t\tcanvas3d = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.Canvas3d(target)\n\t\tcanvas3d.draw()\n\n\t\tdisplay = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.Display(canvas3d, 560, 768)\n\n\t\tperspectiveCamera = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(canvas3d)\n\t\tperspectiveCamera.setFov(60)\n\t\tperspectiveCamera.camera.position.y = (perspectiveCamera.dist / 8 * 0.5622188906) * 1.7\n\n\t\tambientLight = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.AmbientLight(canvas3d, '#ffffff')\n\t\tambientLight.add()\n\n\t\tspotLight = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.SpotLight(canvas3d, '#ffffff')\n\t\tspotLight.set(0, 0, 400)\n\t\tspotLight.add()\n\n\t\tareaLight = new _assets_scripts_canvas3d_js__WEBPACK_IMPORTED_MODULE_0__.AreaLight(canvas3d, '#ffffff')\n\t\tareaLight.set(0, 0, 400)\n\t\tareaLight.add()\n\n\t\tBOX_WIDTH =  perspectiveCamera.dist / 8\n\t\tBOX_HEIGHT = perspectiveCamera.dist / 8 * 0.5622188906\n\t\tBOX_COLUMN = 16\n\t\tBOX_COLUMN_MARGIN = 60\n\t\tBOX_ROW = 4\n\t\tBOX_ROW_MARGIN = perspectiveCamera.dist / 80\n\n\t\ttexture = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader()\n\t\tgeometry = new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(BOX_WIDTH, BOX_HEIGHT, 1)\n\t\tmaterial = [\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image1.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image2.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image3.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image4.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image5.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image6.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image7.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image8.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image9.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image10.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image11.jpg') }),\n\t\t\tnew three__WEBPACK_IMPORTED_MODULE_1__.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image12.jpg') })\n\t\t]\n\n\n\t\tfor(let i = 0; i < BOX_ROW; i++) {\n\t\t\tmeshArray[i] = []\n\t\t\tfor(let j = 0; j < BOX_COLUMN; j++) {\n\t\t\t\tlet materialNum = randRange(0, material.length - 1)\n\t\t\t\tmeshArray[i][j] = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(geometry, material[materialNum])\n\t\t\t\tmeshArray[i][j].material.name = materialNum\n\t\t\t\tmeshArray[i][j].position.x = Math.cos(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3\n\t\t\t\tmeshArray[i][j].position.y = i * (BOX_HEIGHT + BOX_ROW_MARGIN)\n\t\t\t\tmeshArray[i][j].position.z = (Math.sin(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3) + perspectiveCamera.dist\n\t\t\t\tmeshArray[i][j].rotation.y = (270 - ((360 / BOX_COLUMN * j) + (BOX_COLUMN * i))) * Math.PI / 180\n\t\t\t\tcanvas3d.scene.add(meshArray[i][j])\n\t\t\t\tmeshList.push(meshArray[i][j])\n\t\t\t}\n\t\t}\n\n\t\twindow.addEventListener('resize', () => {\n\t\t\tresize()\n\t\t}, false)\n\n\t\ttargetArea.addEventListener('mousemove', e => {\n\t\t\tmouseMovedPxcel(e.offsetX, e.offsetY)\n\t\t\tmouseMovedRaycaster(e)\n\t\t}, false)\n\n\t\tmodalTarget.addEventListener('click', e => {\n\t\t\te.stopPropagation()\n\t\t}, false)\n\n\t\tmodalIcon.addEventListener('click', e => {\n\t\t\tmodalTarget.classList.remove('is--modal-open')\n\t\t}, false)\n\n\t\ttargetArea.addEventListener('click', e => {\n\t\t\t// material.wireframe = material.wireframe ? false: true\n\t\t\tmovieModal(intersects[0].object.material.name)\n\t\t\tconsole.log(intersects[0].object.material.name)\n\t\t}, false)\n\n\t\ttargetArea.addEventListener('wheel', e => {\n\t\t\tperspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaY * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1\n\t\t\tperspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaX * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1\n\t\t})\n\t}\n\n\tconst animate = () => {\n\t\trequestAnimationFrame(animate)\n\n\t\traycaster.setFromCamera(mouseRayCaster, perspectiveCamera.camera)\n\t\tintersects = raycaster.intersectObjects(canvas3d.scene.children)\n\n\t\tmeshList.map(mesh => {\n\t\t\tif(0 < intersects.length && mesh == intersects[0].object) {\n\t\t\t\tconsole.log(intersects[0].object)\n\t\t\t\tmesh.scale.x += (((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width) * 1.1 - mesh.scale.x) * 0.1\n\t\t\t\tmesh.scale.y += (((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width) * 1.1 - mesh.scale.y) * 0.1\n\t\t\t}else {\n\t\t\t\tmesh.scale.x += ((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width - mesh.scale.x) * 0.1\n\t\t\t\tmesh.scale.y += ((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width - mesh.scale.y) * 0.1\n\t\t\t}\n\t\t})\n\t\tperspectiveCamera.camera.rotation.y += 0.02 * Math.PI / 180\n\t\tcanvas3d.render(perspectiveCamera.camera)\n\t}\n\n\tconst movieModal = (number) => {\n\t\tlet modal = {\n\t\t\t0: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image1.jpg',\n\t\t\t\ttext: 'Pulp Fiction'\n\t\t\t},\n\t\t\t1: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image2.jpg',\n\t\t\t\ttext: 'Trainspotting'\n\t\t\t},\n\t\t\t2: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image3.jpg',\n\t\t\t\ttext: 'Buffalo 66'\n\t\t\t},\n\t\t\t3: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image4.jpg',\n\t\t\t\ttext: 'PING PONG'\n\t\t\t},\n\t\t\t4: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image5.jpg',\n\t\t\t\ttext: 'THE SHINING'\n\t\t\t},\n\t\t\t5: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image6.jpg',\n\t\t\t\ttext: 'Frankenstein\\'s Army'\n\t\t\t},\n\t\t\t6: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image7.jpg',\n\t\t\t\ttext: 'Pacchigi!'\n\t\t\t},\n\t\t\t7: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image8.jpg',\n\t\t\t\ttext: 'GOD FATHER'\n\t\t\t},\n\t\t\t8: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image9.jpg',\n\t\t\t\ttext: 'STAND BY ME'\n\t\t\t},\n\t\t\t9: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image10.jpg',\n\t\t\t\ttext: 'JOKER'\n\t\t\t},\n\t\t\t10: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image11.jpg',\n\t\t\t\ttext: 'CLOCKWORK ORANGE'\n\t\t\t},\n\t\t\t11: {\n\t\t\t\timg: '../assets/images/webgl/movie_gallery/image12.jpg',\n\t\t\t\ttext: '2001: a space odyssey'\n\t\t\t},\n\t\t}\n\t\tmodalTarget.classList.add('is--modal-open')\n\t\tmodalImg.innerHTML = `<img src=\"${modal[number].img}\">`\n\t\tmodalText.innerHTML = `${modal[number].text}`\n\t}\n\n\tconst mouseMovedPxcel = (x, y) => {\n\t\tif(x && y) {\n\t\t\tmouse.x = x / canvas3d.width\n\t\t\tmouse.y = 1.0 - (y / canvas3d.height)\n\t\t}\n\t}\n\n\tconst mouseMovedRaycaster = (event) => {\n\t\tconst element = event.currentTarget\n\t\tconst x = event.clientX - element.offsetLeft\n\t\tconst y = event.clientY - element.offsetTop\n\n\t\tconst w = element.offsetWidth\n\t\tconst h = element.offsetHeight\n\n\t\tmouseRayCaster.x = (x / w) * 2 - 1\n\t\tmouseRayCaster.y = -(y / h) * 2 + 1\n\t}\n\n\tconst randRange = (min, max) => {\n\t\treturn Math.floor(Math.random() * (max - min + 1) + min)\n\t}\n\n\tconst resize = () => {\n\t\tcanvas3d.resize()\n\t\tcanvas3d.update()\n\t\tperspectiveCamera.resize()\n\t\tdisplay.update()\n\n\t\tperspectiveCamera.camera.position.y = (perspectiveCamera.dist / 8 * 0.5622188906) * 1.7\n\n\t\tBOX_WIDTH = perspectiveCamera.dist / 8\n\t\tBOX_HEIGHT = perspectiveCamera.dist / 8 * 0.5622188906\n\t\tBOX_ROW_MARGIN = perspectiveCamera.dist / 80\n\n\t\tfor(let i = 0; i < BOX_ROW; i++) {\n\t\t\tfor(let j = 0; j < BOX_COLUMN; j++) {\n\t\t\t\tmeshArray[i][j].position.x = Math.cos(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3\n\t\t\t\tmeshArray[i][j].position.y = i * (BOX_HEIGHT + BOX_ROW_MARGIN)\n\t\t\t\tmeshArray[i][j].position.z = (Math.sin(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3) + perspectiveCamera.dist\n\t\t\t\tmeshArray[i][j].rotation.y = (270 - ((360 / BOX_COLUMN * j) + (BOX_COLUMN * i))) * Math.PI / 180\n\t\t\t\tmeshArray[i][j].scale.x = (perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width\n\t\t\t\tmeshArray[i][j].scale.y = meshArray[i][j].scale.x\n\t\t\t}\n\t\t}\n\t}\n\n})()\n\n\n//# sourceURL=webpack:///./assets/scripts/webgl/movie_gallery/script.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./assets/scripts/webgl/movie_gallery/script.js");
/******/ 	
/******/ })()
;