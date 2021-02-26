import * as THREE from 'three'
import {Canvas3d, PerspectiveCamera, AmbientLight, SpotLight, AreaLight, Display} from '/assets/scripts/canvas3d.js'
import { gsap } from 'gsap'

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
	let BOX_MARGIN = 40
	let BOX_NUM = 10

	let group = null
	let geometry = null
	let materialArray = []

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

		areaLight = new AreaLight(canvas3d, '#ffffff')
		areaLight.set(0, 0, 400)
		areaLight.add()

		group = new THREE.Group()

		geometry = new THREE.BoxGeometry(BOX_WIDTH, BOX_HEIGHT, BOX_DEPTH)

		for(let x = 0; x < BOX_NUM; x++) {
			meshArray[x] = []
			materialArray[x] = []
			for(let y = 0; y < BOX_NUM; y++) {
				meshArray[x][y] = []
				materialArray[x][y] = []
				for(let z = 0; z< BOX_NUM; z++) {
					materialArray[x][y][z] = new THREE.MeshStandardMaterial({
						color: `#${decimalToHexDescConviersion(x + 40, BOX_NUM)}${decimalToHexDescConviersion(y + 40, BOX_NUM)}${decimalToHexDescConviersion(z + 40, BOX_NUM)}`,
						roughness: 0,
						metalness: 0
					})
					meshArray[x][y][z] = new THREE.Mesh(geometry, materialArray[x][y][z])
					meshArray[x][y][z].position.set(
						(-BOX_MARGIN * (BOX_NUM - 1) / 2) + (x * BOX_MARGIN),
						(-BOX_MARGIN * (BOX_NUM - 1) / 2) + (y * BOX_MARGIN),
						(-BOX_MARGIN * (BOX_NUM - 1) / 2) + (z * BOX_MARGIN)
					)
					group.add(meshArray[x][y][z])
				}
			}
		}
		canvas3d.scene.add(group)

		timeline = new gsap.timeline()
		for(let i = 0; i < BOX_NUM; i++) {
			for(let j = 0; j < BOX_NUM; j++) {
				for(let k = 0; k < BOX_NUM; k++) {
					timeline.to(meshArray[i][BOX_NUM - 1 - j][BOX_NUM - 1 - k].rotation, 2.0, { x: radian(90), y: radian(90), z: radian(90) }, (i + j + k) / 5)
					timeline.to(meshArray[i][BOX_NUM - 1 - j][BOX_NUM - 1 - k].scale, 2.0, { x: 2, y: 2, z: 2 }, (i + j + k) / 5)
				}
			}
		}
		timeline.repeat(-1).yoyo(true)

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		}, false)

		targetArea.addEventListener('click', e => {
			for(let x = 0; x < BOX_NUM; x++) {
				for(let y = 0; y < BOX_NUM; y++) {
					for(let z = 0; z < BOX_NUM; z++) {
						materialArray[x][y][z].wireframe = materialArray[x][y][z].wireframe ? false: true
					}
				}
			}
		}, false)

	}

	const animate = () => {
		requestAnimationFrame(animate)

		group.rotation.x -= 0.005
		group.rotation.y -= 0.005
		group.rotation.z -= 0.005

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
