'use strict'

const { Controller } = require('ee-core')
const Log = require('ee-core/log')
const Services = require('ee-core/services')
const EE = require('ee-core/ee')
const CoreWindow = require('ee-core/electron/window')

/**
 * example
 * @class
 */
class SystemController extends Controller {

	constructor(ctx) {
		super(ctx)
		this.mainWindow = CoreWindow.getMainWindow()
	}

	async min() {
		this.mainWindow.minimize()
	}

	async close() {
		const { CoreApp } = EE
		CoreApp.appQuit().then()
	}
}

SystemController.toString = () => '[class SystemController]'
module.exports = SystemController