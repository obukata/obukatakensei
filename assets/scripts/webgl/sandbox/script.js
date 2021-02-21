(function() {

/*====================================

	variables

====================================*/

	let target = null
	let canvas3d = null
	let display = null
	let targetArea = null

	let perspectiveCamera = null
	let controls = null
	let ambientLight = null
	let spotLight = null
	let areaLight = null

	let meshArray = []
	let mouse = null

	let BOX_WIDTH = 40
	let BOX_HEIGHT = 40
	let BOX_DEPTH = 40
	let BOX_MARGIN = 0
	let MESH_COLUMN_COUNT = 20
	let MESH_ROW_COUNT = 20

	let stage = {
		geometry: null,
		material: null,
		mesh: null
	}
	let wall = {
		left: {
			geometry: null,
			material: null,
			mesh: null
		},
		right: {
			geometry: null,
			material: null,
			mesh: null
		},
		back: {
			geometry: null,
			material: null,
			mesh: null
		}
	}

	let group = null
	let geometry = null
	let material = null

	let timeline = null


/*====================================

	event

====================================*/

	window.addEventListener('DOMContentLoaded', () => {
		initialize()
		resize()
		animate()
	}, false)


/*====================================

	function

====================================*/

	const initialize = () => {
		target = document.querySelector('#js--mainvisual-canvas')
		targetArea = document.querySelector('#js--mainvisual')

		mouse = new THREE.Vector2(0, 0)

		canvas3d = new Canvas3d(target)
		canvas3d.draw()

		display = new Display(canvas3d, 560, 768)

		perspectiveCamera = new PerspectiveCamera(canvas3d)
		perspectiveCamera.setFov(30)

		// ambientLight = new AmbientLight(canvas3d, '#ffffff')
		// ambientLight.add()

		spotLight = new SpotLight(canvas3d, '#ffffff')
		spotLight.set(0, 0, 400)
		spotLight.add()

		// areaLight = new AreaLight(canvas3d, '#ffffff')
		// areaLight.set(0, 0, 400)
		// areaLight.add()

		stage.geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
		stage.material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide })
		stage.mesh = new THREE.Mesh(stage.geometry, stage.material)
		stage.mesh.rotation.x = radian(-90)
		stage.mesh.position.y = -500
		stage.mesh.receiveShadow = true
		canvas3d.scene.add(stage.mesh)

		wall.right.geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
		wall.left.geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
		wall.back.geometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)

		wall.right.material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide })
		wall.left.material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide })
		wall.back.material = new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide })

		wall.right.mesh = new THREE.Mesh(wall.right.geometry, wall.right.material)
		wall.left.mesh = new THREE.Mesh(wall.left.geometry, wall.left.material)
		wall.back.mesh = new THREE.Mesh(wall.back.geometry, wall.back.material)

		wall.right.mesh.position.x = 500
		wall.right.mesh.rotation.y = radian(-90)
		wall.left.mesh.position.x = -500
		wall.left.mesh.rotation.y = radian(90)
		wall.back.mesh.position.z = -500

		wall.right.mesh.receiveShadow = true
		wall.left.mesh.receiveShadow = true
		wall.back.mesh.receiveShadow = true


		canvas3d.scene.add(wall.right.mesh)
		canvas3d.scene.add(wall.left.mesh)
		canvas3d.scene.add(wall.back.mesh)

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		}, false)

		targetArea.addEventListener('click', e => {
		}, false)

	}

	const animate = () => {
		requestAnimationFrame(animate)
		canvas3d.render(perspectiveCamera.camera)
	}

	const mouseMoved = (x, y) => {
		if(x && y) {
			mouse.x = x - (canvas3d.width / 2)
			mouse.y = -y + (canvas3d.height / 2)
		}
	}

	const resize = () => {
		canvas3d.resize()
		canvas3d.update()
		perspectiveCamera.resize()
		display.update()
	}

})()
