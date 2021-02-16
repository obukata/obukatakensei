/**
 * 範囲指定ランダム
 */
const randRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
}


/**
 * 角度変換
 */
const radian = (x) => {
	return x * (Math.PI / 180)
}


/**
 * 100% = 16（進数）変換
 */
const decimalToHexFullConversion = (x, max) => {
	return zeroPadding(Math.round(16 / max * x).toString(16), 2)
}


/**
 * 16進数降順変換
 */
const decimalToHexDescConviersion = (x, max) => {
	return zeroPadding(Math.round(255 - (16 / max * x)).toString(16), 2)
}


/**
 * 0padding
 */
const zeroPadding = (x, length) => {
	return ('0000' + x).slice(-length)
}