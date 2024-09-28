const AdmZip = require('adm-zip');
const fs = require('fs');
const {nanoid} = require("nanoid");
const {UG} = require("./constant");
const createProxyAuthExtension = async ({
	                                        proxy_host = '',
	                                        proxy_port = 0,
	                                        proxy_username = '',
	                                        proxy_password = '',
	                                        scheme = 'http',
	                                        plugin_path = '',
                                        }) => {
	const id = nanoid(10)
	fs.copyFileSync('Selenium-Chrome-HTTP-Private-Proxy.zip', `Selenium-Chrome-HTTP-Private-Proxy-${id}.zip`)
	plugin_path = `Selenium-Chrome-HTTP-Private-Proxy-${id}.zip`
	let manifest_json = `
	{
        "version": "1.0.0",
        "manifest_version": 2,
        "name": "Chrome Proxy",
        "permissions": [
            "proxy",
            "tabs",
            "unlimitedStorage",
            "storage",
            "<all_urls>",
            "webRequest",
            "webRequestBlocking"
        ],
        "background": {
            "scripts": ["background.js"]
        },
        "minimum_chrome_version":"22.0.0"
    }
	`
	let background_js = `
	var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        scheme: "${scheme}",
        host: "${proxy_host}",
        port: parseInt(${proxy_port})
      },
      bypassList: ["foobar.com"]
    }
  };
  chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});
  function callbackFn(details) {
      return {
          authCredentials: {
              username: "${proxy_username}",
              password: "${proxy_password}"
          }
      };
  }
  chrome.webRequest.onAuthRequired.addListener(
              callbackFn,
              {urls: ["<all_urls>"]},
              ['blocking']
  );
	`
	const zip = new AdmZip(`${plugin_path}`);
	zip.updateFile(zip.getEntry("manifest.json"), Buffer.from(manifest_json))
	zip.updateFile(zip.getEntry("background.js"), Buffer.from(background_js))
	await zip.writeZip(null);
	return `Selenium-Chrome-HTTP-Private-Proxy-${id}.zip`
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(size) {
	return Math.floor(Math.random() * size);
}

function getRandomType(rate = 0.5) {
	return Math.random() < rate ? 'android' : 'iphone'
}

function getUserAgent({osType = 'android', netType = '移动数据'}) {
	const ot = UG.get(osType)
	let TAI = ''
	let WXV = ''
	if (osType === 'android') {
		const wv = ot.wx[getRandomInt(ot.wx.length)]
		const cv = ot.chromeVersion[getRandomInt(ot.chromeVersion.length)]
		const flag = Number(cv.split("/")[1].split('.')[0]) < 100
		WXV = ` ${ot.version} ${cv} ${flag ? 'MQQBrowser/6.2 TBS/044607 Mobile Safari/537.36' : 'Mobile Safari/537.36 XWEB/1160117 MMWEBSDK/20240301'} MMWEBID/${getRandomNumber(50, 9999)} MicroMessenger/${wv} ${flag ? 'Process/tools' : 'WeChat/arm64 Weixin'}`
		TAI = flag ? '' : ' ABI/arm64'
	} else if (osType === 'iphone') {
		const wv = ot.wx[getRandomInt(ot.wx.length)]
		WXV = ` Mobile/15E148 MicroMessenger/${wv}`
	}
	return `Mozilla/5.0 (${ot.head}; ${ot.machine[getRandomInt(ot.machine.length)]}) AppleWebKit/${ot.webkit} (KHTML, like Gecko)${WXV} NetType/${netType === '移动数据' ? '4G' : 'WIFI'} Language/zh_CN${TAI}`
}

module.exports = {
	createProxyAuthExtension,
	getRandomNumber,
	getRandomType,
	getUserAgent
}