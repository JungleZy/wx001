const path = require('path')
let browser = null
let id = ''
let cPath = ''

async function run(userAgent, ip, port, username, password, size, wr, wv, url) {
	try {
		const puppeteer = require('puppeteer-extra')
		const StealthPlugin = require('puppeteer-extra-plugin-stealth')
		const stealth = StealthPlugin()
		stealth.enabledEvasions.delete('user-agent-override')
		puppeteer.use(stealth)
		puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')({
			userAgent: userAgent,
			locale: 'zh-CN,zh,zh-CN,en-US',
		}))
		puppeteer.use(
			require('puppeteer-extra-plugin-proxy')({
				address: ip,
				port: port,
				credentials: {
					username: username,
					password: password,
				},
			}),
		)
		puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')({ vendor: userAgent.includes('iPhone') ? 'Apple Computer, Inc.' : 'Google Inc.' }))
		puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')({ hardwareConcurrency: userAgent.includes('iPhone') ? 4 : 8 }))
		browser = await puppeteer.launch({
			ignoreHttpsError: true,
			headless: false,
			executablePath: cPath,
			ignoreDefaultArgs: [
				'--enable-automation',
				'--disable-extensions',
				'--disable-default-apps',
				'--disable-component-extensions-with-background-pages',
			],
			args: [
				'--no-sandbox',
				'--disable-setuid-sandbox',
				'--window-size=850,1366',
				'--blink-settings=imagesEnabled=false',
				'--disable-web-security',
				'--disable-features=UserAgentClientHint',
			],
		})
		browser.on('targetdestroyed', (e) => {
			process.send({ id: id, type: 'end' })
		})
		const page = await browser.newPage()
		process.send({ id: id, type: 'running' })
		let random1 = Math.random().toString(36).toUpperCase().slice(2, -1)
		let random2 = Math.random().toString(36).toUpperCase().slice(2, -1)
		let random3 = Math.random().toString(36).toUpperCase().slice(2, -1)
		let random4 = Math.random().toString(36).toUpperCase().slice(2, -1)
		let random5 = Math.random().toString(36).toUpperCase().slice(2, -1)
		let random = random1 + random2 + random3 + random4 + random5
		let randomLeft = Math.floor(Math.random() * 80)
		let randomRight = Math.floor(Math.random() * 80)
		let randomWEBGL = Math.floor(Math.random() * 1000)
		const options = {
			id: id,
			random: [random, randomLeft, randomRight, randomWEBGL],
			canvas: { chance: 95, shift: 4 },
			compatibleMediaMines: {
				'audio': [
					'basic',
					'x-wav',
					'mpeg',
					'x-aiff',
					'x-mpegurl',
					'mpeg',
					'flac',
					'wav',
					'webm',
					'aac',
					'flac',
				],
				'video': {
					'mp4': [
						'avc1.42E01E',
						'avc1.4D401E',
						'avc1.64001E',
						'mp4a.40.5',
						'mp4a.40.2',
						'mp4a.40.2',
						'avc1.4d001f',
						'mp4a.40.2',
						'avc1.42E01E',
						'mp4a.40.2',
						'flac',
						'avc1',
						'dvh1',
						'hvc1',
						'mp4v',
						's263',
						'flac',
						'ac-3',
						'alac',
						'alaw',
						'ec-3',
						'fLaC',
						'flac',
						'Opus',
						'samr',
						'twos',
						'ulaw',
					],
					'webm': [
						'vp09.00.10.08',
						'vp8.0',
						'vorbis',
						'vp09.02.10.10.01.09.16.09.01',
						'vp9',
						'vorbis',
						'opus',
						'opus',
					],
					'ogg': [],
				},
			},
			cpus: userAgent.includes('iPhone') ? 4 : 8,
			customized: true,
			language: 'zh-CN',
			platform: userAgent.includes('iPhone') ? 'iPhone' : 'Linux aarch64',
			userAgent: userAgent,
			viewport: {
				isMobile: true,
				width: size.xviews.outerWidth,
				height: size.xviews.outerHeight,
				deviceScaleFactor: 3,
				hasTouch: true,
				isLandscape: false,
			},
			webgl_renderer: userAgent.includes('iPhone') ? 'Apple GPU' : wr,
			webgl_vendor: userAgent.includes('iPhone') ? 'Apple Inc.' : wv,
			xviews: size.xviews,
		}
		await page.setViewport({
			width: size.xviews.outerWidth,
			height: size.xviews.outerHeight,
			deviceScaleFactor: 3,
			isMobile: true,
			hasTouch: true,
			isLandscape: false,
		})
		await page.evaluateOnNewDocument((options) => {
			window.innerWidth = options.xviews.innerWidth
			window.innerHeight = options.xviews.innerHeight

			window.outerWidth = options.xviews.outerWidth
			window.outerHeight = options.xviews.outerHeight


			window.availWidth = window.screen.availWidth = options.xviews.screen.availWidth
			window.availHeight = window.screen.availHeight = options.xviews.screen.availHeight

			window.width = window.screen.width = options.xviews.screen.availWidth
			window.height = window.screen.height = options.xviews.screen.availHeight

			window.screenLeft = 0
			window.screenTop = 0
			window.creenX = 0
			window.screenY = 0
		}, options)
		if (userAgent.includes('Android')) {
			options.memory = 8
		}
		// require('./finger/useragent')(page,options)
		require('./finger/chrome.runtime')(page, options)
		require('./finger/document.focus')(page, options)
		require('./finger/media.codecs')(page, options)
		require('./finger/navigator.hardware')(page, options)
		require('./finger/navigator.language')(page, options)
		require('./finger/navigator.permissions')(page, options)
		await require('./finger/webgl')(page, options)
		await require('./finger/canvas')(page, options)

		if (userAgent.includes('iPhone')) {
			await page.evaluateOnNewDocument(() => {
				const newProto = navigator.__proto__
				delete newProto.connection
				delete newProto.hid
				delete newProto.ink
				delete newProto.keyboard
				delete newProto.login
				delete newProto.managed
				delete newProto.gpu
				delete newProto.userAgentData
				delete newProto.bluetooth
				navigator.__proto__ = newProto
			})
		} else if (userAgent.includes('Android')) {
			const findOne = userAgent.split(' ').find(item => item.includes('Chrome'))
			const splitElement = findOne.split('/')[1].split('.')[0]
			options.memory = 8
			await page.evaluateOnNewDocument(() => {
				const newProto = navigator.__proto__
				delete newProto.bluetooth
				delete newProto.hid
				delete newProto.login
				navigator.__proto__ = newProto
			})
			await page.setExtraHTTPHeaders({
				'cache-control': 'max-age=0',
				'sec-ch-ua': `"Not/A)Brand";v="8", "Chromium";v="${splitElement}", "Android WebView";v="${splitElement}"`,
				'x-requested-with': 'com.tencent.mm',
				'sec-fetch-user': '?1',
				'sec-ch-ua-mobile': '?1',
				'accept-encoding': 'gzip, deflate, br, zstd',
				'sec-ch-ua-platform': '"Android"',
			})
		}
		await page.setRequestInterception(true)
		page.on('request', interceptedRequest => {
			console.log(interceptedRequest)
			interceptedRequest.continue()
		})
		await page.goto('https://www.dingxiang-inc.com/business/fingerprint')
		await page.goto(url)
	} catch (e) {
		process.send({ id: id, type: 'close' })
	}
}

const argv = process.argv
id = argv[11]
// cPath = path.join(argv[12], 'puppeteer', 'chrome', 'win64-129.0.6668.89', 'chrome-win64', 'chrome.exe')
cPath = path.join(argv[12], 'puppeteer', 'chrome', 'win64-129.0.6668.91', 'chrome-win64', 'chrome.exe')
run(argv[2], argv[3], parseInt(argv[4]), argv[5], argv[6], JSON.parse(argv[7]), argv[8], argv[9], argv[10]).then()
process.on('message', async (m) => {
	console.log(m)
	if (m === 'close') {
		process.exit(0)
	}
})