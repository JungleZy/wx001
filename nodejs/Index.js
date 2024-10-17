const IpPool = require('./service/IpPool')
const VisitWeb = require('./service/VisitWeb')
const {getUserAgent, getRandomType} = require("./common/utils");

ipPool = new IpPool({ipNum: 1, appCode: '75a8edbfef1d4468bb00628c46a83525'})

ipPool.acquireIP().then(res => {
	for (const d of res.data.data) {
		ipPool.verifyIP(d.ip).then(res => {
			const data = res.data.data
			console.log(data.ip, data.isp, data.netWorkType, data.proxy)
			const netType = res.data.data.netWorkType
			const userAgent = getUserAgent({osType: getRandomType(), netType: netType});
			console.log(userAgent)
			let visitWeb = new VisitWeb({
				// url: "https://d6da11215a3a4667ae2262884d7774bd.vip1.huaweicloudwaf.com/rCS87R8S/78168.html",
				// url:'https://www.dingxiang-inc.com/business/fingerprint',
				url:'https://www.browserscan.net/bot-detection',
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
// const netType = '移动网络'
// const userAgent = getUserAgent({osType: 'iphone', netType: netType});
// console.log(userAgent)
// let visitWeb = new VisitWeb({
// 	// url: "http://192.168.31.115:13100/manage/getSystemInfo",
// 	url: "http://127.0.0.1:13100/html/2.html",
// 	ua: userAgent
// })
// visitWeb.run({
// 	proxy_host: "121.23.25.25",
// 	proxy_port: 4444,
// 	proxy_username: 'jungle',
// 	proxy_password: 'zy5525674087',
// }).then(flag => {
// 	console.log(flag)
// })