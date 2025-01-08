const path = require('path')
const fs = require('fs-extra')
let browser = null
let page = null
let id = ''
let cPath = ''
let core = true
let userDataDir = ''

async function run(userAgent, ip, port, username, password, size, wr, wv, url, random, randomLeft, randomRight, randomWEBGL) {
  try {
    const puppeteer = require('puppeteer-extra')
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    const stealth = StealthPlugin()
    stealth.enabledEvasions.delete('user-agent-override')
    puppeteer.use(stealth)
    puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/user-agent-override')({
      userAgent: userAgent,
      locale: 'zh-CN,zh,zh-CN,en-US'
    }))
    puppeteer.use(
      require('puppeteer-extra-plugin-proxy')({
        address: ip,
        port: port,
        credentials: {
          username: username,
          password: password
        }
      })
    )
    puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor')({ vendor: userAgent.includes('iPhone') ? 'Apple Computer, Inc.' : 'Google Inc.' }))
    puppeteer.use(require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency')({ hardwareConcurrency: userAgent.includes('iPhone') ? 4 : 8 }))
    let args = [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--window-size=850,1366',
      // '--blink-settings=imagesEnabled=false',
      '--disable-web-security',
      '--disable-features=UserAgentClientHint',
      `--fingerprints=${random}`
    ]
    if (core) {
      args = [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--window-size=850,1366',
        // '--blink-settings=imagesEnabled=false',
        '--disable-web-security',
        '--disable-features=UserAgentClientHint'
      ]
    }
    browser = await puppeteer.launch({
      ignoreHttpsErrors: true,
      headless: false,
      executablePath: cPath,
      userDataDir: userDataDir,
      ignoreDefaultArgs: [
        '--enable-automation',
        '--disable-extensions',
        '--disable-default-apps',
        '--disable-component-extensions-with-background-pages'
      ],
      args: args
    })
    browser.on('disconnected', () => {
      process.send({ id: id, type: 'success' })
      process.exit(0)
    })
    const page = await browser.newPage()
    process.send({ id: id, type: 'running' })
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
          'flac'
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
            'ulaw'
          ],
          'webm': [
            'vp09.00.10.08',
            'vp8.0',
            'vorbis',
            'vp09.02.10.10.01.09.16.09.01',
            'vp9',
            'vorbis',
            'opus',
            'opus'
          ],
          'ogg': []
        }
      },
      cpus: userAgent.includes('iPhone') ? 4 : 8,
      customized: true,
      language: 'zh-CN',
      platform: userAgent.includes('iPhone') ? 'iPhone' : 'Linux aarch64',
      userAgent: userAgent,
      viewport: {
        width: size.xviews.outerWidth,
        height: size.xviews.outerHeight,
        deviceScaleFactor: 3,
        isMobile: true,
        hasTouch: true,
        isLandscape: false
      },
      webgl_renderer: userAgent.includes('iPhone') ? 'Apple GPU' : wr,
      webgl_vendor: userAgent.includes('iPhone') ? 'Apple Inc.' : wv,
      xviews: size.xviews
    }
    await page.setViewport({
      width: size.xviews.screen.width,
      height: size.xviews.screen.height,
      deviceScaleFactor: 1,
      isMobile: true,
      hasTouch: true,
      isLandscape: false
    })
    await page.evaluateOnNewDocument((options) => {
      window.innerWidth = options.xviews.innerWidth
      window.innerHeight = options.xviews.innerHeight
      window.outerWidth = options.xviews.outerWidth
      window.outerHeight = options.xviews.outerHeight

      screen.availWidth = options.xviews.screen.availWidth
      screen.availHeight = options.xviews.screen.availHeight
      screen.width = options.xviews.screen.width
      screen.height = options.xviews.screen.height

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
    if (core) {
      await require('./finger/webgl')(page, options)
      await require('./finger/canvas')(page, options)
    }

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
        delete newProto.usb
        delete newProto.webkitTemporaryStorage
        delete newProto.webkitPersistentStorage
        delete newProto.windowControlsOverlay
        delete newProto.scheduling
        delete newProto.deprecatedRunAdAuctionEnforcesKAnonymity
        delete newProto.protectedAudience
        delete newProto.virtualKeyboard
        delete newProto.xr
        delete newProto.serial
        delete newProto.getBattery
        delete newProto.getUserMedia
        delete newProto.requestMIDIAccess
        delete newProto.webkitGetUserMedia
        delete newProto.createAuctionNonce
        delete newProto.joinAdInterestGroup
        delete newProto.leaveAdInterestGroup
        delete newProto.updateAdInterestGroups
        delete newProto.deprecatedReplaceInURN
        delete newProto.getInstalledRelatedApps
        delete newProto.getInterestGroupAdAuctionData
        delete newProto.registerProtocolHandler
        delete newProto.unregisterProtocolHandler
        delete newProto.vibrate
        delete newProto.storageBuckets
        delete newProto.cookieDeprecationLabel
        delete newProto.presentation
        delete newProto.adAuctionComponents
        delete newProto.runAdAuction
        delete newProto.canLoadAdAuctionFencedFrame
        delete newProto.clearAppBadge
        delete newProto.setAppBadge
        delete newProto.clearOriginJoinedAdInterestGroups
        delete newProto.deprecatedURNToURL
        navigator.__proto__ = newProto
        Object.defineProperty(navigator, 'maxTouchPoints', {
          get() {
            return 5
          }
        })
      })
    } else if (userAgent.includes('Android')) {
      options.memory = 8
      await page.evaluateOnNewDocument(() => {
        const newProto = navigator.__proto__
        delete newProto.bluetooth
        delete newProto.hid
        delete newProto.login
        delete newProto.usb
        delete newProto.xr
        delete newProto.serial
        delete newProto.joinAdInterestGroup
        delete newProto.leaveAdInterestGroup
        delete newProto.updateAdInterestGroups
        delete newProto.adAuctionComponents
        delete newProto.runAdAuction
        navigator.__proto__ = newProto
        Object.defineProperty(navigator, 'maxTouchPoints', {
          get() {
            return 5
          }
        })
      })
    }
    await page.setRequestInterception(true)
    if (userAgent.includes('iPhone')) {
      page.on('request', request => {
        const headers = Object.assign({}, request.headers(), {
          'accept-language': 'zh-CN,zh-Hans;q=0.9',
          'accept-encoding': 'gzip, deflate, br',
          'sec-ch-ua': undefined,
          'sec-ch-ua-platform': undefined,
          'sec-ch-ua-mobile': undefined,
          'sec-fetch-user': undefined,
          'upgrade-insecure-requests': undefined,
          'cache-control': undefined,
          'user-agent': userAgent
        })
        request.continue({ headers })
      })
    } else {
      page.on('request', request => {
        const findOne = userAgent.split(' ').find(item => item.includes('Chrome'))
        const splitElement = findOne ? findOne.split('/')[1].split('.')[0] : undefined
        // console.log(request.headers())
        let headers = request.headers()
        if (headers['sec-ch-ua-mobile']) {
          headers = Object.assign({}, headers, {
            'sec-ch-ua-mobile': '?1'
          })
        }
        if (headers['sec-fetch-user']) {
          headers = Object.assign({}, headers, {
            'sec-fetch-user': '?1'
          })
        }
        if (headers['sec-ch-ua-platform']) {
          headers = Object.assign({}, headers, {
            'sec-ch-ua-platform': '"Android"'
          })
        }
        if (headers['sec-ch-ua'] && splitElement) {
          headers = Object.assign({}, headers, {
            'sec-ch-ua': `"Not/A)Brand";v="8", "Chromium";v="${splitElement}", "Android WebView";v="${splitElement}"`
          })
        }
        headers = Object.assign({}, headers, {
          'x-requested-with': 'com.tencent.mm'
        })
        headers = Object.assign({}, headers, {
          'cache-control': 'max-age=0',
          'accept-encoding': 'gzip, deflate, br, zstd',
          'user-agent': userAgent
        })
        if (request.url().endsWith('sendMsg')) {
          if (request.postData().includes('在线客服')) {
            const referer = request.headers()['referer']
            const s = getUrlParams(new URL(referer))
            const rurl = modifyLastTwoSlashContent(request.url(), 'ips/reportedData')
            // console.log(rurl)
            request.continue({
              url: rurl,
              method: 'POST',
              postData: JSON.stringify({ statisticsId: s.id, type: 2 }),
              headers: headers
            })
          } else {
            request.continue({ headers })
          }
        } else {
          request.continue({ headers })
        }
      })
    }

    await page.goto('https://www.dingxiang-inc.com/business/fingerprint')

    await page.goto(url)
  } catch (e) {
    console.log(e.toString())
    process.send({ id: id, type: 'error', message: e.toString() })
  }
}

