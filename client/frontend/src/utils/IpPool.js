import axios from 'axios'

export class IpPool {
	constructor({ ipUrl = '', verifyUrl = '', verifyUrl66 = '', verifyUrl138 = '' }) {
		this.ip_url = ipUrl
		this.verify_url = verifyUrl
		this.verify_url_66 = verifyUrl66
		this.verify_url_138 = verifyUrl138
	}

	acquireIP() {
		const that = this
		return new Promise(function(resolve, reject) {
			axios.get(that.ip_url).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}

	verifyIP(ip) {
		const that = this
		return new Promise(function(resolve, reject) {
			axios.get(that.verify_url + ip).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}

	verifyIP66(ip) {
		const that = this
		return new Promise(function(resolve, reject) {
			axios.get(that.verify_url_66 + ip).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}

	verifyIP138(ip) {
		const that = this
		return new Promise(function(resolve, reject) {
			axios.get(that.verify_url_138 + ip).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
		})
	}
}
