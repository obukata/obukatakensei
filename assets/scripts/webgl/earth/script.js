import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

(function() {
/*====================================

	variables

====================================*/

	// initialize
	let canvas = null
	let scene = null
	let sizes = {}
	let textureLoader = null
	let earthTexture = null

	// render
	let renderer = null

	// object
	let material = null
	let camera = null
	let ball = null
	let cube = null
	let ring = null
	let plane = null
	let timeline = null

	// light
	let parameters = {}
	let ambientLight = null
	let directionalLight = null
	let hemisphereLight = null
	let pointLight = null
	let rectAreaLight = null

	// helper
	let axesHelper = null
	let controls = null
	let gui = null


/*====================================

	event

====================================*/

	window.addEventListener('DOMContentLoaded', () => {
		initialize()
		create()
		render()
		// debug()
		tick()
	})

	// resize
	window.addEventListener('resize', () => {
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight
		camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})

	// fullscreen
	window.addEventListener('dblclick', () => {
		const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
		if(!document.fullscreenElement) {
			if(canvas.requestFullscreen) {
				canvas.requestFullscreen()
			}else if(canvas.webkitRequestFullscreen) {
				canvas.webkitRequestFullscreen()
			}
		}else {
			if(document.exitFullScreen) {
				document.exitFullscreen()
			}else if(document.webkitExitFullscreen) {
				document.webkitExitFullscreen()
			}
		}
	})


/*====================================

	function

====================================*/

	const initialize = () => {
		canvas = document.querySelector('#js--mainvisual-canvas')
		scene = new THREE.Scene()
		sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}
		textureLoader = new THREE.TextureLoader()
	}

	const create = () => {
		material = new THREE.MeshStandardMaterial({ map: textureLoader.load('../assets/images/webgl/earth/8k_earth_nightmap.jpg') })
		material.roughness = 0.4
		material.side = THREE.DoubleSide

		// ball
		ball = new THREE.Mesh(new THREE.SphereGeometry(1.5, 32, 32), material)

		//plane
		plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshStandardMaterial())
		plane.rotation.x = -Math.PI * 0.5
		plane.position.y = -0.65

		// camera
		camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
		camera.position.y = 1.5
		camera.position.z = 3


		parameters = {
			ambientLight: 0xffffff,
			directionalLight: 0xffffff,
			hemisphereLight: {
				color: 0xff0000,
				groundColor: 0x0000ff
			},
			pointLight: 0xff9000,
			rectAreaLight: 0xffffff,
		}

		// light
		ambientLight = new THREE.AmbientLight(parameters.ambientLight, 0.0)
		directionalLight = new THREE.DirectionalLight(parameters.directionalLight, 0.0)
		directionalLight.position.set(-4.0, 0.0, -10)
		hemisphereLight = new THREE.HemisphereLight(parameters.hemisphereLight.color, parameters.hemisphereLight.groundColor, 0.0)
		pointLight = new THREE.PointLight(parameters.pointLight, 0.0)
		rectAreaLight = new THREE.RectAreaLight(parameters.rectAreaLight, 0.0, 10, 5.5)
		rectAreaLight.position.set(0, 4, 10)

		// axexHelper
		// axesHelper = new THREE.AxesHelper(2)

		//controls
		controls = new OrbitControls(camera, canvas)
		controls.enableDamping = true


		// scene.add(axesHelper)

		scene.add(
			ambientLight,
			directionalLight,
			hemisphereLight,
			pointLight,
			rectAreaLight
		)
		scene.add(camera)
		scene.add(ball)
		// scene.add(plane)

		timeline = new gsap.timeline()
		timeline.to(directionalLight, { duration: 2.0, intensity: 5.0 })
		timeline.to(document.querySelector('.earth-title'), { duration: 4.0, opacity: 1.0 }, 1.0)
		timeline.to(rectAreaLight, { duration: 2.0, intensity: 5.0 }, 2.0)
	}

	const render = () => {
		renderer = new THREE.WebGLRenderer({ canvas: canvas })
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	const tick = () => {

		ball.rotation.y += 0.001
		rectAreaLight.lookAt(new THREE.Vector3())

		controls.update()
		renderer.render(scene, camera)
		window.requestAnimationFrame(tick)
	}

	const debug = () => {
		gui = new dat.GUI()

		let folder1 = gui.addFolder('AmbientLight')
		folder1.add(ambientLight, 'intensity').min(0).max(5).step(0.01)
		folder1.addColor(parameters, 'ambientLight').onChange(() => {
			ambientLight.color = new THREE.Color(parameters.ambientLight)
		})

		let folder2 = gui.addFolder('DirectionalLight')
		folder2.add(directionalLight, 'intensity').min(0).max(5).step(0.01)
		folder2.addColor(parameters, 'directionalLight').onChange(() => {
			directionalLight.color = new THREE.Color(parameters.directionalLight)
		})
		folder2.add(directionalLight.position, 'x').min(-10).max(10).step(0.01)
		folder2.add(directionalLight.position, 'y').min(-10).max(10).step(0.01)
		folder2.add(directionalLight.position, 'z').min(-10).max(10).step(0.01)

		let folder3 = gui.addFolder('HemisphereLight')
		folder3.add(hemisphereLight, 'intensity').min(0).max(5).step(0.01)
		folder3.addColor(parameters.hemisphereLight, 'color').onChange(() => {
			hemisphereLight.color = new THREE.Color(parameters.hemisphereLight.color)
		})
		folder3.addColor(parameters.hemisphereLight, 'groundColor').onChange(() => {
			hemisphereLight.groundColor = new THREE.Color(parameters.hemisphereLight.groundColor)
		})
		folder3.add(hemisphereLight.position, 'x').min(-10).max(10).step(0.01)
		folder3.add(hemisphereLight.position, 'y').min(-10).max(10).step(0.01)
		folder3.add(hemisphereLight.position, 'z').min(-10).max(10).step(0.01)

		let folder4 = gui.addFolder('PointLight')
		folder4.add(pointLight, 'intensity').min(0).max(5).step(0.01)
		folder4.addColor(parameters, 'pointLight').onChange(() => {
			pointLight.color = new THREE.Color(parameters.pointLight)
		})
		folder4.add(pointLight.position, 'x').min(-10).max(10).step(0.01)
		folder4.add(pointLight.position, 'y').min(-10).max(10).step(0.01)
		folder4.add(pointLight.position, 'z').min(-10).max(10).step(0.01)

		let folder5 = gui.addFolder('RectAreaLight')
		folder5.add(rectAreaLight, 'intensity').min(0).max(5).step(0.01)
		folder5.addColor(parameters, 'rectAreaLight').onChange(() => {
			rectAreaLight.color = new THREE.Color(parameters.rectAreaLight)
		})
		folder5.add(rectAreaLight, 'width').min(0).max(10).step(0.01)
		folder5.add(rectAreaLight, 'height').min(0).max(10).step(0.01)
		folder5.add(rectAreaLight.position, 'x').min(-10).max(10).step(0.01)
		folder5.add(rectAreaLight.position, 'y').min(-10).max(10).step(0.01)
		folder5.add(rectAreaLight.position, 'z').min(-10).max(10).step(0.01)

	}

})()