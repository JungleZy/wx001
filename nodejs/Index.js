const IpPool = require('./IpPool')
const VisitWeb = require('./VisitWeb')
const {getRandomNumber} = require("./utils");
ipPool = new IpPool({ipNum: 4, appCode: '75a8edbfef1d4468bb00628c46a83525'})

ipPool.acquireIP().then(res => {
	console.log(res.data)
	for (const d of res.data.data) {
		ipPool.verifyIP(d.ip).then(res => {
			console.log(res.data)
			let visitWeb = new VisitWeb({
				url: "https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html",
				ua: 'Mozilla/5.0 (Linux; Android 14; 2211133C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260117 MMWEBSDK/20240404 MMWEBID/5040 MicroMessenger/8.0.49.2600(0x28003133) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64'
			})
			const randomNumber = getRandomNumber(10000, 30000);
			visitWeb.run({
				proxy_host: d.ip,
				proxy_port: d.port,
				proxy_username: 'jungle',
				proxy_password: 'zy5525674087',
				id: randomNumber
			}, (e) => {
				console.log(e)
			})

		}).catch(err => console.log(err))
	}
})


// visitWeb = new VisitWeb({
// 	url: "https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html",
// 	ua: 'Mozilla/5.0 (Linux; Android 14; 2211133C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260117 MMWEBSDK/20240404 MMWEBID/5040 MicroMessenger/8.0.49.2600(0x28003133) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64'
// })
// visitWeb.run()