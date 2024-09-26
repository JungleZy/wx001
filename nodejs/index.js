// const IpPool = require('./IpPool')
// ipPool = new IpPool({ipNum: 1, appCode: '75a8edbfef1d4468bb00628c46a83525'})
// ipPool.acquireIP().then(res => {
// 	console.log(res.data)
// 	for (const d of res.data.data) {
// 		ipPool.verifyIP('121.226.90.125').then(res => console.log(res.data)).catch(err => console.log(err))
// 	}
// })

const VisitWeb = require('./VisitWeb')
visitWeb = new VisitWeb({url: "https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html"})
visitWeb.run()