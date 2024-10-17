'use strict'

const utils = require('./evasions/_utils/withUtils')

class Plugin {
	async onPageCreated(page, options) {
		await utils(page).evaluateOnNewDocument((utils, options) => {
			const getParameterProxyHandler = {
				apply: function(target, ctx, args) {
					const param = (args || [])[0]
					if (param === 37445) {
						return options.webgl_vendor
					}
					if (param === 37446) {
						return options.webgl_renderer
					}
					let result = utils.cache.Reflect.apply(target, ctx, args)
					if (typeof result === 'number') {
						result += options.random[3]
					}
					return result
				},
			}
			utils.replaceWithProxy(WebGLRenderingContext.prototype, 'getParameter', getParameterProxyHandler)
			utils.replaceWithProxy(WebGL2RenderingContext.prototype, 'getParameter', getParameterProxyHandler)
		}, options)
	}
}

module.exports = async (page, options) => {
	let plugin = new Plugin()
	await plugin.onPageCreated(page, options)

	return plugin
}
