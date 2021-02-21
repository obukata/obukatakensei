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
	let mesh = null

	let uniforms = {}


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

		mouse = new THREE.Vector2(0.5, 0.5)

		canvas3d = new Canvas3d(target)
		canvas3d.draw()

		display = new Display(canvas3d, 560, 768)

		perspectiveCamera = new PerspectiveCamera(canvas3d)
		perspectiveCamera.setFov(30)

		geometry = new THREE.PlaneGeometry(1, 1, 10, 10)

		uniforms = {
			uAspect: {
				value: canvas3d.width / canvas3d.height
			},
			uTime: {
				value: 0.0
			},
			uMouse: {
				value: mouse
			}
		}

		material = new THREE.ShaderMaterial({
			uniforms: uniforms,
			vertexShader: vertexSource,
			fragmentShader: fragmentSource,
			// wireframe: true
		})


		mesh = new THREE.Mesh(geometry, material)

		canvas3d.scene.add(mesh)


		window.addEventListener('resize', () => {
			resize()
		}, false)

		targetArea.addEventListener('mousemove', e => {
			mouseMoved(e.offsetX, e.offsetY)
		}, false)

		targetArea.addEventListener('click', e => {
			material.wireframe = material.wireframe ? false: true
		}, false)

	}

	const animate = () => {
		requestAnimationFrame(animate)

		const sec = performance.now() / 1000;
		uniforms.uTime.value = sec


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


/*====================================

	vertex shader
	頂点シェーダー

====================================*/

	const vertexSource = `
		// 「varying」 頂点シェーダー → フラグメントシェーダーへ変数を送る為に使う装飾子
		// 「float」型 javascriptでは、見慣れないがシェーダーでは型付けが必要。
		// varying float vSample;

		varying vec2 vUv;
		uniform float uTime;

		void main() {

			// 「uv」 ShaderMaterialで補完される vec2型(x, y)の変数。
			vUv = uv;

			vec3 pos = position;
			pos.y = pos.y + sin(pos.x + uTime) * 0.1;
			gl_Position = vec4(pos, 1.0);
		}
	`


/*====================================

	fragment shader
	フラグメントシェーダー・ピクセルシェーダー

====================================*/

	const fragmentSource = `
		// 「varying」 頂点シェーダー → フラグメントシェーダーへ送られてきた変数を受け取る。
		// varying float vSample;

		varying vec2 vUv;
		uniform float uAspect;
		uniform float uTime;
		uniform vec2 uMouse;

		void main() {
			vec4 color = vec4(vUv.x, vUv.y, 1.0, 1.0);
			gl_FragColor = color;
		}
	`


})()
