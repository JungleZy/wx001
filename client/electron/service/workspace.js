'use strict'

const { Service } = require('ee-core')
const { fork } = require('child_process')
const ipcWorkMsg = 'controller.workspace.workMsg'
const Ps = require('ee-core/ps')

/**
 * 示例服务（service层为单例）
 * @class
 */
class WorkspaceService extends Service {

	constructor(ctx) {
		super(ctx)
	}

	/**
	 * test
	 */
	async run(args, event) {
		// console.log(args)
		const proc = fork(
			require.resolve('../common/work_thread.js'),
			[args.ua, args.ip, args.port, args.username, args.password, JSON.stringify(args.size), args.wr, args.wv, args.url, args.id, Ps.getExtraResourcesDir()], // pass to process.argv into child
			{},
		)
		proc.on('message', (m) => {
			// console.log(m)
			if (m === 'close') {
				proc.send('close')
			} else {
				event.sender.send(ipcWorkMsg, m)
			}

		})
		proc.on('close', (code) => {
			console.log(code)
			if (code === 0) {
				event.sender.send(ipcWorkMsg, { id: args.id, type: 'end' })
			} else {
				event.sender.send(ipcWorkMsg, { id: args.id, type: 'error' })
			}
		})
		return true
	}
}

WorkspaceService.toString = () => '[class WorkspaceService]'
module.exports = WorkspaceService