const {Builder, Browser, By, Key, until} = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

class VisitWeb {
	constructor({url = '',}) {
		this.url = url
		this.driver = null
	}

	async run() {
		let options = new chrome.Options()
		options.addArguments("--disable-blink-features")
		options.addArguments("disable-infobars")
		options.addArguments("--disable-blink-features=AutomationControlled")
		// 隐藏 正在受到自动软件的控制 这几个字
		options.set("excludeSwitches", ["enable-automation"])
		options.set('useAutomationExtension', false)
		options.addArguments('lang=zh-CN,zh,zh-TW,en-US,en')
		this.driver = await new Builder()
			.forBrowser(Browser.CHROME)
			.setChromeOptions(options)
			.build()
		await this.driver.manage().window().maximize()
		await this.driver.get(this.url)
	}
}

module.exports = VisitWeb;