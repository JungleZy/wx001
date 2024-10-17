import localforage from 'localforage'

export const workspaceBaseDB = localforage.createInstance({
  name: 'workspace-base'
})
export const workspaceDB = (db) => {
  return localforage.createInstance({
    name: `workspace-${db}`
  })
}
export const wechatDB = localforage.createInstance({
  name: 'wechat'
})
export const networkDB = localforage.createInstance({
  name: 'network'
})
export const phoneDB = localforage.createInstance({
  name: 'phone'
})
export const browserDB = localforage.createInstance({
  name: 'browser'
})
export const configDB = localforage.createInstance({
  name: 'config'
})
