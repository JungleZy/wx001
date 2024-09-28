const IpPool = require('./service/IpPool')
const VisitWeb = require('./service/VisitWeb')
const {getUserAgent, getRandomType} = require("./common/utils");

ipPool = new IpPool({ipNum: 4, appCode: '75a8edbfef1d4468bb00628c46a83525'})

ipPool.acquireIP().then(res => {
	for (const d of res.data.data) {
		ipPool.verifyIP(d.ip).then(res => {
			const data = res.data.data
			console.log(data.ip, data.isp, data.netWorkType, data.proxy)
			const netType = res.data.data.netWorkType
			const userAgent = getUserAgent({osType: getRandomType(), netType: netType});
			console.log(userAgent)
			let visitWeb = new VisitWeb({
				url: "https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html",
				ua: userAgent
			})
			visitWeb.run({
				proxy_host: d.ip,
				proxy_port: d.port,
				proxy_username: 'jungle',
				proxy_password: 'zy5525674087',
			}).then(flag => {
				console.log(flag)
			})
		}).catch(err => console.log(err))
	}
})
// console.log(getUserAgent({osType: 'iphone', netType: '移动数据'}))