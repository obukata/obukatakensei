import * as THREE from 'three'

export class Canvas3d {
	constructor(target) {
		this.target = target
		this.width = window.innerWidth
		this.height = window.innerHeight
		this.scene = new THREE.Scene()
		this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
	}
	draw() {
		this.renderer.setSize(this.width, this.height)
		this.renderer.setClearColor('#ffffff', 0)
		this.target.appendChild(this.renderer.domElement)
	}
	update() {
		this.renderer.setPixelRatio(window.devicePixelRatio)
		this.renderer.setSize(this.width, this.height)
	}
	resize() {
		this.width = window.innerWidth
		this.height = window.innerHeight
	}
	render(camera) {
		this.camera = camera
		this.renderer.render(this.scene, this.camera)
	}
}

export class PerspectiveCamera {
	constructor(canvas3d) {
		this.canvas3d = canvas3d
		this.FOV = 60
		this.fovRad = (this.FOV / 2) * (Math.PI / 180)
		this.dist = (this.canvas3d.height / 2) / Math.tan(this.fovRad)
		this.set()
	}
	set() {
		this.camera = new THREE.PerspectiveCamera(this.FOV, this.canvas3d.width / this.canvas3d.height, 1, this.dist * 2)
		this.camera.position.z = this.dist
	}
	setFov(fov) {
		this.FOV = fov
	}
	resize() {
		this.fovRad = (this.FOV / 2) * (Math.PI / 180)
		this.dist = (this.canvas3d.height / 2) / Math.tan(this.fovRad)
		this.camera = new THREE.PerspectiveCamera(this.FOV, this.canvas3d.width / this.canvas3d.height, 1, this.dist * 2)
		this.camera.position.z = this.dist
	}
}


export class AmbientLight {
	constructor(canvas3d, color) {
		this.canvas3d = canvas3d
		this.color = color ? color : '#ffffff'
		this.light = new THREE.AmbientLight(this.color, 1)
		this.light.castShadow = true
	}
	add() {
		this.canvas3d.scene.add(this.light)
	}
}

export class SpotLight {
	constructor(canvas3d, color) {
		this.canvas3d = canvas3d
		this.color = color ? color : '#ffffff'
		this.light = new THREE.SpotLight(this.color, .5, 1000)
		this.light.castShadow = true
	}
	set(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
		this.light.position.set(this.x, this.y, this.z)
	}
	add() {
		this.canvas3d.scene.add(this.light)
	}
}

export class AreaLight {
	constructor(canvas3d, color) {
		this.canvas3d = canvas3d
		this.color = color ? color : '#ffffff'
		this.light = new THREE.RectAreaLight(this.color, 1, 2000, 2000)
		this.light.lookAt(0, 0, 0)
		this.light.castShadow = true
	}
	set(x, y, z) {
		this.x = x
		this.y = y
		this.z = z
		this.light.position.set(this.x, this.y, this.z)
	}
	add() {
		this.canvas3d.scene.add(this.light)
	}
}

export class Display {
	constructor(canvas3d, sp, tb) {
		this.canvas3d = canvas3d
		this.mode = null
		this.size = {
			sp: sp,
			tb: tb
		}
		this.update()
	}
	update() {
		if(this.size.tb < this.canvas3d.width) {
			this.mode = 'pc'
		}else if(this.size.sp < this.canvas3d.width) {
			this.mode = 'tb'
		}else {
			this.mode = 'sp'
		}
	}
}
