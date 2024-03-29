import * as THREE from 'three'
import {Canvas3d, PerspectiveCamera, AmbientLight, SpotLight, AreaLight, Display} from '/assets/scripts/canvas3d.js'
import * as dat from 'dat.gui'

(function() {

/*====================================

	variables

====================================*/

	let target = null
	let canvas3d = null
	let sizes = {}

	// let perspectiveCamera = null
	let camera = null

	let geometry = null
	let material = null
	let points = null

	let gui
	let parameters = {}


/*====================================

	event

====================================*/

	window.addEventListener('DOMContentLoaded', () => {
		initialize()
		resize()
		animate()
		debug()
	}, false)

	window.addEventListener('resize', () => {
		sizes.width = window.innerWidth
		sizes.height = window.innerHeight
		camera.aspect = sizes.width / sizes.height
		camera.updateProjectionMatrix()
		canvas3d.renderer.setSize(sizes.width, sizes.height)
		canvas3d.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	})



/*====================================

	function

====================================*/

	const initialize = () => {
		target = document.querySelector('#js--mainvisual-canvas')
		canvas3d = new Canvas3d(target)
		canvas3d.draw()
		canvas3d.renderer.setClearColor('#000000', 1)
		sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		parameters.count = 100000
		parameters.size = 0.01
		parameters.radius = 5
		parameters.branches = 12
		parameters.spin = 1
		parameters.randomness = 2
		parameters.randomnessPower = 3
		parameters.insideColor = '#ff6030'
		parameters.outsideColor = '#1b3984'
		generateGalaxy()

		// camera
		camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
		camera.position.z = 10
		camera.position.y = 0.2

		// scene.add
		canvas3d.scene.add(camera)

		window.addEventListener('resize', () => {
			resize()
		}, false)
	}


	const generateGalaxy = () => {
		if(points !== null) {
			geometry.dispose()
			material.dispose()
			canvas3d.scene.remove(points)
		}

		geometry = new THREE.BufferGeometry()

		const positions = new Float32Array(parameters.count * 3)
		const colors = new Float32Array(parameters.count * 3)

		const colorInside = new THREE.Color(parameters.insideColor)
		const colorOutside = new THREE.Color(parameters.outsideColor)

		for(let i = 0; i < parameters.count; i++) {
			const i3 = i * 3
			const radius = Math.random() * parameters.radius
			const spinAngle = radius * parameters.spin
			const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

			const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
			const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
			const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

			positions[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
			positions[i3 + 1] = randomY
			positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

			const mixedColor = colorInside.clone()
			mixedColor.lerp(colorOutside, radius / parameters.radius)

			colors[i3    ] = mixedColor.r
			colors[i3 + 1] = mixedColor.g
			colors[i3 + 2] = mixedColor.b
		}
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

		material = new THREE.PointsMaterial({
			size: parameters.size,
			sizeAttenuation: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
			vertexColors: true
		})

		points = new THREE.Points(geometry, material)
		canvas3d.scene.add(points)
	}

	const clock = new THREE.Clock()
	const tick = () => {
		const elapsedTime = clock.getElapsedTime()
		const radian = elapsedTime * Math.PI / 180
		camera.position.x = 10 * Math.sin(radian)
		camera.position.z = 10 * Math.cos(radian)
		camera.lookAt(new THREE.Vector3(0, 0, 0))
		renderer.render(scene, camera)
		window.requestAnimationFrame(tick)
	}

	const animate = () => {

		const elapsedTime = clock.getElapsedTime()
		const radian = elapsedTime * Math.PI / 180
		camera.position.x = 10 * Math.sin(radian)
		camera.position.z = 10 * Math.cos(radian)
		camera.lookAt(new THREE.Vector3(0, 0, 0))
		canvas3d.render(camera)
		requestAnimationFrame(animate)
	}


	const resize = () => {
		canvas3d.resize()
		canvas3d.update()
	}

//--------------------------------
// debug
//--------------------------------
	const debug = () => {
		gui = new dat.GUI()

		gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
		gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
		gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
		gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
		gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
		gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
		gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
		gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
		gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
	}


})()
