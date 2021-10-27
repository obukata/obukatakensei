const path = require('path')

const entryFile = {
	common: path.resolve(__dirname, 'assets/scripts/common.js'),
	script: path.resolve(__dirname, 'assets/scripts/script.js'),
	intaractiveBrick: path.resolve(__dirname, 'assets/scripts/webgl/intaractive_brick/script.js'),
	basicShader: path.resolve(__dirname, 'assets/scripts/webgl/basic_shader/script.js'),
	movieGallery: path.resolve(__dirname, 'assets/scripts/webgl/movie_gallery/script.js'),
	loopAnimation: path.resolve(__dirname, 'assets/scripts/webgl/loop_animation/script.js'),
	earth: path.resolve(__dirname, 'assets/scripts/webgl/earth/script.js'),
	galaxy: path.resolve(__dirname, 'assets/scripts/webgl/galaxy/script.js'),
	photoGallery: path.resolve(__dirname, 'assets/scripts/webgl/photo_gallery/script.js'),
}


module.exports = {
	mode: 'development',
	entry: entryFile,
	output: {
		path: path.resolve(__dirname, 'assets/bundle/'),
		filename: '[name].js',
	},
	watchOptions: {
		ignored: '**/node_modules/',
	},
}