(function() {

	let windowWidth = window.innerWidth
	let windowHeight = window.innerHeight
	const target = document.querySelector('#js--mainvisual-canvas')
	const scene = new THREE.Scene()
	const renderer = new THREE.WebGLRenderer({ alpha: true })
	renderer.setSize(target.clientWidth, target.clientHeight)
	renderer.setClearColor(0xffffff, 0)
	target.appendChild(renderer.domElement)

	const fov = 60
	const fovRad = (fov / 2) * (Math.PI / 180)
	const dist = (target.clientHeight / 2) / Math.tan(fovRad)

	const camera = new THREE.PerspectiveCamera(fov, target.clientWidth / target.clientHeight, 1, dist * 2)
	camera.position.z = dist

	const light = new THREE.PointLight(0xffffff)
	light.position.set(400, 400, 400)
	scene.add(light)

	let meshArray = []
	const BOX_WIDTH = 40
	const BOX_HEIGHT = 40
	const BOX_DEPTH = 40
	const BOX_MARGIN = 100
	const MESH_COLUMN_COUNT = 16
	const MESH_ROW_COUNT = 8

	// const MESH_COLUMN_COUNT = 1
	// const MESH_ROW_COUNT = 1
	const group = new THREE.Group()

	const geometry = [
		new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH),
		new THREE.ConeGeometry(BOX_WIDTH, BOX_HEIGHT * 2, 64),
	]
	const material = [
		new THREE.MeshToonMaterial({ color: 0xa9b5fe }),
		new THREE.MeshNormalMaterial({ wireframe: true }),
		new THREE.MeshNormalMaterial(),
		new THREE.MeshMatcapMaterial({ color: 0xa9b5fe }),
		new THREE.MeshLambertMaterial({ color: 0xa9b5fe })
	]

	for(let i = 0; i < MESH_ROW_COUNT; i ++) {
		meshArray[i] = []
		for(let j = 0; j < MESH_COLUMN_COUNT; j++) {
			meshArray[i][j] = new THREE.Mesh(geometry[randRange(0, geometry.length - 1)], material[randRange(0, material.length - 1)])
			if(i % 2) {
				meshArray[i][j].position.set(
					(j * BOX_WIDTH) + (j * BOX_MARGIN) - (((MESH_COLUMN_COUNT - 1) * BOX_WIDTH + (MESH_COLUMN_COUNT - 1) * BOX_MARGIN) / 2),
					(i * BOX_HEIGHT) + (i * BOX_MARGIN) - (((MESH_ROW_COUNT - 1) * BOX_HEIGHT + (MESH_ROW_COUNT - 1) * BOX_MARGIN) / 2),
					0
				)
			}else {
				meshArray[i][j].position.set(
					((j * BOX_WIDTH) + (j * BOX_MARGIN) - (((MESH_COLUMN_COUNT - 1) * BOX_WIDTH + (MESH_COLUMN_COUNT - 1) * BOX_MARGIN) / 2)) - ((BOX_WIDTH + BOX_MARGIN) / 2),
					(i * BOX_HEIGHT) + (i * BOX_MARGIN) - (((MESH_ROW_COUNT - 1) * BOX_HEIGHT + (MESH_ROW_COUNT - 1) * BOX_MARGIN) / 2),
					0
				)
			}
			group.add(meshArray[i][j])
		}
	}
	scene.add(group)

	window.addEventListener('DOMContentLoaded', () => {

		initialize()
		animate()

	}, false)


	const initialize = () => {

	}

	const animate = () => {
		requestAnimationFrame(animate)

		for(let i = 0; i < MESH_ROW_COUNT; i ++) {
			for(let j = 0; j < MESH_COLUMN_COUNT; j++) {
				let x = mouse.x - meshArray[i][j].position.x
				let y = mouse.y - meshArray[i][j].position.y
				let distance = Math.sqrt(x * x + y * y)

				if(distance < 200) {
					console.log(200 - distance)
					meshArray[i][j].rotation.x += (((200 - distance) * Math.PI / 180) - meshArray[i][j].rotation.x) * 0.1
					meshArray[i][j].rotation.y += (((200 - distance) * Math.PI / 180) - meshArray[i][j].rotation.y) * 0.1
					meshArray[i][j].rotation.z += (((200 - distance) * Math.PI / 180) - meshArray[i][j].rotation.z) * 0.1
					meshArray[i][j].scale.x += ((200 - distance) / 30 - meshArray[i][j].scale.x) * 0.1
					meshArray[i][j].scale.y += ((200 - distance) / 30 - meshArray[i][j].scale.y) * 0.1
					meshArray[i][j].scale.z += ((200 - distance) / 30 - meshArray[i][j].scale.z) * 0.1
				}else {
					meshArray[i][j].rotation.x += (0 - meshArray[i][j].rotation.x) * 0.1
					meshArray[i][j].rotation.y += (0 - meshArray[i][j].rotation.y) * 0.1
					meshArray[i][j].rotation.z += (0 - meshArray[i][j].rotation.z) * 0.1
					meshArray[i][j].scale.x += (0.4 - meshArray[i][j].scale.x) * 0.1
					meshArray[i][j].scale.y += (0.4 - meshArray[i][j].scale.y) * 0.1
					meshArray[i][j].scale.z += (0.4 - meshArray[i][j].scale.z) * 0.1
				}
			}
		}


		renderer.render(scene, camera)
	}

	const mouse = new THREE.Vector2(0, 0)
	const mouseMoved = (x, y) => {
		if(x && y) {
			mouse.x = x - (target.clientWidth / 2)
			mouse.y = -y + (target.clientHeight / 2)
			// console.log(`mouse.x: ${mouse.x}  mouse.y: ${mouse.y}`)
		}
	}

	const targetArea = document.querySelector('#js--mainvisual')
	targetArea.addEventListener('mousemove', e => {
		mouseMoved(e.offsetX, e.offsetY)
	})

	function randRange(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

})()
