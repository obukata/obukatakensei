import * as THREE from 'three'
import {Canvas3d, PerspectiveCamera, AmbientLight, SpotLight, AreaLight, Display} from '/assets/scripts/canvas3d.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

(function() {

/*====================================

	variables

====================================*/

	let target = null
	let canvas3d = null
	let sizes = {}

	// let perspectiveCamera = null
	let camera = null
	let photos = {}

	let controls = null

	let geometry = null
	let material = null
	let mesh = null

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
		canvas3d.renderer.setClearColor('#ffffff', 1)
		sizes = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		const fontLoader = new THREE.FontLoader()

		fontLoader.load('/assets/fonts/helvetiker_bold.typeface.json', (font) => {
			const textmaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
			const textGeometry = new THREE.TextBufferGeometry('Photo Gallery', {
				font: font,
				size: 10,
				height: 0,
				curveSegments: 10,
				bevelEnabled: true,
				bevelThickness: 0.03,
				bevelSize: 0.02,
				bevelOffset: 0,
				bevelSegments: 5
			})
			textGeometry.center()
			const text = new THREE.Mesh(textGeometry, textmaterial)
			text.position.z = -40
			canvas3d.scene.add(text)
		})


		parameters = {
			count: 10,
			gap: 0.8,
			width: 3,
			height: 4,
			color: [0xcccccc, 0xaaaaaa]
		}
		generatePhotoPanel()

		// camera
		camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
		camera.position.z = 10
		camera.position.y = 0

		// scene.add
		canvas3d.scene.add(camera)

		window.addEventListener('resize', () => {
			resize()
		}, false)

		controls = new OrbitControls(camera, target)
		controls.enableDamping = true
		controls.enableRotate = false
		controls.enableZoom = false
		controls.mouseButtons.LEFT = THREE.MOUSE.PAN
		controls.touches.ONE = THREE.TOUCH.PAN
	}

	const generatePhotoPanel = () => {
		for(let k = parameters.count; 0 < k; k--) {
			const columnCount = k
			for(let i = 0; i < columnCount; i++) {
				const rowCount = columnCount-i
				const group = new THREE.Group()
				for(let j = 0; j < rowCount; j++) {
					geometry = new THREE.PlaneGeometry(parameters.width, parameters.height)
					material = new THREE.MeshBasicMaterial({ color: 0xcccccc })
					mesh = new THREE.Mesh(geometry, material)
					if(j !== 0) {
						mesh.position.y = (parameters.height + parameters.gap) * j
					}
					group.add(mesh)
				}
				group.position.y = -(parameters.height / 2 + parameters.gap / 2) * (columnCount - 1)
				group.position.x = -(parameters.width + parameters.gap) * (parameters.count - k) 
				canvas3d.scene.add(group)
			}
			if(k !== 0) {
				for(let i = 0; i < columnCount; i++) {
					const rowCount = columnCount-i
					const group = new THREE.Group()
					for(let j = 0; j < rowCount; j++) {
						geometry = new THREE.PlaneGeometry(parameters.width, parameters.height)
						material = new THREE.MeshBasicMaterial({ color: 0xcccccc })
						mesh = new THREE.Mesh(geometry, material)
						if(j !== 0) {
							mesh.position.y = (parameters.height + parameters.gap) * j
						}
						group.add(mesh)
					}
					group.position.y = -(parameters.height / 2 + parameters.gap / 2) * (columnCount - 1)
					group.position.x = (parameters.width + parameters.gap) * (parameters.count - k) 
					canvas3d.scene.add(group)
				}
			}
		}
	}

	// const clock = new THREE.Clock()
	const animate = () => {
		// const elapsedTime = clock.getElapsedTime()
		// const radian = elapsedTime * Math.PI / 180
		// camera.position.x = 10 * Math.sin(radian)
		// camera.position.z = 10 * Math.cos(radian)
		// camera.position.x += 0.01
		// camera.position.y += 0.01
		// camera.position.z += 0.01
		// camera.lookAt(new THREE.Vector3(camera.position.x, camera.position.y, camera.position.z))
		camera.lookAt(new THREE.Vector3(10, 10, 0))
		controls.update()
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
		// gui = new dat.GUI()

		// gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy)
		// gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy)
		// gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy)
		// gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy)
	}


})()
