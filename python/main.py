from time import sleep
import time
import string
import zipfile

import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


# 设置代理
def create_proxyauth_extension(proxy_host, proxy_port, proxy_username, proxy_password, scheme='http', plugin_path=None):
    """Proxy Auth Extension
    args:
        proxy_host (str): domain or ip address, ie proxy.domain.com
        proxy_port (int): port
        proxy_username (str): auth username
        proxy_password (str): auth password
    kwargs:
        scheme (str): proxy scheme, default http
        plugin_path (str): absolute path of the extension
    return str -> plugin_path
    """
    if plugin_path is None:
        plugin_path = 'Selenium-Chrome-HTTP-Private-Proxy.zip'
    manifest_json = """
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
    """
    background_js = string.Template(
        """
        var config = {
                mode: "fixed_servers",
                rules: {
                  singleProxy: {
                    scheme: "${scheme}",
                    host: "${host}",
                    port: parseInt(${port})
                  },
                  bypassList: ["foobar.com"]
                }
              };
        chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});
        function callbackFn(details) {
            return {
                authCredentials: {
                    username: "${username}",
                    password: "${password}"
                }
            };
        }
        chrome.webRequest.onAuthRequired.addListener(
                    callbackFn,
                    {urls: ["<all_urls>"]},
                    ['blocking']
        );
        """
    ).substitute(
        host=proxy_host,
        port=proxy_port,
        username=proxy_username,
        password=proxy_password,
        scheme=scheme,
    )
    with zipfile.ZipFile(plugin_path, 'w') as zp:
        zp.writestr("manifest.json", manifest_json)
        zp.writestr("background.js", background_js)

    return plugin_path


def configure_headless_browser(proxy_config):
    chrome_options = Options()
    proxyauth_plugin_path = create_proxyauth_extension(
        proxy_host=proxy_config[0],
        proxy_port=proxy_config[1],
        proxy_username=proxy_config[2],
        proxy_password=proxy_config[3]
    )
    chrome_options.add_extension(proxyauth_plugin_path)
    # 设置UA
    user_ag = 'Mozilla/5.0 (Linux; Android 14; 2211133C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260117 MMWEBSDK/20240404 MMWEBID/5040 MicroMessenger/8.0.49.2600(0x28003133) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64'
    # 初始化Chrome浏览器
    # options.add_argument("--headless")  # 启用无头模式
    # options.add_argument("--disable-gpu")  # 启用无头模式
    chrome_options.add_argument("--disable-blink-features")
    chrome_options.add_argument('disable-infobars')  # 隐藏"Chrome正在受到自动软件的控制"
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")

    # 隐藏 正在受到自动软件的控制 这几个字
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    chrome_options.add_argument('lang=zh-CN,zh,zh-TW,en-US,en')
    # 关闭WebRTC防止真实IP泄漏
    chrome_options.add_experimental_option("prefs", {
        "webrtc.ip_handling_policy": "disable_non_proxied_udp",
        "webrtc.multiple_routes_enabled": False,
        "webrtc.nonproxied_udp_enabled": False
    })

    chrome_options.add_argument('user-agent=' + user_ag)
    return webdriver.Chrome(options=chrome_options)


def run(ip, port):
    # 设置代理IP：分别填入代理ip，端口，账号，密码
    proxy_config = [ip, port, "jungle", "zy5525674087"]

    browser = configure_headless_browser(proxy_config)

    # 打开百度网页
    browser.get("https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html")

    # 这里可以编写其他与页面交互的代码
    sleep(100)
    # 关闭浏览器
    browser.quit()


def get_ip():
    url_get = 'http://api.tianqiip.com/getip?secret=kdyq3fnzqv1z88st&num=1&type=json&port=1&time=3&ys=1&cs=1&mr=1&sign=1ac43f178cb69267964a0becb7a89e7b'
    response = requests.get(url_get)
    print(response.json()['data'][0]['ip'])
    print(response.text)
    return response.json()['data'][0]


if __name__ == '__main__':
    ip = get_ip()
    run(ip['ip'],ip['port'])
