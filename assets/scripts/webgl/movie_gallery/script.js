import * as THREE from 'three'
import {Canvas3d, PerspectiveCamera, AmbientLight, SpotLight, AreaLight, Display} from '/assets/scripts/canvas3d.js'

(function() {

/*====================================

	variables

====================================*/

	let target = null
	let canvas3d = null
	let display = null
	let targetArea = null

	let perspectiveCamera = null
	let mouse = null
	let mouseRayCaster = null
	let raycaster = null
	let intersects = null

	let geometry = null
	let material = null
	let meshArray = []
	let meshList = []
	let texture = null

	let ambientLight = null
	let spotLight = null
	let areaLight = null

	let BOX_WIDTH = null
	let BOX_HEIGHT = null
	let BOX_COLUMN = null
	let BOX_COLUMN_MARGIN = null
	let BOX_ROW = null
	let BOX_ROW_MARGIN = null

	let timeline = null

	let modalTarget = document.querySelector('#js--movie-modal')
	let modalIcon = document.querySelector('#js--movie-modal .movie-modal-icon')
	let modalImg = document.querySelector('#js--movie-modal .movie-modal-img')
	let modalText = document.querySelector('#js--movie-modal .movie-modal-text')


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
		mouseRayCaster = new THREE.Vector2(0, 0)
		raycaster = new THREE.Raycaster()

		canvas3d = new Canvas3d(target)
		canvas3d.draw()

		display = new Display(canvas3d, 560, 768)

		perspectiveCamera = new PerspectiveCamera(canvas3d)
		perspectiveCamera.setFov(60)
		perspectiveCamera.camera.position.y = (perspectiveCamera.dist / 8 * 0.5622188906) * 1.7

		ambientLight = new AmbientLight(canvas3d, '#ffffff')
		ambientLight.add()

		spotLight = new SpotLight(canvas3d, '#ffffff')
		spotLight.set(0, 0, 400)
		spotLight.add()

		areaLight = new AreaLight(canvas3d, '#ffffff')
		areaLight.set(0, 0, 400)
		areaLight.add()

		BOX_WIDTH =  perspectiveCamera.dist / 8
		BOX_HEIGHT = perspectiveCamera.dist / 8 * 0.5622188906
		BOX_COLUMN = 16
		BOX_COLUMN_MARGIN = 60
		BOX_ROW = 4
		BOX_ROW_MARGIN = perspectiveCamera.dist / 80

		texture = new THREE.TextureLoader()
		geometry = new THREE.PlaneGeometry(BOX_WIDTH, BOX_HEIGHT, 1)
		material = [
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image1.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image2.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image3.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image4.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image5.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image6.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image7.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image8.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image9.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image10.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image11.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../assets/images/webgl/movie_gallery/image12.jpg') })
		]


		for(let i = 0; i < BOX_ROW; i++) {
			meshArray[i] = []
			for(let j = 0; j < BOX_COLUMN; j++) {
				let materialNum = randRange(0, material.length - 1)
				meshArray[i][j] = new THREE.Mesh(geometry, material[materialNum])
				meshArray[i][j].material.name = materialNum
				meshArray[i][j].position.x = Math.cos(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3
				meshArray[i][j].position.y = i * (BOX_HEIGHT + BOX_ROW_MARGIN)
				meshArray[i][j].position.z = (Math.sin(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3) + perspectiveCamera.dist
				meshArray[i][j].rotation.y = (270 - ((360 / BOX_COLUMN * j) + (BOX_COLUMN * i))) * Math.PI / 180
				canvas3d.scene.add(meshArray[i][j])
				meshList.push(meshArray[i][j])
			}
		}

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMovedPxcel(e.offsetX, e.offsetY)
			mouseMovedRaycaster(e)
		}, false)

		modalTarget.addEventListener('click', e => {
			e.stopPropagation()
		}, false)

		modalIcon.addEventListener('click', e => {
			modalTarget.classList.remove('is--modal-open')
		}, false)

		targetArea.addEventListener('click', e => {
			// material.wireframe = material.wireframe ? false: true
			movieModal(intersects[0].object.material.name)
			console.log(intersects[0].object.material.name)
		}, false)

		targetArea.addEventListener('wheel', e => {
			perspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaY * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1
			perspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaX * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1
		})
	}

	const animate = () => {
		requestAnimationFrame(animate)

		raycaster.setFromCamera(mouseRayCaster, perspectiveCamera.camera)
		intersects = raycaster.intersectObjects(canvas3d.scene.children)

		meshList.map(mesh => {
			if(0 < intersects.length && mesh == intersects[0].object) {
				mesh.scale.x += (((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width) * 1.1 - mesh.scale.x) * 0.1
				mesh.scale.y += (((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width) * 1.1 - mesh.scale.y) * 0.1
			}else {
				mesh.scale.x += ((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width - mesh.scale.x) * 0.1
				mesh.scale.y += ((perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width - mesh.scale.y) * 0.1
			}
		})
		perspectiveCamera.camera.rotation.y += 0.02 * Math.PI / 180
		canvas3d.render(perspectiveCamera.camera)
	}

	const movieModal = (number) => {
		let modal = {
			0: {
				img: '../assets/images/webgl/movie_gallery/image1.jpg',
				text: 'Pulp Fiction'
			},
			1: {
				img: '../assets/images/webgl/movie_gallery/image2.jpg',
				text: 'Trainspotting'
			},
			2: {
				img: '../assets/images/webgl/movie_gallery/image3.jpg',
				text: 'Buffalo 66'
			},
			3: {
				img: '../assets/images/webgl/movie_gallery/image4.jpg',
				text: 'PING PONG'
			},
			4: {
				img: '../assets/images/webgl/movie_gallery/image5.jpg',
				text: 'THE SHINING'
			},
			5: {
				img: '../assets/images/webgl/movie_gallery/image6.jpg',
				text: 'Frankenstein\'s Army'
			},
			6: {
				img: '../assets/images/webgl/movie_gallery/image7.jpg',
				text: 'Pacchigi!'
			},
			7: {
				img: '../assets/images/webgl/movie_gallery/image8.jpg',
				text: 'GOD FATHER'
			},
			8: {
				img: '../assets/images/webgl/movie_gallery/image9.jpg',
				text: 'STAND BY ME'
			},
			9: {
				img: '../assets/images/webgl/movie_gallery/image10.jpg',
				text: 'JOKER'
			},
			10: {
				img: '../assets/images/webgl/movie_gallery/image11.jpg',
				text: 'CLOCKWORK ORANGE'
			},
			11: {
				img: '../assets/images/webgl/movie_gallery/image12.jpg',
				text: '2001: a space odyssey'
			},
		}
		modalTarget.classList.add('is--modal-open')
		modalImg.innerHTML = `<img src="${modal[number].img}">`
		modalText.innerHTML = `${modal[number].text}`
	}

	const mouseMovedPxcel = (x, y) => {
		if(x && y) {
			mouse.x = x / canvas3d.width
			mouse.y = 1.0 - (y / canvas3d.height)
		}
	}

	const mouseMovedRaycaster = (event) => {
		const element = event.currentTarget
		const x = event.clientX - element.offsetLeft
		const y = event.clientY - element.offsetTop

		const w = element.offsetWidth
		const h = element.offsetHeight

		mouseRayCaster.x = (x / w) * 2 - 1
		mouseRayCaster.y = -(y / h) * 2 + 1
	}

	const randRange = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1) + min)
	}

	const resize = () => {
		canvas3d.resize()
		canvas3d.update()
		perspectiveCamera.resize()
		display.update()

		perspectiveCamera.camera.position.y = (perspectiveCamera.dist / 8 * 0.5622188906) * 1.7

		BOX_WIDTH = perspectiveCamera.dist / 8
		BOX_HEIGHT = perspectiveCamera.dist / 8 * 0.5622188906
		BOX_ROW_MARGIN = perspectiveCamera.dist / 80

		for(let i = 0; i < BOX_ROW; i++) {
			for(let j = 0; j < BOX_COLUMN; j++) {
				meshArray[i][j].position.x = Math.cos(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3
				meshArray[i][j].position.y = i * (BOX_HEIGHT + BOX_ROW_MARGIN)
				meshArray[i][j].position.z = (Math.sin(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * perspectiveCamera.dist / 3) + perspectiveCamera.dist
				meshArray[i][j].rotation.y = (270 - ((360 / BOX_COLUMN * j) + (BOX_COLUMN * i))) * Math.PI / 180
				meshArray[i][j].scale.x = (perspectiveCamera.dist / 8) / meshArray[0][0].geometry.parameters.width
				meshArray[i][j].scale.y = meshArray[i][j].scale.x
			}
		}
	}

})()
