'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
    async onPageCreated(page, options) {
        page.setViewport(options.viewport)

        utils(page).evaluateOnNewDocument((utils, options) => {
          

            window.innerWidth = options.viewport.width;
            window.innerHeight = options.viewport.height;

            window.outerWidth = options.xviews.outerWidth;
            window.outerHeight = options.xviews.outerHeight;

            window.availWidth = window.screen.availWidth =  options.screen.availWidth;
            window.availHeight = window.screen.availHeight = options.screen.availHeight;
            window.width = window.screen.width = options.screen.width;
            window.height = window.screen.height = options.screen.height;

            window.screenLeft = 0;
            window.screenTop = 0;
            window.creenX = 0;
            window.screenY = 0;
            
        }, options)
    }
}

module.exports = (page, options) => {
    let plugin = new Plugin()
    plugin.onPageCreated(page, options)

    return plugin
}
