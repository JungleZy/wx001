'use strict'

const { Controller } = require('ee-core')
const Log = require('ee-core/log')
const Services = require('ee-core/services')

/**
 * example
 * @class
 */
class WorkspaceController extends Controller {

  constructor(ctx) {
    super(ctx)
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async run(args, event) {
    const result = await Services.get('workspace').run(args, event)
    Log.info('service result:', result)

    return 'hello electron-egg'
  }
}

WorkspaceController.toString = () => '[class WorkspaceController]'
module.exports = WorkspaceController