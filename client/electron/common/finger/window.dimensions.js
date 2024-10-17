'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
	async onPageCreated(page, options) {
		page.setViewport(options.viewport)

		utils(page).evaluateOnNewDocument((utils, options) => {

			window.innerWidth = options.viewport.width
			window.innerHeight = options.viewport.height

			window.outerWidth = options.xviews.outerWidth
			window.outerHeight = options.xviews.outerHeight

			window.screen.availWidth = options.xviews.screen.availWidth
			window.screen.availHeight = options.xviews.screen.availHeight
			window.width = window.screen.width = options.xviews.screen.width
			window.height = window.screen.height = options.xviews.screen.height

			window.screenLeft = 0
			window.screenTop = 0
			window.creenX = 0
			window.screenY = 0

		}, options)
	}
}

module.exports = (page, options) => {
	let plugin = new Plugin()
	plugin.onPageCreated(page, options)

	return plugin
}
