'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
    async onPageCreated(page, options) {
        await page.setExtraHTTPHeaders({
            'Accept-Language': `${options.language};q=${(Math.floor((Math.random() * 5))) / 10 + 0.5}`
        })

        utils(page).evaluateOnNewDocument((utils, options) => {
            utils.replaceGetterWithProxy(
                Object.getPrototypeOf(navigator),
                'languages',
                utils.makeHandler().getterValue(Object.freeze([...options.language.split(",")]))
              )
      
              utils.replaceGetterWithProxy(Object.getPrototypeOf(navigator),
                'language',
                utils.makeHandler().getterValue(options.language.split(",")[0])
              )


            utils.replaceGetterWithProxy(Object.getPrototypeOf(navigator),
                'platform',
                utils.makeHandler().getterValue(options.platform)
            )

        }, options)
    }
}

module.exports = (page, options) => {
    let plugin = new Plugin()
    plugin.onPageCreated(page, options)

    return plugin
}
