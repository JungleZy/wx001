const AdmZip = require('adm-zip');
const fs = require('fs');
const createProxyAuthExtension = async ({
	                                        proxy_host = '',
	                                        proxy_port = 0,
	                                        proxy_username = '',
	                                        proxy_password = '',
	                                        scheme = 'http',
	                                        plugin_path = '',
	                                        id = ''
                                        }) => {
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
	const zip = new AdmZip(plugin_path);
	zip.updateFile(zip.getEntry("manifest.json"), Buffer.from(manifest_json))
	zip.updateFile(zip.getEntry("background.js"), Buffer.from(background_js))
	await zip.writeZip(null);
	return `Selenium-Chrome-HTTP-Private-Proxy-${id}.zip`
}

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
	createProxyAuthExtension,
	getRandomNumber
}