'use strict';

const { Controller } = require('ee-core');
const content = require('../common/node_ctx')

/**
 * example
 * @class
 */
class BrowserController extends Controller {

	constructor(ctx) {
		super(ctx);
	}
	async check() {
		const userTable = content.DB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?')
		const result = userTable.get('table', 'browser')
		if (result) {
			return
		}

		content.DB.db.exec(`CREATE TABLE browser
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type INT,
      url CHAR(255),
      username CHAR(255),
      password CHAR(255)
    );`)
	}
	async list () {

	}
	async save () {

	}
}

BrowserController.toString = () => '[class BrowserController]';
module.exports = BrowserController;