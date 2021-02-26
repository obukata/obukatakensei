(function() {

/*====================================

	variables

====================================*/

	// initialize
	let canvas = null
	let scene = null
	let sizes = {}

	// render
	let renderer = null

	// object
	let material = null
	let camera = null
	let ball = null
	let cube = null
	let ring = null
	let plane = null

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
		debug()
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
	}

	const create = () => {
		material = new THREE.MeshStandardMaterial()
		material.roughness = 0.4
		material.side = THREE.DoubleSide

		// ball
		ball = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
		ball.position.x = -1.5

		// cube
		cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

		// ring
		ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
		ring.position.x = 1.5

		//plane
		plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
		plane.rotation.x = -Math.PI * 0.5
		plane.position.y = -0.65

		// camera
		camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
		camera.position.z = 3


		parameters = {
			ambientLight: 0xffffff,
			directionalLight: 0x00fffc,
			hemisphereLight: {
				color: 0xff0000,
				groundColor: 0x0000ff
			},
			pointLight: 0xff9000,
			rectAreaLight: 0x4e00ff,
		}

		// light
		ambientLight = new THREE.AmbientLight(parameters.ambientLight, 0.5)
		directionalLight = new THREE.DirectionalLight(parameters.directionalLight, 0.3)
		hemisphereLight = new THREE.HemisphereLight(parameters.hemisphereLight.color, parameters.hemisphereLight.groundColor, 0.3)
		pointLight = new THREE.PointLight(parameters.pointLight, 0.5)
		rectAreaLight = new THREE.RectAreaLight(parameters.rectAreaLight, 2, 1, 1)

		// axexHelper
		axesHelper = new THREE.AxesHelper(2)

		//controls
		controls = new THREE.OrbitControls(camera, canvas)
		controls.enableDamping = true


		scene.add(axesHelper)

		scene.add(
			ambientLight,
			directionalLight,
			hemisphereLight,
			pointLight,
			rectAreaLight
		)
		scene.add(camera)
		scene.add(ball, cube, ring, plane)
	}

	const render = () => {
		renderer = new THREE.WebGLRenderer({ canvas: canvas })
		renderer.setSize(sizes.width, sizes.height)
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	const animate = () => {
		controls.update()
		renderer.render(scene, camera)
		requestAnimationFrame(animate)
	}

	const mouseMoved = (x, y) => {
	}


	const randRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const resize = () => {
	}

})()
