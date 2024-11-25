'use strict'

const { Service } = require('ee-core')
const { fork } = require('child_process')
const ipcWorkMsg = 'controller.workspace.workMsg'
const Ps = require('ee-core/ps')
const fs = require('fs-extra')
const path = require('path')

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
    // args.runCount, args.resweep
    const userDataDir = path.join(Ps.getExtraResourcesDir(), 'cache', `cache-${args.id}-base`)
    const proc = fork(
      require.resolve('../common/work_thread.js'),
      [args.ua, args.ip, args.port, args.username, args.password, JSON.stringify(args.size), args.wr, args.wv, args.url, args.id, Ps.getExtraResourcesDir(), userDataDir, args.core, args.random, args.randomLeft, args.randomRight, args.randomWEBGL], // pass to process.argv into child
      {}
    )
    proc.on('message', (m) => {
      // console.log(m)
      event.sender.send(ipcWorkMsg, m)
    })
    proc.on('close', async (code) => {
      if (code === 0) {
        event.sender.send(ipcWorkMsg, { id: args.id, type: 'end' })
      } else {
        event.sender.send(ipcWorkMsg, { id: args.id, type: 'error', message: '' })
      }
      if (args.resweep === 0 || args.resweep === args.runCount) {
        try {
          await fs.remove(userDataDir)
        } catch (error) {
          console.error(`Failed to remove ${userDataDir}:`, error)
        }
      }
    })
    return true
  }
}

WorkspaceService.toString = () => '[class WorkspaceService]'
module.exports = WorkspaceService