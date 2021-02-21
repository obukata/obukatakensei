(function() {

/*====================================

	variables

====================================*/

	let target = null
	let canvas3d = null
	let display = null
	let targetArea = null

	let perspectiveCamera = null
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

		ambientLight = new AmbientLight(canvas3d, '#5361b6')
		ambientLight.add()

		spotLight = new SpotLight(canvas3d, '#ffffff')
		spotLight.set(0, 0, 400)
		spotLight.add()

		areaLight = new AreaLight(canvas3d, '#ffffff')
		areaLight.set(0, 0, 400)
		areaLight.add()



		if(display.mode === 'pc') {
		}else if(display.mode === 'tb') {
		}else {
			BOX_WIDTH = 10
			BOX_HEIGHT = 10
			BOX_DEPTH = 10
			BOX_MARGIN = 0
			MESH_COLUMN_COUNT = 20
			MESH_ROW_COUNT = 20
		}

		group = new THREE.Group()

		geometry = new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH)
		material = [
			new THREE.MeshToonMaterial({ color: '#8d9dfa' }),
			new THREE.MeshStandardMaterial({ color: '#8d9dfa', roughness: 0, metalness: 0 }),
			new THREE.MeshLambertMaterial({ color: '#8d9dfa' })
		]

		timeline = gsap.timeline()
		for(let i = 0; i < MESH_ROW_COUNT; i ++) {
			meshArray[i] = []
			for(let j = 0; j < MESH_COLUMN_COUNT; j++) {
				meshArray[i][j] = new THREE.Mesh(geometry, material[randRange(0, material.length - 1)])
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
				group.add(meshArray[i][j])
			}
		}
		canvas3d.scene.add(group)

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		}, false)

		targetArea.addEventListener('click', e => {
			for(let i = 0; i < material.length; i++) {
				material[i].wireframe = material[i].wireframe ? false: true
			}
		}, false)

	}

	const animate = () => {
		requestAnimationFrame(animate)

		let scaleMagnification = null
		let reactiveArea = null
		if(display.mode === 'pc') {
			scaleMagnification = 1000
			reactiveArea = 200
		}else if(display.mode === 'tb') {
			scaleMagnification = 60
			reactiveArea = 150
		}else {
			scaleMagnification = 90
			reactiveArea = 50
		}

		for(let i = 0; i < MESH_ROW_COUNT; i ++) {
			for(let j = 0; j < MESH_COLUMN_COUNT; j++) {
				let x = mouse.x - meshArray[i][j].position.x
				let y = mouse.y - meshArray[i][j].position.y
				let distance = Math.sqrt(x * x + y * y)
				if(distance < reactiveArea) {
					meshArray[i][j].rotation.x += (((reactiveArea - distance) * Math.PI / 180) - meshArray[i][j].rotation.x) * 0.1
					meshArray[i][j].rotation.y += (((reactiveArea - distance) * Math.PI / 180) - meshArray[i][j].rotation.y) * 0.1
					meshArray[i][j].rotation.z += (((reactiveArea - distance) * Math.PI / 180) - meshArray[i][j].rotation.z) * 0.1
					meshArray[i][j].scale.x += (((reactiveArea - distance) / scaleMagnification) + 1 - meshArray[i][j].scale.x) * 0.1
					meshArray[i][j].scale.y += (((reactiveArea - distance) / scaleMagnification) + 1 - meshArray[i][j].scale.y) * 0.1
					meshArray[i][j].scale.z += (((reactiveArea - distance) / scaleMagnification) + 1 - meshArray[i][j].scale.z) * 0.1
				}else {
					meshArray[i][j].rotation.x += (0 - meshArray[i][j].rotation.x) * 0.1
					meshArray[i][j].rotation.y += (0 - meshArray[i][j].rotation.y) * 0.1
					meshArray[i][j].rotation.z += (0 - meshArray[i][j].rotation.z) * 0.1
					meshArray[i][j].scale.x += (1 - meshArray[i][j].scale.x) * 0.1
					meshArray[i][j].scale.y += (1 - meshArray[i][j].scale.y) * 0.1
					meshArray[i][j].scale.z += (1 - meshArray[i][j].scale.z) * 0.1
				}
			}
		}
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
