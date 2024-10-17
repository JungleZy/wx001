'use strict'

const { Controller } = require('ee-core')
const content = require('../common/node_ctx')

/**
 * example
 * @class
 */
class NetworkController extends Controller {

	constructor(ctx) {
		super(ctx)
	}

	async check() {
		const userTable = content.DB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?')
		const result = userTable.get('table', 'network')
		if (result) {
			return
		}

		content.DB.db.exec(`CREATE TABLE network
    (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type INT,
      url CHAR(255),
      username CHAR(255),
      password CHAR(255)
    );`)
	}

	async list() {
		const networks = content.DB.db.prepare(`SELECT * FROM network`)
		return networks.all()
	}

	async save(data) {
		const insert = content.DB.db.prepare(`INSERT INTO network (type,url, username,password) VALUES (@type,@url, @username,@password)`)
		insert.run(data)
		return true
	}
}

NetworkController.toString = () => '[class NetworkController]'
module.exports = NetworkController