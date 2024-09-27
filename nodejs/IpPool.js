const axios = require("axios")

class IpPool {
	constructor({ipNum = 1, appCode = ''}) {
		this.url = `http://api.tianqiip.com/getip?secret=kdyq3fnzqv1z88st&num=${ipNum}&type=json&port=1&time=3&ys=1&cs=1&mr=1&sign=1ac43f178cb69267964a0becb7a89e7b`
		this.verify_url = `https://cz88riskaliyun.cz88.net/search/ip/risk?AppCode=${appCode}&ip=`
	}

	acquireIP() {
		const that = this
		return new Promise(function (resolve, reject) {
			axios.get(that.url).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}

	verifyIP(ip) {
		const that = this
		return new Promise(function (resolve, reject) {
			axios.get(that.verify_url + ip).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}
}

module.exports = IpPool;