from DrissionPage import Chromium, ChromiumOptions
# 创建配置对象（默认从 ini 文件中读取配置）
co = ChromiumOptions()

co.set_user_agent(user_agent='Mozilla/5.0 (Linux; Android 14; 2211133C Build/UKQ1.230804.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/126.0.6478.188 Mobile Safari/537.36 XWEB/1260117 MMWEBSDK/20240404 MMWEBID/5040 MicroMessenger/8.0.49.2600(0x28003133) WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64')

tab = Chromium(addr_or_opts=co).latest_tab
tab.get('https://4342473b18354702bda9aae9b0a2cd50.vip1.huaweicloudwaf.com/VZcQshay/14655.html')