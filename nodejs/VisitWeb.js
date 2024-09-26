const {Builder, Browser, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const {createProxyAuthExtension, getRandomNumber} = require('./utils')
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
		          id = ''
	          }, cb) {
		try {
			let options = new chrome.Options()
			let p = await createProxyAuthExtension({
				proxy_host,
				proxy_port,
				proxy_username,
				proxy_password,
				scheme,
				plugin_path,
				id
			})
			options.addExtensions(p)
			options.addArguments("--disable-blink-features")
			options.addArguments("disable-infobars")
			options.addArguments("--headless")
			options.addArguments("--disable-blink-features=AutomationControlled")
			// 隐藏 正在受到自动软件的控制 这几个字
			options.set("excludeSwitches", ["enable-automation"])
			options.set('useAutomationExtension', false)
			options.addArguments('lang=zh-CN,zh,zh-TW,en-US,en')

			options.addArguments('user-agent=' + this.ua)
			this.driver = await new Builder()
				.forBrowser(Browser.CHROME)
				.setChromeOptions(options)
				.build()
			await this.driver.get(this.url)
			const that = this
			setTimeout(() => {
				that.driver.quit()
				fs.unlinkSync(p)
				cb(true)
			}, id)
		} catch (err) {
			cb(false)
		}

	}
}

module.exports = VisitWeb;