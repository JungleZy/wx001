// const puppeteer = require('puppeteer')
const {KnownDevices} = require('puppeteer');
const IpPool = require('./service/IpPool')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const stealth = StealthPlugin()
stealth.enabledEvasions.delete("user-agent-override")
puppeteer.use(stealth)
const UserAgentOverride = require("puppeteer-extra-plugin-stealth/evasions/user-agent-override")
const ua = UserAgentOverride({
	userAgent: "Mozilla/5.0 (Linux; Android 10; OXF-AN10 Build/HUAWEIOXF-AN10; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/78.0.3904.62 XWEB/2469 MMWEBSDK/200502 Mobile Safari/537.36 MMWEBID/939 MicroMessenger/7.0.15.1680(0x27000F3F) Process/appbrand0 WeChat/arm64 NetType/WIFI Language/zh_CN ABI/arm64 miniProgram",
	locale: "lang=zh-CN,zh,zh-TW,en-US,en"
})

puppeteer.use(ua)

async function run(ip, port) {
	const browser = await puppeteer.launch({
		headless: false,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			`--proxy-server=http://${ip}:${port}`,
		],
	});
	const page = await browser.newPage();
	const d = KnownDevices['iPhone 15 Pro']
	console.log(d)
	await page.setViewport({
		width: 430,
		height: 739,
		deviceScaleFactor: 3,
		isMobile: true,
		hasTouch: true,
		isLandscape: false
	})
	await page.authenticate({
		username: 'jungle',
		password: 'zy5525674087'
	})
	// await page.goto('https://www.browserscan.net/bot-detection');
	await page.goto('https://www.dingxiang-inc.com/business/fingerprint')

// await browser.close();
}

ipPool = new IpPool({ipNum: 1, appCode: '75a8edbfef1d4468bb00628c46a83525'})

ipPool.acquireIP().then(res => {
	for (const d of res.data.data) {
		console.log(d)
		run(d.ip, d.port).catch(console.error);
	}
})
