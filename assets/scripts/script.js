(function() {

	let target = null
	let scene = null
	let renderer = null
	const FOV = 60
	let fovRad = null
	let dist = null
	let camera = null
	let lightAmbient = null
	let lightSpot = null

	let meshArray = []
	const BOX_WIDTH = 40
	const BOX_HEIGHT = 40
	const BOX_DEPTH = 40
	const BOX_MARGIN = 100
	const MESH_COLUMN_COUNT = 14
	const MESH_ROW_COUNT = 6

	let group = null
	let geometry = null
	let material = null

	let timeline = null

	window.addEventListener('DOMContentLoaded', () => {

		initialize()
		animate()

	}, false)



	const initialize = () => {
		target = document.querySelector('#js--mainvisual-canvas')
		scene = new THREE.Scene()
		renderer = new THREE.WebGLRenderer({ alpha: true })
		renderer.setSize(target.clientWidth, target.clientHeight)
		renderer.setClearColor(0xffffff, 0)
		target.appendChild(renderer.domElement)

		fovRad = (FOV / 2) * (Math.PI / 180)
		dist = (target.clientHeight / 2) / Math.tan(fovRad)

		camera = new THREE.PerspectiveCamera(FOV, target.clientWidth / target.clientHeight, 1, dist * 2)
		camera.position.z = dist

		lightAmbient = new THREE.AmbientLight('#5361b6', 1)
		scene.add(lightAmbient)

		lightSpot = new THREE.SpotLight('#ffffff', .5, 1000)
		lightSpot.position.set(0, 0, 400)
		lightSpot.castShadow = true
		scene.add(lightSpot)

		lightArea = new THREE.RectAreaLight('#ffffff', 1, 2000, 2000)
		lightArea.position.set(0, 0, 400)
		lightArea.lookAt(0, 0, 0)
		scene.add(lightArea)

		group = new THREE.Group()

		geometry = [
			new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH),
			new THREE.ConeGeometry(BOX_WIDTH, BOX_HEIGHT * 2, 64),
			new THREE.CylinderGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH, 64),
			new THREE.OctahedronGeometry(BOX_WIDTH, 0),
			new THREE.TorusGeometry(BOX_WIDTH, BOX_HEIGHT / 2, 30, 100)
		]
		material = [
			new THREE.MeshToonMaterial({ color: '#8d9dfa' }),
			new THREE.MeshStandardMaterial({ color: '#8d9dfa', wireframe: true }),
			new THREE.MeshStandardMaterial({ color: '#8d9dfa', roughness: 0, metalness: 0 }),
			new THREE.MeshLambertMaterial({ color: '#8d9dfa' })
		]


		timeline = gsap.timeline()
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
					meshArray[i][j].scale.set(0, 0, 0)
				}else {
					meshArray[i][j].position.set(
						((j * BOX_WIDTH) + (j * BOX_MARGIN) - (((MESH_COLUMN_COUNT - 1) * BOX_WIDTH + (MESH_COLUMN_COUNT - 1) * BOX_MARGIN) / 2)) - ((BOX_WIDTH + BOX_MARGIN) / 2),
						(i * BOX_HEIGHT) + (i * BOX_MARGIN) - (((MESH_ROW_COUNT - 1) * BOX_HEIGHT + (MESH_ROW_COUNT - 1) * BOX_MARGIN) / 2),
						0
					)
					meshArray[i][j].scale.set(0, 0, 0)
				}
				// eventSceneの実装、管理しないと表示アニメーションが恒常animateに潰される。
				// gsap.to(meshArray[i][j].scale, 1, { ease: Circ.easeOut, x: 0.4, y: 0.4, z: 0.4, delay: j/20 })
				group.add(meshArray[i][j])
			}
		}
		scene.add(group)
	}

	const animate = () => {
		requestAnimationFrame(animate)

		for(let i = 0; i < MESH_ROW_COUNT; i ++) {
			for(let j = 0; j < MESH_COLUMN_COUNT; j++) {
				let x = mouse.x - meshArray[i][j].position.x
				let y = mouse.y - meshArray[i][j].position.y
				let distance = Math.sqrt(x * x + y * y)

				if(distance < 200) {
					// console.log(200 - distance)
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

		lightSpot.position.set(mouse.x, mouse.y, 100)

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
