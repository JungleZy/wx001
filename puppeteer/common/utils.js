const {UG} = require("./constant");

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(size) {
	return Math.floor(Math.random() * size);
}

function getRandomType(rate = 0.5) {
	return Math.random() < rate ? 'android' : 'iphone'
}

function getUserAgent({osType = 'android', netType = '移动数据'}) {
	const ot = UG.get(osType)
	let TAI = ''
	let WXV = ''
	if (osType === 'android') {
		const wv = ot.wx[getRandomInt(ot.wx.length)]
		const cv = ot.chromeVersion[getRandomInt(ot.chromeVersion.length)]
		const flag = Number(cv.split("/")[1].split('.')[0]) < 100
		WXV = ` ${ot.version} ${cv} ${flag ? 'MQQBrowser/6.2 TBS/044607 Mobile Safari/537.36' : 'Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20240301'} MMWEBID/${getRandomNumber(50, 9999)} MicroMessenger/${wv} ${flag ? 'Process/tools' : 'WeChat/arm64 Weixin'}`
		TAI = flag ? '' : ' ABI/arm64'
	} else if (osType === 'iphone') {
		const wv = ot.wx[getRandomInt(ot.wx.length)]
		WXV = ` Mobile/15E148 MicroMessenger/${wv}`
	}
	return `Mozilla/5.0 (${ot.head}; ${ot.machine[getRandomInt(ot.machine.length)]}) AppleWebKit/${ot.webkit} (KHTML, like Gecko)${WXV} NetType/${netType === '移动数据' ? '4G' : 'WIFI'} Language/zh_CN${TAI}`
}

module.exports = {
	getRandomNumber,
	getRandomType,
	getUserAgent
}