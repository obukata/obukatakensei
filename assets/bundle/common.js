/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scripts/common.js":
/*!**********************************!*\
  !*** ./assets/scripts/common.js ***!
  \**********************************/
/***/ (() => {

eval("(function() {\n\n/*====================================\n\n\tvariables\n\n====================================*/\n\n\n/*====================================\n\n\tevent\n\n====================================*/\n\n\twindow.addEventListener('DOMContentLoaded', () => {\n\t\tSquib.navigation()\n\t}, false)\n\n\n/*====================================\n\n\tfunction\n\n====================================*/\n\n\tconst Squib = {\n\t\tnavigation() {\n\t\t\tconst navIcon = document.querySelector('#js--header-nav-icon')\n\t\t\tconst header = document.querySelector('#js--page-header')\n\t\t\tnavIcon.addEventListener('click', () => {\n\t\t\t\theader.classList.toggle('is--nav-open')\n\t\t\t})\n\t\t}\n\t}\n\n})()\n\n\n//# sourceURL=webpack:///./assets/scripts/common.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./assets/scripts/common.js"]();
/******/ 	
/******/ })()
;