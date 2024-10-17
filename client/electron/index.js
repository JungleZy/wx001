process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
const { Application } = require('ee-core')
const ctx = require('./common/node_ctx')
const Storage = require('ee-core/storage')

class Index extends Application {

	constructor() {
		super()
		// this === eeApp;
	}

	/**
	 * core app have been loaded
	 */
	async ready() {
		ctx.DB = Storage.connection('sqlite.db', {
			driver: 'sqlite',
			default: {
				timeout: 6000,
				verbose: console.log,
			},
		})
	}

	/**
	 * electron app ready
	 */
	async electronAppReady() {
		// do some things

	}

	/**
	 * main window have been loaded
	 */
	async windowReady() {
		if (this.config.windowsOption.show === false) {
			const win = this.electron.mainWindow
			win.once('ready-to-show', () => {
				win.show()
				win.focus()
			})
		}
	}

	/**
	 * before app close
	 */
	async beforeClose() {
		// do some things

	}
}

Index.toString = () => '[class Index]'
module.exports = Index