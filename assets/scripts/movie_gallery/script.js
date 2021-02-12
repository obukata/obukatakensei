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

	let geometry = null
	let material = null
	let meshArray = []
	let texture = null

	const BOX_WIDTH = 667 / 5
	const BOX_HEIGHT = 375 / 5
	const BOX_COLUMN = 16
	const BOX_COLUMN_MARGIN = 60
	const BOX_ROW = 4
	const BOX_ROW_MARGIN = 20

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
		perspectiveCamera.setFov(60)

		ambientLight = new AmbientLight(canvas3d, '#ffffff')
		ambientLight.add()

		spotLight = new SpotLight(canvas3d, '#ffffff')
		spotLight.set(0, 0, 400)
		spotLight.add()

		areaLight = new AreaLight(canvas3d, '#ffffff')
		areaLight.set(0, 0, 400)
		areaLight.add()

		texture = new THREE.TextureLoader()
		geometry = new THREE.PlaneGeometry(BOX_WIDTH, BOX_HEIGHT, 1)
		material = [
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image1.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image2.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image3.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image4.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image5.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image6.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image7.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image8.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image9.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image10.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image11.jpg') }),
			new THREE.MeshLambertMaterial({ map: texture.load('../../assets/images/webgl/movie_gallery/image12.jpg') })
		]

		for(let i = 0; i < BOX_ROW; i++) {
			meshArray[i] = []
			for(let j = 0; j < BOX_COLUMN; j++) {
				meshArray[i][j] = new THREE.Mesh(geometry, material[randRange(0, material.length - 1)])
				meshArray[i][j].position.x = Math.cos(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * 400
				meshArray[i][j].position.y = i * (BOX_HEIGHT + BOX_ROW_MARGIN)
				meshArray[i][j].position.z = (Math.sin(((360 / BOX_COLUMN * j) + (BOX_COLUMN * i)) * Math.PI / 180) * 400) + perspectiveCamera.dist
				meshArray[i][j].rotation.y = (270 - ((360 / BOX_COLUMN * j) + (BOX_COLUMN * i))) * Math.PI / 180
				canvas3d.scene.add(meshArray[i][j])
			}
		}

		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		}, false)

		targetArea.addEventListener('click', e => {
			material.wireframe = material.wireframe ? false: true
		}, false)

		targetArea.addEventListener('wheel', e => {
			perspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaY * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1
			perspectiveCamera.camera.rotation.y += (perspectiveCamera.camera.rotation.y + (e.deltaX * 0.01) - perspectiveCamera.camera.rotation.y) * 0.1
		})

	}

	const animate = () => {
		requestAnimationFrame(animate)

		perspectiveCamera.camera.position.y = 120
		perspectiveCamera.camera.rotation.y += 0.02 * Math.PI / 180

		canvas3d.render(perspectiveCamera.camera)
	}

	const mouseMoved = (x, y) => {
		if(x && y) {
			mouse.x = x / canvas3d.width
			mouse.y = 1.0 - (y / canvas3d.height)
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
