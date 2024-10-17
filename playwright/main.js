const {chromium, devices, webkit} = require('playwright');
(async () => {
	const browser = await webkit.launch({
		headless: false, args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-blink-features=AutomationControlled'],
	});
	const iphone13 = devices['iPhone 15 Pro Max']
	const context = await browser.newContext({
		...iphone13,
	});
	const page = await context.newPage();
	await page.addInitScript(`Object.defineProperties(navigator, {webdriver:{get:()=>undefined}});`)
	// await page.goto('https://ai-base.cn:13001/html/3.html');
	await page.goto('https://www.dingxiang-inc.com/business/fingerprint');
})();