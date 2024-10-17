'use strict'

const utils = require('./evasions/_utils/withUtils')
const context = require('./common/cache')

class Plugin {
	async onPageCreated(page, options) {
		await utils(page).evaluateOnNewDocument((utils, options) => {

			const originalFunction = HTMLCanvasElement.prototype.toDataURL.bind({ arguments: ['image/png'] })

			const getCanvasProxyHandler = {
				apply: function(target, ctx, args) {

					let canvas_element = ctx.cloneNode()
					let canvas_context = canvas_element.getContext('2d')

					// let image = new Image()
					// image.src = result;
					// canvas_context.drawImage(image, 0, 0)
					canvas_context.textBaseline = 'alphabetic'
					canvas_context.fillStyle = '#f60'
					canvas_context.fillRect(100, 1, options.random[1], options.random[2])

					var result = target.apply(ctx, args)


					result = result.slice(0, 100) + options.random[0] + result.slice(130, -1)


					// const imageData = canvas_context.getImageData(0, 0, 100, 199);
					// console.log(imageData)
					// for (let i = 0; x < imageData.data.length; i++) {
					//     console.log(imageData.data[i])
					//     imageData.data[i] = 0
					// }

					try {
						//    let new_result = originalFunction.apply(canvas_context, args)
						//    console.log(new_result)
						return result
					} catch (err) {

						console.log('canvas error:', err)
						return []
					}

				},
			}
			utils.replaceWithProxy(HTMLCanvasElement.prototype, 'toDataURL', getCanvasProxyHandler)
		}, options)
	}
}

module.exports = async (page, options) => {
	let plugin = new Plugin()
	await plugin.onPageCreated(page, options)

	return plugin
}
