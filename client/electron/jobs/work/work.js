const Job = require('ee-core/jobs/baseJobClass')
const Log = require('ee-core/log')
const Ps = require('ee-core/ps')

/**
 * example - TimerJob
 * @class
 */
class WorkJob extends Job {

  constructor(params) {
    super()
    Log.info(params)
    this.params = params
  }

  /**
   * handle()方法是必要的，且会被自动调用
   */
  async handle() {
    const that = this
    Log.info('[child-process] TimerJob params: ', that.params)
    const { KnownDevices } = require('puppeteer')
    const puppeteer = require('puppeteer-extra')
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    const stealth = StealthPlugin()
    stealth.enabledEvasions.delete('user-agent-override')
    puppeteer.use(stealth)
    const UserAgentOverride = require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')
    puppeteer.use(UserAgentOverride({
      userAgent: that.params.userAgent,
      locale: 'lang=zh-CN,zh,zh-TW,en-US,en'
    }))
    const browser = await puppeteer.launch({
      headless: false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        `--proxy-server=http://${this.params.ip}:${parseInt(this.params.port)}`
      ]
    })
    const page = await browser.newPage()
    const d = KnownDevices['iPhone 15 Pro']
    console.log(d)
    await page.setViewport({
      width: parseInt(that.params.w),
      height: parseInt(that.params.h),
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    })
    await page.authenticate({
      username: that.params.username,
      password: that.params.password
    })
    // await page.goto('https://www.browserscan.net/bot-detection');
    await page.goto('https://www.dingxiang-inc.com/business/fingerprint')
  }
}

WorkJob.toString = () => '[class WorkJob]'
module.exports = WorkJob
