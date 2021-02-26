import * as THREE from 'three'
import { Canvas3d, PerspectiveCamera, AmbientLight, SpotLight, AreaLight, Display } from '/assets/scripts/canvas3d.js'

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

	let BOX_WIDTH = 20
	let BOX_HEIGHT = 20
	let BOX_DEPTH = 20
	let BOX_MARGIN = 100
	let MESH_COLUMN_COUNT = 14
	let MESH_ROW_COUNT = 6

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
		perspectiveCamera.setFov(10)

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
			BOX_MARGIN = 50
			MESH_COLUMN_COUNT = 4
			MESH_ROW_COUNT = 6
		}

		group = new THREE.Group()

		geometry = [
			new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH),
			new THREE.ConeGeometry(BOX_WIDTH, BOX_HEIGHT * 2, 32),
			new THREE.CylinderGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH, 32),
			new THREE.OctahedronGeometry(BOX_WIDTH, 0),
			new THREE.TorusGeometry(BOX_WIDTH, BOX_HEIGHT / 2, 16, 32)
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
		canvas3d.scene.add(group)

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		})
	}

	const animate = () => {
		requestAnimationFrame(animate)

		let scaleMagnification = null
		let reactiveArea = null
		if(display.mode === 'pc') {
			scaleMagnification = 30
			reactiveArea = 200
		}else if(display.mode === 'tb') {
			scaleMagnification = 60
			reactiveArea = 150
		}else {
			scaleMagnification = 60
			reactiveArea = 100
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
		spotLight.set(mouse.x, mouse.y, 100)
		canvas3d.render(perspectiveCamera.camera)
	}

	const mouseMoved = (x, y) => {
		if(x && y) {
			mouse.x = x - (canvas3d.width / 2)
			mouse.y = -y + (canvas3d.height / 2)
		}
	}

	const randRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const resize = () => {
		canvas3d.resize()
		canvas3d.update()
		perspectiveCamera.resize()
		display.update()
	}

})()