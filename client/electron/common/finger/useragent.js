'use strict'

const UAParser = require("ua-parser-js")
const utils = require('./evasions/_utils/withUtils')

class Plugin {
    async onPageCreated(page, options) {
        page.setUserAgent(options.userAgent)

        // utils(page).evaluateOnNewDocument((utils, options) => {
        //     utils.replaceGetterWithProxy(
        //         Object.getPrototypeOf(navigator),
        //         'platform',
        //         utils.makeHandler().getterValue(options.platform)
        //     )
        // }, {...options})
    }
}

module.exports = (page, options) => {
    let plugin = new Plugin()
    plugin.onPageCreated(page, options)

    return plugin
}
