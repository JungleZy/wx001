const {Builder, Browser, Capabilities} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const {createProxyAuthExtension, getRandomNumber} = require('../common/utils')
const fs = require('fs');

class VisitWeb {
	constructor({url = '', ua = ''}) {
		this.url = url
		this.driver = null
		this.ua = ua
	}

	async run({
		          proxy_host = '',
		          proxy_port = 0,
		          proxy_username = '',
		          proxy_password = '',
		          scheme = 'http',
		          plugin_path = '',
	          }) {
		return new Promise(async (resolve, reject) => {
			try {
				let options = new chrome.Options()
				let p = null
				if (proxy_host) {
					p = await createProxyAuthExtension({
						proxy_host,
						proxy_port,
						proxy_username,
						proxy_password,
						scheme,
						plugin_path,
					})
					options.addExtensions(p)
				}
				options.addArguments("--disable-blink-features")
				options.addArguments("disable-infobars")
				// options.addArguments("--headless")
				options.addArguments("--disable-blink-features=AutomationControlled")
				// 隐藏 正在受到自动软件的控制 这几个字
				options.excludeSwitches("enable-automation")
				// options.excludeSwitches('useAutomationExtension', false)
				options.addArguments('lang=zh-CN,zh,zh-TW,en-US,en')

				this.driver = await new Builder()
					.forBrowser(Browser.CHROME)
					.setChromeOptions(options.addArguments('user-agent=' + this.ua))
					.build()
				const that = this
				await that.driver.get(this.url)
				setTimeout(() => {
					that.driver.quit()
					if (p) {
						fs.unlinkSync(p)
					}
					resolve(true)
				}, getRandomNumber(600, 6000) * 10)
			} catch (err) {
				reject(false)
			}
		})
	}
}

module.exports = VisitWeb;