const ipcApiRoute = {
  test: 'controller.example.test',
  min:'controller.system.min',
  close:'controller.system.close',
}
const phoneApiRoute = {
  checkPhone: 'controller.phone.check',
  getPhoneList: 'controller.phone.list',
  savePhone: 'controller.phone.save'
}
const wechatApiRoute = {
  checkWechat: 'controller.wechat.check',
  getWechatList: 'controller.wechat.list',
  saveWechat: 'controller.wechat.save'
}
const browserApiRoute = {
  checkBrowser: 'controller.browser.check',
  getBrowserList: 'controller.browser.list',
  saveBrowser: 'controller.browser.save'
}
const networkApiRoute = {
  checkNetwork: 'controller.network.check',
  getNetworkList: 'controller.network.list',
  saveNetwork: 'controller.network.save'
}
const workspaceApiRoute = {
  run: 'controller.workspace.run',
  workMsg: 'controller.workspace.workMsg'
}

export {
  ipcApiRoute,
  phoneApiRoute,
  wechatApiRoute,
  browserApiRoute,
  networkApiRoute,
  workspaceApiRoute
}