function modifyLastTwoSlashContent(path, newContent) {
  const parts = path.split('/') // 将路径按 '/' 分割成数组
  if (parts.length > 2) {
    parts.splice(-2, 2, newContent) // 替换最后两个部分
  }
  return parts.join('/') // 重新组合成字符串
}

const getUrlParams = (url) => {
  const searchParams = new URLSearchParams(url.search)
  const params = {}
  for (let [key, value] of searchParams) {
    params[key] = value
  }
  return params
}
const argv = process.argv
id = argv[11]
if (argv[14] === 'true') {
  core = true
  cPath = path.join(argv[12], 'puppeteer', 'chrome', 'win64-130.0.6723.58', 'chrome-win64', 'chrome.exe')
} else {
  core = false
  cPath = path.join(argv[12], 'puppeteer', 'chrome', 'Chrome-bin', 'chrome.exe')
}
userDataDir = argv[13]
fs.ensureDir(userDataDir).then(() => {
  run(argv[2], argv[3], parseInt(argv[4]), argv[5], argv[6], JSON.parse(argv[7]), argv[8], argv[9], argv[10], argv[15], argv[16], argv[17], argv[18]).then()
})

process.on('message', async (m) => {
  // console.log(m)
  if (m === 'close') {
    process.exit(0)
  }
})